import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/jwt';

async function nextError (code: string, message: string, status = 404) {
  return NextResponse.json(
    {
      status,
      code,
      message,
      timesStamp: new Date().toISOString(),
    },
    { status }
  )
};

// @desc get specific order based on order id
// @route /api/v1/orders/:id
// @access private(owner, admin)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string}>}
) {
  try {
    const orderId = (await params).id;

    const data = await prisma.userOrders.findUnique({
      where: {
        id: orderId
      }
    });

    if (!data) return nextError(
      'ORDER_FETCH_FAIL',
      'order doesn\'t exists or wronge id',
      501
    );

    const message = 'Order is fetched successfully!';

    return NextResponse.json({
      data,
      message
    }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('error: ', error.message);
    return nextError(
      'FAIL',
      'Error message',
      404
    )
  }
}

// @desc update selected order
// @route /api/v1/orders/id:
// @access private (owner, admin, same user)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string}> }
) {
  try {

    const orderId = (await params).id;
    const { status } = await req.json();
    const order = await prisma.userOrders.findUnique({
      where: {
        id: orderId
      },
      select: {
        user_id: true,
        status_history: true
      }
    })

    // check if user authorized and is admin or owner or same user
    const cookiesStore = await cookies();
    const { value: authToken }: any = cookiesStore.get('accessToken');
    if (!authToken) return nextError(
      'TOKEN_DETAILS_NOT_FOUND',
      'No auth token details found',
      401
    );

    const { email }: any = await verifyToken(authToken);
    if (!email) return nextError(
      'UNAUTHORIZED_ERROR',
      ' Unable to get authentication info',
      401
    );

    const user = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        role: {
          select: {
            role: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    const isAdminOrOwnerOrSameUser = user.role.role.name === 'admin' || user.role.role.name === 'owner' || order.user_id === user.id
    if (!isAdminOrOwnerOrSameUser) return nextError(
      'REQUEST_FORBIDDEN',
      'request is forbidden',
      403
    )

    const isoFromTimestamp = new Date(Date.now()).toISOString();
    // return NextResponse.json(
      // { data: order.status_history, message: 'status history: '},
      // { status: 200 }
    // );
    const statusHistoryWithoutNull = () => {
      if (order.status_history === null) return [];
      return order.status_history.filter((itm: Record<string, any> | null) => itm !== null);
    };
    const data = await prisma.userOrders.update({
      where: { id: orderId },
      data: {
        status,
        status_history: [ ...statusHistoryWithoutNull(), { status, timestamp: isoFromTimestamp }]
      }
    });

    if (!data) return nextError(
      'ORDER_UPDATE_FAIL',
      'order doesn\'t exists or wronge id',
      501
    );

    const message = {
      en: 'Order is updated successfully!',
      ar: 'تم تعديل الطلب بنجاح!'
    };

    return NextResponse.json({
      data,
      message
    }, { status: 201 });

  } catch (err) {
    const error = err as Error;
    console.error('error: ', error.message);
    return nextError(
      'FAIL',
      'Error message',
      404
    );
  }
}

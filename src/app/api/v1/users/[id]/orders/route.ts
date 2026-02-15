import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


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

// @desc get user orders
// @route /api/v1/users/:id/orders
// @access public
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string}>}
) {
  try {
    const userId = (await params).id;

    const data = await prisma.userOrders.findMany({
      where: {
        user_id: userId
      },
      include: {
        user: true
      }
    })

    if (!data) return nextError(
      'USER_ORDERS_FETCH_FAIL',
      'user orders doesn\'t exists or wronge id',
      501
    )

    const message = 'User Orders is fetched successfully!';

    return NextResponse.json({
      data,
      message
    }, { status: 200 })
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

// @desc add new order
// @route /api/v1/users/id:/orders
// @access public
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string}> }
) {
  try {
    const userId = (await params).id;
    const requestedData = await req.json();

    const data = await prisma.userOrders.create({
      data: {
        ...requestedData,
        user_id: userId
      }
    })

    if (!data) return nextError(
      'ORDER_CREATE_FAIL',
      'order doesn\'t exists or wronge id',
      501
    )

    const message = {
      en: 'Order is created successfully!',
      ar: 'تم انشاء الطلب بنجاح!'
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
    )
  }
}

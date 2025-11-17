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

// @desc get specific order based on order id
// @route /api/v1/orders/:id
// @access private(owner, admin)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string}}
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
// @access private (owner, admin)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string} }
) {
  try {
    const orderId = (await params).id;
    const requestedData = await req.json();

    const data = await prisma.userOrders.update({
      where: { id: orderId },
      data: requestedData
    });

    if (!data) return nextError(
      'ORDER_UPDATE_FAIL',
      'order doesn\'t exists or wronge id',
      501
    )

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
    )
  }
}

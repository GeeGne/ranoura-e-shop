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

// @desc get all orders
// @route /api/v1/orders
// @access private(owner, admin)
export async function GET(
  req: NextRequest,
) {
  try {
    const data = await prisma.userOrders.findMany();
    if (!data) return nextError(
      'ORDERS_FETCH_FAIL',
      'orders doesn\'t exists or wronge id',
      501
    )

    const message = 'Orders are fetched successfully!';

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

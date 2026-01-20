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
    const data = await prisma.userOrders.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });
    if (!data) return nextError(
      'ORDERS_FETCH_FAIL',
      'orders doesn\'t exists or wronge id',
      501
    );

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


// @desc create new order
// @route /api/v1/orders
// @access private(requested user)
export async function POST(
  req: NextRequest,
) {
  try {
    const orderData = await req.json();
    const {
      user_id, products, total_items, total, customer_pfp,
      customer_full_name, email, customer_phone_number, 
      shipping_address, shipping_cost, currency, payment_method
    } = orderData;
    console.log('order data: ', orderData);
    if (!user_id || !products || !total_items || !total || !customer_pfp ||
      !customer_full_name || !email || !customer_phone_number || 
      !shipping_address || !shipping_cost
    ) return nextError(
      'REQUEST_FAILED',
      'Error while getting order data',
      401
    );

    const data = await prisma.userOrders.create({
      data: {
        user_id,
        products,
        total_items,
        total,
        customer_pfp,
        customer_full_name,
        customer_phone_number,
        email,
        shipping_address,
        shipping_cost,
        currency,
        payment_method
      }
    })

    const message = {
      en: "New order has been created successfully!",
      ar: "تم انشاء الطلب بنجاح!"
    }

    return NextResponse.json({ data, message }, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error('Error While creating new order: ', error.message);
    return nextError(
      'NEW_ORDER_FAIL',
      'failed to create new order',
      500
    )
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
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

// @desc create new order
// @route /api/v1/orders
// @access private(requested user)
// @infoRequired (
//    products, shipping city, discount, address_details, second_address, notes, phone
// )
export async function POST(
  req: NextRequest,
) {
  try {
    // Get request data
    const requestedData = await req.json();
    const { 
      products, shipping_city, phone, address_details, second_address, notes 
    } = requestedData;
    if (
      !products || !shipping_city || !phone || !address_details || !second_address || !notes
    ) return nextError(
      'MISSING_INFO',
      'not all data is included',
      400
    );


    // Check if user is authorized then get user information
    const cookieStore = await cookies();
    const { value: authToken }: any = cookieStore.get('accessToken');
    if (!authToken) return NextResponse.json(
      { message: 'No token to signin' },
      { status: 401 }
    )

    const { email }: any = await verifyToken(authToken);
    if (!email) nextError(
      'UNAUTHORIZED_ERROR',
      'unable to get authentication info',
      401
    )

    const {
      id, first_name, last_name, phone_number, profile_img_url
    } = await prisma.user.findUnique({ where: { email } });


    const orderSummar = {
      user_id: id,
      timesStamps: {
        created_at: Date.now(),
        updated_at: Date.now(),
        completed_at: null,
        cancelled_at: null,
      },
      customer_snapshot: {
        avatar: profile_img_url,
        name: first_name + ' ' + last_name,
        email,
        phone: phone_number
      },
      items: {
        products,
        total_products: 1,
        total_units: 2,
        items_total: 233
      },
      shipping: {
        full_name: first_name + ' ' + last_name,
        phone: phone_number,
        city: shipping_city,
        address_details,
        second_address,
        notes
      },
      pricing: {
        sub_total: 0,
        tax: 0,
        shipping: 0,
        discount: 0,
        total: 0
      },
      payment: {
        method: "CASH",
        status: "NOT PAID",
        paid_at: null
      }
    }

    // return NextResponse.json(
      // { data: userData, message: 'user data is extracted successfuly'},
      // { status: 200 }
    // )
    // const orderData = await req.json();
    // const {
      // user_id, products, total_items, total, customer_pfp,
      // customer_full_name, email, customer_phone_number, 
      // shipping_address, shipping_cost, currency, payment_method
    // } = orderData;
    // console.log('order data: ', orderData);
    // if (!user_id || !products || !total_items || !total || !customer_pfp ||
      // !customer_full_name || !email || !customer_phone_number || 
      // !shipping_address || !shipping_cost
    // ) return nextError(
      // 'REQUEST_FAILED',
      // 'Error while getting order data',
      // 401
    // );
// 
    // const data = await prisma.userOrders.create({
      // data: {
        // user_id,
        // products,
        // total_items,
        // total,
        // customer_pfp,
        // customer_full_name,
        // customer_phone_number,
        // email,
        // shipping_address,
        // shipping_cost,
        // currency,
        // payment_method
      // }
    // })
// 
    // const message = {
      // en: "New order has been created successfully!",
      // ar: "تم انشاء الطلب بنجاح!"
    // }
// 
    // return NextResponse.json({ data, message }, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error('Error While creating new order: ', error?.message);
    return nextError(
      'NEW_ORDER_FAIL',
      'failed to create new order',
      500
    )
  }
}
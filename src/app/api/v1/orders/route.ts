import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/utils/jwt';

// JSON
import deliverTo from '@/json/deliverTo.json';'

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
// products = [ { id: productId1, quantity, color, size } ]
export async function POST(
  req: NextRequest
) {
  try {
    // Get request data
    const requestedData = await req.json();
    const {
      products: productsRequestedData, shipping_city, phone, address_details, second_address, notes 
    } = requestedData;
    if (
      !productsRequestedData || !shipping_city || !phone || !address_details || !second_address || !notes
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
    );

    const { email }: any = await verifyToken(authToken);
    if (!email) nextError(
      'UNAUTHORIZED_ERROR',
      'unable to get authentication info',
      401
    );

    const {
      id, first_name, last_name, phone_number, profile_img_url
    } = await prisma.user.findUnique({ where: { email } });

    // Get products data from product id
    const productIds = productsRequestedData.map((product: Record<string, any>) => product.id);
    const productsData = await prisma.products.findMany({ where: {id: { in: productIds } } })
    // return NextResponse.json({ data: { productsData, productIds, requestedData }, message: 'productsData results'})
    
    // Check if product size, quanitiy avalibility along with stock
    const findValue = (array: any[], row: string, value: string) => 
      array.find((itm: Record<string, any>) => itm[row] === value);
    const doesExist = (array: any[], value: string) => array.some(itm => itm === value);

    const isProductSizesVerified = productsData.every((product: Record<string, any>) => 
      doesExist(productsData, findValue(productsRequestedData, 'id', product.id).size)
    );
    const isProductColorsVerified = productsData.every((product: Record<string, any>) => 
      doesExist(productsData, findValue(productsRequestedData, 'id', product.id).color)
    );
    if (!isProductColorsVerified || !isProductSizesVerified) nextError(
      'PRODUCT_COLOR_SIZE_UNAVAILABLE',
      'product color or size found unavailbale',
      401
    )

    // calculate the cost
    const pricesArray = productsData.map(({ price }: any) => price);
    const discountsArray = productsData.map(({ discount_percent }: any) => discount_percent);
    const calculateTotalCost = pricesArray.reduce((accumulator: number, price: any, i: number) => 
      accumulator + (price - (price * (discountsArray[i] / 100)))
    , 0);

    // items details
    const totalProductsUnits = productsRequestedData.length;
    
    const productsQuantityArray = productsRequestedData.map(({ quantity }: Record<string, any>) => quantity);
    const totalProductsQuanitity = productsQuantityArray.reduce((accumulator: number, quantity: number) =>
      accumulator + quantity
    , 0);

    const shippingCost = deliverTo.find(({ shipping_address }) => shipping_address === shipping_city )?.shipping_cost;
    const products = productsRequestedData.map(({ id, quantity, color, size }: Record<string, any>) => {
      return {
        id,
        name:findValue(productsData, 'id', id,).name,
        quantity,
        color,
        size,
        image_url: findValue(productsData, 'id', id,).images[0].views.url,
        price: findValue(productsData, 'id', id,).price,
        discount_percent: findValue(productsData, 'id', id,).discount_percent,
        type: findValue(productsData, 'id', id,).type
      }
    });
    const orderSummary = {
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
        products: productsData,
        total_products: totalProductsQuanitity,
        total_units: totalProductsUnits,
        items_total: calculateTotalCost
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
        sub_total: calculateTotalCost,
        tax: 0,
        shipping: shippingCost,
        discount: 0,
        total: calculateTotalCost + shippingCost
      },
      payment: {
        method: "CASH",
        status: "NOT PAID",
        paid_at: null
      }
    }
    const data = await prisma.userData.create({ data: { orderSummary } });
    const message = {
      en: 'Order has been created successfuly!',
      ar: 'تم'
    }
    return NextResponse.json(
      { data, message },
      { status: 200 }
    );
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
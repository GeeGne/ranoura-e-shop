import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/utils/jwt';

// JSON
import deliverTo from '@/json/deliverTo.json';

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
  req: NextRequest
) {
  try {

    // check if user is admin or owner
    const cookiesStore = await cookies();
    const { value: authToken }: any = cookiesStore.get('accessToken');
    if (!authToken) return nextError(
      'TOKEN_DETAILS_NOT_FOUND',
      'No auth token details found',
      401
    );

    const { email }: any = await verifyToken(authToken);
    if (!email) return nextError(
      'TOKEN_DETAILS_NOT_FOUND',
      'No auth token details found',
      401
    );

    const { role } = await prisma.user.findUnique({
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

    const isAdminOrOwner = role.role.name === 'admin' || role.role.name === 'owner'
    if (!isAdminOrOwner) return nextError(
      'ACCESS_FORBIDDEN',
      'request is forbidden',
      403
    );

    // access data
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
// @body {
    // "products": [
        // {
            // "id": "3b3dccc8-75ac-4567-9a24-7d84dfae4970",
            // "quantity": 3,
            // "color": "Biege",
            // "size": "S"
        // },
        // {
            // "id": "e937bc08-fbee-44e9-8a0b-08c8b6ffcfd5",
            // "quantity": 1,
            // "color": "Black",
            // "size": "M"
        // },
        // {
            // "id": "0c354051-7d79-47f2-a18d-6c6b22cb6f77",
            // "quantity": 6,
            // "color": "Newspaper",
            // "size": "M"
        // }
    // ],
    // "shipping_city": "Damascus",
    // "address_details": "next near gas station",
    // "second_address": "upright left corner",
    // "notes": "second adderss betwen 05:00 PM and 9:00 PM",
    // "phone": "0952683942"
// }
// products = [ { id: productId1, quantity, color, size } ]
// @example {
//   "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
//   "user_id": "user-12345-67890-abcdef",  
//   "status": "PROCESSING",
//   "currency": "SYP",
//   "status_history": [
//     { 
//       "status": "PENDING", "timestamp": "2024-01-15T10:30:00.000Z" 
//     },{ 
//       "status": "PROCESSING", "timestamp": "2024-03-5T10:30:00.000Z" 
//     }
//   ],
//   "timestamps": {
//     "created_at": "2024-01-15T10:30:00.000Z",
//     "updated_at": "2024-01-15T11:45:00.000Z",
//     "completed_at": null,
//     "cancelled_at": null
//   },
//   "customer_snapshot": {
//     "avatar": "https://some-link.com",
//     "name": "geegne",
//     "email": "geegne@gmail.com",
//     "phone": "094293953"
//   },
//   "items": {
//     "products": [
//       {
//         "id": "prod-001",
//         "name": "Wireless Bluetooth Headphones",
//         "description": "Noise-cancelling over-ear headphones",
//         "price": 149.99,
//         "currency": "SYP",
//         "quantity": 1,
//         "color": "pink",
//         "size": "M",
//         "image_url": "/assets/img/cloth-a-orange.avif",
//         "sku": "AUDIO-HP-BLK-PROX"
//       },{
//         "productId": "prod-002",
//         "name": "Phone Case",
//         "description": "Protective silicone case",
//         "price": 25.50,
//         "currency": "SYP",
//         "quantity": 2,
//         "variant": {
//           "color": "Transparent",
//           "phoneModel": "iPhone 15"
//         },
//         "imageUrl": "/assets/img/cloth-b-blue.avif",
//         "sku": "ACC-CASE-TP-IP15"
//       }
//     ],
//     "total_products": 2,
//     "total_units": 2,
//     "items_total": 234
//   },
//   "pricing": {
//     "sub_total": 0,
//     "tax": 0,
//     "shipping": 0,
//     "discount": 0,
//     "total": 0
//   },
//   "discount": {
//     "applied": false,
//     "amount": 20.00,
//     "type": "PROMO_CODE",
//     "code": "SAVE50"
//   },
//   "shipping": {
//     "full_name": "محمد أحمد",
//     "phone": "+963123456789",
//     "city": "دمشق",
//     "address_details": "Street 322, near Gas station, building 32, floor 12",
//     "second_address": "Street 135, near Daily food restaurant, building 32, floor 4",
//     "notes": "يرجى الاتصال قبل التوصيل"
//   },
//   "payment": {
//     "method": "CASH",
//     "status": "NOT PAID",
//     "paid_at": null
//   }
// }
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
    if (!authToken) return nextError(
      'TOKEN_DETAILS_NOT_FOUND',
      'No auth token details found',
      401
    );

    const { email }: any = await verifyToken(authToken);
    if (!email) return nextError(
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

    const isProductSizesVerified = productsRequestedData.every((product: Record<string, any>) => 
      doesExist(findValue(productsData, 'id', product.id).sizes, product.size)
    );
    const isProductColorsVerified = productsRequestedData.every((product: Record<string, any>) => 
      doesExist(findValue(productsData, 'id', product.id).colors, product.color)
    );
    
    if (!isProductColorsVerified || !isProductSizesVerified) return nextError(
      'PRODUCT_COLOR_SIZE_UNAVAILABLE',
      'product color or size found unavailbale',
      401
    );

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

    // find shipping cost
    const shippingCost = deliverTo.find(({ shipping_address }) => shipping_address === shipping_city )?.shipping_cost;
    if (!shippingCost) return nextError(
      'SHIPPING_CITY_NOT_FOUND',
      'unable to find shipping city',
      404
    );
    const products = productsRequestedData.map(({ id, quantity, color, size }: Record<string, any>) => {
      return {
        id,
        name:findValue(productsData, 'id', id,).name,
        quantity,
        color,
        size,
        image_url: findValue(productsData, 'id', id,).images[0].views[0].url,
        price: findValue(productsData, 'id', id,).price,
        discount_percent: findValue(productsData, 'id', id,).discount_percent,
        type: findValue(productsData, 'id', id,).type
      }
    });
    const isoFromTimestamp = new Date(Date.now()).toISOString();
    const orderSummary = {
      user_id: id,
      status: "PENDING",
      status_history: [
        { status: "PENDING", timestamp: isoFromTimestamp}
      ],
      timestamps: {
        created_at: isoFromTimestamp,
        updated_at: isoFromTimestamp,
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

    // return NextResponse.json(
      // { data: orderSummary, message: 'order summary results: ' },
      // { status: 200 }
    // );
    const data = await prisma.userOrders.create({ data: { ...orderSummary } });
    if (!data) return nextError(
      'ORDER_CREATE_FAIL',
      'An error accured during creating new order',
      404
    );

    const message = {
      en: 'Order has been created successfuly!',
      ar: 'تم انشاء الطلب بنجاح!'
    }

    return NextResponse.json(
      { data, message },
      { status: 200 }
    );
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
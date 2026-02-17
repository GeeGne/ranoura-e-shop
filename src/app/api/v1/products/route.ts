import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/utils/jwt';
import bcrypt from 'bcrypt';
import { generateTokens } from '@/utils/jwt';

async function nextError (code: string, message: string, status = 404) {
  return NextResponse.json(
    {
      code,
      message,
      status,
      timesStamp: new Date().toISOString()
    },
    { status }
  )
};

// @dscc get all products
// @route /api/v1/products
// @access public
export async function GET (req: NextRequest) {
  try {
    const data = await prisma.products.findMany();
    if (!data) throw new Error('unable to retrieve the data.');

    const message = 'Success! Products has been fetched.';

    return NextResponse.json({
      data,
      message
    }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while getting all products: ', error.message);
    return nextError(
      'PRODUCTS_FETCH_FAIL',
      'unable to fetch products',
      404
    )
  }
}

// @desc Create new product
// @route /api/v1/products/
// @access private (admin, owner - only)
export async function POST (req: NextRequest) {
  try {
    const productData = await req.json();
    console.log('productData: ', productData);
    if (!productData) return nextError(
      'REQUEST_FAILED',
      'Error while getting product request',
      401
    );

    const {
      name, slug, description,
      price, discount_percent, type,
      categories, is_new, sizes, state,
      colors, images, stock, lists
    } = productData;

    // Check if user is authorzed then get user information
    const cookiesStore = await cookies();
    const { value: authToken }: any = cookiesStore.get('accessToken');
    if (!authToken) return nextError(
      'TOKEN_DETAILS_NOT_FOUND',
      'No auth Token details found',
      401
    );

    const { email }: any = await verifyToken(authToken);
    if (!email) return nextError(
      'UNAUTHORIZED_ERROR',
      'unable to get autenticaiton',
      401
    );

    const { role } = await prisma.user.findUnique({
      where: {email},
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
    })
    const userRole = role.role.name;
    if (userRole !== 'admin' && userRole !== 'owner') return nextError(
      'REQUEST_FORBIDDEN',
      'request is forbidden',
      403
    );
  
    // if (
    //   !name || !slug || !description ||
    //   !price || !type ||
    //   !categories || !sizes ||
    //   !colors || !images || !stock || !lists
    // ) return nextError(
    //   'MISSING_REQUIRED_FIELDS',
    //   'The request is missing required fields',
    //   400
    // );

    const data = await prisma.products.create({
      data: {
        name,
        slug,
        description,
        price,
        discount_percent,
        type,
        state,
        categories,
        is_new,
        sizes,
        colors,
        images,
        stock,
        lists
      }
    })

    const message = {
      en: "New product has been created successfully!",
      ar: "تم انشاء المتنج الجديد بنجاح!"
    };

    return NextResponse.json({ data, message }, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while creating the Product: ', error.message);
    return nextError(
      'NEW_PRODUCT_FAIL',
      'Failed to create new product',
      500
    )
  }
}
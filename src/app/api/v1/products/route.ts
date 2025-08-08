import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
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
      categories, is_new, sizes,
      colors, images, stock, lists
    } = productData;

    if (
      !name || !slug || !description ||
      !price || !type ||
      !categories || !sizes ||
      !colors || !images || !stock || !lists
    ) return nextError(
      'MISSING_REQUIRED_FIELDS',
      'The request is missing required fields',
      400
    );

    await prisma.products.create({
      data: {
        name,
        slug,
        description,
        price,
        discount_percent,
        type,
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
      en: "New product has been saved successfully!",
      ar: "تم حفظ المتنج الجديد بنجاح!"
    };

    return NextResponse.json({ message }, { status: 201 });
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
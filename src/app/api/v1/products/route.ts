import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { generateTokens } from '@/utils/jwt';

async function nextError (code: string, message: string, status = 404) {
  return NextResponse.json(
    {
      status,
      code,
      message,
      timesStamp: new Date().toISOString()
    }
  )
};

// @desc Create new product
// @route /api/v1/products/
// @access private (admin, owner - only)
export async function POST (req: NextRequest) {
  try {
    console.log('workign');
    const productData = await req.json();
    if (!productData) return nextError(
      'REQUEST_FAILED',
      'Error while getting product request',
      401
    );

    const {
      name, slug, description,
      price, discount_percent, type,
      categoires, is_new, sizes,
      colors, images, stock, lists
    } = productData;

    if (
      name || slug || description ||
      price || discount_percent || type ||
      categoires || is_new || sizes ||
      colors || images || stock || lists
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
        categoires,
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
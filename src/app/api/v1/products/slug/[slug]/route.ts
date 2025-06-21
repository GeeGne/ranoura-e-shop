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

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string}}
) {
  try {
    const productSlug = (await params).slug;

    const productData = await prisma.products.findunique({
      where: {
        slug: productSlug
      }
    })

    if (!productData) return nextError(
      'PRODUCT_FETCH_FAIL',
      'product doesn\'t exists or wronge slug',
      501
    )

    const message = 'Product is fetched successfully!';

    return NextResponse.json({
      data: {
        productData
      },
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string}}
) {
  try {
    const productSlug = (await params).slug;
    const data = await req.json();

    const productData = await prisma.products.update({
      where: {
        slug: productSlug
      },
      data
    })

    if (!productData) return nextError(
      'PRODUCT_UPDATE_FAIL',
      'product doesn\'t exists or wronge slug',
      501
    )

    const message = 'Product is updated successfully!';

    return NextResponse.json({
      data: {
        productData
      },
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
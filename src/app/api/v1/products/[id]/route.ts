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

// @desc get specefic product
// @route /api/v1/products/:id
// @access private(admin, owner)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string}}
) {
  try {
    const productId = (await params).id;

    const data = await prisma.products.findUnique({
      where: {
        id: productId
      }
    })

    if (!data) return nextError(
      'PRODUCT_FETCH_FAIL',
      'product doesn\'t exists or wronge id',
      501
    )

    const message = 'Product is fetched successfully!';

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

// @desc update specific product
// @route /api/v1/products/:id
// @access private(owner, admin)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string}}
) {
  try {
    const productId = (await params).id;
    const requestedData = await req.json();

    const data = await prisma.products.update({
      where: {
        id: productId
      },
      data: requestedData
    })

    if (!data) return nextError(
      'PRODUCT_UPDATE_FAIL',
      'product doesn\'t exists or wronge id',
      501
    )

    const message = {
      en: 'Product is updated successfully!',
      ar: 'تم تعديل المنتج بنجاح!'
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

export async function DELETE (
  { params }: { params: { id: string } }
) {
  try {

  } catch (err) {
    const error = err as Error;
    console.error('Error while deleting product: ', error.message);
    return nextError(
      'FAIL',
      'Error message',
      404
    )
  }
}
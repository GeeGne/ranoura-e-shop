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

// @desc update specific cetegory
// @route /api/v1/categoires/:slug
// @access private(owner, admin)
export async function PUT (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const updatedData = await req.json();
    const data = await prisma.categories.update({
      where: {
        slug
      },
      data: updatedData
    });

    const message = {
      en: 'Category has been updated successfully!',
      ar: 'تم تحديث القسم بنجاح!'
    }

    return NextResponse.json({
      data,
      message,
    }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while updating Category: ', error.message);
    return nextError(
      'CATEGORY_UPDATE_FAIL',
      'Error Updating the choosen Category',
      404
    )
  }
}

// @desc delete specific cetegory
// @route /api/v1/categories/:slug
// @access private(owner, admin)
export async function DELETE (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await prisma.categories.delete({
      where: {
        slug
      }
    });

    const message = {
      en: 'Category has been deleted successfully!',
      ar: 'تم حذف القسم بنجاح!'
    }

    return NextResponse.json({
      data,
      message,
    }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while deleting Category: ', error.message);
    return nextError(
      'CATEGORY_DELETE_FAIL',
      'Error Deleting the choosen Category',
      404
    )
  }
}
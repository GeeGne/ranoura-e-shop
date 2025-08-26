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

// @desc delete specific sub-cetegory
// @route /api/v1/products/:slug
// @access private(owner, admin)
export async function DELETE (
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params;
    console.log('slug: ', slug);
    const data = await prisma.subCategories.delete({
      where: {
        slug
      }
    });

    const message = {
      en: 'Sub-Category has been deleted successfully!',
      ar: 'تم حذف القسم الفرعي بنجاح!'
    }

    return NextResponse.json({
      data,
      message,
    }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while deleting Sub-Category: ', error.message);
    return nextError(
      'SUB_CATEGORY_DELETE_FAIL',
      'Error Deleting the choosen Sub-Category',
      404
    )
  }
}
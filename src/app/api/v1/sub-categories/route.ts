import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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

// @dscc get all Sub-Categories
// @route /api/v1/sub-categories
// @access public
export async function GET (req: NextRequest) {
  try {
    const data = await prisma.subCategories.findMany();
    if (!data) throw new Error('unable to retrieve the data.');

    const message = {
      en: 'Success! Sub-Categores has been fetched.',
      ar: 'تم الحصول على الاقسام الفرعيه بنجاح.'
    };

    return NextResponse.json({
      data,
      message
    }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while getting all sub-categories: ', error.message);
    return nextError(
      'SUBCATEGORIES_FETCH_FAIL',
      'unable to fetch sub-categories',
      404
    )
  }
}

// @desc Create Sub-Category
// @route /api/v1/sub-categories
// @access private (admin, owner - only)
export async function POST (req: NextRequest) {
  try {
    const subCategoriesData = await req.json();
    console.log('subCategoriesData: ', subCategoriesData);
    if (!subCategoriesData) return nextError(
      'REQUEST_FAILED',
      'Error while getting subCategories request',
      401
    );

    const {
      name, slug, type
    } = subCategoriesData;

    if (!name || !slug || type) nextError(
      'MISSING_FIELDS',
      'Please fill all the fields',
      404
    )

    const data = await prisma.subCategories.create({
      data: subCategoriesData
    })

    const message = {
      en: "New Sub-Category has been created successfully!",
      ar: "تم حفظ المتنج الجديد بنجاح!"
    };

    return NextResponse.json({ data, message }, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while creating the Sub-Category: ', error.message);
    return nextError(
      'NEW_PRODUCT_FAIL',
      'Failed to create new subCategory',
      500
    )
  }
}
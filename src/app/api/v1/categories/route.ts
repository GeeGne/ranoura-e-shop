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

// @dscc get all categories
// @route /api/v1/categories
// @access public
export async function GET (req: NextRequest) {
  try {
    const data = await prisma.categories.findMany();
    if (!data) throw new Error('unable to retrieve the data.');

    const message = {
      en: 'Success! Categories has been fetched.',
      ar: 'تم الحصول على الاقسام بنجاح.'
    };

    return NextResponse.json({
      data,
      message
    }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while getting all categories: ', error.message);
    return nextError(
      'CATEGORIES_FETCH_FAIL',
      'unable to fetch categories',
      404
    )
  }
}

// @desc Create Category
// @route /api/v1/categories
// @access private (admin, owner - only)
export async function POST (req: NextRequest) {
  try {
    const categoriesData = await req.json();
    if (!categoriesData) return nextError(
      'REQUEST_FAILED',
      'Error while getting Categories request',
      401
    );

    const {
      name, slug
    } = categoriesData;

    if (!name || !slug) nextError(
      'MISSING_FIELDS',
      'Please fill all the fields',
      404
    )

    const data = await prisma.categories.create({
      data: categoriesData
    })

    const message = {
      en: "New Category has been created successfully!",
      ar: "تم حفظ المتنج الجديد بنجاح!"
    };

    return NextResponse.json({ data, message }, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while creating the Category: ', error.message);
    return nextError(
      'NEW_CATEGORY_FAIL',
      'Failed to create new subCategory',
      500
    )
  }
}
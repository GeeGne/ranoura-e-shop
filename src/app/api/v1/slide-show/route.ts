import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/jwt';

async function nextError (code: string, message: string, status = 404) {
  return NextResponse.json(
    {
      status,
      code,
      message,
      timesStamp: new Date().toISOString()
    },
    { status }
  )
};

// @des get all slides
// @route /api/v1/slide-show
// @access public

export async function GET(
  req: NextRequest,
) {
  try {
    
    const data = await prisma.slideShow.findMany();
    if (!data) return nextError(
      'SLIDES_FETCH_FAIL',
      'unable to fetch slides',
      404
    );

    const message = "Slides are fetched succcessfully!";
    return NextResponse.json({ data, message}, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error("Error while getting slides: ", error.message)
    return err;
  }
};

// @desc Create a new slider
// @route /api/v1/slide-show
// @access private(owner, admin)

export async function POST(
  req: NextRequest,
) {
  try {
    const data = await prisma.slideShow.create();
    const message = "slider has been created successfully";

    return NextResponse.json({ data, message }, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error("Error while creating new slider: ", error.message);
    return nextError(
      'NEW_SLIDER_FAIL',
      'Failed to create new slider',
      500
    )
  }
};
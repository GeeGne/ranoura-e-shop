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

// @dscc heroVideo Details
// @route /api/v1/hero-video
// @access public
export async function GET (req: NextRequest) {
  try {
    const data = await prisma.heroVideo.findUnique({
      where: {
        id: 1
      }
    });
    if (!data) throw new Error('unable to retrieve the data.');

    const message = {
      en: 'Success! Hero Video Details has been fetched.',
      ar: 'تم استقبال بيانات الفيديو الرئيسي بنجاح!'
    };

    return NextResponse.json({
      data,
      message
    }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while getting all hero video details: ', error.message);
    return nextError(
      'VIDEO_HERO_FETCH_FAIL',
      'unable to fetch hero video details',
      404
    )
  }
}

// @desc Update Hero Video Details
// @route /api/v1/hero-video
// @access private (admin, owner - only)
export async function PUT (req: NextRequest) {
  try {
    const heroVideoData = await req.json();
    if (!heroVideoData) return nextError(
      'REQUEST_FAILED',
      'Error while getting product request',
      401
    );

    const data = await prisma.heroVideo.upsert({
      where: {
        id: 1
      },
      update: heroVideoData,
      create: heroVideoData
    })

    const message = {
      en: "Hero Video Details has been updated successfully!",
      ar: "تم تحديث بيانات الفيديو الرئيسي بنجاح!"
    };

    return NextResponse.json({ data, message }, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while updating hero video details: ', error.message);
    return nextError(
      'VIDEO_HERO_FETCH_FAIL',
      'Failed to update hero video details',
      500
    )
  }
}
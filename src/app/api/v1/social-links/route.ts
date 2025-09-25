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

// @dscc get all social links
// @route /api/v1/social-links
// @access public
export async function GET (req: NextRequest) {
  try {
    const data = await prisma.socialLinks.findMany();
    if (!data) throw new Error('unable to retrieve the data.');

    const message = 'Success! Social links has been fetched.';

    return NextResponse.json({
      data,
      message
    }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while getting all social links: ', error.message);
    return nextError(
      'SOCIAL_LINKS_FETCH_FAIL',
      'unable to fetch social links',
      404
    )
  }
}

// @desc Create new scoial link
// @route /api/v1/social-links
// @access private (admin, owner - only)
export async function POST (req: NextRequest) {
  try {
    const socialLinkData = await req.json();
    console.log('socialLinkData: ', socialLinkData);
    if (!socialLinkData) return nextError(
      'REQUEST_FAILED',
      'Error while getting social link request',
      401
    );

    const data = await prisma.socialLinks.create({
      data: socialLinkData
    })

    const message = {
      en: "New social link has been created successfully!",
      ar: "تم حفظ رابط التواصل الجديد بنجاح!"
    };

    return NextResponse.json({ data, message }, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while creating the social link: ', error.message);
    return nextError(
      'NEW_SOCIAL_LINK_FAIL',
      'Failed to create new social link',
      500
    )
  }
}
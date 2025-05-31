import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { generateTokens } from '@/utils/jwt';

const createSlug = (first_name: string, last_name: string) => 
  `${first_name} ${last_name}`
  .toLowerCase()
  .trim()
  .replace(/[^/w/s-]/g, '')
  .replace(/[/s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');

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
}

// @desc send JWT token if creds are viable
// @route /api/v1/auth/signin
// @access private
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) 
      return nextError(
        'MISSING_CREDENTIALS',
        'Email and password are required',
        400
      )

    const { id, first_name, last_name, password_hash } = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        password_hash: true
      }
    });
    if (!password_hash || !first_name || !last_name) 
      return nextError(
        'INVALID_CREDENTIALS',
        'Invalid email or password, please enter the correct values.',
        401
      );

    const isPassCorrect = await bcrypt.compare(password, password_hash);
    if (!isPassCorrect) 
      return nextError(
        'INVALID_CREDENTIALS',
        'Invalid email or password, please enter the correct values.',
        401
      );
    
    const fullNameSlug = createSlug(first_name, last_name);
    const { accessToken, refreshToken } = generateTokens(fullNameSlug, email);
    const cookieStore = await cookies();
    
    cookieStore.set(
      'accessToken', 
      accessToken, 
      {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 15 * 60 * 1000
      }
    );

    cookieStore.set(
      'refreshToken', 
      refreshToken, 
      {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 15 * 60 * 1000
      }
    );
    return NextResponse.json({
        data: {
          first_name,
          last_name,
          email,
        },
        message: {
          en: 'authentication success!',
          ar: 'تم بنجاح'
        }
      }, { status: 200 }
    )
  } catch (error) {
    const err = error as Error;
    console.error('Unable to get User data: ', err.message);
    return nextError(
      'AUTH_FAIL',
      'Authentication failed',
      500
    )
  }
}

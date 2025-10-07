import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { generateTokens } from '@/utils/jwt';

const createSlug = (first_name: string, last_name: string) => 
  `${first_name} ${last_name}`
  .toLowerCase()
  .trim()
  .replace(/[^\p{L}\s-]/gu, '')
  .replace(/[\s_-]+/g, '-') 
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

    const data = await prisma.user.findUnique({
      where: { email },
      select: {
        first_name: true,
        last_name: true,
        phone_number: true,
        password_hash: true,
        role: {
          select: {
            role: {
              select: {
                name: true,
                description: true,
              }
            }
          }
        },
        address: {
          select: {
            address_details: true,
            second_address: true,
            notes: true,
          }
        }
      }
    });

    const { password_hash, first_name, last_name, role: userRole } = data;
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

    console.log({ first_name, last_name })
    const fullNameSlug = createSlug(first_name, last_name);
    console.log('fullNameSlug: ', fullNameSlug);
    const { accessToken, refreshToken } = await generateTokens(fullNameSlug, email, userRole.name);
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
        data,
        message: {
          en: 'authentication success!',
          ar: 'تم تسجيل الدخول بنجاح!'
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

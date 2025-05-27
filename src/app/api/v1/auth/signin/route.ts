import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { generateTokens } from '@/utils/jwt';

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
    let response = NextResponse;
    // Set a cookie to hide the banner
    response.cookies.set('show-banner', 'false')
// Response will have a `Set-Cookie:show-banner=false;path=/home` header
return response
    const { email, password } = await req.json();
    if (!email || !password) 
      return nextError(
        'MISSING_CREDENTIALS',
        'Email and password are required',
        400
      )

    const { password_hash, first_name, last_name } = await prisma.user.findUnique({
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
    
    // const { accessToken, refreshToken } = generateTokens(email);
    // return NextResponse.next().cookies.set('cookieName', 'cookieValue');
    // return NextResponse.next().cookies.set(
    //   'accessToken', 
    //   accessToken, 
    //   {
    //     httpOnly: true,
    //     // secure: process.env.NODE_ENV === 'production',
    //     secure: true,
    //     sameSite: 'strict',
    //     maxAge: 15 * 60 * 1000
    //   }
    // );
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

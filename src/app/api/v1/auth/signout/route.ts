import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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

// @desc remove JWT authentication token 
// @route /api/v1/auth/signout
// @access private
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    
    cookieStore.set(
      'accessToken', 
      '', 
      {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 0
      }
    );

    cookieStore.set(
      'refreshToken', 
      '', 
      {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 0
      }
    );
    return NextResponse.json({
        message: {
          en: 'Logged out',
          ar: 'تم تسجيل الخروج'
        }
      }, { status: 200 }
    )
  } catch (error) {
    const err = error as Error;
    console.error('Unable to signout: ', err.message);
    return nextError(
      'SIGNOUT_FAIL',
      'An Unknown Error accured while signingout',
      500
    )
  }
}

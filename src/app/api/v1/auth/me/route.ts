import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { verifyToken } from '@/utils/jwt';


// Types
type CookieProps = {
  name: string;
  value: string;
  path: string;
}

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

// @desc auto-authenticate if jwt token exists
// @route /api/v1/auth/me
// @access private
export async function GET(req: NextResponse) {
  try {
    const cookieStore = await cookies();
    const { value: authToken }: any = cookieStore.get('accessToken');
    if (!authToken) 
      return NextResponse.json(
        { message: 'No token to signin'},
        { status: 401 }
      )

    const { email }: any = await verifyToken(authToken);
    if (!email) throw null;
    
    const updateUserLastLogin = await prisma.user.update({
      where: { email },
      data: { last_login_at: new Date() }
    });

    const data = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        first_name: true,
        last_name: true,
        slug: true,
        phone_number: true,
        role: {
          select: {
            role: {
              select: {
                name: true,
                description: true
              }
            }
          }
        },
        profile_img_url: true,
        address: {
          select: {
            city: true,
            address_details: true,
            second_address: true,
            notes: true
          }
        }
      }
    });

    return NextResponse.json({
      data,
      message: {
        en: 'authentication success!',
        ar: 'تم بنجاح'
      }
    }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('Error accured during authintication proccess', error.message);
    return nextError(
      'AUTH_FAILED',
      'Error during signing up',
      401
    )
  }
}

// @desc update user personal data
// @route /api/v1/auth/me
// @access private
export async function PUT(req: NextResponse) {
  try {
    const cookieStore = await cookies();
    const { value: authToken }: any = cookieStore.get('accessToken');
    if (!authToken) 
      return NextResponse.json(
        { message: 'No token to signin'},
        { status: 401 }
      )

    const { email }: any = await verifyToken(authToken);
    if (!email) throw null;
    
    const data = await req.json();
    
    const userData = await prisma.user.update({
      where: {
        email
      },
      data,
      select: {
        first_name: true,
        last_name: true,
        slug: true,
        phone_number: true,
        role: {
          select: {
            role: {
              select: {
                name: true,
                description: true
              }
            }
          }
        },
        profile_img_url: true,
        address: {
          select: {
            address_details: true,
            second_address: true,
            notes: true
          }
        }
      }
    });

    return NextResponse.json({
      data: userData,
      message: {
        en: 'User Data has been updated successfuly!',
        ar: 'تم تعديل معلومات المستخدم بنجاح!'
      }
    }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('Error accured during updating user data: ', error.message);
    return nextError(
      'AUTH_FAILED',
      'Error during updating user data',
      401
    )
  }
}
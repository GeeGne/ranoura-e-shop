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
    
    
    const { first_name, last_name, role, address } = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        first_name: true,
        last_name: true,
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
        address: {
          select: {
            address_details: true,
            second_address: true,
            notes: true
          }
        }
      }
    });
    const { role: userRole } = role;
    return NextResponse.json({
      data: {
        first_name,
        last_name,
        email,
        address,
        userRole,
      },
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
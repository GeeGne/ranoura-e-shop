export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { generateTokens } from '@/utils/jwt';
import { v4 as uuidv4 } from 'uuid';
import { verifyToken } from '@/utils/jwt';

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
};

// @desc update user role
// @route /api/v1/users/:id/role
// @access privat (owner)
// @body (string): 'admin', 'customer', 'owner', 'support'
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // check if user is admin or owner
    const cookieStore = await cookies();
    const { value: authToken }: any = cookieStore.get('accessToken');
    if (!authToken)
      return nextError(
        'AUTH_TOKEN_NOTFOUND',
        'No token to signin',
        403
      )

    const { email }: any = await verifyToken(authToken);
    if (!email) nextError(
      'FORBIDDEN_ACTION',
      'auth token info isn\'t correct',
      403
    );

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        role: {
          select: {
            role: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
    const isUserOwner = user.role.role.name === 'owner'                                                         
    if (!isUserOwner) nextError(
      'ACTION_FORBIDDEN',
      'User doesn\'t have permission to this kind of request',
      403
    )

    // update role
    const roleName = await req.json();
    const role = await prisma.role.findUnique({
      where: { name: roleName }
    });
    
    if (!role) nextError(
      'GET_ROLE_BY_ID_FAILED',
      'couldn\'t get role id: given role might not exist',
      404
    )

    const { id: user_id } = await params;
    const roleData = await prisma.userRole.upsert({
      where: {
        user_id,
      },
      update: {
        role_id: role.id        
      },
      create: {
        user_id,
        role_id: role.id        
      }
    });

    const message = {
      en: "User role is being updated successfully!",
      ar: "تم تحديث بيانات منصب المستخدم بنجاح!"
    }

    return NextResponse.json({ data: roleData, message }, { status: 201 })
  } catch (error) {
    const err = error as Error;
    console.error('Unable to create new account: ', err.message);
    return nextError(
      'USER_CREATE_FAILED',
      'Unable to create new account',
      404
    )
  }
}

// DEBUG
// console.log({first_name, last_name, email, phone_number, password, password_hash})

import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { verifyToken } from '@/utils/jwt';

const validRoles = ['customer', 'support', 'admin', 'owner'];
const isRoleAvailable = (roleParam: string) => validRoles.includes(roleParam);

async function nextError(code: string, message: string, status = 404) {
  return NextResponse.json({
    code,
    message,
    status,
    timesStamp: new Date().toISOString()
  },  { status })
};

// @desc Check user role and if match => return true, else return false.
// @route /api/v1/auth/role/:role
// access private (host-server to host-server req)
export async function GET (
  req: NextRequest,
  { params }: { params: { role: string } }
) {
  try {
    const requestedRole = (await params).role.toLowerCase();
    if (!isRoleAvailable(requestedRole)) 
    return nextError(
      'ROLE_TYPE_NOT_AVAILABLE',
      'The requested Rols is Unknown',
      500
    );

    const cookieStore = await cookies();
    const { value: authToken }: any = cookieStore.get('accessToken');
    if (!authToken) return nextError(
      'AUTH_TOKEN_MISSING',
      'Auth token is required',
      500
    );

    const { email }: any = await verifyToken(authToken);
    if (!email) throw new Error ('Token is Unverified');

    const { role } = await prisma.user.findUnique({
      where: { 
        email 
      },
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
    });
    if (!role) throw new Error ('Error While getting the User Role');
    const actualRole = role.role.name;

    const isRoleMatched = actualRole === requestedRole;

    
    const response = NextResponse.json(
      { 
        data: { 
          requestedRole,
          actualRole,
          isRoleMatched,
        },
        message: isRoleMatched ? 'Role is matched' : 'Role isn\'t matched'
      },
      { status: 200 }
    )

    return response;
  } catch (err) {
    const error = err as Error;
    console.error('Error while checking User Role: ', error.message);
    return nextError(
      'ROLE_CHECK_FAIL',
      'Error while checking User Role',
      500
    );
  }
}
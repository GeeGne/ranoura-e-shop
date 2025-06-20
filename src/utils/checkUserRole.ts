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
export default async function checkUserRole (requestedRole: string) {
  try {
    console.log('working!');
    if (!isRoleAvailable(requestedRole)) 
      throw new Error ('The requested Rols is Unknown');

    const cookieStore = await cookies();
    const { value: authToken }: any = cookieStore.get('accessToken');
    if (!authToken) throw new Error(
      'Auth token is required',
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

    
    const response = {
      data: { 
        requestedRole,
        actualRole,
        isRoleMatched,
      },
      message: isRoleMatched ? 'Role is matched' : 'Role isn\'t matched'
    }
    return response;
  } catch (err) {
    const error = err as Error;
    console.error('Error while checking User Role: ', error.message);
    return error.message;
  }
}
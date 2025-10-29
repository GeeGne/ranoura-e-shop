import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


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

// @desc get all user roles
// @route /api/v1/roles/
// @access private(admin, owner)
export async function GET(
  req: NextRequest,
) {
  try {

    const data = await prisma.role.findMany();

    if (!data) return nextError(
      'ROLE_FETCH_FAIL',
      'roles doesn\'t exists or something went wronge',
      501
    )

    const message = 'Roles is fetched successfully!';

    return NextResponse.json({
      data,
      message
    }, { status: 200 })
  } catch (err) {
    const error = err as Error;
    console.error('error: ', error.message);
    return nextError(
      'FETCH_ROLE_FAILE',
      'error while fetching user roles',
      404
    )
  }
}

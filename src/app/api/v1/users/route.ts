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

export async function GET(req: NextRequest) {
  try {
    const [ users ] = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 })
  } catch (err) {
    const error = err as Error;
    console.error('Unable to get User Data: ' + error.message);
    return nextError(
      'USER_FETCH_FAIL', 
      'Unable to get User Data',
      404
    );
  }
}

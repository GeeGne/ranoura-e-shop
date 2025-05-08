import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function nextError (message: string, status = 404) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(req: NextRequest) {
  try {
    const [ users ] = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 })
  } catch (err) {
    const error = err as Error;
    return nextError('Unable to get User Data: ' + error.message, 404);
  }
}

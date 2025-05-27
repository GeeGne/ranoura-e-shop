import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

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

// @desc create new user
// @route /api/v1/users
// @access private
export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, phone_number, password } = await req.json();
    if (!first_name || !last_name || !email || !phone_number || !password) throw new Error('User inputs are not valid.')

    const saltRounds = 12;
    const password_hash = await bcrypt.hash(password, saltRounds);

    await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        password_hash
      }
    })

    const message = {
      en: "New user is created successfully!",
      ar: "تم انشاء حساب مستجدم جديد بنجاح!"
    }

    return NextResponse.json({ message }, { status: 201 })
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
// app/api/v1/users/route.ts
export const runtime = 'nodejs' // Force Node.js runtime
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { generateTokens } from '@/utils/jwt';
import { v4 as uuidv4 } from 'uuid';

const createSlug = (first_name: string, last_name: string) => 
  `${first_name} ${last_name}`
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-') 
  .replace(/^-+|-+$/g, '');

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
    if (!first_name || !last_name || !email || !phone_number || !password) 
      return nextError(
        'MISSING_REQUIRED_FIELDS',
        'The request is missing required fileds',
        400
      );

    const saltRounds = 12;
    const password_hash = await bcrypt.hash(password, saltRounds);
    await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        password_hash,
        address: {
          create: {
            address_details: "test",
            second_address: "second",
            notes: "notes",
          }
        },
        role: {
          create: {
            role_id: 2 
          }
        },
      },
      include: {
        address: true,
        role: true
      }
    });

    const fullNameSlug = createSlug(first_name, last_name);

    const { accessToken, refreshToken } = await generateTokens(fullNameSlug, email);
    const cookieStore = await cookies();
    
    cookieStore.set(
      'accessToken', 
      accessToken, 
      {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 15 * 60 * 1000
      }
    );

    cookieStore.set(
      'refreshToken', 
      refreshToken, 
      {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 15 * 60 * 1000
      }
    );

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

// DEBUG
// console.log({first_name, last_name, email, phone_number, password, password_hash})



// export async function POST(req: NextRequest) {
  // try {
    // const { first_name, last_name, email, phone_number, password } = await req.json();
    // 
    // if (!first_name || !last_name || !email || !phone_number || !password) {
      // return nextError('MISSING_REQUIRED_FIELDS', 'The request is missing required fields', 400);
    // }
// 
    // const saltRounds = 12;
    // const password_hash = await bcrypt.hash(password, saltRounds);
    // 
    // Create user with explicit UUID
    // const newUser = await prisma.user.create({
      // data: {
        // id: uuidv4(), // Explicit UUID
        // first_name,
        // last_name,
        // email,
        // phone_number,
        // password_hash,
        // Temporarily remove nested creates to isolate the issue
      // }
    // });
// 
    // Then create address separately
    // await prisma.userAddress.create({
      // data: {
        // user_id: newUser.id,
        // address_details: "test",
        // second_address: "second",
        // notes: "notes",
      // }
    // });
// 
    // Then create role separately
    // await prisma.userRole.create({
      // data: {
        // user_id: newUser.id,
        // role_id: 2
      // }
    // });
// 
    // Rest of your code...
  // } catch (error) {
    // console.error('Full error details:', error);
    // return nextError(
      // 'USER_CREATE_FAILED',
      // 'Unable to create new account',
      // 400
    // );
  // }
// }
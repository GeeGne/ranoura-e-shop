export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { generateTokens } from '@/utils/jwt';
import { v4 as uuidv4 } from 'uuid';

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

// @desc update user details
// @route /api/v1/users/:id
// @access public
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    const userData = await prisma.user.update({
      where: {
        id
      },
      data
    });

    const message = {
      en: "User information is being updated successfully!",
      ar: "تم تحديث بيانات المستخدم بنجاح!"
    }

    return NextResponse.json({ data: userData, message }, { status: 201 })
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
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

  // @desc get themes variables data
  // @route /api/v1/themes
  // @access public
export async function GET(req: NextRequest) {
  try {
    const themes = await prisma.themes.findMany();
    return NextResponse.json({themes}, {status: 200});  
  } catch (err) {
    return NextResponse.json(
      { error: 'Unable to get Themes Data: ' + err },
      { status: 404 }
    )
  }
}

  // @desc update themes variables
  // @route /api/v1/themes
  // @access private
export async function POST(req: NextRequest) {
  try {
    const themesData = req.body;
    await prisma.task.task.create(themesData);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({error : 'Unable to update Themes: ' + error}, { status: 404 })
  }
}
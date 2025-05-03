import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function nextError (message: string, status = 404) {
  NextResponse.json({ error: message }, { status })
}

  // @desc get themes variables data
  // @route /api/v1/themes
  // @access public
export async function GET(req: NextRequest) {
  try {
    const [themes] = await prisma.themes.findMany();
    return NextResponse.json(themes, {status: 200});  
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
export async function PUT(req: NextRequest) {
  try {
    const themesData = await req.json();

    // await prisma.themes.update({ 
      // where: { id: 1 }, 
      // data: {
        // primary_color: "green", 
    // }
    // });
    await prisma.themes.update({ 
      where: { id: 1 }, 
      data: themesData 
    });

    return NextResponse.json({ message: "Themes are updated successfuly!" }, { status: 202 })
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({error : 'Unable to update Themes: ' + err.message}, { status: 404 })
  }
}

export async function POST(req: NextResponse) {
  return nextError(`post isn't supported`, 404);
}

export async function DELETE(req: NextResponse) {
  return nextError(`delet e isn't supported`, 404);
}

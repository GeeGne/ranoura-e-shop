import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function nextError (message: string, status = 404) {
  return NextResponse.json({ error: message }, { status })
}

  // @desc get theme variables data
  // @route /api/v1/themes
  // @access public
export async function GET(req: NextRequest) {
  try {
    const [themes] = await prisma.themes.findMany();
    return NextResponse.json(themes, {status: 200});  
  } catch (err) {
    const error = err as Error;
    return nextError(
      'Unable to get Themes Data: ' + error.message,
      404
    )
  }
}

  // @desc update theme variables
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
    return nextError('Unable to update Themes: ' + err.message, 404)
  }
}

export async function POST(req: NextRequest) {
  return nextError(`post isn't supported`, 404);
}

export async function DELETE(req: NextRequest) {
  return nextError(`delet e isn't supported`, 404);
}

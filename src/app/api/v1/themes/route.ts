import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type ErrorProps = {
  message: {en: string, ar: string};
}

async function nextError (message: ErrorProps, status = 404) {
  return NextResponse.json({ error: message }, { status })
}

  // @desc get theme variables data
  // @route /api/v1/themes
  // @access public
export async function GET(req: NextRequest) {
  try {
    const [themes] = await prisma.themes.findMany();
    return NextResponse.json(themes, { status: 200 });  
  } catch (error) {
    const err = error as Error;
    console.error('Unable to update the Website UI Theme: ', err.message);
    return nextError(
      { message: 
        {
          en: 'Unable to update the Website UI Theme',
          ar: 'غير قابل على تحديث السيمه '
        }
      }
      ,
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

    return NextResponse.json(
      { 
        message: { 
          en: "Website UI Theme is updated.", 
          ar: "تم تحديث سيمه الصفحه."
        } 
      }, { status: 202 })
  } catch (error) {
    const err = error as Error;
    console.error('Unable to update the Website UI Theme: ', err.message);
    return nextError(
      { message: 
        {
          en: 'Unable to update the Website UI Theme: ' + err.message,
          ar: 'غير قابل على تحديث السيمه ' + err.message
        }
      }
      , 404
    )
  }
}

export async function POST(req: NextRequest) {
  return nextError(`post isn't supported`, 404);
}

export async function DELETE(req: NextRequest) {
  return nextError(`delet e isn't supported`, 404);
}

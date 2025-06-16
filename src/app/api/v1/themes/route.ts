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

// @desc get theme variables data
// @route /api/v1/themes
// @access public
export async function GET(req: NextRequest) {
  try {
    const [themes] = await prisma.themes.findMany();
    const data = { 
      data: themes , 
      message: { 
        en: 'Theme data has fetched successfully!',
        ar: 'تم استقبال بياتات السيمه بنجاح!'
      } 
    }
    return NextResponse.json(data, { status: 200 });  
  } catch (error) {
    const err = error as Error;
    console.error('Unable to update the Website UI Theme: ', err.message);
    return nextError(
      'THEME_FETCH_FAIL',
      'Unable to get Theme Data',
      404
    )
  }
}

// @desc update theme variables
// @route /api/v1/themes
// @access private
export async function PUT(req: NextRequest) {
  try {
    const themesData = await req.formData();

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
      }, { status: 202 }
    )
  } catch (error) {
    const err = error as Error;
    console.error('Unable to update the Website UI Theme: ', err.message);
    return nextError(
      'THEME_UPDATE_FAIL',
      'Unable to update the Website UI Theme.',
      404
    )
  }
}

export async function POST(req: NextRequest) {
  return nextError(
    'METHOD_NOT_ALLOWED',
    'The requested HTTP Method is not allowed on this endpoint',
    404
  )

}

export async function DELETE(req: NextRequest) {
  return nextError(
    'METHOD_NOT_ALLOWED',
    'The requested HTTP Method is now allowed on this endpoint',
    404
  )
}

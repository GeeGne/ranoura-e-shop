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

// @desc get General Settings data
// @route /api/v1/general-settings
// @access private (ownder, admin)
export async function GET(req: NextRequest) {
  try {
    const [ generalSettings ] = await prisma.generalSettings.findMany();
    const data = { 
      data: generalSettings, 
      message: { 
        en: 'Theme data has fetched successfully!',
        ar: 'تم استقبال بياتات السيمه بنجاح!'
      } 
    }
    return NextResponse.json(data, { status: 200 });  
  } catch (error) {
    const err = error as Error;
    console.error('Unable to get General Settings Data: ', err.message);
    return nextError(
      'GENERAL_SETTINGS_FETCH_FAIL',
      'Unable to get General Settings Data',
      404
    )
  }
}

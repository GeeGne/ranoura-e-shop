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

// @desc update General Settings Rows
// @route /api/v1/general-settings/:id
// @access private
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const generalSettingsId = (await params).id;
    console.log('generalSettingsId: ', generalSettingsId);
    const generalSettings = await req.json();

    await prisma.generalSettings.update({ 
      where: { 
        id: Number(generalSettingsId) 
      },
      data: generalSettings 
    });

    return NextResponse.json(
      { 
        message: { 
          en: "General Settings Table is updated.", 
          ar: "تم تحديث بيانات الاعدادات العامه."
        } 
      }, { status: 202 }
    );
  } catch (error) {
    const err = error as Error;
    console.error('Unable to update the Website UI Theme: ', err.message);
    return nextError(
      'GENERAL_SETTINGS_UPDATE_FAIL',
      'Unable to update General Settings Data.',
      404
    )
  }
}

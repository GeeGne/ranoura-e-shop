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

export async function DELETE (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params;
    const data = await prisma.socialLinks.delete({
      where: {
        id: Number(id)
      }
    })

    const message = {
      en: 'Social link is deleted successfully!',
      ar: 'تم تعديل الرابط بنجاح!'
    };

    return NextResponse.json({
      data,
      message
    }, { status: 200 });

  } catch (err) {
    const error = err as Error;
    console.error('Error while deleting social link: ', error.message);
    return nextError(
      'SOCIAL_LINKS_DELETE_FAIL',
      'Error Deleting the choosen Social Link',
      404
    )
  }
};
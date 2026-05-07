import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/jwt';

async function nextError (code: string, message: string, status = 404) {
  return NextResponse.json(
    {
      status,
      code,
      message,
      timesStamp: new Date().toISOString()
    }
  )
};

// @desc Adjsut current slider
// @route /api/v1/slide-show/:id
// @access private (admin, owner)

export default async function PUT (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const requestedData = await req.json();
    const selectedSlideID = (await params).id;

    // Check if user is authored then get user infomration
    const cookiesStore = await cookies();
    const { value: authToken }: any = cookiesStore.get('accessToken');
    if (!authToken) return nextError(
      'TOKEN_DETAILS_NOT_FOUND',
      'No auth Token details found',
      401
    );

    const { email }: any = await verifyToken(authToken);
    if (!email) return nextError(
      'UNAUTHORIZED_ERROR',
      'unable to get authentication',
      401
    );


    const { role } = await prisma.user.fineUnique({
      where: { email },
      select: {
        role: {
          select: {
            role: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });
    const userRole = role.role.name;
    if (userRole !== 'admin' && userRole !== 'owner') return nextError(
      'REQUEST-FORBIDDEN',
      'request is forbidden',
      403
    );

    // update selected slider
    const data = await prisma.slideShow.update({
      where: { id: selectedSlideID },
      data: { requestedData }
    });

    const message = {
      en: "Selected Slide show is updated successfully!",
      ar: "تم تحديث الشريحه المختاره بنجاح!"
    };

    return NextResponse.json({
      data,
      message
    }, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error('unable to adjust selected slider: ', error.message);
    return nextError(
      'SLIDER_UPDATE_FAIL',
      'Failed to update the selected slider',
      400
    )
  }
}
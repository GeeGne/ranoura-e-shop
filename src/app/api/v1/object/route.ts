import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { supabase } from '@/lib/supabaseClient';

async function nextError (code: string, message: string, status = 404) {
  return NextResponse.json(
    {
      status,
      code,
      message,
      timesStamp: new Date().toISOString()
    },
    { status}
  )
}

// @desc delete object files
// @route /api/v1/object
// @access private (admin, owner)
type Props = {
  bucketName: string;
  filePath: any[];
}
export async function DELETE (
  req: NextRequest,
) {
  try {
    let { bucketName, filePath }: Props = await req.json();
    if (!bucketName || !filePath) return nextError(
      'MISSING_DETAILS',
      'Bucket name and File path are required.',
      400
    )

    console.log('bucketName: ', bucketName);
    console.log('filePath: ', filePath);
    const splitArray = filePath.map(filePath => filePath.split(`/${bucketName}/`)[1]);
    console.log('path: ', splitArray);
    const { data, error: bucketError } = await supabase.storage
      .from(bucketName)
      .remove(splitArray);
    if (bucketError) return nextError(
      'STORAGE_DELETE_FAIL',
      `Error while deleting choosen file at storage`,
      404
    )
    
    return NextResponse.json({ 
      message: { en: 'Deleting file process is successful!', ar: 'تم حذف الملف بنجاح!'}, 
      data
    }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('Error while getting object files: ', error.message);
    return nextError(
      'FILE_UPLOAD_FAIL',
      'Error while getting object files',
      404
    )
  }
}
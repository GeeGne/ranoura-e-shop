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


// @desc recieve object files
// @route /api/v1/object/:bucket-name/:file-path
// @access public
export async function GET (req: NextRequest) {
  try {

  } catch (err) {
    const error = err as Error;
    console.error('Error while recieving object files: ', error.message);
    return nextError(
      'FILE_RECEIVE_FAIL',
      'Error while getting object files',
      404
    )
  }
}

// @desc upload object files
// @route /api/v1/object/:bucket-name/:file-path
// @access private (admin, owner)
export async function POST (
  req: NextRequest,
  { params }: { params: { bucketName: string, filePath: any } }
) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) return nextError(
      'FILE_NOT_INCLUDED',
      'Error while getting pfp url',
      501
    );

    // const bucketName = (await params).bucketName;
    const bucketName = (await params).bucketName;
    const filePath = (await params).filePath.join('/');

    console.log('bucketName: ', bucketName);
    console.log('filePath: ', filePath);
    console.log('file: ', file);
    const { data, error: bucketError } = await supabase.storage
      .from(bucketName)
      .upload('/' + filePath, file);
    if (bucketError) return nextError(
      'STORAGE_UPLOAD_FAIL',
      `Error while uploading to storge`,
      404
    )
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    if (!publicUrl) return nextError(
      'sdfa',
      'Error while getting pfp url',
      404
    );
    console.log('publicUrl: ', publicUrl);
    return NextResponse.json({ message: 'ok', data }, { status: 200 })
    return publicUrl;

  } catch (err) {
    const error = err as Error;
    console.error('Error while getting object files: ', error.message);
    return nextError(
      'FILE_RECEIVE_FAIL',
      'Error while getting object files',
      404
    )
  }
}
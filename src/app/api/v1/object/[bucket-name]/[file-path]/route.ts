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
// @route /api/v1/:bucket-name/:file-path
// @access public
async function GET (req: NextRequest) {
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
async function POST (
  req: NextRequest,
  { params }: { params: { bucketName: string, filePath: string } }
) {
  try {
    const { file } = await req.json();
    const { bucketName, filePath } = (await params);
    const { data, error: bucketError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);
    if (bucketError) throw new Error (`Error while uploading pfp img: ${bucketError.message}`)
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    if (!publicUrl) throw new Error ('Error while getting pfp url');

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
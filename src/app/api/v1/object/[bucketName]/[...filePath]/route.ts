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
export async function GET (
  req: NextRequest,
  { params }: { params: { bucketName: string, filePath: any } }
) {
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

    const bucketName = (await params).bucketName;
    const filePath = (await params).filePath.join('/');
    if (!bucketName || !filePath) return nextError(
      'MISSING_DETAILS',
      'Bucket name and File path are required.',
      400
    )

    console.log('bucketName: ', bucketName);
    console.log('filePath: ', filePath);
    console.log('file: ', file);
    const { data, error: bucketError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);
    if (bucketError) return nextError(
      'STORAGE_UPLOAD_FAIL',
      `Error while uploading to storge`,
      404
    )
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    if (!publicUrl) return nextError(
      'OBJECT_URL_FETCH_FAIL',
      'Error while getting object file url',
      404
    );

    console.log('publicUrl: ', publicUrl);
    return NextResponse.json({ 
      message: { en: 'Uploading file process is successful!', ar: 'تم تنصيب الملف بنجاح!'}, 
      data: { ...data, publicUrl } 
    }, { status: 200 });
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

// @desc delete object files
// @route /api/v1/object/:bucket-name/:file-path
// @access private (admin, owner)
export async function DELETE (
  req: NextRequest,
  { params }: { params: { bucketName: string, filePath: any } }
) {
  try {
    const bucketName = (await params).bucketName;
    const filePath = (await params).filePath.join('/');
    if (!bucketName || !filePath) return nextError(
      'MISSING_DETAILS',
      'Bucket name and File path are required.',
      400
    )

    console.log('bucketName: ', bucketName);
    console.log('filePath: ', filePath);
    const path = filePath.split(`/${bucketName}/`)[1];
    console.log('path: ', path);
    const { data, error: bucketError } = await supabase.storage
      .from(bucketName)
      .remove([path]);
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

// Upload Paths:
// #Products: /assets/images/products/:product-id/:color/view-a.avif
// #Products: /assets/images/products/:product-slug/:color/view-a.avif
// #categories: /assets/images/categories/:category-slug/hero.avif
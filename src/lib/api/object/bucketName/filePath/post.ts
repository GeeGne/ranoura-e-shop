import getServerUrl from '@/utils/getServerUrl';

// Upload Object files

type Props = {
  bucketName: string;
  filePath: string;
  file: any;
}

export default async function post ({ 
  bucketName, 
  filePath,
  file
}: Props) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${getServerUrl()}/api/v1/object/${bucketName}/${filePath}`;
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    if (!response.ok) throw new Error ('Unable to connect to the server');

    const result = await response.json();
    return result;
  } catch(err) {
    const error = err as Error;
    console.error('Errow while uploading product image: ', error.message);
    throw error;
  }
}
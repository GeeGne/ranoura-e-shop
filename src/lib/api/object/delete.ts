import getServerUrl from '@/utils/getServerUrl';

type Props = {
  bucketName: string;
  filePath: string;
}

export default async function deleteFile ({
  bucketName,
  filePath,
}: Props) {
  try {
    if (!bucketName || !filePath) throw new Error ('bucket name and file path are required.');

    const url = `${getServerUrl()}/api/v1/object/${bucketName}/${filePath}`;
    const response = await fetch(url, {
      method: "DELETE",
    })
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error (errorMessage);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Error while deleting an object file: ', error.message);
    throw err;
  }
}
import getServerUrl from '@/utils/getServerUrl';

// check user role

export default async function get (requestedRole: string) {
  try {
    const url = `${getServerUrl()}/api/v1/role/${requestedRole}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error ('unable to connect to the server');

    const result = await response.json();
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Error during server request: ', error.message);
    throw err;
  }
}
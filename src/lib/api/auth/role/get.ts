import getServerUrl from '@/utils/getServerUrl';

// check user role

export default async function get (requestedRole: string) {
  try {
    const url = `${getServerUrl()}/api/v1/role/${requestedRole}`;
    console.log('requested role: ', requestedRole);
    console.log('url: ', url);
    const response = await fetch(url);
    if (!response.ok) { 
      const error = await response.json();
      throw new Error ('unable to connect to the server: ', error?.message);
    }   

    const result = await response.json();
    console.log('result: ', result);
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Error during server request: ', error.message);
    return err;
  }
}
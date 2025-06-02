import getServerUrl from '@/utils/getServerUrl';

// Remove the JWT Authentication Cookie by expiring it

export default async function post () {
  try {
    const url = `${getServerUrl()}/api/v1/auth/signout`;
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) throw new Error ('Unable to connect to the server');

    const results = await response.json();
    return results;
  } catch (err) {
    const error = err as Error;
    console.error('error during signout up proccess: ', error.message);
    throw err;
  }
}
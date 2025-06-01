import getServerUrl from '@/utils/getServerUrl';

// Send user credentials & verify & send auth token;

type Props = {
  email: string;
  password: string;
}

export default async function post ({
  email,
  password
}: Props) {
  try {
    const url = `${getServerUrl()}/api/v1/auth/signin`;
    const response = await fetch(url, {
      method: 'POST',
      headers : { 'Content-Type' : 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    });
    if (!response.ok) throw new Error ('Unable to connect to the server');

    const results = await response.json();
    console.log('signin results: ', results);
    return results;
  } catch (err) {
    const error = err as Error;
    console.error('error during signing up proccess: ', error.message);
    throw err;
  }
}
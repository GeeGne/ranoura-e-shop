import getServerUrl from '@/utils/getServerUrl';

// Create New User

type Props = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
}

export default async function post({
  first_name,
  last_name,
  email,
  phone_number,
  password  
}: Props) {
  try {
    const url = `${getServerUrl()}/api/v1/users`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone_number,
        password  
      })
    })
    if (!response.ok) throw new Error ('Unable to connect to the server');

    const result = await response.json();
    console.log('result', result);
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Error while Creating new user: ', error.message);
    throw err;
  }
}
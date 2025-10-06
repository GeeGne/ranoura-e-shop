import getServerUrl from '@/utils/getServerUrl';

// Update User Details

export default async function put(data: Record<string, any>) {
  try {
    const { id, ...requestedData } = data;
    const url = `${getServerUrl()}/api/v1/users/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestedData)
    })
    if (!response.ok) throw new Error ('Unable to connect to the server');

    const result = await response.json();
    console.log('result: ', result);
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Error while Creating new user: ', error.message);
    throw error;
  }
}
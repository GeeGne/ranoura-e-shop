import getServerUrl from '@/utils/getServerUrl';

export default async function put (data: any) {
  try {
    const { id, ...requestedData } = data;
    console.log('requested Data: ', requestedData);
    const url = `${getServerUrl()}/api/v1/products/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestedData)
    });
    if (!response.ok) throw new Error('Unable to connect to the server.');

    const result = await response.json();
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Unknown error: ', error.message);
    throw err;
  }
}
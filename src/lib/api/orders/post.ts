import getServerUrl from '@/utils/getServerUrl';

// Create New Order

export default async function post (data: Record<string, any>) {
  try {
    const url = `${getServerUrl()}/api/v1/orders`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  } catch(err) {
    const error = err as Error;
    console.error('Error while creating new order: ', error.message);
    throw error;
  }
}
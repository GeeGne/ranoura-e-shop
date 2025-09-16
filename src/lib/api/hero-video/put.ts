import getServerUrl from '@/utils/getServerUrl';

// Update Hero Video Details Data

export default async function put (data: Record<string, any>) {
  try {

    const url = `${getServerUrl()}/api/v1/hero-video`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    }

    const result = await response.json();
    return result;
    
  } catch (error) {
    const err = error as Error;
    console.error('Error accured while updating Hero Video details: ', err.message);
    throw err;
  }
}
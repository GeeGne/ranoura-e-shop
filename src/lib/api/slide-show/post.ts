import getServerUrl from '@/utils/getServerUrl';

// Create new Slider

export default async function post (data: Record<string, any>) {
  try {
    const url = `${getServerUrl()}/api/v1/slide-show`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error ('Error while creating new slider');

    const result = await response.json();
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Error while creating new slider: ', error.message);
    throw error;
  }
}
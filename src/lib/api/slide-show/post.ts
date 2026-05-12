import getServerUrl from '@/utils/getServerUrl';

// Create new Slider

export default async function post () {
  try {
    const url = `${getServerUrl()}/api/v1/slide-show`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' }
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    };

    const result = await response.json();
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Error while creating new slider: ', error.message);
    throw error;
  }
}
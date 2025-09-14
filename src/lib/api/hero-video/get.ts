import getServerUrl from '@/utils/getServerUrl';

// Get Hero Video Details Data

export default async function get () {
  try {

    const url = `${getServerUrl()}/api/v1/hero-video`;
    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    }

    const result = await response.json();
    return result;
    
  } catch (error) {
    const err = error as Error;
    console.error('Error accured while getting Hero Video details: ', err.message);
    throw err;
  }
}
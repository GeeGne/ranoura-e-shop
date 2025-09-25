import getServerUrl from '@/utils/getServerUrl';

// Get All Social Links

export default async function get () {
  try {
    const url = `${getServerUrl()}/api/v1/social-links`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    }
    
    const result = await response.json();
    return result
  } catch (error) {
    const err = error as Error;
    console.error('Error while fetching Social Links: ', err.message);
    throw err;
  }
}
import getServerUrl from '@/utils/getServerUrl';

// Get All Sub-Categories

export default async function get () {
  try {
    const url = `${getServerUrl()}/api/v1/sub-categories`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    }
    
    const result = await response.json();
    return result
  } catch (error) {
    const err = error as Error;
    console.error('Error while fetching Sub-Categories: ', err.message);
    throw err;
  }
}
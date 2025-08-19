import getServerUrl from '@/utils/getServerUrl';

// Get General Settings Data

export default async function get () {
  try {

    const url = `${getServerUrl()}/api/v1/general-settings`;
    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Error while fetching General Settings data: ', error.message);
    throw error;
  }
}
import getServerUrl from '@/utils/getServerUrl';

// Get Users Information

export default async function get () {

  try {
    const url = `${getServerUrl()}/api/v1/users`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error while fetching users');

    const results = await response.json();
    return results
  } catch (err) {
    const error = err as Error;
    console.error('Error while fetching Users: ', error.message);
    throw error;
  }
}
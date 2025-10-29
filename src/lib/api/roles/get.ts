import getServerUrl from '@/utils/getServerUrl';

// Get User Roles

export default async function get () {

  try {
    const url = `${getServerUrl()}/api/v1/roles`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error while fetching roles');

    const results = await response.json();
    return results
  } catch (err) {
    const error = err as Error;
    console.error('Error while fetching roles: ', error.message);
    throw error;
  }
}

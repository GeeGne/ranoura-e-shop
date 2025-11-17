import getServerUrl from '@/utils/getServerUrl';

// Get All Orders

export default async function get () {
  try {
    const url = `${getServerUrl()}/api/v1/orders`;
    const response = await fetch(url);
    if (!response.ok) throw new Error ('Error while fetching orders');

    const results = await response.json();
    return results;
  } catch (err) {
    const error = err as Error;
    console.error('Error while fetching Orders: ', error.message);
    throw err;
  }
}
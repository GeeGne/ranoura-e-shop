import getServerUrl from '@/utils/getServerUrl';

// Get Specific Order Based on Order Id

export default async function get (id: string) {
  try {
    const url = `${getServerUrl()}/api/v1/orders/${id}`;
    const response = await fetch (url);
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    }

    const results = await response.json();
    return results;
  } catch (err) {
    const error = err as Error;
    console.error ('Error while fetching order: ', error.message);
    throw err;
  }
}
import getServerUrl from '@/utils/getServerUrl';

export default async function get () {
  try {
    const url = `${getServerUrl()}/api/v1/products`;

    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error (error.message);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Error while getting products: ', error.message);
    throw err;
  }
}
import getServerUrl from '@/utils/getServerUrl';

// Get Specific Product Based on Slug
export default async function get (slug: string) {
  try {
    const url = `${getServerUrl()}/api/v1/products/slug/${slug}`
    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Error while getting product: ', error)
    return error;
  }
}
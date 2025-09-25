import getServerUrl from '@/utils/getServerUrl';

// add new Social Link
export default async function post (data: Record<any, any>) {
  try {
    const url = `${getServerUrl()}/api/v1/social-links`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    const err = error as Error;
    console.error('Error while adding new social link: ', err.message);
    throw err;
  }
}
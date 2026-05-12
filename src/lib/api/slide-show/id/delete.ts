import getServerUrl from '@/utils/getServerUrl';

// Delete selected Slide

export default async function deleted (id: number) {
  try {
    const url = `${getServerUrl()}/api/v1/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    };

    const result = await response.json();
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Unable to delete slide: ', error.message);
    throw error
  }
}
import getServerUrl from '@/utils/getServerUrl';

// Get Themes Variables

export default async function get () {

  try {
    const url = `${getServerUrl()}/api/v1/themes`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error while fetching themes');

    const results = await response.json();
    return results
  } catch (err) {
    console.error('Error while fetching Themes: ',err);
    throw err;
  }
}
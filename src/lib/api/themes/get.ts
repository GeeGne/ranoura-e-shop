import getServerUrl from '@/utils/getServerUrl';

export default async function get () {

  try {
    const url = `${getServerUrl()}/api/v1/themes`;
    // const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/themes`;
    console.log(getServerUrl(), process.env.NEXT_PUBLIC_SERVER_URL)
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error while fetching themes');

    const results = await response.json();
    return results
  } catch (err) {
    console.error(err);
    throw err
  }
}
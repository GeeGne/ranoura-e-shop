export default async function get () {

  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/themes`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error while fetching themes');

    const results = await response.json();
    return results
  } catch (err) {
    console.error(err);
    throw err
  }
}
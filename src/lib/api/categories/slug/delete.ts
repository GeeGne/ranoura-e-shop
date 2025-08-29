import getServerUrl from '@/utils/getServerUrl';

// Delete Specific Category

type Props = {
  slug: string;
  data: Record<any, any>;
}

export default async function put ({ slug, data }: Props) {
  try {
    const url = `${getServerUrl()}/api/v1/categoires/${slug}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Failed while deleting Category: ', error.message);
    throw error;
  }
}
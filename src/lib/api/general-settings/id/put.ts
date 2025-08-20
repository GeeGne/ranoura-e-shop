import getServerUrl from '@/utils/getServerUrl';

// Update General Settings Data

type Props = {
  id: string;
  data: Record<any, any>;
}

export default async function put ({ id, data }: Props) {
  try {
    const url = `${getServerUrl()}/api/v1/general-settings/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
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
    console.error('Failed while updating General Settings: ', error.message);
    throw error;
  }
}
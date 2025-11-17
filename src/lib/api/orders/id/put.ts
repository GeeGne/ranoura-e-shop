import getServerUrl from '@/utils/getServerUrl';

// Update Order based on Order Id

type Props = {
  id: string;
  data: Record<string, any>;
};

export default async function put ({ id, data }: Props) {
  try {
    const url = `${getServerUrl()}/api/v1/orders/${id}`;
    const response = await fetch(url,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.mesage);
    }

    const results = await response.json();
    return results;
  } catch (err) {
    const error = err as Error;
    console.error('Error while updating order: ', error.message);
    throw error;
  }
}
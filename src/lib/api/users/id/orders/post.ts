import getServerUrl from '@/utils/getServerUrl';

// Create new Order

type Props = {
  id: string;
  data: Record<string, any>;
};

export default async function post ({ id, data }: Props) {
  try {
    const url = `${getServerUrl()}/api/v1/users/${id}/orders`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    }

    const results = await response.json();
    return results;
  } catch (error) {
    const err = error as Error;
    console.error('Error while creating order: ', err.message);
    throw err;
  }
}
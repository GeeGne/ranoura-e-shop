import getServerUrl from '@/utils/getServerUrl';

type Props = {
  id: string;
  name: Record<string, string>;
  slug: string;
  description: Record<string, string>;
  price: number;
  discount_percent: number;
  type: string;
  categories: Record<string, string>;
  is_new: boolean;
  sizes: any[];
  colors: any[];
  images: any[];
  stock: Record<string, string>;
  lists: any[];
}

export default async function put (data: Props) {
  try {
    const { id, ...requestedData } = data;
    console.log('requested Data: ', requestedData);
    const url = `${getServerUrl()}/api/v1/products/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestedData
      })
    });
    if (!response.ok) throw new Error('Unable to connect to the server.');

    const result = await response.json();
    console.log('result: ', result);
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Unknown error: ', error.message);
    throw err;
  }
}
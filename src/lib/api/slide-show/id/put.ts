import getServerUrl from '@/utils/getServerUrl';

// Update existed slider

type Props = {
  id: number;
  [key: string]: any;
};

export default async function put ({ id, ...data }: Props) {
  try {
    const url = `${getServerUrl()}/api/v1/slide-show/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    }

    const result =  await response.json();
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Error while creating new slider', error.message);
    throw error
  }
}
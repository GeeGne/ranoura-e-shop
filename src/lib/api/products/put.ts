import getServerUrl from '@/utils/getServerUrl';

type Props = {
  productId: string;
}

export default async function put ({productId}: Props) {
  try {
    const url = `${getServerUrl()}/api/v1/products`
  } catch (err) {
    const error = err as Error;
    console.error('Unknown error: ', error.message);
    throw err;
  }
}
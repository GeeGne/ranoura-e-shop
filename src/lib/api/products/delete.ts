import getServerUrl from '@/utils/getServerUrl';

export default async function deleteProduct (id: string) {
  try {
    const url = `${getServerUrl()}/api/v1/products/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error (error.message);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    const error = err as Error;
    console.log("Error while deleting product: ", error.message);
    throw error;
  }
}
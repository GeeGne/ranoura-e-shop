import getServerUrl from '@/utils/getServerUrl';

export default async function deleteSubCategory (slug: string) {
  try {
    const url = `${getServerUrl()}/api/v1/sub-categories/${slug}`;
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
    console.log("Error while deleting sub-category: ", error.message);
    throw error;
  }
}
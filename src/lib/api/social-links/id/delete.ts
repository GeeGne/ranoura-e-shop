import getServerUrl from '@/utils/getServerUrl';

// delete selected social link

export default async function deleteSocialLink (id: string) {
  try {
    const url = `${getServerUrl()}/api/v1/social-links/${id}`;
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
    console.log("Error while deleting social link: ", error.message);
    throw error;
  }
}
import getServerUrl from '@/utils/getServerUrl';

// Update User Role

type Props = {
  userId: string;
  roleName: string;
};

export default async function put({ userId, roleName }: Props) {
  try {
    const url = `${getServerUrl()}/api/v1/users/${userId}/role`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roleName)
    })
    if (!response.ok) throw new Error ('Unable to connect to the server');

    const result = await response.json();
    console.log('result: ', result);
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Error while updating user roles: ', error.message);
    throw error;
  }
}
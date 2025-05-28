import getServerUrl from '@/utils/getServerUrl';

// Create New User

export default async function post() {
  try {
    const url = `${getServerUrl()}/api/v1/users`;
    const response = fetch(url, )
  } catch (err) {
    const error = err as Error;
    console.error('Error while Creating new user: ', error.message);
    throw err;
  }
}
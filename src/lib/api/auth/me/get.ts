import getServerUrl from '@/utils/getServerUrl';

// Check auth token and get User Data

export default async function get () {
  try {
    const url = `${getServerUrl()}/api/v1/auth/me`;
    const response = await fetch(url, { credentials: 'include' });
    if (!response.ok) throw new Error('authentication process is unsuccessful')
    
    const results = response.json();
    console.log('results: ', results);
    return results
  } catch (err) {
    const error = err as Error;
    console.error('unable to authenticate user: ', error.message);
    throw error;
  }
}
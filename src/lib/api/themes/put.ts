import getServerUrl from '@/utils/getServerUrl';

// Update Themes Varaibles

type Props = {
  name: { en: string, ar: string };
  scheme_id: number;
  primary_color: string;
  primary_invert_color: string;
  secondary_color: string;
  secondary_invert_color: string;
  inbetween_color: string;
  content_color: string;
  content_inbetween_color: string;
  content_invert_color: string;
}

export default async function put ({ 
  name,
  scheme_id, 
  primary_color,
  primary_invert_color,
  secondary_color,
  secondary_invert_color,
  inbetween_color,
  content_color,
  content_inbetween_color,
  content_invert_color,
}: Props) {
  try {
    const url = `${getServerUrl()}/api/v1/themes`;
    const response = await fetch(url,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        scheme_id, 
        primary_color,
        primary_invert_color,
        secondary_color,
        secondary_invert_color,
        inbetween_color,
        content_color,
        content_inbetween_color,
        content_invert_color,          
      })
    })
    if(!response.ok) throw new Error ("Failed while updating.")

    const message = await response.json();
    return message;
  } catch (err) {
    const error = err as Error;
    const message = 'Unable to update themes: ' + error.message;
    console.error(message);
    throw (message);
  }
}
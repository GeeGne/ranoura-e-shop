import { supabase } from '@/lib/supabaseClient';

// async function uploadProfilePictureToStorage ({ userId }) {
//   try {
//     const fileName = `${Date.now()}-pfp`;
//     const filePath = `profile-pictures/${userData.user?.id}/${fileName}`;
//     const { data, error: bucketError } = await supabase.storage
//       .from('assets')
//       .upload(filePath, file
//       );
//     if (bucketError) throw new Error (`Error while uploading pfp img: ${bucketError.message}`)
    
//     const { data: { publicUrl } } = supabase.storage
//       .from('assets')
//       .getPublicUrl(filePath);
//     if (!publicUrl) throw new Error ('Error while getting pfp url');

//     return publicUrl;
//   } catch (err) {
//     const error = err as Error;
//     console.error(error.message);
//     throw err;
//   }
// }

// export default uploadProfilePictureToStorage;
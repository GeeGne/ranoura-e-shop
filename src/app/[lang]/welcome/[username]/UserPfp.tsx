// HOOKS
import { useEffect, useRef, useState, useId } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import EpUser from "@/components/svgs/EpUser";
import LineMdPlus from '@/components/svgs/LineMdPlus';
import LineMdEdit from '@/components/svgs/LineMdEdit';
import LineMdTrash from '@/components/svgs/LineMdTrash';

// STORES
import { 
  useActivityWindowStore, useAlertMessageStore, 
  useImageDisplayerWindow, useVideoDisplayerWindowStore
} from '@/stores/index';

// API
import uploadStorageFile from '@/lib/api/object/bucketName/filePath/post';
import deleteStorageFile from '@/lib/api/object/bucketName/filePath/delete';
import updateUserDetails from '@/lib/api/auth/me/put';

// ASSETS
const img_url = '/assets/img/pfp_img.png';

type Props = {
  lang?: 'en' | 'ar';
  isEn?: boolean;
  data?: Record<string, any> | null;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
} & React.ComponentPropsWithRef<"section">;

export default function UserPfp ({
  lang = 'en',
  isEn = true,
  data = {},
  isLoading = false, 
  isError = false,
  className, 
  ...props
}: Props) {

  const { profile_img_url } = data || {};
  const queryClient = useQueryClient();
  const id = useId();
  const setActivityWindowToggle = useActivityWindowStore(state => state.setToggle);
  const setActivityWindowMessage = useActivityWindowStore(state => state.setMessage);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const displayAlert = (message: any, type: string) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertToggle(Date.now());
  };

  const uploadFileMutation = useMutation({
    mutationFn: uploadStorageFile,
    onSettled: () => {
    },
    onMutate: () => {
      setActivityWindowToggle(true);
      setActivityWindowMessage(isEn ? 'Uploading the file...' : 'جاري رفع الملف...');
    },
    onSuccess: (results) => {
      const { publicUrl } = results.data;
      displayAlert(results.message[isEn ? 'en' : 'ar'], "success");

      const pfpImgRow = { profile_img_url: publicUrl }
      updateUserDetailsMutation.mutate(pfpImgRow);
      
      // DEBUG
      console.log('upload image data result: ', data);
      // console.log('posted image Data: ', { id: data?.id,  ...pfpImgRow });
    },
    onError: () => {
      displayAlert(isEn ? 'An Error has accured during uploading the file, please try again.' : 'هناك مشكله خلال رفع الملف, الرجاء المحاوله مره اخرى.', "error");
    }
  });

  const updateUserDetailsMutation = useMutation({
    mutationFn: updateUserDetails,
    onMutate: () => {
      setActivityWindowToggle(true);
      setActivityWindowMessage(isEn ? 'Updating User Information...' : 'جاري تحديث بيانات المستخدم...');
    },
    onSettled: () => {
      setActivityWindowToggle(false);
    },
    onSuccess: (results) => {
      queryClient.invalidateQueries({ queryKey: [ 'user' ] })
      displayAlert(results.message[isEn ? 'en' : 'ar'], "success");
    },
    onError: (results) => {
      displayAlert(results.message, "error");
    }
  })

  const deleteFileMutation = useMutation({ mutationFn: deleteStorageFile });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | SVGSVGElement>) => {
    const { type, rowName, filePath } = e.currentTarget.dataset;

    switch (type) {
      case 'delete_pfp_img_button_is_clicked':
        if (rowName) updateUserDetailsMutation.mutate({ [rowName]: null });
        if (filePath)  deleteFileMutation.mutate({
          bucketName: 'assets',
          filePath
        })
        break;
      default:
        console.error('Unknown type: ', type);  
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.currentTarget;
    const { storePath, filePath } = e.currentTarget.dataset;

    switch (name) {
      case 'pfpImg':
      case 'editPfpImg':
        if (!files || !storePath) return;
        const file = files[0];
        uploadFileMutation.mutate({
          bucketName: 'assets',
          filePath: `${storePath}/${Date.now()}`,
          file
        });

        if (filePath)  deleteFileMutation.mutate({
          bucketName: 'assets',
          filePath
        })
        break;
      default:
        console.error('Unknown name: ', name);
    }
  };

  // DEBUG
  console.log('user data: ', data);

  if (isLoading) return (
    <section
      className={`
        flex items-center justify-center
        ${className}
      `}
      { ...props }
    >
      <div
        className={`
          --opacity-blink bg-background-deep-light relative group 
          flex items-center justify-center 
          rounded-full w-[100px] h-[100px] cursor-pointer
        `}
      />
    </section>
  )  

  if (profile_img_url) return (
    <section
      className={`
        flex items-center justify-center
        ${className}
      `}
      { ...props }
    >
      <div
        className="group relative rounded-full overflow-hidden"
      >
        <img
          className={`
            flex object-center object-cover 
            w-[100px] h-[100px]
          `}
          src={profile_img_url}
        />
        <div
          className="
            absolute top-0 left-0 
            flex items-center justify-center gap-2
            w-full h-full bg-shade
            invisible group-hover:visible opacity-0 group-hover:opacity-100
            transition-all duration-200 ease-in-out
          "
        >
          <label 
            className="relative"
            htmlFor={id}
          >
            <input 
              className="absolute top-0 left-0 w-0 h-0 invisible"
              type="file"
              accept="image/*"
              name="editPfpImg"
              id={id}
              data-store-path={`images/users/${data?.slug}/profile-picture`}
              data-file-path={data?.profile_img_url}
              onChange={handleChange}
            />
            <LineMdEdit 
              className="
                w-8 h-8 p-1
                text-heading-invert bg-transparent hover:bg-shade-v2 active:opacity-80 rounded-full
                transition-all duration-200 ease-in-out
              "
            />
          </label>
          <LineMdTrash 
            className="
              w-8 h-8 p-1
              text-heading-invert bg-transparent hover:bg-shade-v2 active:opacity-80 rounded-full
              transition-all duration-200 ease-in-out
            "
            role="button"
            data-type="delete_pfp_img_button_is_clicked"
            data-row-name="profile_img_url"
            data-file-path={data?.profile_img_url}
            onClick={handleClick}
          />
        </div>
      </div>
    </section>
  );

  return (
    <section
      className={`
        flex items-center justify-center
        ${className}
      `}
      { ...props }
    >
      <label
        className={`
          relative group flex items-center justify-center 
          w-[100px] h-[100px] bg-background-light cursor-pointer rounded-full
        `}
        htmlFor={id}
      >
        <input 
          className="absolute top-0 left-0 w-0 h-0 invisible"
          type="file"
          accept="image/*"
          name="pfpImg"
          id={id}
          data-row-name="profile_img_url"
          data-store-path={`images/users/${data?.slug}/profile-picture`}
          data-file-path={data?.profile_img_url}
          onChange={handleChange}
        />
        <EpUser 
          className={`w-12 h-12 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
        <div 
          className="
            absolute top-[calc(100%-2rem)] right-0 
            flex items-center justify-center
            w-7 h-7 bg-heading group-active:bg-body opacity-70 group-hover:opacity-100 rounded-full
            transition-all duration-300 ease-in-out
          "
        >
          <LineMdPlus 
            className="text-heading-invert "
          />
        </div>
        <div 
          className="
            absolute bottom-[calc(100%+1rem)] left-1/2translate-x-[-50%] 
            flex items-center justify-center
            p-1 text-heading-invert bg-heading font-bold rounded-lg whitespace-nowrap
            invisible group-hover:visible opacity-0 group-hover:opacity-100
            transition-all duration-300 ease-in-out
          "
        >
          {isEn ? 'add profile image' : 'اضف صوره شخصيه'}
        </div>
      </label>
    </section>
  )  
}
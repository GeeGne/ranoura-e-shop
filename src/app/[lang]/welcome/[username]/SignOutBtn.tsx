// HOOKS
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import BtnA from '@/components/BtnA';
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';

// STORES
import { useAlertMessageStore, useLanguageStore } from '@/stores/index';

// API
import signoutUser from '@/lib/api/auth/signout/post';

type Props = {
  className?: string;
  isLoading?: boolean;
} & React.ComponentPropsWithRef<"div"> ;

export default function SignOutBtn ({ className, isLoading, ...props }: Props) {

  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const [ isMutating, setIsMutating ] = useState<boolean>(false);

  const signoutUserMutation = useMutation({
    mutationFn: signoutUser,
    onSettled: () => {
      setIsMutating(false);
    },
    onMutate: () => {
      setIsMutating(true);
    },
    onSuccess: (data) => {
      setAlertToggle(Date.now());
      setAlertType("success");
      setAlertMessage(data.message[isEn ? 'en' : 'ar']);
      window.location.reload();
    },
    onError: (data) => {
      setAlertToggle(Date.now());
      setAlertType("error");
      setAlertMessage(data.message);
      window.location.reload();
    }
  })

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'signout_button_is_clicked':
        console.log('clicked!');
        signoutUserMutation.mutate();
        break;
      default:
        console.error('Unknown type: ', type); 
    }
  }

  return (
    <div    
      className={`
        ${className}
      `}
      data-type="signout_button_is_clicked"
      onClick={handleClick}
      { ...props }
    >
      <BtnA
        className={`
          relative px-4 py-2 text-md font-bold rounded-md
          ${isLoading 
            ? '--opacity-blink bg-background-deep-light text-background-deep-light' 
            : 'bg-primary text-heading-invert'
          }
        `}
      >
        <span className={`${isMutating ? 'opacity-0' : 'opacity-100'}`}>
          Signout
        </span>
        <SvgSpinnersRingResize 
          className={`
            absolute top-1/2 left-1/2
            translate-x-[-50%] translate-y-[-50%]
            ${isMutating ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </BtnA>
    </div>
  )
}
// HOOKS
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import ThreeDBox from '@/components/svgs/ThreeDBox';

// STORES
import { useLanguageStore, useCheckoutSuccessWindow, useAlertMessageStore } from '@/stores/index';

// SVGS
import UndrawCertification from '@/components/svgs/UndrawCertification';

// CONFETTI 
import Confetti from "react-canvas-confetti/dist/presets/explosion";

// API
import getUserData from "@/lib/api/auth/me/get";

export default function CheckoutSuccessWindow () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const [ confettiToggle, setConfettiToggle ] = useState<boolean>(false);

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData
  })
  const user = userData?.data;

  // const toggle = useCheckoutSuccessWindow(state => state.toggle);
  const setToggle = useCheckoutSuccessWindow(state => state.setToggle);
  // const isLoading = useCheckoutSuccessWindow(state => state.isLoading);
  // const setIsLoading = useCheckoutSuccessWindow(state => state.setIsLoading);
  // const title = useCheckoutSuccessWindow(state => state.title);
  // const setTitle = useCheckoutSuccessWindow(state => state.setTitle);
  // const description = useCheckoutSuccessWindow(state => state.description);
  // const setDescription = useCheckoutSuccessWindow(state => state.setDescription);
  // const action = useCheckoutSuccessWindow(state => state.action);
  // const setAction = useCheckoutSuccessWindow(state => state.setAction);
  // const btnTitle = useCheckoutSuccessWindow(state => state.btnTitle);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const addIsProcessingNote = () => {
    setAlertToggle(Date.now());
    setAlertType("warning");
    setAlertMessage(isEn ? 'Please wait until the operation is finished' : 'الرجاء الانتظار حتى انتهاء من العمليه');
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'accept_button_is_clicked':
        if (isLoading) return addIsProcessingNote();

        setAction({ ...action, isConfirmed: true})
        break;
      case 'cancel_button_is_clicked':
        if (isLoading) {
          setAlertToggle(Date.now());
          setAlertType("warning");
          setAlertMessage(isEn ? 'Please wait until the operation is finished' : 'الرجاء الانتظار حتى انتهاء من العمليه');
          return;
        };

        setToggle(false);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG & UI
  const toggle = true;
  // console.log('toggle: ', toggle);

  return (
    <div
      className={`
        fixed top-0 left-0
        w-full h-full
        bg-[var(--shade-color)] z-[5000]
        transition-all duration-200 ease-out
        ${toggle ? 'visible opacity-100 backdrop-blur-[3px]' : 'invisible opacity-0 backdrop-blur-[0px]'}
      `}
    >
      {confettiToggle &&
        <Confetti autorun={{ speed: 1 }} />
      }
      <div
        className={`
          absolute top-1/2 left-1/2 
          translate-x-[-50%] translate-y-[-50%]
          rounded-lg bg-background
          w-[500px] h-[300px]
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${toggle ? 'scale-100 opacity-100' : 'scale-[80%] opacity-0'}
        `}
        data-type="fixed_box_is_clicked"
      >
        <UndrawCertification 
          className="
            absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-50%]  
            w-[170px] h-[170px]
            text-content
          " 
        />
        <section
          className="flex flex-col gap-4 w-full pt-[101px] px-8"
        >
          <h1 className="text-content font-bold text-lg text-center">{isEn ? 'Order Received' : 'تم استلام الطلب'}</h1>
          <ul
            className="text-body"
          >
            <li
              className=""
            >
              <ThreeDBox className="inline w-5 h-5"/>&nbsp;
              We'll process your order within <b>24 hours</b>.
            </li>
            <li
              className=""
            >
              <ThreeDBox className="inline w-5 h-5"/>&nbsp;
              You can track your order inside <Link href={`/${lang}/welcome/${user?.first_name + '-' + user?.last_name}/orders`} className="underline text-content"><b>user orders section</b></Link>.
            </li>
            <li
              className=""
            >
              <ThreeDBox className="inline w-5 h-5"/>&nbsp;
              Expected delivery within <b>7 days</b>.
            </li>
          </ul>
          <div
            className="flex gap-8 w-full justify-evenly"
          >
            <Link
              href="/"
              className="p-2 text-heading-invert font-bold rounded-md bg-primary cursor-pointer"
            >
              Back to home
            </Link>
            <Link
              href={`/${lang}/welcome/${user?.first_name + '-' + user?.last_name}/orders`}
              className="p-2 text-heading-invert font-bold rounded-md bg-primary cursor-pointer"
            >
              Go to orders
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
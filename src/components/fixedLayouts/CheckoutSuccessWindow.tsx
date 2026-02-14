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

  const [ confettiToggle, setConfettiToggle ] = useState<boolean>(true);

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData
  })
  const user = userData?.data;

  const toggle = useCheckoutSuccessWindow(state => state.toggle);
  const setToggle = useCheckoutSuccessWindow(state => state.setToggle);

  useEffect(() => {
    if (toggle) setTimeout(() => setConfettiToggle(false), 3000);
  }, [toggle]);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const addIsProcessingNote = () => {
    setAlertToggle(Date.now());
    setAlertType("warning");
    setAlertMessage(isEn ? 'Please wait until the operation is finished' : 'الرجاء الانتظار حتى انتهاء من العمليه');
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'view_order_anchor_is_clicked':
      case 'continue_shopping_anchor_is_clicked':
        setToggle(false);
        setConfettiToggle(true);
      default:
        console.error('Unknown type: ', type);
    }
  }


  // DEBUG & UI
  // console.log('toggle: ', toggle);

  if (!isEn) return (
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
          <h1 className="text-content font-bold text-lg text-center">تم استلام الطلب</h1>
          <ul
            className="text-body"
          >
            <li
              className=""
            >
              <ThreeDBox className="inline w-5 h-5"/>&nbsp;
              سيتم معاينه طلبك خلال <b>24 ساعه</b>.
            </li>
            <li
              className=""
            >
              <ThreeDBox className="inline w-5 h-5"/>&nbsp;
              تستطيع تتبع حاله الطلب في <Link href={`/${lang}/welcome/${user?.first_name + '-' + user?.last_name}/orders`} className="underline text-content font-bold">قسم الطلبات لدى المستخدم</Link>
            </li>
            <li
              className=""
            >
              <ThreeDBox className="inline w-5 h-5"/>&nbsp;
              مده الشحن المتوقعه <b>خلال اسبوع</b>.
            </li>
          </ul>
          <div
            className="flex gap-8 w-full justify-evenly"
          >
            <Link
              href="/"
              className="p-2 text-heading-invert font-bold rounded-md bg-primary cursor-pointer"
            >
              متابعه التسوق
            </Link>
            <Link
              href={`/${lang}/welcome/${user?.first_name + '-' + user?.last_name}/orders`}
              className="p-2 text-heading-invert font-bold rounded-md bg-primary cursor-pointer"
            >
              عرض الطلب
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
  
  if (isEn) return (
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
          <h1 className="text-content font-bold text-lg text-center">Order Received</h1>
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
              You can track your order inside <Link href={`/${lang}/welcome/${user?.first_name + '-' + user?.last_name}/orders`} className="underline text-content font-bold">user orders section</Link>.
            </li>
            <li
              className=""
            >
              <ThreeDBox className="inline w-5 h-5"/>&nbsp;
              Expected delivery within <b>7 days</b>.
            </li>
          </ul>
          <div
            className="flex gap-4 w-full"
          >
            <Link
              href="/"
              className="
                flex-1 p-2 text-center text-heading font-bold rounded-md border border-solid border-px border-primary cursor-pointer
                hover:text-heading-invert hover:bg-primary active:opacity-80
                transition-all duration-200 ease-in-out
              "
              data-type="continue_shopping_anchor_is_clicked"
              onClick={handleClick}
            >
              CONTINUE SHOPPING
            </Link>
            <Link
              href={`/${lang}/welcome/${user?.first_name + '-' + user?.last_name}/orders`}
              className="
                flex-1 p-2 text-center text-heading-invert font-bold rounded-md bg-primary cursor-pointer
                hover:opacity-80 active:opacity-70
                transition-all duration-200 ease-in-out
              "
              data-type="view_order_anchor_is_clicked"
              onClick={handleClick}
            >
              VIEW ORDER
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
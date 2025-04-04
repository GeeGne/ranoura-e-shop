"use client"

// HOOKS
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// STORES
import { useLayoutRefStore, useLanguageStore } from '@/stores/index';

// COMPONENTS
import Error404 from '@/components/svgs/Error404';
import Void from '@/components/svgs/Void';
import UndrawEmpty from '@/components/svgs/UndrawEmpty';
import BtnA from '@/components/BtnA';

type Props = {
  type?: string;
}

export default function NotFound ({ type = "default" }: Props) {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const router = useRouter();
  const layoutRef = useLayoutRefStore((state: any) => state.layoutRef);

  const handleClick = (e: React.MouseEvent<HTMLElement | any>) => {
    const { type } = e.currentTarget.dataset;
    
    switch (type) {
      case 'navigate_to_home':
        router.push('/');
        setTimeout(() => 
          layoutRef.scrollTo({top: 0, behavior: "instant"})
        ,200);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }


  if (type === 'category') return (
    <section
      className="grid grid-cols-2 lg:items-center gap-8 py-4 md:py-8 px-4 max-w-[1400px] mx-auto"
    >
      <Void
        className="
          lg:order-2 col-span-2 lg:col-span-1 
          w-[300px] md:w-[500px] md:w-[500px] h-full text-content mx-auto
        "
      />
      <section
        className="
          flex flex-col gap-8 lg:order-first col-span-2 lg:col-span-1 
          text-6xl md:text-8xl mx-auto"
      >
        <h2
          className="text-6xl md:text-8xl text-heading font-light mx-auto"
        >
          <span
            className="text-7xl md:text-9xl text-content font-medium"
          >
            {isEn ? 'E' : 'ت'}
          </span>
          {isEn ? 'mpty rack alert!' : 'نبيه رف فارغ!'}
        </h2>
        <h2
          className="text-2xl text-body font-medium mx-auto"
        >
          {isEn ? 'Swing by our other categories to find your next look!' : 'تصفح فئاتنا الأخرى لتجد إطلالتك القادمة!'}
        </h2>
        <BtnA
          className="
            flex grow-0 mx-auto bg-primary 
            text-lg text-heading-invert font-bold px-4 py-2 rounded-md
          "
          data-type="navigate_to_home"
          onClick={handleClick}
        >
          {isEn ? 'Back to Home' : 'العوده الى الرئيسيه'}
        </BtnA>
      </section>
    </section>
  )

  if (type === 'product') return (
    <section
      className="grid grid-cols-2 lg:items-center gap-8 py-4 md:py-8 px-4 max-w-[1400px] mx-auto"
    >
      <UndrawEmpty
        className="
          lg:order-2 col-span-2 lg:col-span-1 
          w-[300px] md:w-[500px] md:w-[500px] h-full text-content mx-auto
        "
      />
      <section
        className="
          flex flex-col gap-8 lg:order-first col-span-2 lg:col-span-1 
          text-6xl md:text-8xl mx-auto"
      >
        <h2
          className="text-6xl md:text-8xl text-heading font-light mx-auto"
        >
          <span
            className="text-7xl md:text-9xl text-content font-medium"
          >
            {isEn ? 'O' : 'ن'}
          </span>
          {isEn ? 'ut of stock?' : 'فد المخزون؟'} 
        </h2>
        <h2
          className="text-2xl text-body font-medium mx-auto"
        >
          {isEn ? 'No worries—our closet’s still full of gems waiting for you!' : 'لا تقلق—خزانتنا لا تزال مليئة بالجواهر التي تنتظرك!'}
        </h2>
        <BtnA
          className="
            flex grow-0 mx-auto bg-primary 
            text-lg text-heading-invert font-bold px-4 py-2 rounded-md
          "
          data-type="navigate_to_home"
          onClick={handleClick}
        >
          {isEn ? 'Back to Home' : 'العوده الى الرئيسيه'}
        </BtnA>
      </section>
    </section>
  )

  return (
    <section
      className="grid grid-cols-2 lg:items-center gap-8 py-4 md:py-8 px-4 max-w-[1400px] mx-auto"
    >
      <Error404
        className="
          lg:order-2 col-span-2 lg:col-span-1 
          w-[300px] md:w-[500px] md:w-[500px] h-full text-content mx-auto
        "
      />
      <section
        className="
          flex flex-col gap-8 lg:order-first col-span-2 lg:col-span-1 
          text-6xl md:text-8xl mx-auto"
      >
        <h2
          className="text-6xl md:text-8xl text-heading font-light mx-auto"
        >
          <span
            className="text-7xl md:text-9xl text-content font-medium"
          >
            {isEn ? 'O' : 'ا'}
          </span>
          {isEn ? 'OOPS...' : 'ووبس...'}
        </h2>
        <h2
          className="text-2xl text-body font-medium mx-auto"
        >
          {isEn ? "This page is missing, but your next favorite outfit isn't" : 'هذه الصفحة مفقودة، لكن زيك المفضل القادم ليس كذلك'}
        </h2>
        <BtnA
          className="
            flex grow-0 mx-auto bg-primary 
            text-lg text-heading-invert font-bold px-4 py-2 rounded-md
          "
          data-type="navigate_to_home"
          onClick={handleClick}
        >
          {isEn ? 'Back to Home' : 'العوده الى الرئيسيه'}
        </BtnA>
      </section>
    </section>
  )
}
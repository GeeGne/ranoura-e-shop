"use client"

// HOOKS
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// STORES
import { useTabNameStore, useLayoutRefStore, useLanguageStore } from '@/stores/index';

// COMPONENTS
import Error404 from '@/components/svgs/Error404';
import BtnA from '@/components/BtnA';

type Props = {
  title?: string;
  description?: string;
  refreshBtn?: boolean;
}

export default function ErrorLayout ({ 
  title = 'OOPS...', 
  description = 'This page is missing, but your next favorite outfit isn\'t', 
  refreshBtn = true 
}: Props) {
  const router = useRouter();
    const lang = useLanguageStore(state => state.lang);
    const isEn = lang === 'en';
    const setTabName = useTabNameStore((state: any) => state.setTabName);
    const layoutRef = useLayoutRefStore((state: any) => state.layoutRef);
    
    useEffect(() => {
      setTabName('notFound');
    }, []);
  
    const handleClick = (e: React.MouseEvent<HTMLElement | any>) => {
      const { type } = e.currentTarget.dataset;
      
      switch (type) {
        case 'refresh_button_is_clicked':
          window.location.reload();
          break;
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
  
  return (
    <section
      className="grid grid-cols-2 lg:items-center gap-8 max-w-[1400px] mx-auto"
    >
      <Error404
        className="
          lg:order-2 col-span-2 lg:col-span-1 
          w-full md:w-[500px] md:w-[500px] h-full text-content mx-auto
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
          {title}
        </h2>
        <h2
          className="text-2xl text-body font-medium mx-auto"
        >
          {description}
        </h2>
        <BtnA
          className={`
            flex grow-0 mx-auto bg-primary 
            text-lg text-heading-invert font-bold px-4 py-2 rounded-md
            ${refreshBtn ? 'visible' : 'hidden'}
          `}
          data-type="refresh_button_is_clicked"
          onClick={handleClick}
        >
          {isEn ? 'Refresh Page' : 'تحديث الصفحه'}
        </BtnA>
      </section>
    </section>
  )
}
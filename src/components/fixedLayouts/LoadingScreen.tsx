// HOOKS
import { useState, useEffect } from 'react';

// SVGS
import SvgSpinnersTadpole from '@/components/svgs/activity/SvgSpinnersTadpole';

// STORES
import { useLanguageStore } from '@/stores/index';

const logo = "/assets/img/ranoura-logo.png"
const logo2 = "/assets/img/ranoura-logo(2).png"

export default function LoadingScreen () {

  const [ toggle, setToggle ] = useState<boolean>(true);
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  
  useEffect(() => {
    setTimeout(() => setToggle(false), 10000);
  }, []);

  return (
    <div
      className={`
        fixed top-0 left-0 w-full h-full bg-primary z-[2000]
        flex flex-col items-center justify-center p-4 gap-4
        transition-all duration-500 ease-in-out
        ${toggle ? 'visible opacity-100' : 'invisible opacity-0'}
      `}
    >
      <img 
        className="w-full md:w-[400px] object-center object-fit"
        alt="Ranoura Logo"
        src={logo}
      />
      <span
        className="text-body-invert text-2xl font-normal"
      >
        {isEn ? 'Loading...' : 'جاري التحميل...'}
      </span>
      <SvgSpinnersTadpole 
        className="text-heading-invert w-10 h-10"
      />
    </div>
  )
}
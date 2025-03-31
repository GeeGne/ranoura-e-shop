// HOOKS
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// STORES
import { useLanguageStore, useAlertMessageStore } from "@/stores/index";

// ASSETS
const logo = '/assets/img/ranoura-logo.png';

export default function SelectLang () {
  const router = useRouter();

  const firstTime = useLanguageStore(state => state.firstTime);
  const setFirstTime = useLanguageStore(state => state.setFirstTime);
  const lang = useLanguageStore(state => state.lang);
  const [ selectedLang, setSelectedLang ] = useState<string | null>(null);
  const isEn = selectedLang === 'en' || selectedLang === null;

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const engInptRef = useRef(null);
  const arInptRef = useRef(null);

  useEffect(() => {
    if (typeof(firstTime) === 'string') setFirstTime(true);
  }, [firstTime]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'continue_button_is_clicked':
        if (typeof(selectedLang) !== 'string') {
          setAlertToggle(Date.now());
          setAlertType("warning");
          setAlertMessage("Please select your preferred language");  
          return;
        }

        setFirstTime(false);
        router.push(`/${selectedLang}`)
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'language':
        setSelectedLang(value);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  // DEBUG & UI
  console.log('firstTime: ', firstTime);

  if (typeof(firstTime) !== 'string') return (
    <div
      className={`
        invisible opacity-0
        fixed top-0 left-0 w-screen h-screen z-[1000]
        flex flex-col gap-8 items-center justify-center
        bg-[hsla(0,0%,0%,0.6)] backdrop-blur-[0px]
        transition-all duration-300 ease-in-out
      `}
      style={{ 
        direction: 'ltr', 
        visibility: firstTime ? 'visible' : 'hidden',
        opacity: firstTime ? '1' : '0',
      }}
    >
      <img 
        alt="Ranoura Brand Logo"
        src={logo}
        className="w-[300px] md:w-[400px] lg:w-[500px] h-auto object-contain object center"
      />
      
      <h2
        className={`
          text-heading-invert font-semibold italic text-xl
          ${isEn ? 'ltr' : 'rtl'}
        `}
      >
        {isEn? 'Step into Ranoura – where style finds you.' : '.رنورا - حيث الأناقة تبحث عنك'}
      </h2>

      <div
        className="flex flex-row gap-4 justify-center"
      >
        <label
          className="
            relative flex text-heading-invert rounded-full
            border-soild border-[1px] cursor-pointer overflow-hidden
          "
          htmlFor="en"
        >
          <input 
            type="radio"
            id="en"
            value="en"
            name="language"
            className="peer absolute opacity-0"
            onChange={handleChange}
            ref={engInptRef}
          />
          <span
            className="
              text-heading-invert peer-checked:text-heading
              font-normal peer-checked:font-bold
              py-2 px-4 bg-transparent peer-checked:bg-heading-invert
              transition-all duration-200 ease-in-out
            "
          >
            English
          </span>
        </label>
        <label
          className="
            relative flex rounded-full 
            border-soild border-[1px] cursor-pointer overflow-hidden
          "
          htmlFor="ar"
        >
          <input 
            type="radio"
            id="ar"
            value="ar"
            name="language"
            className="peer absolute opacity-0"
            onChange={handleChange}
            ref={arInptRef}
          />
          <span
            className="
              text-heading-invert peer-checked:text-heading
              font-normal peer-checked:font-bold
              py-2 px-4 bg-transparent peer-checked:bg-heading-invert
              transition-all duration-200 ease-in-out
            "
          >
            العربيه
          </span>
        </label>
      </div>

      <button
        className="
          group relative text-heading-invert text-lg font-light px-12 py-2 
          border-solid border-heading-invert border-[1px]
          hover:scale-[1.1] hover:font-bold overflow-hidden
          transition-all duration-300 ease-in-out
        "
        data-type="continue_button_is_clicked"
        onClick={handleClick}
      >
        <div 
          className="
            absolute
            bottom-full group-hover:bottom-0 
            right-full group-hover:right-0 
            w-full h-full
            border-solid border-transparent group-hover:border-heading border-[1px]
            bg-heading opacity-100 z-[-1]
            transition-all duration-300 ease-in-out
          "
        />
        <div 
          className="
            absolute 
            bottom-full group-hover:bottom-0 
            right-full group-hover:right-0 
            w-full h-full 
            border-solid border-transparent border-[1px]
            backdrop-invert-[100%]
            transition-all duration-300 ease-in-out
          "
        />
        {isEn ? `Let's go` : 'استمرار'}
      </button>
    </div>
  )
}
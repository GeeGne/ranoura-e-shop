// HOOKS
import { useState, useEffect, useRef } from "react";

// COMPONENTS
import CategoryList from "@/components/fixedLayouts/navbar/CategoryList";
import SubCategoryList from "@/components/fixedLayouts/navbar/SubCategoryList";

// STORES
import { useNavbarStore, useLanguageStore } from '@/stores/index';

// SVG
import ArrowUp from "@/components/svgs/ArrowUp";
import LineMdMenuToCloseAltTransition from "@/components/svgs/LineMdMenuToCloseAltTransition";

// JSON
import categories from '@/json/categories.json';

// ASSETS
// const ramdanBanner = "/assets/img/ramadan-nights.webp";
// const ramdanBanner2 = "/assets/img/ramadan-nights-2.avif";
// const outfit1 = "assets/img/outfit.avif"
// const outfit2 = "assets/img/outfit-2.avif"
// const outfit3 = "assets/img/outfit-3.avif"
// const backgroundImg = "assets/img/background.avif";
// const backgroundImg2 = "assets/img/background(2).avif";
// const backgroundImg3 = "assets/img/background(3).avif";

export default function Navbar () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const toggle = useNavbarStore((status:any) => status.toggle);
  const setToggle = useNavbarStore((status:any) => status.setToggle);
  const categoryToggle = useNavbarStore((status:any) => status.categoryToggle);
  const setCategoryToggle = useNavbarStore((status:any) => status.setCategoryToggle);

  const [ inputToggle, setInputToggle ] = useState<boolean>(false);

  const mainWrapperRef = useRef<any>(null);

  useEffect(() => {
    mainWrapperRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [categoryToggle]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'close_button_is_clicked':
        setToggle(false);
        setTimeout(() => setCategoryToggle(false), 500);
        ;
        break;
      default:
        console.error('Unknown type: :', type);
    }
  }

  const handleFocus = (e: any) => {
    const { name } = e.currentTarget;
    console.log('focus');
    switch (name) {
      case 'quantity':
        setInputToggle(true);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  const handleBlur = (e: any) => {
    const { name } = e.currentTarget;
    console.log('blur');
    switch (name) {
      case 'quantity':
        setInputToggle(false);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  return (
    <div
      className={`
        fixed top-0 left-0 
        flex lg:hidden flex-col w-screen h-screen bg-[var(--shade-v2-color)] z-[2000]
        transition-all duration-300 ease-in-out
        backdrop-blur-[2px] overflow-x-hidden
        ${toggle ? 'translate-y-[0%]' : 'translate-y-[-100%]'}
      `}
      ref={mainWrapperRef}
    >
      <button
        className="
          relative sticky top-0 flex items-center justify-start 
          w-full max-w-[1400px] mx-auto px-4 py-8
          opacity-100 cursor-pointer z-[20]
        "
        onClick={handleClick}
        data-type="close_button_is_clicked"
      >
        <div
          className="nav-active-effect z-10"
        >
          <LineMdMenuToCloseAltTransition
            className="
              text-heading-invert cursor-pointer
            "
            width={24}
            height={24}
          />
        </div>
        <div
          className="
            absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
            w-screen h-full text-body text-4xl font-thin
            flex items-center justify-center gap-2 bg-[hsla(0,0%,80%,0.6)]
            border-b border-inbetween backdrop-blur-md
          "
        >
          <ArrowUp 
          className={`
            ${isEn ? 'order-1' : 'order-2'}
            w-8 h-8 text-between rounded-full
            border-solid border-body-light border-[1px] p-1
          `}
          />
          <h2
            className={`${isEn ? 'order-2' : 'order-1'}`}
          >
            {isEn ? 'CLOSE' : 'الغاء'}
          </h2>
        </div>
        <hr className="border-inbetween"/>
      </button>
      <section
        className={`
          flex w-full
          transition-all ease-in-out duration-400
          ${categoryToggle 
            ? isEn
            ? 'translate-x-[-100%]' : 'translate-x-[100%]' 
            : 'translate-x-[0%]'
          }
        `}
      >
        <CategoryList />
        <SubCategoryList />
      </section>
    </div>
  )
}
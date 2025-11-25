// COMPONENTS
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';

// STORES
import { useLanguageStore, useImageDisplayerWindow } from '@/stores/index';

// UTILS
import createSlug from '@/utils/createSlug';

// ASSETS
const NavBarLgImg = '/assets/img/NavBarImg-example.avif';
const NavBarCompactImg = '/assets/img/NavBarCompactImg-example.avif';
const emptyImg = '/assets/img/Empty Image.avif';

export default function ImageDisplayerWindow () {
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const toggle = useImageDisplayerWindow(state => state.toggle);
  const setToggle = useImageDisplayerWindow(state => state.setToggle);
  const url = useImageDisplayerWindow(state => state.url);
  

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'fixed_window_is_clicked':
      case 'fixed_box_is_clicked':
        setToggle(false);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }
  // DEBUG & UI

  return (
    <div
      className={`
        fixed top-0 left-0
        w-full h-full
        bg-[var(--shade-color)] z-[5000]
        transition-all duration-200 ease-out
        ${toggle ? 'visible opacity-100 backdrop-blur-[3px]' : 'invisible opacity-0 backdrop-blur-[0px]'}
      `}
      data-type="fixed_window_is_clicked"
      onClick={handleClick}
    >
      <div
        className={`
          absolute top-1/2 left-1/2 
          translate-x-[-50%] translate-y-[-50%] flex items-center
          w-full h-full justify-center
          
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${toggle ? 'scale-100 opacity-100' : 'scale-[80%] opacity-0'}
        `}
        data-type="fixed_box_is_clicked"
        onClick={handleClick}
      >
        <img 
          src={url || emptyImg}
          className="rounded-lg max-w-[calc(100%-4rem)] max-h-[calc(100%-4rem)] object-cover object-center"
        />
      </div>
    </div>
  )
}
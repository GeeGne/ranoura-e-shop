// COMPONENTS
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';

// STORES
import { useLanguageStore, useVideoDisplayerWindowStore } from '@/stores/index';

// UTILS
import createSlug from '@/utils/createSlug';

// ASSETS
const NavBarLgImg = '/assets/img/NavBarImg-example.avif';
const NavBarCompactImg = '/assets/img/NavBarCompactImg-example.avif';

export default function VideoDisplayerWindow () {
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const toggle = useVideoDisplayerWindowStore(state => state.toggle);
  const setToggle = useVideoDisplayerWindowStore(state => state.setToggle);
  const url = useVideoDisplayerWindowStore(state => state.url);
  const setUrl = useVideoDisplayerWindowStore(state => state.setUrl);
  const type = useVideoDisplayerWindowStore(state => state.type);
  const setType = useVideoDisplayerWindowStore(state => state.setType);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'fixed_window_is_clicked':
        setToggle(false);
        setUrl(null);
        setType(null);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG & UI
  // console.log('toggle: ', toggle);
  // console.log('url: ', url);
  // console.log('type: ', type);

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
      <video
        key={`${url}-${type}`} 
        controls
        className={`
          absolute top-1/2 left-1/2 
          translate-x-[-50%] translate-y-[-50%]
          w-[80%] rounded-lg overflow-y-scroll
          bg-background overflow-hidden
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${toggle ? 'scale-100 opacity-100' : 'scale-[80%] opacity-0'}
        `}
      >
        {typeof url === "string" &&
         typeof type === "string" &&
          <source 
            src={url}
            type={type}
            className="w-full h-auto object-cover object-center"
          />
        }
      </video>
    </div>
  )
}
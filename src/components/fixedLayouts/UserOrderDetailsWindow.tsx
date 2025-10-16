// COMPONENTS
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';

// STORES
import { useLanguageStore, useOrderDetailsWindowStore } from '@/stores/index';

// UTILS
import createSlug from '@/utils/createSlug';

// ASSETS
const NavBarLgImg = '/assets/img/NavBarImg-example.avif';
const NavBarCompactImg = '/assets/img/NavBarCompactImg-example.avif';
const img_url = '/assets/img/pfp_img.png';
const pfpImage = '/assets/img/pfp.avif';
const productImg = '/assets/img/cloth-7-sky.avif';


export default function UserOrderDetailsWindow () {
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const toggle = useOrderDetailsWindowStore(state => state.toggle);
  const setToggle = useOrderDetailsWindowStore(state => state.setToggle);
  

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'fixed_window_is_clicked':
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
          translate-x-[-50%] translate-y-[-50%]
          w-[80%] flex flex-col px-4
          rounded-lg overflow-y-scroll
          bg-background overflow-hidden
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${toggle ? 'scale-100 opacity-100' : 'scale-[80%] opacity-0'}
        `}
        data-type="fixed_box_is_clicked"
        onClick={handleClick}
      >
        <section
          className="flex items-center justify-between py-4"
        >
          <div>
            <span
              className="text-body font-bold"
            >
              ORDER ID:&nbsp;
            </span>
            <span
              className="text-heading font-bold"
            >
              9958229c-684f-4e43-acdf-41dbee706c47 
            </span>
          </div>
          <div
            className="relative text-yellow-500 font-bold px-2 py-1"
          >
            proccessing
            <div
              className="absolute top-0 left-0 w-full h-full bg-yellow-500 opacity-20 rounded-full"
            />
          </div>
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="grid grid-cols-2 py-4"
        >
          <div
            className="flex flex-col gap-2 items-center bg-gren-400"
          >
            <img
              className="w-[100px] object-cover object-center rounded-full" 
              src={pfpImage}
            />
            <span className="text-heading">Ahmed El-Ghabra</span>
          </div>
          <div
            className="flex justify-end"
          >
            <span className="text-body">Oct 7, 2025, 01:51 PM</span>
          </div>
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="flex flex-col gap-4 py-4"
        >
          <ul
            className="flex flex-col gap-4 py-4"
          >
            <li className="flex items-center gap-4 ">
              <img
                className="w-[150px] aspect-[2/3] object-center object-cover rounded-lg"
                src={productImg}
              />
              <div className="flex flex-col gap-2 items-start">
                <span className="text-body">Jeans</span>
                <span className="text-heading">Graphic Tee for Men & Women</span>
                <div 
                  className="
                    flex gap-2 py-1 px-2 inline-flex
                    rounded-full bg-background-light
                  "
                >
                  <div className="w-5 h-5 bg-sky-400 rounded-full" />
                  <span className="text-sm text-body-light font-bold">Sky</span>
                </div>

              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
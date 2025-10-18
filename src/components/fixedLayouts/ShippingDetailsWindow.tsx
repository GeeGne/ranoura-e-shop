// COMPONENTS
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import GrommetIconsCheckboxSelected from '@/components/svgs/GrommetIconsCheckboxSelected';
import IcRoundUpdate from '@/components/svgs/IcRoundUpdate';
import LaShippingFast from '@/components/svgs/LaShippingFast';
import PhAddressBook from '@/components/svgs/PhAddressBook';

// STORES
import { useLanguageStore, useShippingDetailsWindowStore } from '@/stores/index';

// UTILS
import createSlug from '@/utils/createSlug';

// ASSETS
const NavBarLgImg = '/assets/img/NavBarImg-example.avif';
const NavBarCompactImg = '/assets/img/NavBarCompactImg-example.avif';
const img_url = '/assets/img/pfp_img.png';
const pfpImage = '/assets/img/pfp.avif';
const productImg = '/assets/img/cloth-7-sky.avif';

export default function ShippingDetailsWindow () {
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const toggle = useShippingDetailsWindowStore(state => state.toggle);
  const setToggle = useShippingDetailsWindowStore(state => state.setToggle);
  

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
          rounded-lg overflow-y-scroll h-[calc(100vh-4rem)] bg-background
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
              className="w-[80px] object-cover object-center rounded-full" 
              src={pfpImage}
            />
            <span className="text-heading">bara El-Ghabra</span>
            <span className="text-body">bluewhalexweb@outlook.com</span>
          </div>
          <div
            className="flex justify-end gap-2"
          >
            <IcRoundUpdate className="text-body"/>
            <span className="text-body">Oct 7, 2025, 01:51 PM</span>
          </div>
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="flex flex-col gap-4 py-4"
        >
          <div className="flex items-center gap-2">
            <GrommetIconsCheckboxSelected className="w-6 h-6 text-body"/>
            <span className="text-lg font-bold text-body">ORDERED ITEMS</span>
          </div>
          <ul
            className="flex flex-col gap-4 py-4"
          >
            <li className="flex gap-4 ">
              <img
                className="flex w-[150px] aspect-[2/3] object-center object-cover grow-0 rounded-lg"
                src={productImg}
              />
              <div className="flex flex-col flex-1 gap-2">
                <span className="text-body">Jeans</span>
                <span className="text-heading">Graphic Tee for Men & Women</span>
                <div className="flex items-center mt-auto gap-2">
                  <div 
                    className="
                      flex gap-2 py-1 px-2
                      rounded-full bg-background-light w-fit
                    "
                  >
                    <div className="w-5 h-5 bg-sky-400 rounded-full" />
                    <span className="text-sm text-body-light font-bold">Sky</span>
                  </div>
                  <div className="h-fit text-sm text-heading-invert bg-heading rounded-md font-bold px-1 py-0">M</div>
                  <span className="text-sm text-body border font-bold border-[2px] border-body-light px-1  rounded-md">20 %</span>
                </div>
              </div>
              <div className="flex flex-col flex-1 items-end">
                <span 
                  className="
                    text-body font-bold border border-px border-background-deep-light 
                    px-3 py-1 rounded-full my-auto
                  "
                  >
                    3 x 500 SYP
                </span>
                <span 
                  className="
                    text-heading font-bold mt-auto
                  "
                >
                  1500 SYP
                </span>
              </div>
            </li>
            <li className="flex gap-4 ">
              <img
                className="flex w-[150px] aspect-[2/3] object-center object-cover grow-0 rounded-lg"
                src={productImg}
              />
              <div className="flex flex-col flex-1 gap-2">
                <span className="text-body">Jeans</span>
                <span className="text-heading">Graphic Tee for Men & Women</span>
                <div className="flex items-center mt-auto gap-2">
                  <div 
                    className="
                      flex gap-2 py-1 px-2
                      rounded-full bg-background-light w-fit
                    "
                  >
                    <div className="w-5 h-5 bg-sky-400 rounded-full" />
                    <span className="text-sm text-body-light font-bold">Sky</span>
                  </div>
                  <div className="h-fit text-sm text-heading-invert bg-heading rounded-md font-bold px-1 py-0">M</div>
                  <span className="text-sm text-body border font-bold border-[2px] border-body-light px-1  rounded-md">20 %</span>
                </div>
              </div>
              <div className="flex flex-col flex-1 items-end">
                <span 
                  className="
                    text-body font-bold border border-px border-background-deep-light 
                    px-3 py-1 rounded-full my-auto
                  "
                  >
                    3 x 500 SYP
                </span>
                <span 
                  className="
                    text-heading font-bold mt-auto
                  "
                >
                  1500 SYP
                </span>
              </div>
            </li>
            <li className="flex gap-4 ">
              <img
                className="flex w-[150px] aspect-[2/3] object-center object-cover grow-0 rounded-lg"
                src={productImg}
              />
              <div className="flex flex-col flex-1 gap-2">
                <span className="text-body">Jeans</span>
                <span className="text-heading">Graphic Tee for Men & Women</span>
                <div className="flex items-center mt-auto gap-2">
                  <div 
                    className="
                      flex gap-2 py-1 px-2
                      rounded-full bg-background-light w-fit
                    "
                  >
                    <div className="w-5 h-5 bg-sky-400 rounded-full" />
                    <span className="text-sm text-body-light font-bold">Sky</span>
                  </div>
                  <div className="h-fit text-sm text-heading-invert bg-heading rounded-md font-bold px-1 py-0">M</div>
                  <span className="text-sm text-body border font-bold border-[2px] border-body-light px-1  rounded-md">20 %</span>
                </div>
              </div>
              <div className="flex flex-col flex-1 items-end">
                <span 
                  className="
                    text-body font-bold border border-px border-background-deep-light 
                    px-3 py-1 rounded-full my-auto
                  "
                  >
                    3 x 500 SYP
                </span>
                <span 
                  className="
                    text-heading font-bold mt-auto
                  "
                >
                  1500 SYP
                </span>
              </div>
            </li>
          </ul>
          <div className="flex w-full justify-between">
            <span className="font-bold text-body">SUB-TOTAL</span>
            <span className="font-bold text-heading">500 SYP</span>
          </div>
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="flex flex-col py-4 gap-4"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <LaShippingFast className="w-6 h-6 text-body"/>
              <span className="text-lg font-bold text-body">SHIPPING</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">City:</span>
              <span className="text-heading">Damascus</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">Ship Cost:</span>
              <span className="text-heading">100 SYP</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <PhAddressBook className="w-6 h-6 text-body"/>
              <span className="text-lg font-bold text-body">ADDRESS</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">Main Address:</span>
              <span className="text-heading">Damascus</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">Secondary Address:</span>
              <span className="text-heading">Damascus</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">Notes:</span>
              <span className="text-heading">Damascus</span>
            </div>
          </div>
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="flex justify-between py-4 gap-4"
        >
          <span className="text-body font-bold">TOTAL</span>
          <span className="text-content font-bold">600 SYP</span>
        </section>
      </div>
    </div>
  )
}
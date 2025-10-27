// COMPONENTS
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import GrommetIconsCheckboxSelected from '@/components/svgs/GrommetIconsCheckboxSelected';
import MaterialSymbolsPrintOutlineRounded from '@/components/svgs/MaterialSymbolsPrintOutlineRounded';
import LetsIconsOrder from '@/components/svgs/LetsIconsOrder';
import AkarIconsShippingBox01 from '@/components/svgs/AkarIconsShippingBox01';
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
      case 'print_button_is_clicked':
        window.print();
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
          rounded-lg overflow-y-scroll max-h-[calc(100vh-4rem)] bg-background
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${toggle ? 'scale-100 opacity-100' : 'scale-[80%] opacity-0'}
        `}
        data-type="fixed_box_is_clicked"
        onClick={handleClick}
      >
        <button
          className="
            group absolute top-4 right-4 
            flex gap-2 p-2 rounded-lg
            border border-solid border-[2px] border-body-extra-light hover:border-body-light active:border-body
            transition-all duration-200 ease-in-out
          "
          data-type="print_button_is_clicked"
          onClick={handleClick}
        >
          <MaterialSymbolsPrintOutlineRounded 
            className="
              text-body-light group-hover:text-body group-active:text-heading
              transition-all duration-200 ease-in-out
            " 
          />
          <span 
            className="
              text-body-light font-bold group-hover:text-body group-active:text-heading
              transition-all duration-200 ease-in-out
              "
          >
            Print
          </span>
        </button>
        <section
          className="flex flex-col py-4 gap-4"
        >
          <div className="flex items-center gap-2">
            <LetsIconsOrder className="w-6 h-6 text-body"/>
            <span className="text-lg font-bold text-body">ORDER INFORMATION</span>
          </div>
          <div>
            <span className="text-body">Order ID:&nbsp;</span>
            <span className="text-heading">ywMTrndU-7K1</span>
          </div>
          <div>
            <span className="text-body">Order Date:&nbsp;</span>
            <span className="text-heading">2024-09-194T10:22:45</span>
          </div>
        </section>
        <section
          className="flex flex-col py-4 gap-4"
        >
          <div className="flex items-center gap-2">
            <PhAddressBook className="w-6 h-6 text-body"/>
            <span className="text-lg font-bold text-body">Customer Information</span>
          </div>
          <div>
            <span className="text-body">Name:&nbsp;</span>
            <span className="text-heading">Jon Ros</span>
          </div>
          <div>
            <span className="text-body">Email:&nbsp;</span>
            <span className="text-heading">geegnebab@gmail.com</span>
          </div>
          <div>
            <span className="text-body">Phone:&nbsp;</span>
            <span className="text-heading">+943 942 485 356</span>
          </div>
        </section>
        <section
          className="flex flex-col py-4 gap-4"
        >
          <div className="flex items-center gap-2">
            <LaShippingFast className="w-6 h-6 text-body"/>
            <span className="text-lg font-bold text-body">SHIPPING ADDRESS</span>
          </div>
          <div>
            <span className="text-body">City:&nbsp;</span>
            <span className="text-heading">Damascus</span>
          </div>
          <div>
            <span className="text-body">Address:&nbsp;</span>
            <span className="text-heading">Near Tolaytola Restaurant</span>
          </div>
          <div>
            <span className="text-body">Second Address:&nbsp;</span>
            <span className="text-heading">Near White House</span>
          </div>
          <div>
            <span className="text-body">Notes:&nbsp;</span>
            <span className="text-heading">Between 10Am on a Tuesday</span>
          </div>
        </section>
        <section
          className="flex flex-col py-4 gap-4"
        >
          <div className="flex items-center gap-2">
            <AkarIconsShippingBox01 className="w-6 h-6 text-body"/>
            <span className="text-lg font-bold text-body">ORDER DETAILS</span>
          </div>
          <span className="text-body">ID | PRODUCT NAME | QUANTITY | COLOR | SIZE | TOTAL</span>
          <div>
            <span className="text-body">Shipping Cost:</span>
            <span className="text-heading">20 SYP</span>
          </div>          
          <div>
            <span className="text-body">Order Cost:</span>
            <span className="text-heading">20 SYP</span>
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
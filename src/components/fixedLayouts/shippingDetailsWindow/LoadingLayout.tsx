// HOOKS
import { useQuery } from '@tanstack/react-query';

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

// API
import getSpecificOrder from '@/lib/api/orders/id/get';

// ASSETS
const NavBarLgImg = '/assets/img/NavBarImg-example.avif';
const NavBarCompactImg = '/assets/img/NavBarCompactImg-example.avif';
const img_url = '/assets/img/pfp_img.png';
const pfpImage = '/assets/img/pfp.avif';
const productImg = '/assets/img/cloth-7-sky.avif';

export default function LoadingLayout () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const toggle = useShippingDetailsWindowStore(state => state.toggle);
  const setToggle = useShippingDetailsWindowStore(state => state.setToggle);
  const orderId = useShippingDetailsWindowStore(state => state.orderId);
  
  const { data: orderData, isLoading, isError } = useQuery({
    queryKey: [ 'order', orderId ],
    queryFn: () => getSpecificOrder(orderId)
  });
  const order = orderData?.data;

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
  };
  
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
            {isEn ? 'Print' : 'طباعه'}
          </span>
        </button>
        <section
          className="flex flex-col py-4 gap-4"
        >
          <div className="flex items-center gap-2">
            <LetsIconsOrder className="w-6 h-6 text-body"/>
            <span className="text-lg font-bold text-body">{isEn ? 'ORDER INFORMATION' : 'معلومات عن الاوردر'}&nbsp;</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Order ID:' : 'رمز الاوردر:'}&nbsp;</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">///////////////////////////////////</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Order Date:' : 'تاريخ الطلب:'}&nbsp;</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">///////////////////</span>
          </div>
        </section>
        <section
          className="flex flex-col py-4 gap-4"
        >
          <div className="flex items-center gap-2">
            <PhAddressBook className="w-6 h-6 text-body"/>
            <span className="text-lg font-bold text-body">{isEn ? 'Customer Information' : 'معلمومات العميل'}&nbsp;</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Name:' : 'الاسم:'}&nbsp;</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">///////////////</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Email:' : 'ايميل'}&nbsp;</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">///////////////////////</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Phone:' : 'الهاتف'}&nbsp;</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">/////////////</span>
          </div>
        </section>
        <section
          className="flex flex-col py-4 gap-4"
        >
          <div className="flex items-center gap-2">
            <LaShippingFast className="w-6 h-6 text-body"/>
            <span className="text-lg font-bold text-body">{isEn ? 'SHIPPING ADDRESS' : 'عنوان الشحن'}&nbsp;</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'City:' : 'المحافظه'}&nbsp;</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">///////////</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Address:' : 'العنوان'}&nbsp;</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">////////////////////////////////////////////////////</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Second Address:' : 'العنوان الثاني'}&nbsp;</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">////////////////////////////////////</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Notes:' : 'ملاحظات'}&nbsp;</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">//////////////////////////////////////</span>
          </div>
        </section>
        <section
          className="flex flex-col py-4 gap-4"
        >
          <div className="flex items-center gap-2">
            <AkarIconsShippingBox01 className="w-6 h-6 text-body"/>
            <span className="text-lg font-bold text-body">{isEn ? 'ORDER DETAILS' : 'معلموات الطلب'}</span>
          </div>
          <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">ID | PRODUCT NAME | QUANTITY | COLOR | SIZE | TOTAL</span>
          <div>
            <span className="text-body">{isEn ? 'Shipping Cost:' : 'تكاليف الشحن:'}&nbsp;</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">////////////</span>
          </div>          
          <div>
            <span className="text-body">{isEn ? 'Order Cost:' : 'تكاليف الطلب'}&nbsp;</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">//////////</span>
          </div>          
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="flex justify-between py-4 gap-4"
        >
          <span className="text-body font-bold">{isEn ? 'TOTAL' : 'الاجمالي'}&nbsp;</span>
          <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md text-content font-bold">////////////</span>
        </section>
      </div>
    </div>
  )
}
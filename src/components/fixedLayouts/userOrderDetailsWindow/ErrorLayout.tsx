// HOOKS
import { useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import GrommetIconsCheckboxSelected from '@/components/svgs/GrommetIconsCheckboxSelected';
import IcRoundUpdate from '@/components/svgs/IcRoundUpdate';
import LaShippingFast from '@/components/svgs/LaShippingFast';
import PhAddressBook from '@/components/svgs/PhAddressBook';
import ErrorLayoutComponent from '@/components/ErrorLayout';
// STORES
import { useLanguageStore, useOrderDetailsWindowStore } from '@/stores/index';

export default function ErrorLayout () {
  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const toggle = useOrderDetailsWindowStore(state => state.toggle);
  const setToggle = useOrderDetailsWindowStore(state => state.setToggle);
  const orderId = useOrderDetailsWindowStore(state => state.orderId);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'fixed_window_is_clicked':
        setToggle(false);
        break;
      case 'refresh_order_button_is_clicked':
        queryClient.invalidateQueries({
          queryKey: [ 'order', orderId]
        });
        break;
      default:
        console.error('Unknown type: ', type);
    }
  };

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
          w-[80%] flex flex-col items-center gap-4 px-4 py-8
          rounded-lg overflow-y-scroll h-[calc(100vh-4rem)] bg-background
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${toggle ? 'scale-100 opacity-100' : 'scale-[80%] opacity-0'}
        `}
        data-type="fixed_box_is_clicked"
      >
        <ErrorLayoutComponent 
          description={"Error while loading order, try again by pressing refresh button"}
          refreshBtn={false}
        />
        <button
          className="
            bg-heading text-heading-invert rounded-lg w-fit p-2 font-bold text-lg
            hover:opacity-60 active:opacity-80
            transition-all duration-200 ease-in-out
          "
          onClick={handleClick}
          data-type="refresh_order_button_is_clicked"
        >
          Refresh Order
        </button>
      </div>
    </div>
  )
};
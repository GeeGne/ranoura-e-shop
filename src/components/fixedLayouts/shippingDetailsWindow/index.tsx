// HOOKS
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import ErrorLayout from '@/components/fixedLayouts/shippingDetailsWindow/ErrorLayout';
import LoadingLayout from '@/components/fixedLayouts/shippingDetailsWindow/LoadingLayout';
import MaterialSymbolsPrintOutlineRounded from '@/components/svgs/MaterialSymbolsPrintOutlineRounded';
import LetsIconsOrder from '@/components/svgs/LetsIconsOrder';
import AkarIconsShippingBox01 from '@/components/svgs/AkarIconsShippingBox01';
import LaShippingFast from '@/components/svgs/LaShippingFast';
import PhAddressBook from '@/components/svgs/PhAddressBook';

// STORES
import { useLanguageStore, useShippingDetailsWindowStore } from '@/stores/index';

// API
import getSpecificOrder from '@/lib/api/orders/id/get';

export default function ShippingDetailsWindow () {

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

  const displayNotFoundMessage = () => isEn ? 'No information found' : 'لم يتم العثور على معلومات';

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;

    return date.toLocaleString((isEn ? 'en' : 'ar-EG'), {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

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
  // console.log('order data: ', order);
  // console.log('order id: ', orderId);

  if (isError) return(
    <ErrorLayout />
  )

  if (isLoading) return(
    <LoadingLayout />
  )

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
          className={`
            group absolute top-4 
            flex gap-2 p-2 rounded-lg
            border border-solid border-[2px] border-body-extra-light hover:border-body-light active:border-body
            transition-all duration-200 ease-in-out
            ${isEn ? 'right-4' : 'left-4'}
          `}
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
            <span className="text-lg font-bold text-body">{isEn ? 'ORDER INFORMATION' : 'معلومات عن الاوردر'}</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Order ID:' : 'رمز الاوردر:'}&nbsp;</span>
          <span className="text-heading">{order?.id}</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Order Date:' : 'تاريخ الطلب:'}&nbsp;</span>
            <span className="text-heading">{formatDate(order?.created_at)}</span>
          </div>
        </section>
        <section
          className="flex flex-col py-4 gap-4"
        >
          <div className="flex items-center gap-2">
            <PhAddressBook className="w-6 h-6 text-body"/>
            <span className="text-lg font-bold text-body">{isEn ? 'Customer Information' : 'معلمومات العميل'}</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Name:' : 'الاسم:'}&nbsp;</span>
            <span className="text-heading">{order?.customer_snapshot?.name}</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Email:' : 'ايميل'}&nbsp;</span>
            <span className="text-heading">{order?.customer_snapshot?.email}</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Phone:' : 'الهاتف'}&nbsp;</span>
            <span className="text-heading">{order?.customer_snapshot?.phone}</span>
          </div>
        </section>
        <section
          className="flex flex-col py-4 gap-4"
        >
          <div className="flex items-center gap-2">
            <LaShippingFast className="w-6 h-6 text-body"/>
            <span className="text-lg font-bold text-body">{isEn ? 'SHIPPING ADDRESS' : 'عنوان الشحن'}</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'City:' : 'المحافظه'}&nbsp;</span>
            <span className="text-heading">{order?.shipping?.city}</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Address:' : 'العنوان'}&nbsp;</span>
            <span className="text-heading">{order?.shipping?.address_details}</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Second Address:' : 'العنوان الثاني'}&nbsp;</span>
            <span className="text-heading">{order?.shipping?.adderess_details || displayNotFoundMessage()}</span>
          </div>
          <div>
            <span className="text-body">{isEn ? 'Notes:' : 'ملاحظات'}&nbsp;</span>
            <span className="text-heading">{order?.shipping?.notes || displayNotFoundMessage()}</span>
          </div>
        </section>
        <section
          className="flex flex-col py-4 gap-4"
        >
          <div className="flex items-center gap-2">
            <AkarIconsShippingBox01 className="w-6 h-6 text-body"/>
            <span className="text-lg font-bold text-body">{isEn ? 'ORDER DETAILS' : 'معلموات الطلب'}</span>
          </div>
          <span className="text-body">ID | PRODUCT NAME | QUANTITY | COLOR | SIZE | TOTAL</span>
          <div>
            <span className="text-body">{isEn ? 'Shipping Cost:' : 'تكاليف الشحن:'}</span>
            <span className="text-heading">{order?.pricing?.shipping}</span>
          </div>          
          <div>
            <span className="text-body">{isEn ? 'Order Cost:' : 'تكاليف الطلب'}</span>
            <span className="text-heading">{order?.pricing?.sub_total}</span>
          </div>          
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="flex justify-between py-4 gap-4"
        >
          <span className="text-body font-bold">{isEn ? 'TOTAL' : 'الاجمالي'}</span>
          <span className="text-content font-bold">{order?.pricing?.total} SYP</span>
        </section>
      </div>
    </div>
  )
}
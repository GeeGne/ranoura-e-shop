// HOOKS
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import GrommetIconsCheckboxSelected from '@/components/svgs/GrommetIconsCheckboxSelected';
import IcRoundUpdate from '@/components/svgs/IcRoundUpdate';
import LaShippingFast from '@/components/svgs/LaShippingFast';
import PhAddressBook from '@/components/svgs/PhAddressBook';

// STORES
import { useLanguageStore, useOrderDetailsWindowStore } from '@/stores/index';

// UTILS
import createSlug from '@/utils/createSlug';

// API
import getSpecificOrder from '@/lib/api/orders/id/get';

// JSON
import statusColorsData from '@/json/orderStatus.json';
import colors from '@/json/colors.json';

// ASSETS
const NavBarLgImg = '/assets/img/NavBarImg-example.avif';
const NavBarCompactImg = '/assets/img/NavBarCompactImg-example.avif';
const img_url = '/assets/img/pfp_img.png';
const pfpImage = '/assets/img/pfp.avif';
const productImg = '/assets/img/cloth-7-sky.avif';


export default function UserOrderDetailsWindow () {
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const statusColors: Record<string, any> = statusColorsData;

  const toggle = useOrderDetailsWindowStore(state => state.toggle);
  const setToggle = useOrderDetailsWindowStore(state => state.setToggle);
  const orderId = useOrderDetailsWindowStore(state => state.orderId);
  
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
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG & UI
  // console.log('choosed order:', order);

  if (true) return (
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
              {order?.id}
            </span>
          </div>
          <div
            className="relative text-yellow-500 font-bold px-2 py-1"
          >
            {order?.status}
            <div
              className="absolute top-0 left-0 w-full h-full opacity-20 rounded-full"
              style={{ color: statusColors[order?.status]}}
            />
          </div>
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="grid grid-cols-2 py-4"
        >
          <div
            className="flex flex-col gap-2 items-center"
          >
            <img
              className="w-[80px] object-cover object-center rounded-full" 
              src={order?.customer_snapshot?.avatar}
            />
            <span className="text-heading">{order?.customer_snapshot?.name}</span>
            <span className="text-body">{order?.customer_snapshot?.email}</span>
            <span className="text-body">{order?.customer_snapshot?.phone}</span>
          </div>
          <div
            className="flex justify-end gap-2"
          >
            <IcRoundUpdate className="text-body"/>
            <span className="text-body">{formatDate(order?.timestamps?.created_at)}</span>
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
            {order?.items?.products.map((product: Record<string, any>) => 
              <li className="flex gap-4 " key={product.id}>
                <img
                  className="flex w-[150px] aspect-[2/3] object-center object-cover grow-0 rounded-lg"
                  src={product.image_url}
                />
                <div className="flex flex-col flex-1 gap-2">
                  <span className="text-body">{product.type}</span>
                  <span className="text-heading">{product.name[lang]}</span>
                  <div className="flex items-center mt-auto gap-2">
                    <div 
                      className="
                        flex gap-2 py-1 px-2
                        rounded-full bg-background-light w-fit
                      "
                    >
                      <div 
                        className="w-5 h-5 rounded-full" 
                        style={{ backgroundColor: colors.find((color: Record<string, any>) => color.name === product.color)?.hex}}
                      />
                      <span className="text-sm text-body-light font-bold">{product.color}</span>
                    </div>
                    <div className="h-fit text-sm text-heading-invert bg-heading rounded-md font-bold px-1 py-0">{product.size}</div>
                    {!product.discount_percent ||
                      <span className="text-sm text-body border font-bold border-[2px] border-body-light px-1  rounded-md">
                      {product.discount_percent} %
                      </span>
                    }
                  </div>
                </div>
                <div className="flex flex-col flex-1 items-end">
                  <span 
                    className="
                      text-body font-bold border border-px border-background-deep-light 
                      px-3 py-1 rounded-full my-auto
                    "
                    >
                      {product.quantity + ' x ' + product.price} SYP
                  </span>
                  {product.discount_percent 
                    ? <div
                        className="
                          text-heading font-semibold mt-auto
                        "
                      > 
                        <s className="text-sm text-body">{product.quantity * product.price}</s><>&ensp;</><span>{(product.quantity * product.price) - ((product.price - (product.price * product.discount_percent / 100) * product.quantity))} SYP</span>
                      </div> 
                    : <span
                        className="
                          text-heading font-semibold mt-auto
                        "
                      >
                        {(product.quantity * product.price) - (product.price - (product.price * product.discount_percent / 100))} SYP
                      </span>
                  }
                </div>
              </li>
            )}
          </ul>
          <div className="flex w-full justify-between">
            <span className="font-bold text-body">{isEn ? 'SUB UNTIS' : 'عدد الوحدات'}</span>
            <span className="font-bold text-heading">{order?.items?.total_units}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-body">{isEn ? 'TOTAL ITEMS' : 'عدد الاغراض'}</span>
            <span className="font-bold text-heading">{order?.items?.total_products}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-body">{isEn ? 'SUB TOTAL' : 'المجموع الجزئي'}</span>
            <span className="font-bold text-heading">{order?.items?.items_total} SYP</span>
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
              <span className="text-heading">{order?.shipping?.city}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">Ship Cost:</span>
              <span className="text-heading">{order?.pricing?.shipping} SYP</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <PhAddressBook className="w-6 h-6 text-body"/>
              <span className="text-lg font-bold text-body">ADDRESS</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">Main Address:</span>
              <span className="text-heading">{order?.shipping.address_details}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">Secondary Address:</span>
              <span className="text-heading">{order?.shipping.second_address || displayNotFoundMessage()}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">Notes:</span>
              <span className="text-heading">{order?.shipping.notes || displayNotFoundMessage()}</span>
            </div>
          </div>
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="flex justify-between py-4 gap-4"
        >
          <span className="text-body font-bold">TOTAL</span>
          <span className="text-content font-bold">{order?.pricing?.total} SYP</span>
        </section>
      </div>
    </div>
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
              {order?.id}
            </span>
          </div>
          <div
            className="relative text-yellow-500 font-bold px-2 py-1"
          >
            {order?.status}
            <div
              className="absolute top-0 left-0 w-full h-full opacity-20 rounded-full"
              style={{ color: statusColors[order?.status]}}
            />
          </div>
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="grid grid-cols-2 py-4"
        >
          <div
            className="flex flex-col gap-2 items-center"
          >
            <img
              className="w-[80px] object-cover object-center rounded-full" 
              src={order?.customer_snapshot?.avatar}
            />
            <span className="text-heading">{order?.customer_snapshot?.name}</span>
            <span className="text-body">{order?.customer_snapshot?.email}</span>
            <span className="text-body">{order?.customer_snapshot?.phone}</span>
          </div>
          <div
            className="flex justify-end gap-2"
          >
            <IcRoundUpdate className="text-body"/>
            <span className="text-body">{formatDate(order?.timestamps?.created_at)}</span>
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
            {order?.items?.products.map((product: Record<string, any>) => 
              <li className="flex gap-4 " key={product.id}>
                <img
                  className="flex w-[150px] aspect-[2/3] object-center object-cover grow-0 rounded-lg"
                  src={product.image_url}
                />
                <div className="flex flex-col flex-1 gap-2">
                  <span className="text-body">{product.type}</span>
                  <span className="text-heading">{product.name[lang]}</span>
                  <div className="flex items-center mt-auto gap-2">
                    <div 
                      className="
                        flex gap-2 py-1 px-2
                        rounded-full bg-background-light w-fit
                      "
                    >
                      <div 
                        className="w-5 h-5 rounded-full" 
                        style={{ backgroundColor: colors.find((color: Record<string, any>) => color.name === product.color)?.hex}}
                      />
                      <span className="text-sm text-body-light font-bold">{product.color}</span>
                    </div>
                    <div className="h-fit text-sm text-heading-invert bg-heading rounded-md font-bold px-1 py-0">{product.size}</div>
                    {!product.discount_percent ||
                      <span className="text-sm text-body border font-bold border-[2px] border-body-light px-1  rounded-md">
                      {product.discount_percent} %
                      </span>
                    }
                  </div>
                </div>
                <div className="flex flex-col flex-1 items-end">
                  <span 
                    className="
                      text-body font-bold border border-px border-background-deep-light 
                      px-3 py-1 rounded-full my-auto
                    "
                    >
                      {product.quantity + ' x ' + product.price} SYP
                  </span>
                  {product.discount_percent 
                    ? <div
                        className="
                          text-heading font-semibold mt-auto
                        "
                      > 
                        <s className="text-sm text-body">{product.quantity * product.price}</s><>&ensp;</><span>{(product.quantity * product.price) - ((product.price - (product.price * product.discount_percent / 100) * product.quantity))} SYP</span>
                      </div> 
                    : <span
                        className="
                          text-heading font-semibold mt-auto
                        "
                      >
                        {(product.quantity * product.price) - (product.price - (product.price * product.discount_percent / 100))} SYP
                      </span>
                  }
                </div>
              </li>
            )}
          </ul>
          <div className="flex w-full justify-between">
            <span className="font-bold text-body">{isEn ? 'SUB UNTIS' : 'عدد الوحدات'}</span>
            <span className="font-bold text-heading">{order?.items?.total_units}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-body">{isEn ? 'TOTAL ITEMS' : 'عدد الاغراض'}</span>
            <span className="font-bold text-heading">{order?.items?.total_products}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-body">{isEn ? 'SUB TOTAL' : 'المجموع الجزئي'}</span>
            <span className="font-bold text-heading">{order?.items?.items_total} SYP</span>
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
              <span className="text-heading">{order?.shipping?.city}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">Ship Cost:</span>
              <span className="text-heading">{order?.pricing?.shipping} SYP</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <PhAddressBook className="w-6 h-6 text-body"/>
              <span className="text-lg font-bold text-body">ADDRESS</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">Main Address:</span>
              <span className="text-heading">{order?.shipping.address_details}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">Secondary Address:</span>
              <span className="text-heading">{order?.shipping.second_address || displayNotFoundMessage()}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">Notes:</span>
              <span className="text-heading">{order?.shipping.notes || displayNotFoundMessage()}</span>
            </div>
          </div>
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="flex justify-between py-4 gap-4"
        >
          <span className="text-body font-bold">TOTAL</span>
          <span className="text-content font-bold">{order?.pricing?.total} SYP</span>
        </section>
      </div>
    </div>
  )
}
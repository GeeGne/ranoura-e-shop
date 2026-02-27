// COMPONENTS
import ItemsList from '@/components/ItemsList';
import StatusMap from '@/app/[lang]/welcome/[username]/orders/StatusMap';
import ProductsLists from '@/app/[lang]/welcome/[username]/orders/ProductsLists';
import EmptyBox from '@/components/svgs/EmptyBox';
import LineMdTextBoxToTextBoxMultipleTransition from '@/components/svgs/LineMdTextBoxToTextBoxMultipleTransition';
import LineMdMapMarkerLoop from '@/components/svgs/LineMdMapMarkerLoop';

// ASSETS
const outfit1 = "/assets/img/outfit-2.avif";

// JSON
import orderStatusSimplified from '@/json/orderStatusSimplified.json';

// UTILS
import formatDate from '@/utils/date/formatDate';

type OrderStatus = keyof typeof orderStatusSimplified;

type Props = {
  orders?: Record<string, any>;
  lang?: 'en' | 'ar';
  isEn?: boolean;
  isLoading?: boolean;
} & React.ComponentPropsWithRef<"ul">;

export default function OrdersLi ({ 
  lang = 'en', 
  isEn = true, 
  orders = [], 
  isLoading = false,
  ...props 
}: Props) {

  const areOrdersEmpty = orders?.length === 0;
  const getOrderStatusColor = (status: string) => {
    if (!status)  return 'red';
    if (status in orderStatusSimplified) {
      return orderStatusSimplified[status as OrderStatus]?.color;
    }
    return 'red';

  };

  if (areOrdersEmpty) return ( 
    <section
      className="flex flex-col gap-4 w-full p-4 mt-[-1rem] max-w-[1400px] lg:mx-auto bg-[var(--background-light-color)]"
      { ...props }
    >
      <div
        className="
          flex flex-col md:flex-row items-center justify-center 
          gap-4 p-4 w-full max-w-[1400px] mx-auto bg-background rounded-lg
        "
      >
        <div className="relative flex flex-col items-center justify-center w-full h-full bg-content-invert pb-[30px] rounded-lg">
          <div className="custom-shape-divider-bottom-1772168163">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="fill-background"></path>
            </svg>
          </div>
          <EmptyBox 
            className="row-span-2 w-[250px] h-[250px] md:w-[300px] md:h-[300px] text-content"
          />
          <span className="text-body font-bold text-lg">
            {isEn ? 'NO ORDER FOUND' : 'لم تقم باي طلب بعد'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="hidden text-body font-bold text-lg">
            {isEn ? 'NO ORDER FOUND.' : 'لم تقم باي طلب بعد.'}
          </span>
          <div>
            <span className="text-body-light font-semibold text-lg">
              Ready to place your
            </span>&ensp;
            <button 
              className="
                relative text-lg p-2 bg-content-invert rounded-md text-transparent whitespace-nowrap
                hover:scale-105 active:scale-95 shadow-md hover:shadow-lg
                transition-all duration-200 ease-in-out
              "
            >
              First order?
              <span 
                className="
                  absolute top-1/2 left-1/2
                  translate-x-[-50%] translate-y-[-50%]
                  text-lg font-extrabold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text
                  z-[5]

                "
              >
                First order?
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )

  if (isLoading) return (
    <ul
      className="flex flex-col gap-4 w-full p-4 mt-[-1rem] max-w-[1400px] lg:mx-auto bg-[var(--background-light-color)]"
      { ...props }
    >
      {[1, 2, 3]?.map((num: number, i: number) => 
        <li
          key={i}
          className="flex flex-col gap-4 w-full p-4 max-w-[1400px] mx-auto bg-background rounded-lg"
        >
          <StatusMap 
            lang={lang} 
            isEn={isEn}
            isLoading={true}
          />
          <div
            className="flex text-lg justify-between"
          >
            <h3 className="text-body-light font-semibold">
              #{order?.id}
            </h3>
            <h3 
              className="font-bold"
              style={{ color: getOrderStatusColor(order?.status) }}
            >
              {order?.status}
            </h3>
          </div>
          <div
            className="flex justify-between"
          >
            <h3 className="text-body">
              {isEn ? 'Requested Date' : 'تاريخ الطلب'}
            </h3>
            <h3 className="text-heading font-semibold">
              {formatDate(order?.created_at)}
            </h3>
          </div>
          <hr className="border-inbetween" />
          <h2 className="text-body font-semibold text-lg">
            {isEn 
              ? `Ordered Items (${order?.items.total_products})` 
              : `(${order?.items.total_products})عدد القطع`
            }
          </h2>
          <ItemsList 
            items={order?.items?.products}
            lang={lang}
          />
          <div
            className="flex text-lg justify-between"
          >
            <h3 className="text-body font-semibold">
              {isEn ? 'Total' : 'الاجمالي'}
            </h3>
            <h3 className="text-heading font-semibold">
              {order?.pricing.sub_total}
            </h3>
          </div>
          <hr className="border-inbetween" />
          <div
            className="flex justify-between"
          >
            <h3 className="text-body">
              {isEn ? 'Shipping Fee' : 'تكاليف الطلب'}
            </h3>
            <h3 className="text-heading font-semibold">
              {order?.pricing.shipping}
            </h3>
          </div>
          <div
            className="flex text-lg justify-between"
          >
            <h3 className="text-heading font-bold">
              {isEn ? 'Total' : 'الاجمالي'}
            </h3>
            <h3 className="text-content font-bold">
              {order?.pricing.total}
            </h3>
          </div>
        </li>     
      )}
    </ul>
  )

  return (
    <ul
      className="flex flex-col gap-4 w-full p-4 mt-[-1rem] max-w-[1400px] lg:mx-auto bg-[var(--background-light-color)]"
      { ...props }
    >
      {orders?.map((order: Record<string, any>, i: number) => 
        <li
          key={i}
          className="flex flex-col gap-4 w-full p-4 max-w-[1400px] mx-auto bg-background rounded-lg"
        >
          <StatusMap 
            lang={lang} 
            isEn={isEn}
            status={order?.status}
          />
          <div
            className="flex text-lg justify-between"
          >
            <h3 className="text-body-light font-semibold">
              #{order?.id}
            </h3>
            <h3 
              className="font-bold"
              style={{ color: getOrderStatusColor(order?.status) }}
            >
              {order?.status}
            </h3>
          </div>
          <div
            className="flex justify-between"
          >
            <h3 className="text-body">
              {isEn ? 'Requested Date' : 'تاريخ الطلب'}
            </h3>
            <h3 className="text-heading font-semibold">
              {formatDate(order?.created_at)}
            </h3>
          </div>
          <hr className="border-inbetween" />
          <h2 className="text-body font-semibold text-lg">
            {isEn 
              ? `Ordered Items (${order?.items.total_products})` 
              : `(${order?.items.total_products})عدد القطع`
            }
          </h2>
          <ItemsList 
            items={order?.items?.products}
            lang={lang}
          />
          <div
            className="flex text-lg justify-between"
          >
            <h3 className="text-body font-semibold">
              {isEn ? 'Total' : 'الاجمالي'}
            </h3>
            <h3 className="text-heading font-semibold">
              {order?.pricing.sub_total}
            </h3>
          </div>
          <hr className="border-inbetween" />
          <div
            className="flex justify-between"
          >
            <h3 className="text-body">
              {isEn ? 'Shipping Fee' : 'تكاليف الطلب'}
            </h3>
            <h3 className="text-heading font-semibold">
              {order?.pricing.shipping}
            </h3>
          </div>
          <div
            className="flex text-lg justify-between"
          >
            <h3 className="text-heading font-bold">
              {isEn ? 'Total' : 'الاجمالي'}
            </h3>
            <h3 className="text-content font-bold">
              {order?.pricing.total}
            </h3>
          </div>
        </li>     
      )}
    </ul>
  )
}
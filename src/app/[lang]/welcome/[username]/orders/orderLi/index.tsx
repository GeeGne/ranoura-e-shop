// COMPONENTS
import NoOrder from '@/app/[lang]/welcome/[username]/orders/orderLi/NoOrder';
import LoadingLayout from '@/app/[lang]/welcome/[username]/orders/orderLi/LoadingLayout';
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
import STATUS_TRANSLATIONS from '@/json/translate/STATUS_TRANSLATIONS.json';

// UTILS
import formatDate from '@/utils/date/formatDate';
import getTranslation from '@/utils/getTranslation';

type OrderStatus = keyof typeof orderStatusSimplified;

type Props = {
  orders?: any[];
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

  const organizeOrdersByDate = (orders: any[]) => {
    return orders?.sort((a: Record<string, any> , b: Record<string, any>) => {
      const dateA = new Date(a?.created_at);
      const dateB = new Date(b?.created_at);

      if (!dateA || !dateB) return 0;
      if (!dateA) return 1; // or -1 depending on your sorting preference
      if (!dateB) return -1;
      console.log('orders: ', orders);
      console.log('dateA: ', dateA);
      console.log('dateB: ', dateB);
      const timestampA: any = dateA?.getTime();
      const timestampB: any = dateB?.getTime();
      console.log('timestampA: ', timestampA);
      console.log('timestampB: ', timestampB);
      return timestampB - timestampA;
    })
  }

  if (isLoading) return (
    <LoadingLayout 
      isEn={isEn}
      lang={lang}
    />
  )

  if (areOrdersEmpty) return ( 
    <NoOrder 
      lang={lang}
      isEn={isEn}
    />
  )

  console.log('organizeOrdersByDate(orders): ', organizeOrdersByDate(orders));

  return (
    <ul
      className="flex flex-col gap-4 w-full p-4 mt-[-1rem] max-w-[1400px] lg:mx-auto bg-[var(--background-light-color)]"
      { ...props }
    >
      {organizeOrdersByDate(orders)?.map((order: Record<string, any>, i: number) => 
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
              {getTranslation(STATUS_TRANSLATIONS, order?.status, lang).toUpperCase()}
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
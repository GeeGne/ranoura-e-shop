// COMPONENTS
import ItemsList from '@/components/ItemsList';
import StatusMap from '@/app/[lang]/welcome/[username]/orders/StatusMap';
import ProductsLists from '@/app/[lang]/welcome/[username]/orders/ProductsLists';
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
  order?: Record<string, any>;
  lang?: 'en' | 'ar';
  isEn?: boolean
} & React.ComponentPropsWithRef<"li">;

export default function OrdersLi ({ lang = 'en', isEn = true, order, ...props }: Props) {

  const getOrderStatusColor = (status: string) => {
    if (!status)  return 'red';
    if (status in orderStatusSimplified) {
      return orderStatusSimplified[status as OrderStatus]?.color;
    }
    return 'red';

  };

  return (
    <li
      className="flex flex-col gap-4 w-full p-4 max-w-[1400px] mx-auto bg-background rounded-lg"
      { ...props }
    >
      <StatusMap 
        lang={lang} 
        isEn={isEn}
        status={order?.status}
      />
      <div
        className="flex text-lg justify-between"
      >
        <h3 className="text-body-light font-bold">
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
        <h3 className="text-heading font-bold">
          {formatDate(order?.created_at)}
        </h3>
      </div>
      <hr className="border-inbetween" />
      <h2 className="text-body font-semibold text-lg">{isEn ? 'Ordered Items (3)' : '(3)عدد القطع'}</h2>
      <ItemsList 
        items={order?.items?.products}
        lang={lang}
      />
      <div
        className="flex justify-between"
      >
        <h3 className="text-body">
          {isEn ? 'Shipping Fee' : 'تكاليف الطلب'}
        </h3>
        <h3 className="text-heading font-bold">
          {order?.shipping_fee}
        </h3>
      </div>
      <div
        className="flex justify-between"
      >
        <h3 className="text-body">
          {isEn ? 'Products Total' : 'اجمالي القطع'}
        </h3>
        <h3 className="text-heading font-bold">
          {order?.products_total}
        </h3>
      </div>
      <div
        className="flex text-lg justify-between"
      >
        <h3 className="text-heading font-bold">
          {isEn ? 'Total' : 'الاجمالي'}
        </h3>
        <h3 className="text-content font-bold">
          {order?.total}
        </h3>
      </div>
      <hr className="border-inbetween" />
      <ProductsLists 
        productsArray={order?.products}
      />
    </li>     
  )
}
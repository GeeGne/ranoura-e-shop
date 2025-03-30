// COMPONENTS
import ProductsLists from '@/app/[lang]/welcome/[username]/orders/ProductsLists';
import LineMdTextBoxToTextBoxMultipleTransition from '@/components/svgs/LineMdTextBoxToTextBoxMultipleTransition';
import LineMdMapMarkerLoop from '@/components/svgs/LineMdMapMarkerLoop';

// ASSETS
const outfit1 = "/assets/img/outfit-2.jpg";

type Props = {
  order?: any;
} & React.ComponentPropsWithRef<"li">;

export default function OrdersLi ({ order, ...props }: Props) {

  return (
    <li
      className="flex flex-col gap-4 w-full p-4 max-w-[1400px] mx-auto bg-background rounded-lg"
      { ...props }
    >
      <div
        className="flex text-lg justify-between"
      >
        <h3 className="text-body-light font-bold">
          #{order?.id}
        </h3>
        <h3 className="text-green-600 font-bold">
          {order?.status}
        </h3>
      </div>
      <div
        className="flex justify-between"
      >
        <h3 className="text-body">
          Requested Date
        </h3>
        <h3 className="text-heading font-bold">
          {order?.date}
        </h3>
      </div>
      <div
        className="flex justify-between"
      >
        <h3 className="text-body">
          Shipping Fee
        </h3>
        <h3 className="text-heading font-bold">
          {order?.shipping_fee}
        </h3>
      </div>
      <div
        className="flex justify-between"
      >
        <h3 className="text-body">
          Products Total
        </h3>
        <h3 className="text-heading font-bold">
          {order?.products_total}
        </h3>
      </div>
      <div
        className="flex text-lg justify-between"
      >
        <h3 className="text-heading font-bold">
          Total
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
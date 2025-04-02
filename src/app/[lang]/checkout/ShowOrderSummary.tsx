// HOOKS
import { useRef, useState } from 'react';

// COMPONENTS
import OrderSummary from '@/components/OrderSummary';
import LineMdDownloadOutlineLoop from '@/components/svgs/activity/LineMdDownloadOutlineLoop';
import LineMdDownloadTwotoneLoop from '@/components/svgs/activity/LineMdDownloadTwotoneLoop';
import LineMdUploadOutlineLoop from '@/components/svgs/activity/LineMdUploadOutlineLoop';
import LineMdUploadTwotoneLoop from '@/components/svgs/activity/LineMdUploadTwotoneLoop';

// STORES
import { useCartStore } from "@/stores/index";

// UTILS
import calculateTotalPrice from '@/utils/calculateTotalPrice';
import calculatePriceAfterDiscount from '@/utils/calculatePriceAfterDiscount';
import getProduct from '@/utils/getProduct';

// JSON
import products from '@/json/products.json';

type Props = {
  className?: string;
} & React.ComponentPropsWithRef<"div">;

export default function ShowOrderSummary ({ className, ...props }: Props) {
  
  const [ toggle, setToggle ] = useState<boolean>(false);
  const orderSummaryRef = useRef<HTMLUListElement>(null);
  const cart = useCartStore(state => state.cart)

  const getRefTotalHeight = (ref: any) => ref.current?.scrollHeight;

  const pricesArray = () => 
    cart.map(product => 
      calculatePriceAfterDiscount({
        price: getProduct(products, product.id).price, 
        discount: getProduct(products, product.id).discount_percent
      }) * product.quantity
    )
  ;

  // DEBUG & UI
  // console.log('orderSummaryRef: ', orderSummaryRef.current);
  // console.log('orderSummary total height: ', orderSummaryRef.current?.scrollHeight);
  // console.log('calucalteTotalPrice', calculateTotalPrice(pricesArray()));
  // console.log('pricesArray', pricesArray());
  return (
    <div
      className={`
        flex flex-col py-4 border-solid border-b-[1px] border-inbetween lg:gap-8
        ${className}
      `}
      {...props}
    >
      <button
        className="lg:hidden group flex gap-2"
        onClick={() => setToggle(val => !val)}
      >
        <span
          className={`
            text-content text-base
            ${toggle ? 'font-bold' : 'font-medium'}
            transition-all duration-300 ease-in-out
          `}
        >
          {toggle ? 'Hide Order Summary' : 'Show Order Summary'}
        </span>
        {toggle 
          ? <div
              className="relative"
            >
              <LineMdUploadOutlineLoop
                className="text-content" 
              />
              <LineMdUploadTwotoneLoop
                className="
                  absolute top-0 left-0 text-content
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300 ease-in-out
                " 
              />
            </div>
          : <div
              className="relative"
            >
              <LineMdDownloadOutlineLoop
                className="text-content" 
              />
              <LineMdDownloadTwotoneLoop
                className="
                  absolute top-0 left-0 text-content
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300 ease-in-out
                " 
              />
            </div>
        }
        <span className="text-lg text-heading font-bold ml-auto">
          {calculateTotalPrice(pricesArray())} SYP
        </span>
      </button>
      <section
        className="hidden lg:flex lg:items-center"
      >
        <h2
          className="text-5xl text-content font-light"
        >
          ORDER SUMMARY
        </h2>
        <span className="text-lg text-heading font-bold ml-auto">
          {calculateTotalPrice(pricesArray())} SYP
        </span>
      </section>
      <OrderSummary 
        className={`
          lg:hidden overflow-hidden
          transition-all duration-300 ease-in-out
        `}
        style={{
          maxHeight: toggle ? getRefTotalHeight(orderSummaryRef) + 8 + 'px' : '0px',
          paddingTop: toggle ? '0.5rem' : '0',
          opacity: toggle ? '1' : '0',
        }}
        ref={orderSummaryRef}
      />
      <div
        className={`
          flex flex-col gap-4 overflow-hidden
        `}
      >       
        <OrderSummary
          className={`
            hidden lg:flex max-h-[486px] overflow-y-scroll
          `}        
          hideTotalSection={true}
        />
        <OrderSummary
          className={`
            hidden lg:flex 
          `}
          hideProductsSection={true}
        />
      </div>   
    </div>
  )
}
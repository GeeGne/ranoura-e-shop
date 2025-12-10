// HOOKS
import { useEffect, useRef, useState } from "react";

// COMPONENTS
import OrderSummary from "@/components/OrderSummary";
import LineMdDownloadOutlineLoop from "@/components/svgs/activity/LineMdDownloadOutlineLoop";
import LineMdDownloadTwotoneLoop from "@/components/svgs/activity/LineMdDownloadTwotoneLoop";
import LineMdUploadOutlineLoop from "@/components/svgs/activity/LineMdUploadOutlineLoop";
import LineMdUploadTwotoneLoop from "@/components/svgs/activity/LineMdUploadTwotoneLoop";

// STORES
import { useCartStore, useLanguageStore } from "@/stores/index";

// UTILS
import calculateTotalPrice from "@/utils/calculateTotalPrice";
import calculatePriceAfterDiscount from "@/utils/calculatePriceAfterDiscount";
import getProduct from "@/utils/getProduct";

// JSON
// import products from "@/json/products.json";

type Props = {
  className?: string;
  isLoading?: boolean;
} & React.ComponentPropsWithRef<"div">;

export default function LoadingLayout({ 
  className,
  isLoading = false,
  ...props
}: Props) {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

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
      >
        <span
          className={`
            text-content text-base
            transition-all duration-300 ease-in-out
            font-medium
          `}
        >
          ///////////////////
        </span>
        <div className="relative">
          <LineMdDownloadOutlineLoop className="text-content" />
          <LineMdDownloadTwotoneLoop
            className="
                absolute top-0 left-0 text-content
                opacity-0 group-hover:opacity-100
                transition-all duration-300 ease-in-out
              "
          />
        </div>
        <span 
          className={`
            text-lg text-heading font-bold ${isEn ? 'ml-auto' : 'mr-auto'}
          `}
        >
          ////////////////
        </span>
      </button>
      {/* <section className="hidden lg:flex lg:items-center lg:justify-between">
        <h2 className="text-5xl text-content font-light">
          {isEn ? 'ORDER SUMMARY' : 'ملخص الطلب'}
        </h2>
        <span className="text-lg text-heading font-bold">
          {calculateTotalPrice(pricesArray())} SYP
        </span>
      </section>
      <OrderSummary
        className={`
          lg:hidden overflow-hidden
          transition-all duration-300 ease-in-out
        `}
        products={products}
        style={{
          maxHeight: toggle
            ? getRefTotalHeight(orderSummaryRef) + 8 + "px"
            : "0px",
          paddingTop: toggle ? "0.5rem" : "0",
          opacity: toggle ? "1" : "0",
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
          products={products}
        />
        <OrderSummary
          className={`
            hidden lg:flex 
          `}
          hideProductsSection={true}
          products={products}
        />
      </div> */}
    </div>
  );
}

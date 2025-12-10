// HOOKS
import { useEffect, useRef, useState } from "react";

// COMPONENTS
import OrderSummary from "@/components/orderSummary/index";
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
        --opacity-blink flex flex-col py-4 border-solid border-b-[1px] border-background-light lg:gap-8
        ${className}
      `}
      {...props}
    >
      <button
        className="lg:hidden group flex gap-2"
      >
        <span
          className={`
            bg-background-light text-transparent rounded-md
            text-base font-medium
            transition-all duration-300 ease-in-out
          `}
        >
          ///////////////////
        </span>
        <span className="text-transparent bg-background-light rounded-md">
          //////
        </span> 
        <span 
          className={`
            bg-background-light rounded-md text-lg text-transparent font-bold ${isEn ? 'ml-auto' : 'mr-auto'}
          `}
        >
          ////////////////
        </span>
      </button>
      <section className="hidden lg:flex lg:items-center lg:justify-between">
        <h2 className="text-transparent bg-background-light text-5xl text-content font-light rounded-md">
          ////////////
        </h2>
        <span className="bg-background-light text-transparent text-lg font-bold rounded-md">
          ////////
        </span>
      </section>
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
          isLoading={true}
        />
        <OrderSummary
          className={`
            hidden lg:flex 
          `}
          hideProductsSection={true}
          isLoading={true}
        />
      </div>
    </div>
  );
}

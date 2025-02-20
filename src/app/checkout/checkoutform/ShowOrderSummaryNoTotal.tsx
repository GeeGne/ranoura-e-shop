// HOOKS
import { useRef, useState } from 'react';

// COMPONENTS
import Title from '@/app/checkout/checkoutform/Title';
import OrderSummary from '@/components/OrderSummary';
import LineMdDownloadOutlineLoop from '@/components/svgs/activity/LineMdDownloadOutlineLoop';
import LineMdDownloadTwotoneLoop from '@/components/svgs/activity/LineMdDownloadTwotoneLoop';
import LineMdUploadOutlineLoop from '@/components/svgs/activity/LineMdUploadOutlineLoop';
import LineMdUploadTwotoneLoop from '@/components/svgs/activity/LineMdUploadTwotoneLoop';


type Props = {
  className?: string;

}

export default function ShowOrderSummaryNoTotal ({className, ...props}: Props) {
  
  const [ toggle, setToggle ] = useState<boolean>(false);
  const orderSummaryRef = useRef<HTMLUListElement>(null);

  const getRefTotalHeight = (ref: any) => ref.current?.scrollHeight;

  // DEBUG
  // console.log('orderSummaryRef: ', orderSummaryRef.current);
  // console.log('orderSummary total height: ', orderSummaryRef.current?.scrollHeight);

  return (
    <div
      className={`
        flex flex-col py-4 border-solid border-b-[1px] border-inbetween
        ${className}
      `}

      {...props}
    >
      <button
        className="group flex gap-2"
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
          500 SYP
        </span>
      </button>
      <OrderSummary 
        className={`
          overflow-hidden
          transition-all duration-300 ease-in-out
        `}
        style={{
          maxHeight: toggle ? getRefTotalHeight(orderSummaryRef) + 8 + 'px' : '0px',
          paddingTop: toggle ? '0.5rem' : '0',
        }}
        ref={orderSummaryRef}
      />
    </div>
  )
}
// HOOKS
import { useState, useRef, useEffect } from 'react';

// COMPONENTS
import Title from '@/app/[lang]/checkout/checkoutform/Title';
import OrderSummary from '@/components/orderSummary/index';
import BtnA from '@/components/BtnA';
import LineMdChevronSmallDown from '@/components/svgs/LineMdChevronSmallDown';
import LineMdConfirmCircleTwotone from '@/components/svgs/LineMdConfirmCircleTwotone';
import LineMdConfirmCircleTwotoneToCircleTwotoneTransition from '@/components/svgs/LineMdConfirmCircleTwotoneToCircleTwotoneTransition';
import LineMdSquareTwotoneToConfirmSquareTransition from '@/components/svgs/LineMdSquareTwotoneToConfirmSquareTransition';
import LineMdConfirmSquareToSquareTransition from '@/components/svgs/LineMdConfirmSquareToSquareTransition';
import LineMdSquareToConfirmSquareTwotoneTransition from '@/components/svgs/LineMdSquareToConfirmSquareTwotoneTransition';
import LineMdSquareToConfirmSquareTransition from '@/components/svgs/LineMdSquareToConfirmSquareTransition';
import LineMdArrowsVerticalAlt from '@/components/svgs/LineMdArrowsVerticalAlt';

// JSON
import deliverTo from '@/json/deliverTo.json';

// STORE
import { useLanguageStore } from '@/stores/index';

type Props = {
  className?: string;
  products?: Record<string, any>;
} & React.ComponentPropsWithRef<"form">;

export default function LoadingLayout ({ 
  className,
  products = [],
  ...props
}: Props) {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  return (
    <form 
      className={`
        flex flex-col divide-solid divide-background-light divide-y-[1px]
        ${className}
      `}
      { ...props }
    >
      <section
        className="py-4 flex flex-col gap-4"
      >
        <Title 
          className="pb-4" 
          text={isEn ? "Deliver To" : "توصيل الى"} 
          info={isEn 
            ? "Enter the address where you’d like your order to be delivered. Double-check the details to ensure everything is accurate and up-to-date for a smooth delivery experience!" 
            : "أدخل العنوان الذي تريد تسليم طلبك إليه. تحقق مرة أخرى من التفاصيل للتأكد من أن كل شيء دقيق ومحدث لتجربة تسليم سلسة!" 
          }
          isLoading={true}
        />
        <label
          className="relative"
          htmlFor="deliverTo"
        >
          <input 
            type="text"
            name="deliverTo"
            id="deliverTo"
            readOnly
            className="
              --opacity-blink peer w-full py-3 px-4 bg-background-light rounded-lg
              border-none outline-none
              text-heading text-lg font-bold
              transition-all duration-200 ease-in-out
            "
          />
          <div
            className={`
              absolute top-1/2 translate-y-[-50%]
              --opacity-blink bg-background-light text-transparent 
              peer-focus:text-heading 
              transition-all duration-200 ease-in-out
              ${isEn ? 'right-4' : 'left-4'}
            `}
         />
        </label>
        <div className="flex justify-between">
          <h4 className="--opacity-blink text-transparent bg-background-light rounded-md">
            /////////////////////
          </h4>
          <span className="--opacity-blink text-transparent bg-background-light rounded-md font-bold">
            ////////////
          </span>
        </div>
      </section>
      <section
        className="flex flex-col gap-4 py-4"
      >
        <Title 
          className="pb-4" 
          text={isEn ? "Contact Phone Number" : "رقم هاتف الاتصال"}
          info={
            isEn 
            ? "Please share a phone number where we can contact you about your order. This ensures we can reach you quickly for delivery updates or questions!" 
            : `يرجى مشاركة رقم هاتف يمكننا من خلاله التواصل معك بشأن طلبك. هذا يضمن أن نتمكن من الوصول إليك بسرعة لتحديثات التسليم أو الأسئلة!`
          }
          isLoading={true}
        />
        <label
          className="group relative flex items-center gap-4 group cursor-pointer"
        >
          <input 
            className="invisible peer"
            type="radio"
          />
          <div
            className={`
              --opacity-blink bg-background-light absolute top-1/2
              translate-y-[-50%] w-6 h-6 
              ${isEn ? 'left-0' : 'right-0'}
            `}
          />
          <span
            className={`
              --opacity-blink bg-background-light text-transparent rounded-md
              transition-all duration-300 ease-in-out
            `}
          >
            ///////////////////////////////////
          </span>
        </label>
        <label
          className="relative flex items-center gap-4 group cursor-pointer"
          htmlFor="newPhoneNumber"
        >
          <input 
            className="invisible peer"
            type="radio"
            id="newPhoneNumber"
            name="phoneNumber"
          />
          <div
            className={`
              --opacity-blink bg-background-light
              absolute top-1/2
              translate-y-[-50%] w-6 h-6 text-heading
              ${isEn ? 'left-0' : 'right-0'}
            `}
          />
          <span
            className={`
              --opacity-blink bg-background-light text-transparent rounded-md
              transition-all duration-300 ease-in-out
            `}
          >
            ////////////////////
          </span>
        </label>
      </section>
      <section
        className="flex flex-col gap-4 py-4"
      >
        <Title 
          className="pb-4" 
          text={isEn ? "Shipping Address" : "عنوان الشحن"} 
          info={isEn 
            ? "Where should we send your order? Please provide the full address, including any necessary details like apartment numbers or landmarks, to ensure your package arrives safely and on time."
            : "إلى أين يجب أن نرسل طلبك؟ يرجى تقديم العنوان الكامل، بما في ذلك أي تفاصيل ضرورية مثل أرقام الشقق أو المعالم، لضمان وصول طردك بأمان وفي الوقت المحدد."
          }
          isLoading={true}
        />
        <label
          className="relative flex w-full"
          htmlFor="addressDetails"
        >
        <input
          className={`
            --opacity-blink bg-background-light border-none
            outline-none text-heading
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
          `}
          id="addressDetails"
          name="addressDetails"
          type="text"
        />
      </label>
        <label
          className="relative flex w-full"
          htmlFor="secondAddress"
        >
        <input
          className={`
            --opacity-blink bg-background-light border-none
            outline-none
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
            border-body border-[2px]
          `}
          id="secondAddress"
          name="secondAddress"
          type="secondAddress"
        />
        </label>
        <label
          className="relative flex w-full"
          htmlFor="notes"
        >
          <input
            className={`
              --opacity-blink bg-background-light border-none
              outline-none text-heading autofill:bg-red-500
              transition-all duration-300 ease-in-out
              w-full py-2 px-4 rounded-md
              border-body border-[2px]
            `}
            id="notes"
            name="notes"
            type="notes"
          />
        </label>
      </section>
      <section
        className="flex lg:hidden flex-col gap-4 py-4"
      > 
        <div
          className="flex justify-between items-center"
        >
          <Title 
            className="pb-4" 
            text={isEn ? "Order Summary" : "ملخص الطلب"}
            infoEnabled={false}
            isLoading={true}
          />
          <button
            className="flex items-center gap-2"
            data-type="toggle_orderSummary_button_is_clicked"
          >
            <span
              className="--opacity-blink bg-background-light text-sm text-transparent font-bold rounded-md"
            >
              ///////
            </span>
            <div 
              className="--opacity-blink bg-background-light text-transparent w-5 h-5 rounded-full" 
            />
          </button>
        </div>
        <div
          className={`
            flex flex-col gap-4
            transition-all duration-300 ease-in-out
          `}          
        >
          <OrderSummary
            className={`
              overflow-hidden
              transition-all duration-300 ease-in-out
            `}
            hideTotalSection={true}
            isLoading={true}
          />
          <OrderSummary
            hideProductsSection={true}
            isLoading={true}
          />      
        </div>
      </section>
      <section
        className="flex flex-col gap-4 pt-8"
      >
        <BtnA
          className="--opacity-blink bg-background-light text-transparent font-bold rounded-lg p-2"
        >
          /////////////
        </BtnA>
      </section>
    </form>
  )
}
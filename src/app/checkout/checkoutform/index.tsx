// HOOKS
import { useState, useRef } from 'react';

// COMPONENTS
import Title from '@/app/checkout/checkoutform/Title';
import OrderSummary from '@/components/OrderSummary';
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

type Props = {
  className?: string;
} & React.ComponentPropsWithRef<"form">;

export default function CheckoutForm ({ className, ...props }: Props) {

  const [ isAddressDetailsFocus, setIsAddressDetailsFocus ] = useState<boolean>(false);
  const [ isSecondAddressFocus, setIsSecondAddressFocus ] = useState<boolean>(false);
  const [ isNotesFocus, setIsNotesFocus ] = useState<boolean>(false);
  const [ selectedPhoneNumberRadio, setSelectedPhoneNumberRadio ] = useState<string>('existedPhoneNumber');
  const [ toggleOrderSummary, setToggleOrderSummary ] = useState<boolean>(false);
  const [ selectedDeliverToCity, setSelectedDeliverToCity ] = useState<{
     city?: string; shippingFee?: string | number 
    }>({
    city: 'Pick Your City',
    shippingFee: '--'
  });
  
  const orderSummaryRef = useRef<HTMLElement>(null);
  const getRefTotalHeight = (ref: any) => ref.current?.scrollHeight;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLLIElement>) => {
    const { type, city, shippingFee } = e.currentTarget.dataset;

    switch (type) {
      case 'toggle_orderSummary_button_is_clicked':
        setToggleOrderSummary(val => !val);
        break;
      case 'deliverTo_list_is_clicked':
        setSelectedDeliverToCity({
          city,
          shippingFee      
        });
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value, id } = e.currentTarget;
    
    switch (name) {
      case 'phoneNumber':
        if (checked) setSelectedPhoneNumberRadio(id);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'addressDetails':
        setIsAddressDetailsFocus(true);
        break;
      case 'secondAddress':
        setIsSecondAddressFocus(true);
        break;
      case 'notes':
        setIsNotesFocus(true);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    if (value !== "" ) return;

    switch (name) {
      case 'addressDetails':
        setIsAddressDetailsFocus(false);
        break;
      case 'secondAddress':
        setIsSecondAddressFocus(false);
        break;
      case 'notes':
        setIsNotesFocus(false);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  };

  // DEBUG & UI
  // console.log('selectedDeliverToCity: ', selectedDeliverToCity);
  // console.log('isDeliverToFocus: ', isDeliverToFocus);

  return (
    <form 
      className={`
        flex flex-col divide-solid divide-inbetween divide-y-[1px]
        ${className}
      `}
      onSubmit={handleSubmit}
      { ...props }
    >
      <section
        className="py-4 flex flex-col gap-4"
      >
        <Title 
          className="pb-4" 
          text="Deliver To" 
          info="Enter the address where you’d like your order to be delivered. Double-check the details to ensure everything is accurate and up-to-date for a smooth delivery experience!" 
        />
        <div
          className="relative"
        >
          <input 
            type="text"
            name="deliverTo"
            id="deliverTo"
            readOnly
            value={selectedDeliverToCity.city}
            className="
              peer w-full py-3 px-4 bg-transparent
              border-solid border-inbetween focus:border-primary border-[2px] focus:border-[2px] rounded-lg
              text-heading text-lg font-bold
              transition-all duration-200 ease-in-out
            "
          />
          <LineMdChevronSmallDown
            className="
              absolute top-1/2 translate-y-[-50%] right-4
              text-body peer-focus:text-heading 
              transition-all duration-200 ease-in-out
            "
         />
          <ul
            className={`
              absolute flex flex-col 
              top-full left-0 w-full max-h-[250px] px-1 py-1 overflow-y-scroll
              bg-background text-body drop-shadow-md rounded-lg z-[5]
              transition-all delay-100 duration-200 ease-in-out origin-top
              scale-y-0 peer-focus:scale-y-[100%]
              opacity-0 peer-focus:opacity-100
            `}
          >
            {deliverTo.map(itm =>
              <li
                className="
                  py-2 px-3 hover:bg-content-invert hover:text-content hover:font-bold
                  rounded-md
                  transition-all duration-200 ease-in-out
                "
                role="button"
                data-city={itm.city}
                data-shipping-fee={itm.shippingFee}
                data-type="deliverTo_list_is_clicked"
                key={itm.id}
                onClick={handleClick}
              >
                {itm.city}
              </li>
            )}
          </ul>
        </div>
        <div className="flex justify-between">
          <h4 className="text-body">Shipping Fee:</h4>
          <span className="text-heading font-bold">{selectedDeliverToCity.shippingFee}</span>
        </div>
      </section>
      <section
        className="flex flex-col gap-4 py-4"
      >
        <Title 
          className="pb-4" 
          text="Contact Phone Number" 
          info="Please share a phone number where we can contact you about your order. This ensures we can reach you quickly for delivery updates or questions!" 
        />
        <label
          className="group relative flex items-center gap-4 group cursor-pointer"
          htmlFor="existedPhoneNumber"
        >
          <input 
            className="invisible peer"
            type="radio"
            defaultChecked
            id="existedPhoneNumber"
            name="phoneNumber"
            data-title="none"
            onChange={handleChange}
          />
          {selectedPhoneNumberRadio === 'existedPhoneNumber'
            ? <LineMdSquareToConfirmSquareTransition
                className={`
                  absolute top-1/2 left-[0]
                  translate-y-[-50%] w-6 h-6 text-heading
                `}
              />
            : <LineMdConfirmSquareToSquareTransition
                className={`
                  absolute top-1/2 left-[0]
                  translate-y-[-50%] w-6 h-6 text-body
                `}
              />
          }
          <span
            className={`
              transition-all duration-300 ease-in-out
              text-body peer-checked:text-heading peer-checked:font-bold
              transition-all duration-200 ease-in-out
            `}
          >
            Add Your personal account Number
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
            data-title="none"
            onChange={handleChange}
          />
          {selectedPhoneNumberRadio === 'newPhoneNumber'
            ? <LineMdSquareToConfirmSquareTransition
                className={`
                  absolute top-1/2 left-[0]
                  translate-y-[-50%] w-6 h-6 text-heading
                `}
              />
            : <LineMdConfirmSquareToSquareTransition
                className={`
                  absolute top-1/2 left-[0]
                  translate-y-[-50%] w-6 h-6 text-body
                `}
              />
          }
          <span
            className={`
              transition-all duration-300 ease-in-out
              text-body peer-checked:text-heading peer-checked:font-bold
              transition-all duration-200 ease-in-out
            `}
          >
            Add another Phone Number
          </span>
        </label>
      </section>
      <section
        className="flex flex-col gap-4 py-4"
      >
        <Title 
          className="pb-4" 
          text="Shipping Address" 
          info="Where should we send your order? Please provide the full address, including any necessary details like apartment numbers or landmarks, to ensure your package arrives safely and on time."
        />
        <label
        className="relative flex w-full"
        htmlFor="addressDetails"
      >
        <span
          className={`
            absolute left-3 translate-y-[-50%]
            px-1 bg-background peer-autofill:top-0
            transition-all duration-300 ease-in-out
            ${isAddressDetailsFocus ? 'top-0 text-xs text-heading font-bold' : 'top-1/2 text-base text-body-light'}
          `}
        >
          Address Details
        </span>
        <input
          className={`
            bg-transparent border-solid
            outline-none text-heading
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
            ${isAddressDetailsFocus ? 'border-body border-[2px]' : 'border-[1px] border-inbetween'}
          `}
          id="addressDetails"
          name="addressDetails"
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </label>
        <label
        className="relative flex w-full"
        htmlFor="secondAddress"
      >
        <span
          className={`
            absolute left-3 translate-y-[-50%]
            px-1 bg-background peer-autofill:top-0
            transition-all duration-300 ease-in-out
            ${isSecondAddressFocus ? 'top-0 text-xs text-heading font-bold' : 'top-1/2 text-base text-body-light'}
          `}
        >
          Second Address (optional)
        </span>
        <input
          className={`
            bg-transparent border-solid
            outline-none text-heading autofill:bg-red-500
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
            ${isSecondAddressFocus ? 'border-body border-[2px]' : 'border-[1px] border-inbetween'}
          `}
          id="secondAddress"
          name="secondAddress"
          type="secondAddress"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        </label>
          <label
          className="relative flex w-full"
          htmlFor="notes"
        >
          <span
            className={`
              absolute left-3 translate-y-[-50%]
              px-1 bg-background peer-autofill:top-0
              transition-all duration-300 ease-in-out
              ${isNotesFocus ? 'top-0 text-xs text-heading font-bold' : 'top-1/2 text-base text-body-light'}
            `}
          >
            Notes (optional)
          </span>
          <input
            className={`
              bg-transparent border-solid
              outline-none text-heading autofill:bg-red-500
              transition-all duration-300 ease-in-out
              w-full py-2 px-4 rounded-md
              ${isNotesFocus ? 'border-body border-[2px]' : 'border-[1px] border-inbetween'}
            `}
            id="notes"
            name="notes"
            type="notes"
            onFocus={handleFocus}
            onBlur={handleBlur}
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
            text="Order Summary" 
            infoEnabled={false}
          />
          <button
            className="flex items-center gap-2"
            data-type="toggle_orderSummary_button_is_clicked"
            onClick={handleClick}
          >
            <span
              className="text-sm text-content font-bold"
            >
              {toggleOrderSummary ? 'Hide' : 'Show'}
            </span>
            <LineMdArrowsVerticalAlt 
              className="text-content w-5 h-5" 
            />
          </button>
        </div>
        <div
          className={`
            flex flex-col 
            ${toggleOrderSummary ? 'gap-4' : 'gap-0'}
            transition-all duration-300 ease-in-out
          `}          
        >
          <OrderSummary
            className={`
              overflow-hidden
              transition-all duration-300 ease-in-out
            `}
            hideTotalSection={true}
            style={{maxHeight: toggleOrderSummary ? `${getRefTotalHeight(orderSummaryRef)}px` : '0'}}
            ref={orderSummaryRef}
          />
          <OrderSummary
            hideProductsSection={true}
          />      
        </div>
      </section>
      <section
        className="flex flex-col gap-4 py-4"
      >
        <BtnA
          className="cool-bg-grad-m text-heading-invert font-bold rounded-lg p-2"
        >
          PLACE ORDER
        </BtnA>
      </section>
    </form>
  )
}
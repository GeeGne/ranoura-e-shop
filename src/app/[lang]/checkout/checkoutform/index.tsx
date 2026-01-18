// HOOKS
import { useState, useRef, useEffect } from 'react';

// COMPONENTS
import Title from '@/app/[lang]/checkout/checkoutform/Title';
import OrderSummary from '@/components/orderSummary/index';
import LoadingLayout from '@/app/[lang]/checkout/checkoutform/LoadingLayout';
import BtnA from '@/components/BtnA';
import LineMdChevronSmallDown from '@/components/svgs/LineMdChevronSmallDown';
import LineMdAlertCircleLoop from '@/components/svgs/activity/LineMdAlertCircleLoop';
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

// UTILS
import isInputValid from '@/utils/validation/isInputValid';
import formatPhoneNumber from '@/utils/formatPhoneNumber';

type Props = {
  className?: string;
  products?: Record<string, any>[];
  user?: Record<string, any> | null;
  cart?: Record<string,any>[];
  isLoading?: boolean;
  isError?: boolean;
} & React.ComponentPropsWithRef<"form">;

export default function CheckoutForm ({ 
  className,
  user = null,
  products = [],
  cart = [],
  isLoading = false,
  isError = false,
  ...props
}: Props) {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const [ shippingDetails, setShippingDetails ] = useState<Record<string, any>>({
    user_id: '',
    status:  'PENDING',
    products: '',
    total_items: 0,
    total: 0,
    customer_pfp: '',
    customer_full_name: '',
    customer_phone_number: '',
    email: '',
    shipping_address: {
      city: '',
      address_details: '',
      second_address: '',
      notes: ''
    },
    shipping_cost: '',
    currency: 'SYP',
    payment_method: 'cash',
  });

  const [ errorMessages, setErrorMessages ] = useState<Record<string, string>>({
    deliverTo: '',
    anotherPhoneNumber: '',
    address_details: '',
  });

  useEffect(() => {
    if (isLoading || isError || !user) return;
    const {
      id, first_name, last_name, email, 
      phone_number, profile_img_url, address
    } = user;

    const { city, address_details, second_address, notes } = address;

    setShippingDetails(val => ({
      ...val,
      user_id: id,
      customer_full_name: first_name + ' ' + last_name,
      email,
      customer_phone_number: phone_number,
      customer_pfp: profile_img_url,
      shipping_address: {
        city,
        address_details,
        second_address,
        notes
      }
    }))
  }, [user]);

  const [ selectedPhoneNumberRadio, setSelectedPhoneNumberRadio ] = useState<string>('existedPhoneNumber');
  const [ toggleOrderSummary, setToggleOrderSummary ] = useState<boolean>(false);
  const newNumberLabelOnStartUp = useRef<boolean>(true);
  
  const orderSummaryRef = useRef<HTMLElement>(null);
  const deliverToInptRef = useRef<HTMLElement | any>(null);
  const anotherNumberInptRef = useRef<HTMLElement | any>(null);
  const addressDetailsInptRef = useRef<HTMLInputElement>(null);
  const getRefTotalHeight = (ref: any) => ref.current?.scrollHeight;

  const getShippingCity = () => {
    const shippingInfo = deliverTo.find(itm => itm.shipping_address === shippingDetails.shipping_address.city)
    const cityTranslated = shippingInfo?.value[lang];
    if (!cityTranslated) return isEn ? 'Pick your city' : 'اختر محافظتك';
    return cityTranslated;
  };

  const clearPreviousValidity = () => {
    deliverToInptRef.current?.setCustomValidity('');
    anotherNumberInptRef.current?.setCustomValidity('');
    addressDetailsInptRef.current?.setCustomValidity('');
  };

  const handleLabelStartUp = () => {
    setTimeout(() => {
      newNumberLabelOnStartUp.current = false;
    }, 100)
    return '0s'
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearPreviousValidity();
    let areInptVerified = true;

    // check city
    const isCityPicked = shippingDetails.shipping_address.city;
    if (!isCityPicked) {
      const errorMessage = isEn 
        ? 'Choose your city to estimate delivery time and costs'
        : 'اخبرنا بمدينتك من فضلك, فهذا يساعدنا في تقدير وقت وتكلفه التوصيل'
      ;
      deliverToInptRef.current?.setCustomValidity(errorMessage);
      deliverToInptRef.current?.reportValidity();
      setErrorMessages(val => ({ ...val, deliverTo: errorMessage }));
      areInptVerified = false;
    }

    // check phone number
    const phoneNumber = shippingDetails.customer_phone_number;
    const { result: isPhoneNumberValid, message: phoneMessage } = isInputValid.checkout.phoneNumber(phoneNumber);
    const isAnotherPhoneNumberRadioSelected = selectedPhoneNumberRadio === 'newPhoneNumber';
    
    if (!isPhoneNumberValid && isAnotherPhoneNumberRadioSelected) {
      setErrorMessages((val: Record<string, string>) => ({ ...val, anotherPhoneNumber: phoneMessage[lang] }))
      anotherNumberInptRef.current?.setCustomValidity(phoneMessage[lang]);
      anotherNumberInptRef.current?.reportValidity();
      areInptVerified = false;
    }

    // check address details
    const addressDetails = shippingDetails.shipping_address.address_details;
    const { result: isAddressDetailsValid, message: addressMessage } = isInputValid.checkout.addressDetails(addressDetails);

    if (!isAddressDetailsValid) {
      setErrorMessages((val: Record<string, string>) => ({ ...val, address_details: addressMessage[lang] }));
      addressDetailsInptRef.current?.setCustomValidity(addressMessage[lang]);
      addressDetailsInptRef.current?.reportValidity();
      areInptVerified = false;
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLLIElement>) => {
    const { 
      type, city, shippingCost: shipping_cost
    } = e.currentTarget.dataset;

    switch (type) {
      case 'toggle_orderSummary_button_is_clicked':
        setToggleOrderSummary(val => !val);
        break;
      case 'deliverTo_list_is_clicked':
        deliverToInptRef.current?.setCustomValidity('');
        deliverToInptRef.current?.reportValidity();
        setShippingDetails(val =>({ 
          ...val, 
          shipping_address: {
            ...val.shipping_address,
            city 
          }, 
          shipping_cost: Number(shipping_cost)
        }));
        setTimeout(() => deliverToInptRef.current?.blur(), 100);
        // deliverToInptRef.current?.blur();
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value, id, } = e.currentTarget;
    
    switch (name) {
      case 'phoneNumberRadio':        
        setSelectedPhoneNumberRadio(id);

        const newNumberInptValue = anotherNumberInptRef.current.value;
        setShippingDetails(val => ({ 
          ...val, 
          customer_phone_number: id === "existedPhoneNumber" ? value : newNumberInptValue 
        }));
        break;
      case 'anotherPhoneNumber':
        const phone = formatPhoneNumber(value);
        if (selectedPhoneNumberRadio === 'newPhoneNumber') setShippingDetails(val => ({
          ...val, customer_phone_number: phone
        }));
        e.currentTarget.value = phone;

        const isPhoneNumberValid = isInputValid.checkout.phoneNumber(phone).result;
        if (isPhoneNumberValid) e.currentTarget.setCustomValidity('');
        e.currentTarget.reportValidity();
        break;
      case 'address_details':
        setShippingDetails(val => ({ 
          ...val, 
          shipping_address: {
            ...val.shipping_address,
            [name]: value 
          }
        }));
        const isAddressDetailsValid = isInputValid.checkout.addressDetails(value).result;
        if (isAddressDetailsValid) e.currentTarget.setCustomValidity('');
        e.currentTarget.reportValidity();
        break;
      case 'second_address':
      case 'notes':
        setShippingDetails(val => ({ 
          ...val, 
          shipping_address: {
            ...val.shipping_address,
            [name]: value 
          }
        }));
        break;
      default:
        console.error('Unknown name: ', name);
    }
  };

  // const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name } = e.currentTarget;

  //   e.currentTarget.scrollIntoView({ block: 'center', behavior: 'smooth' });

  //   switch (name) {
  //     case 'deliverTo':
  //       break;
  //     case 'addressDetails':
  //       setIsAddressDetailsFocus(true);
  //       break;
  //     case 'secondAddress':
  //       setIsSecondAddressFocus(true);
  //       break;
  //     case 'notes':
  //       setIsNotesFocus(true);
  //       break;
  //     default:
  //       console.error('Unknown name: ', name);
  //   }
  // };

  // const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.currentTarget;

  //   if (value !== "" ) return;

  //   switch (name) {
  //     case 'addressDetails':
  //       setIsAddressDetailsFocus(false);
  //       break;
  //     case 'secondAddress':
  //       setIsSecondAddressFocus(false);
  //       break;
  //     case 'notes':
  //       setIsNotesFocus(false);
  //       break;
  //     default:
  //       console.error('Unknown name: ', name);
  //   }
  // };

  // DEBUG & UI
  // console.log('selectedDeliverToCity: ', selectedDeliverToCity);
  console.log('shippingDetails: ', shippingDetails);
  // console.log('isDeliverToFocus: ', isDeliverToFocus);
  // console.log('selectedPhoneNumberRadio: ', selectedPhoneNumberRadio);
  console.log('user Refresh test: ', user);
  // console.log('newNumberLabelOnStartUp.current: ', newNumberLabelOnStartUp.current);

  if (isLoading) return (
    <LoadingLayout />
  )

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
        className="py-4 flex flex-col"
      >
        <Title 
          className="pb-2" 
          text={isEn ? "Deliver To" : "توصيل الى"} 
          info={isEn 
            ? "Enter the address where you’d like your order to be delivered. Double-check the details to ensure everything is accurate and up-to-date for a smooth delivery experience!" 
            : "أدخل العنوان الذي تريد تسليم طلبك إليه. تحقق مرة أخرى من التفاصيل للتأكد من أن كل شيء دقيق ومحدث لتجربة تسليم سلسة!" 
          }
        />
        <label
          className="peer relative flex flex-col py-4"
          htmlFor="deliverTo"
        >
          <input 
            className="
              peer absolute bottom-0 left-0 w-0 h-0 opacity-0
            "
            type="checkbox"
            name="deliverTo"
            id="deliverTo"
            ref={deliverToInptRef}
          />
          <div 
            className="
              peer w-full py-3 px-4 bg-transparent rounded-lg
              outline-none border-solid border-inbetween 
              peer-checked:border-primary border-[2px] peer-checked:border-[2px]
              text-body peer-checked:text-heading text-lg font-semibold
              peer-invalid:text-red-500 peer-invalid:border-red-500 
              transition-all duration-200 ease-in-out
            "
          >
            {getShippingCity()}
          </div>
          <LineMdChevronSmallDown
            className={`
              absolute top-1/2 translate-y-[-50%]
              text-body peer-checked:text-heading 
              peer-invalid:text-red-500 
              transition-all duration-200 ease-in-out
              ${isEn ? 'right-4' : 'left-4'}
            `}
          />
          <ul
            className={`
              absolute flex flex-col 
              top-full left-0 w-full max-h-[250px] px-1 py-1 overflow-y-scroll
              bg-background text-body drop-shadow-md rounded-lg z-[5]
              scale-y-0 peer-checked:scale-y-[100%]
              opacity-0 peer-checked:opacity-100
              transition-all delay-100 duration-200 ease-in-out origin-top
            `}
          >
            {deliverTo.map(itm =>
              <li
                key={itm.id}
                className="
                  py-2 px-3 hover:bg-content-invert hover:text-content hover:font-bold
                  rounded-md
                  transition-all duration-200 ease-in-out
                "
                role="button"
                data-city={itm.shipping_address}
                data-shipping-cost={itm.shipping_cost}
                data-shipping-value={itm.value[lang]}
                data-type="deliverTo_list_is_clicked"
                onClick={handleClick}
              >
                {itm.value[lang]}
              </li>
            )}
          </ul>
        </label>
        <div
          className="
            hidden peer-has-[:invalid]:flex
            items-center gap-2 px-2 pb-2
            text-red-400 peer-focus:text-red-500 text-sm font-semibold
            rounded-lg
            transition-all duration-200 ease-in-out
          "
        >
          <span>{errorMessages.deliverTo}</span>
          <LineMdAlertCircleLoop className="w-4 h-4"/>
        </div>
        <div className="flex justify-between">
          <h4 className="text-heading font-semibold">{isEn ? 'Shipping Fee:' : 'رسوم الشحن:'}</h4>
          <span className="text-heading font-semibold">{shippingDetails.shipping_cost || '--'}</span>
        </div>
      </section>
      <section>
        <fieldset
          className="flex flex-col py-4"
        >
          <Title 
            className="pb-4" 
            text={isEn ? "Contact Phone Number" : "رقم هاتف الاتصال"}
            info={
              isEn 
              ? "Please share a phone number where we can contact you about your order. This ensures we can reach you quickly for delivery updates or questions!" 
              : `يرجى مشاركة رقم هاتف يمكننا من خلاله التواصل معك بشأن طلبك. هذا يضمن أن نتمكن من الوصول إليك بسرعة لتحديثات التسليم أو الأسئلة!`
            }
          />
          <label
            className="group relative flex items-center gap-4 mb-2 group cursor-pointer"
            htmlFor="existedPhoneNumber"
          >
            <input 
              className="invisible peer"
              type="radio"
              defaultChecked
              id="existedPhoneNumber"
              name="phoneNumberRadio"
              data-title="none"
              value={user?.phone_number}
              onChange={handleChange}
            />
            {selectedPhoneNumberRadio === 'existedPhoneNumber'
              ? <LineMdSquareToConfirmSquareTransition
                  className={`
                    absolute top-1/2
                    translate-y-[-50%] w-6 h-6 text-heading
                    ${isEn ? 'left-0' : 'right-0'}
                  `}
                />
              : <LineMdConfirmSquareToSquareTransition
                  className={`
                    absolute top-1/2
                    translate-y-[-50%] w-6 h-6 text-body
                    ${isEn ? 'left-0' : 'right-0'}
                  `}
                />
            }
            <span
              className={`
                transition-all duration-300 ease-in-out
                text-body peer-checked:text-heading peer-checked:font-semibold
                transition-all duration-200 ease-in-out
              `}
            >
              {isEn ? 'Add Your personal account Number' : 'أضف رقم حسابك الشخصي'}
            </span>
          </label>
          <div
            className="flex flex-col"
          >
            <label
              className="relative flex items-center gap-4 cursor-pointer"
              htmlFor="newPhoneNumber"
            >
              <input 
                className="invisible peer"
                type="radio"
                id="newPhoneNumber"
                name="phoneNumberRadio"
                onChange={handleChange}
              />
                {
                  selectedPhoneNumberRadio === 'newPhoneNumber' 
                  ? <LineMdSquareToConfirmSquareTransition
                      className={`
                        absolute top-1/2
                        translate-y-[-50%] w-6 h-6 text-heading
                        ${isEn ? 'left-0' : 'right-0'}
                      `}
                    /> 
                  : <LineMdConfirmSquareToSquareTransition
                      className={`
                        absolute top-1/2
                        translate-y-[-50%] w-6 h-6 text-body
                        ${isEn ? 'left-0' : 'right-0'}
                      `}
                    /> 
                }
              <span
                className={`
                  transition-all duration-300 ease-in-out
                  text-body peer-checked:text-heading peer-checked:font-semibold
                  transition-all duration-200 ease-in-out
                `}
              >
                {isEn ? 'Add another Phone Number' : 'أضف رقم هاتف آخر'}
              </span>
            </label>
            <label
              className={`
                group
                ${selectedPhoneNumberRadio === 'newPhoneNumber' ? '--expand-checkout-label' : '--close-checkout-label'}
              `}
              htmlFor="anotherPhoneNumber"
              style={{ animationDuration: newNumberLabelOnStartUp.current ? handleLabelStartUp() : '0.3s'}}
            >
              <div className="peer relative">
                <input
                  className={`
                    peer bg-transparent
                    border border-solid outline-none text-heading
                    transition-all duration-300 ease-in-out
                    w-full py-2 px-4 rounded-md
                    border-[2px] border-inbetween focus:border-body
                    peer-invalid:text-red-400 peer-focus:peer-invalid:text-red-500
                    invalid:border-red-400 focus:border-body invalid:focus:border-red-600
                    transition-all duration-200 ease-in-out
                  `}
                  id="anotherPhoneNumber"
                  name="anotherPhoneNumber"
                  placeholder=""
                  type="text"
                  onChange={handleChange}
                  ref={anotherNumberInptRef}
                />
                <span
                  className={`
                    absolute translate-y-[-50%]
                    px-1 bg-background peer-autofill:top-0
                    text-body text-xs font-bold
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:font-semibold peer-placeholder-shown:text-base peer-placeholder-shown:text-body-light
                    peer-focus:top-0 peer-focus:text-xs peer-focus:text-heading peer-focus:font-bold
                    peer-invalid:text-red-400 peer-focus:peer-invalid:text-red-500
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-3' : 'right-3'}
                  `}
                >
                  {isEn ? 'Another Phone Number' : 'رقم هاتف اخر'}
                </span>
              </div>
              <div
                className="
                  hidden peer-has-[:invalid]:flex
                  items-center gap-2 p-2
                  text-red-400 peer-focus:text-red-500 text-sm font-semibold
                  rounded-lg z-[5]
                  transition-all duration-200 ease-in-out
                "
              >
                <span>{errorMessages.anotherPhoneNumber}</span>
                <LineMdAlertCircleLoop className="w-4 h-4"/>
              </div>
            </label>
          </div>
        </fieldset>
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
        />
        <label
          className="flex w-full flex-col"
          htmlFor="addressDetails"
        >
          <div className="peer relative">
            <input
              className={`
                peer bg-transparent
                border border-solid outline-none text-heading
                transition-all duration-300 ease-in-out
                w-full py-2 px-4 rounded-md
                border-[2px] border-inbetween focus:border-body
                invalid:border-red-400 focus:border-body invalid:focus:border-red-600
                transition-all duration-200 ease-in-out
              `}
              placeholder=""
              id="addressDetails"
              name="address_details"
              type="text"
              value={shippingDetails.shipping_address.address_details}
              onChange={handleChange}
              ref={addressDetailsInptRef}
            />
            <span
              className={`
                absolute translate-y-[-50%]
                px-1 bg-background peer-autofill:top-0
                text-body text-xs font-bold
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:font-semibold peer-placeholder-shown:text-base peer-placeholder-shown:text-body-light
                peer-focus:top-0 peer-focus:text-xs peer-focus:text-heading peer-focus:font-bold
                peer-invalid:text-red-400 peer-focus:peer-invalid:text-red-500
                transition-all duration-300 ease-in-out
                ${isEn ? 'left-3' : 'right-3'}
              `}
            >
              {isEn ? 'Address Details' : 'تفاصيل العنوان'}
            </span>
          </div>
          <div
            className="
              hidden peer-has-[:invalid]:flex
              items-center gap-2 p-2
              text-red-400 peer-focus:text-red-500 text-sm font-semibold
              rounded-lg z-[5]
              transition-all duration-200 ease-in-out
            "
          >
            <span>{errorMessages.address_details}</span>
            <LineMdAlertCircleLoop className="w-4 h-4"/>
          </div>
        </label>
        <label
          className="relative flex w-full flex-col"
          htmlFor="secondAddress"
        >
            <input
              className={`
                peer bg-transparent
                border border-solid outline-none text-heading
                transition-all duration-300 ease-in-out
                w-full py-2 px-4 rounded-md
                border-[2px] border-inbetween 
                invalid:border-red-400 focus:border-body invalid:focus:border-red-600
                transition-all duration-200 ease-in-out
              `}
              placeholder=""
              id="secondAddress"
              name="second_address"
              type="text"
              value={shippingDetails.shipping_address.second_address}
              onChange={handleChange}
            />
            <span
              className={`
                absolute translate-y-[-50%]
                px-1 bg-background peer-autofill:top-0
                text-body text-xs font-bold peer-focus:invalid:z-[10]
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:font-semibold peer-placeholder-shown:text-base peer-placeholder-shown:text-body-light
                peer-focus:top-0 peer-focus:text-xs peer-focus:text-heading peer-focus:font-bold
                peer-invalid:text-red-400 peer-focus:peer-invalid:text-red-500
                transition-all duration-300 ease-in-out
                ${isEn ? 'left-3' : 'right-3'}
              `}
            >
              {isEn ? 'Second Address (optional)' : 'العنوان الثاني (اختياري)'}
            </span>
        </label>
        <label
          className="relative flex w-full flex-col"
          htmlFor="notes"
        >
          <input
            className={`
              peer bg-transparent
              border border-solid outline-none text-heading
              transition-all duration-300 ease-in-out
              w-full py-2 px-4 rounded-md
              border-[2px] border-inbetween focus:border-body
              invalid:border-red-400 focus:border-body invalid:focus:border-red-600
              transition-all duration-200 ease-in-out
            `}
            placeholder=""
            id="notes"
            name="notes"
            type="notes"
            value={shippingDetails.shipping_address.notes}
            onChange={handleChange}
          />
          <span
            className={`
              absolute translate-y-[-50%]
              px-1 bg-background peer-autofill:top-0
              text-body text-xs font-bold
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:font-semibold peer-placeholder-shown:text-base peer-placeholder-shown:text-body-light
              peer-focus:top-0 peer-focus:text-xs peer-focus:text-heading peer-focus:font-bold
              peer-invalid:text-red-400 peer-focus:peer-invalid:text-red-500
              transition-all duration-300 ease-in-out
              ${isEn ? 'left-3' : 'right-3'}
            `}
          >
            {isEn ? 'Notes (optional)' : 'ملاحظات (اختياري)'}
          </span>
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
          />
          <button
            className="flex items-center gap-2"
            data-type="toggle_orderSummary_button_is_clicked"
            onClick={handleClick}
          >
            <span
              className="text-sm text-content font-bold"
            >
              {toggleOrderSummary ? (isEn ? 'Hide' : 'اخفاء') : (isEn ? 'Show' : 'عرض')}
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
            style={{
              maxHeight: toggleOrderSummary ? `${getRefTotalHeight(orderSummaryRef)}px` : '0',
              opacity: toggleOrderSummary ? `1` : '0'
            }}
            ref={orderSummaryRef}
            products={products}
          />
          <OrderSummary
            hideProductsSection={true}
            products={products}
          />      
        </div>
      </section>
      <section
        className="flex flex-col gap-4 pt-8"
      >
        <BtnA
          className="cool-bg-grad-m text-heading-invert font-bold rounded-lg p-2"
          type="submit"
          formNoValidate
        >
          {isEn ? 'PLACE ORDER' : 'تقديم الطلب'}
        </BtnA>
      </section>
    </form>
  )
}
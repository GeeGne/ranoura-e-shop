// HOOKS
import { useState, useRef } from "react";
import Link from "next/link";

// COMPONENTS
import BtnA from '@/components/BtnA';
import LineMdWatchLoop from '@/components/svgs/LineMdWatchLoop';
import LineMdWatchTwotoneLoop from '@/components/svgs/LineMdWatchTwotoneLoop';
import LineMdWatchOffLoop from '@/components/svgs/LineMdWatchOffLoop';
import LineMdWatchOffTwotoneLoop from '@/components/svgs/LineMdWatchOffTwotoneLoop';

// STORES
import { useAlertMessageStore, useLayoutRefStore, useLanguageStore } from '@/stores/index';

type Props = {
  className?: string;
}

type FormProps = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
}

export default function SignupForm ({ className, ...props }: Props) {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const [ signInForm, setSignInForm ] = useState<FormProps>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
  });
  const [ incorrectField, setIncorrectField ] = useState<boolean | string>('first_name');

  const [ isFNameFocus, setIsFNameFocus ] = useState<boolean>(false);
  const [ isLNameFocus, setIsLNameFocus ] = useState<boolean>(false);
  const [ isEmailFocus, setIsEmailFocus ] = useState<boolean>(false);
  const [ isPhoneNumberFocus, setIsPhoneNumberFocus ] = useState<boolean>(false);
  const [ isPasswordFocus, setIsPasswordFocus ] = useState<boolean>(false);
  const [ isCPasswordFocus, setIsCPasswordFocus ] = useState<boolean>(false);

  const [ isPassEyeActive, setIsPassEyeActive ] = useState<boolean>(false);
  const [ isCPassEyeActive, setIsCPassEyeActive ] = useState<boolean>(false);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);
  const layoutRef = useLayoutRefStore((state: any) => state.layoutRef);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'signin_button_is_clicked':
        e.preventDefault();
        setAlertToggle(Date.now());
        setAlertType("warning");
        setAlertMessage(isEn ? "Sorry! We're currently working on this feature." : "المعذره! جاري العمل عليها.");
        break;
      case 'navigate_to_signin':
        setTimeout(() => 
          layoutRef.scrollTo({top: 0, behavior: "instant"})
        ,200);
        break;  
      case 'pass_eye_icon_is_clicked':
        e.preventDefault();
        setIsPassEyeActive(val => !val);
        break;  
      case 'cPass_eye_icon_is_clicked':
        e.preventDefault();
        setIsCPassEyeActive(val => !val);
        break;
      case 'label_element_is_clicked':
        setIncorrectField(false);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;

    e.currentTarget.scrollIntoView({ block: 'center', behavior: 'smooth' });

    switch (name) {
      case 'first_name':
        setIsFNameFocus(true);
        break;
      case 'last_name':
        setIsLNameFocus(true);
        break;
      case 'email':
        setIsEmailFocus(true);
        break;
      case 'phone_number':
        setIsPhoneNumberFocus(true);
        break;
      case 'password':
        setIsPasswordFocus(true);
        break;
      case 'cpassword':
        setIsCPasswordFocus(true);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    if (value !== "") return;
    switch (name) {
      case 'first_name':
        setIsFNameFocus(false);
        break;
      case 'last_name':
        setIsLNameFocus(false);
        break;
      case 'email':
        setIsEmailFocus(false);
        break;
      case 'phone_number':
        setIsPhoneNumberFocus(false);
        break;
      case 'password':
        setIsPasswordFocus(false);
        break;
      case 'cpassword':
        setIsCPasswordFocus(false);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'first_name':
      case 'last_name':
      case 'email':
      case 'phone_number':
      case 'password':
      case 'cpassword':
        setSignInForm(val => ({...val, [name]: value}));
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit button is clicked!');

  };

  // DEBUG
  // console.log('signInForm: ', signInForm);

  return (
    <form
      className={`
        flex flex-col w-[300px] md:w-[500px] mx-auto p-4 gap-4
        md:grid grid-cols-2
        ${className}
      `}
      onSubmit={handleSubmit}
      { ...props }
    > 
      <h2
        className="md:col-span-2 text-center text-5xl text-heading mx-auto"
      >
        {isEn ? 'SIGNUP' : 'تسجيل'}
      </h2>
      <label
        className="relative flex w-full"
        htmlFor="first_name"
        data-type="label_element_is_clicked"
        onClick={handleClick}
      >
        <span
          className={`
            absolute translate-y-[-50%]
            bg-background px-1
            transition-all duration-300 ease-in-out
            ${isEn ? 'left-3' : 'right-3'}
            ${isFNameFocus ? 'top-0 text-xs text-heading font-bold' : 'top-1/2 text-base text-body-light'}
          `}
        >
          {isEn ? 'FIRST NAME' : 'الاسم الاول'}
        </span>
        <input
          className={`
            bg-transparent border-solid
            outline-none text-heading border-[1px]
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
            ${incorrectField === "first_name" 
              ? 'border-red-500'
              :isFNameFocus 
              ? 'border-body' 
              : 'border-inbetween'
            }
          `}
          id="first_name"
          name="first_name"
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <span
          className={`
            absolute top-1/2 left-2
            translate-y-[-50%] bg-background py-2 px-2
            text-xs text-red-500
            transition-all duration-300 ease-in-out
            ${incorrectField === "first_name" ? 'visible opacity-100' : 'invisible opacity-0'}
          `}
        >
          This is an error!
        </span>
      </label>
      <label
        className="relative flex w-full"
        htmlFor="last_name"
      >
        <span
          className={`
            absolute translate-y-[-50%]
            bg-background px-1
            transition-all duration-300 ease-in-out
            ${isEn ? 'left-3' : 'right-3'}
            ${isLNameFocus ? 'top-0 text-xs text-heading font-bold' : 'top-1/2 text-base text-body-light'}
          `}
        >
          {isEn ? 'LAST NAME' : 'الاسم الاخير'}
        </span>
        <input
          className={`
            bg-transparent border-solid
            outline-none text-heading border-[1px]
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
            ${isLNameFocus ? 'border-body' : 'border-inbetween'}
          `}
          id="last_name"
          name="last_name"
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </label>
      <label
        className="relative flex md:col-span-2 w-full"
        htmlFor="email"
      >
        <span
          className={`
            absolute translate-y-[-50%]
            bg-background px-1
            transition-all duration-300 ease-in-out
            ${isEn ? 'left-3' : 'right-3'}
            ${isEmailFocus ? 'top-0 text-xs text-heading font-bold' : 'top-1/2 text-base text-body-light'}
          `}
        >
          {isEn ? 'EMAIL' : 'الايميل'}
        </span>
        <input
          className={`
            bg-transparent border-solid
            outline-none text-heading border-[1px]
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
            ${isEmailFocus ? 'border-body' : 'border-inbetween'}
          `}
          id="email"
          name="email"
          type="email"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </label>
      <label
        className="relative flex md:col-span-2 w-full"
        htmlFor="phone_number"
      >
        <span
          className={`
            absolute translate-y-[-50%]
            bg-background px-1
            transition-all duration-300 ease-in-out
            ${isEn ? 'left-3' : 'right-3'}
            ${isPhoneNumberFocus ? 'top-0 text-xs text-heading font-bold' : 'top-1/2 text-base text-body-light'}
          `}
        >
          {isEn ? 'Phone Number' : 'رقم الهاتف'}
        </span>
        <input
          className={`
            bg-transparent border-solid
            outline-none text-heading border-[1px]
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
            ${isPhoneNumberFocus ? 'border-body' : 'border-inbetween'}
          `}
          id="phone_number"
          name="phone_number"
          type="phone_number"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </label>
      <label
        className="relative flex w-full"
        htmlFor="password"
      >
        <span
          className={`
            absolute translate-y-[-50%]
            bg-background px-1
            transition-all duration-300 ease-in-out
            ${isEn ? 'left-3' : 'right-3'}
            ${isPasswordFocus ? 'top-0 text-xs text-heading font-bold' : 'top-1/2 text-base text-body-light'}
          `}
        >
          {isEn ? 'PASSWORD' : 'كلمه السر'}
        </span>
        <input
          className={`
            bg-transparent border-solid
            outline-none text-heading border-[1px]
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
            ${isPassEyeActive ? "font-regular" : "font-bold"}
            ${isPasswordFocus ? 'border-body' : 'border-inbetween'}
          `}
          id="password"
          name="password"
          type={isPassEyeActive ? "text" : "password"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        { isPassEyeActive 
          ? <button
              className={`
                group absolute top-1/2
                translate-y-[-50%] text-heading cursor-pointer
                ${isEn ? 'right-4' : 'left-8'}
              `}
              data-type="pass_eye_icon_is_clicked"
              onClick={handleClick}
            > 
              <LineMdWatchOffLoop
                className={`
                  absolute top-1/2 right-0
                  translate-y-[-50%] cursor-pointer
                  opacity-100 group-hover:opacity-0
                  transition-all duration-200 ease-out
                  ${isPasswordFocus ? 'text-heading' : 'text-body-light'}
                `}
              />
              <LineMdWatchOffTwotoneLoop 
                className={`
                  absolute top-1/2 right-0
                  translate-y-[-50%] cursor-pointer
                  opacity-0 group-hover:opacity-100 z-[5]
                  transition-all duration-200 ease-out
                  ${isPasswordFocus ? 'text-heading' : 'text-body-light'}
                `}
              />
            </button>
          : <button
              className={`
                group absolute top-1/2
                translate-y-[-50%] text-heading cursor-pointer
                ${isEn ? 'right-4' : 'left-8'}
              `}
              data-type="pass_eye_icon_is_clicked"
              onClick={handleClick}
            > 
              <LineMdWatchLoop 
                className={`
                  absolute top-1/2 right-0
                  translate-y-[-50%] cursor-pointer
                  opacity-100 group-hover:opacity-0
                  transition-all duration-200 ease-out
                  ${isPasswordFocus ? 'text-heading' : 'text-body-light'}
                `}
              />
              <LineMdWatchTwotoneLoop 
                className={`
                  absolute top-1/2 right-0
                  translate-y-[-50%] cursor-pointer
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200 ease-out z-[5]
                  ${isPasswordFocus ? 'text-heading' : 'text-body-light'}
                `}
              />
            </button>
        }
      </label>
      <label
        className="relative flex w-full"
        htmlFor="cpassword"
      >
        <span
          className={`
            absolute translate-y-[-50%]
            bg-background px-1
            transition-all duration-300 ease-in-out
            ${isCPasswordFocus ? 'top-0 text-xs text-heading font-bold' : 'top-1/2 text-base text-body-light'}
            ${isEn ? 'left-3' : 'right-3'}
          `}
        >
          {isEn ? 'CONFIRM PASSWORD' : 'تاكيد كلمه السر'}
        </span>
        <input
          className={`
            bg-transparent border-solid
            outline-none text-heading border-[1px]
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
            ${isCPassEyeActive ? "font-regular" : "font-bold"}
            ${isCPasswordFocus ? 'border-body' : 'border-inbetween'}
          `}
          id="cpassword"
          name="cpassword"
          type={isCPassEyeActive ? "text" : "password"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        { isCPassEyeActive 
          ? <button
              className={`
                group absolute top-1/2
                translate-y-[-50%] text-heading cursor-pointer
                ${isEn ? 'right-4' : 'left-8'}
              `}
              data-type="cPass_eye_icon_is_clicked"
              onClick={handleClick}
            > 
              <LineMdWatchOffLoop
                className={`
                  absolute top-1/2 right-0
                  translate-y-[-50%] cursor-pointer
                  opacity-100 group-hover:opacity-0
                  transition-all duration-200 ease-out
                  ${isCPasswordFocus ? 'text-heading' : 'text-body-light'}
                `}
              />
              <LineMdWatchOffTwotoneLoop 
                className={`
                  absolute top-1/2 right-0
                  translate-y-[-50%] text-heading cursor-pointer
                  opacity-0 group-hover:opacity-100 z-[5]
                  transition-all duration-200 ease-out
                  ${isCPasswordFocus ? 'text-heading' : 'text-body-light'}
                `}
              />
            </button>
          : <button
              className={`
                group absolute top-1/2
                translate-y-[-50%] text-heading cursor-pointer
                ${isEn ? 'right-4' : 'left-8'}
              `}
              data-type="cPass_eye_icon_is_clicked"
              onClick={handleClick}
            > 
              <LineMdWatchLoop 
                className={`
                  absolute top-1/2 right-0
                  translate-y-[-50%] cursor-pointer
                  opacity-100 group-hover:opacity-0
                  transition-all duration-200 ease-in-out
                  ${isCPasswordFocus ? 'text-heading' : 'text-body-light'}
                `}
              />
              <LineMdWatchTwotoneLoop 
                className={`
                  absolute top-1/2 right-0
                  translate-y-[-50%] cursor-pointer
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200 ease-in-out z-[5]
                  ${isCPasswordFocus ? 'text-heading' : 'text-body-light'}
                `}
              />
            </button>
        }
      </label>
      <BtnA
        className="md:col-span-2 bg-primary w-full text-heading-invert font-bold py-2 rounded-md"
        type="submit"
      >
        {isEn ? 'CONTINUE' : 'استمرار'}
      </BtnA>
      <Link
        href="/signin"
        className="md:col-span-2 text-heading text-base"
        data-type="navigate_to_signin"
        onClick={handleClick}
      >
        <span
          className="underline"
        >
          {isEn ? 'Have an account?' : 'لديك حساب'}
        </span>{' '}
        <span
          className="font-bold"
        >
          {isEn ? 'Signin' : 'تسجيل الدخول'}
        </span>
      </Link>
    </form>
  )
}
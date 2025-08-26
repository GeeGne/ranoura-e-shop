// HOOKS
import { useState, useRef } from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import BtnA from '@/components/BtnA';
import LineMdWatchLoop from '@/components/svgs/LineMdWatchLoop';
import LineMdWatchTwotoneLoop from '@/components/svgs/LineMdWatchTwotoneLoop';
import LineMdWatchOffLoop from '@/components/svgs/LineMdWatchOffLoop';
import LineMdWatchOffTwotoneLoop from '@/components/svgs/LineMdWatchOffTwotoneLoop';
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';

// STORES
import { useAlertMessageStore, useLayoutRefStore, useLanguageStore } from '@/stores/index';

// LIB
import { validate } from '@/lib/validators/SignUpFormClient';

// API
import createNewUser from '@/lib/api/users/post';

type Props = {
  className?: string;
}

type FormProps = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  cPassword: string;
}

type ValidateProps = {
  first_name: ValidateRecord;
  last_name: ValidateRecord;
  email: ValidateRecord;
  phone_number: ValidateRecord;
  password: ValidateRecord;
  cPassword: ValidateRecord;
}

type ValidateRecord = {
  message: string;
  isValid: boolean;
}

export default function SignupForm ({ className, ...props }: Props) {

  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const [ signInForm, setSignInForm ] = useState<FormProps>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    cPassword: '',
  });
  const [ incorrectField, setIncorrectField ] = useState<ValidateProps>({
    first_name: { message: '', isValid: true },
    last_name: { message: '', isValid: true },
    email: { message: '', isValid: true },
    phone_number: { message: '', isValid: true },
    password: { message: '', isValid: true },
    cPassword: { message: '', isValid: true },
  });
  const [ isProcessing, setIsProcessing ] = useState<boolean>(false);
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
  const formRef = useRef<HTMLFormElement>(null);

  const createNewUserMutation = useMutation({
    mutationFn: createNewUser,
    onSettled: () => {
      setIsProcessing(false);
    },
    onMutate: () => {
      setIsProcessing(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setAlertToggle(Date.now());
      setAlertType("success");
      setAlertMessage(data.message[isEn ? 'en' : 'ar']);
      window.location.reload();
    },
    onError: (error) => {
      setAlertToggle(Date.now());
      setAlertType("error");
      setAlertMessage(error.message);
    }
  })

  const isAllInptsValid = (results: ValidateProps) => {
    const { first_name, last_name, email, phone_number, password, cPassword } = results;
    switch (false) {
      case first_name.isValid:
      case last_name.isValid:
      case email.isValid:
      case phone_number.isValid:
      case password.isValid:
      case cPassword.isValid:
        return false;
      default:
        return true;    
    }
  };

  const addIsProcessingNote = () => {
    setAlertToggle(Date.now());
    setAlertType("warning");
    setAlertMessage(isEn ? 'Please wait until the operation is finished' : 'الرجاء الانتظار حتى انتهاء من العمليه');
  }

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
        setIncorrectField(val => ({
          first_name: { ...val.first_name, isValid: true },
          last_name: { ...val.last_name, isValid: true },
          email: { ...val.email, isValid: true },
          phone_number: { ...val.phone_number, isValid: true },
          password: { ...val.password, isValid: true },
          cPassword: { ...val.cPassword, isValid: true },
        }));
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
      case 'cPassword':
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
      case 'cPassword':
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
      case 'cPassword':
        setSignInForm(val => ({ ...val, [name]: value }));
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isProcessing) return addIsProcessingNote();

    const { first_name, last_name, email, phone_number, password, cPassword } = signInForm;
    const { firstName, lastName, email: userEmail, phoneNumber, password: userPassword, cPassword: userCPassword } = validate;
    const inptsResults = {
      first_name: {
        message: firstName(first_name, isEn).message, 
        isValid: lastName(last_name, isEn).isValid
      },
      last_name: {
        message: lastName(last_name, isEn).message, 
        isValid: lastName(last_name, isEn).isValid 
      },
      email: {
        message: userEmail(email, isEn).message, 
        isValid: userEmail(email, isEn).isValid
      },
      phone_number: {
        message: phoneNumber(phone_number, isEn).message, 
        isValid: phoneNumber(phone_number, isEn).isValid
      },
      password: {
        message: userPassword(password, isEn).message, 
        isValid: userPassword(password, isEn).isValid
      },
      cPassword: {
        message: userCPassword(cPassword, password, isEn).message, 
        isValid: userCPassword(cPassword, password, isEn).isValid
      },  
    }

    try {
      const errorMessage = isEn ? "Some fields are incorrect!" : "بعض الحقول غير صحيحه!";
      if (!isAllInptsValid(inptsResults)) throw new Error (errorMessage);

      createNewUserMutation
        .mutate({ 
          first_name, last_name, email, phone_number, password 
        });
    } catch (err) {
      const error = err as Error;

      if (formRef.current) 
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setIncorrectField(inptsResults);
      setAlertToggle(Date.now());
      setAlertType("error");
      setAlertMessage(error.message);
    }
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
      ref={formRef}
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
            ${incorrectField.first_name.isValid 
              ? isFNameFocus 
              ? 'border-body'
              : 'border-inbetween'
              : 'border-red-500'
            }
          `}
          id="first_name"
          name="first_name"
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div
          className={`
            absolute top-1/2 left-1/2
            flex items-center
            translate-y-[-50%] translate-x-[-50%] w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)]
            text-xs text-red-500 backdrop-blur-[5px]
            transition-all duration-300 ease-in-out
            ${incorrectField.first_name.isValid ? 'invisible opacity-0' : 'visible opacity-100'}
          `}
        >
          <span className="flex px-2">
            {incorrectField.first_name.message}
          </span>
        </div>
      </label>
      <label
        className="relative flex w-full"
        htmlFor="last_name"
        data-type="label_element_is_clicked"
        onClick={handleClick}
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
            ${incorrectField.last_name.isValid 
              ? isLNameFocus 
              ? 'border-body'
              : 'border-inbetween'
              : 'border-red-500'
            }
          `}
          id="last_name"
          name="last_name"
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div
          className={`
            absolute top-1/2 left-1/2
            flex items-center
            translate-y-[-50%] translate-x-[-50%] w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)]
            text-xs text-red-500 backdrop-blur-[5px]
            transition-all duration-300 ease-in-out
            ${incorrectField.last_name.isValid ? 'invisible opacity-0' : 'visible opacity-100'}
          `}
        >
          <span className="flex px-2">
            {incorrectField.last_name.message}
          </span>
        </div>
      </label>
      <label
        className="relative flex md:col-span-2 w-full"
        htmlFor="email"
        data-type="label_element_is_clicked"
        onClick={handleClick}
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
            ${incorrectField.email.isValid 
              ? isEmailFocus 
              ? 'border-body'
              : 'border-inbetween'
              : 'border-red-500'
            }
          `}
          id="email"
          name="email"
          type="email"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div
          className={`
            absolute top-1/2 left-1/2
            flex items-center
            translate-y-[-50%] translate-x-[-50%] w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)]
            text-xs text-red-500 backdrop-blur-[5px]
            transition-all duration-300 ease-in-out
            ${incorrectField.email.isValid ? 'invisible opacity-0' : 'visible opacity-100'}
          `}
        >
          <span className="flex px-2">
            {incorrectField.email.message}
          </span>
        </div>
      </label>
      <label
        className="relative flex md:col-span-2 w-full"
        htmlFor="phone_number"
        data-type="label_element_is_clicked"
        onClick={handleClick}
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
            ${incorrectField.email.isValid 
              ? isPhoneNumberFocus 
              ? 'border-body'
              : 'border-inbetween'
              : 'border-red-500'
            }
          `}
          id="phone_number"
          name="phone_number"
          type="phone_number"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div
          className={`
            absolute top-1/2 left-1/2
            flex items-center
            translate-y-[-50%] translate-x-[-50%] w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)]
            text-xs text-red-500 backdrop-blur-[5px]
            transition-all duration-300 ease-in-out
            ${incorrectField.phone_number.isValid ? 'invisible opacity-0' : 'visible opacity-100'}
          `}
        >
          <span className="flex px-2">
            {incorrectField.phone_number.message}
          </span>
        </div>
      </label>
      <label
        className="relative flex w-full"
        htmlFor="password"
        data-type="label_element_is_clicked"
        onClick={handleClick}
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
            ${incorrectField.email.isValid 
              ? isPasswordFocus 
              ? 'border-body'
              : 'border-inbetween'
              : 'border-red-500'
            }
          `}
          id="password"
          name="password"
          type={isPassEyeActive ? "text" : "password"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div
          className={`
            absolute top-1/2 left-1/2
            flex items-center
            translate-y-[-50%] translate-x-[-50%] w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)]
            text-xs text-red-500 backdrop-blur-[5px]
            transition-all duration-300 ease-in-out
            ${incorrectField.password.isValid ? 'invisible opacity-0' : 'visible opacity-100'}
          `}
        >
          <span className="flex px-2">
            {incorrectField.password.message}
          </span>
        </div>
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
        htmlFor="cPassword"
        data-type="label_element_is_clicked"
        onClick={handleClick}
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
            ${incorrectField.email.isValid 
              ? isCPasswordFocus 
              ? 'border-body'
              : 'border-inbetween'
              : 'border-red-500'
            }
          `}
          id="cPassword"
          name="cPassword"
          type={isCPassEyeActive ? "text" : "password"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div
          className={`
            absolute top-1/2 left-1/2
            flex items-center
            translate-y-[-50%] translate-x-[-50%] w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)]
            text-xs text-red-500 backdrop-blur-[5px]
            transition-all duration-300 ease-in-out
            ${incorrectField.cPassword.isValid ? 'invisible opacity-0' : 'visible opacity-100'}
          `}
        >
          <span className="flex px-2">
            {incorrectField.cPassword.message}
          </span>
        </div>
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
        className={`
          relative md:col-span-2 bg-primary w-full 
          text-heading-invert font-bold py-2 rounded-md
          ${isProcessing ? 'cursor-progress' : 'cursor-pointer'}
        `}
        type="submit"
      >
        <SvgSpinnersRingResize 
          className={`
            absolute top-1/2 left-1/2
            translate-x-[-50%] translate-y-[-50%]
            transition-all duration-300 ease-in-out
            ${isProcessing ? 'visible opacity-100' : 'invisible opacity-0'}
          `}
        />
        <span 
          className={`
            transition-all duration-300 ease-in-out
            ${isProcessing ? 'invisible opacity-0' : 'visible opacity-100'}
          `}
        >
          {isEn ? 'CONTINUE' : 'استمرار'}
        </span>
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
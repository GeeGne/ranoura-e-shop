// HOOKS
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from "next/link";

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
import { validate } from '@/lib/validators/SignInFormClient';

// API
import signinRequest from '@/lib/api/auth/signin/post';

type Props = {
  className?: string;
}

type FormProps = {
  email: string;
  password: string;
}

type ValidateProps = {
  email: ValidateRecord;
  password: ValidateRecord;
}

type ValidateRecord = {
  message: string;
  isValid: boolean;
}

export default function SigninForm ({ className, ...props }: Props) {

  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const [ signInForm, setSignInForm ] = useState<FormProps>({
    email: '',
    password: '',
  });
  const [ incorrectField, setIncorrectField ] = useState<ValidateProps>({
    email: { message: '', isValid: true },
    password: { message: '', isValid: true },
  });
  
  const [ isProcessing, setIsProcessing ] = useState<boolean>(false);
  const [ isEmailFocus, setIsEmailFocus ] = useState<boolean>(false);
  const [ isPasswordFocus, setIsPasswordFocus ] = useState<boolean>(false);
  const [ isPassEyeActive, setIsPassEyeActive ] = useState<boolean>(false);
  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);
  const layoutRef = useLayoutRefStore((state: any) => state.layoutRef);
  const formRef = useRef<HTMLFormElement>(null);

  const signinMutation = useMutation({
    mutationFn: signinRequest,
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
      setAlertMessage(
        `${data.message[isEn ? 'en' : 'ar']}, ${isEn ? 'proceeding to profile..' : 'جاري التوجه الى واجه المستخدم...'}`
      );

      window.location.reload();
    },
    onError: (error) => {
      setAlertToggle(Date.now());
      setAlertType("error");
      setAlertMessage(error.message);
    }
  })

  const isAllInptsValid = (results: ValidateProps) => {
    const { email, password } = results;
    switch (false) {
      case email.isValid:
      case password.isValid:
        return false;
      default:
        return true;    
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'signin_button_is_clicked':
        e.preventDefault();
        setAlertToggle(Date.now());
        setAlertType("warning");
        setAlertMessage(isEn ? "Sorry! We're currently working on this feature." : "المعذره! جاري العمل عليها.");
        break;
      case 'navigate_to_signup':
        setTimeout(() => 
          layoutRef.scrollTo({top: 0, behavior: "instant"})
        ,200);
        break;
      case 'pass_eye_icon_is_clicked':
        e.preventDefault();
        setIsPassEyeActive(val => !val);
        break;  
      case 'label_element_is_clicked':
        setIncorrectField(val => ({
          email: { ...val.email, isValid: true },
          password: { ...val.password, isValid: true },
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
      case 'email':
        setIsEmailFocus(true);
        break;
      case 'password':
        setIsPasswordFocus(true);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    if (value !== "") return;

    switch (name) {
      case 'email':
        setIsEmailFocus(false);
        break;
      case 'password':
        setIsPasswordFocus(false);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'email':
      case 'password':
        setSignInForm(val => ({ ...val, [name]: value }));
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit is clicked!')
    const { email, password } = signInForm;
    const { email: userEmail, password: userPassword } = validate;
    const inptsResults = {
      email: {
        message: userEmail(email, isEn).message, 
        isValid: userEmail(email, isEn).isValid
      },
      password: {
        message: userPassword(password, isEn).message, 
        isValid: userPassword(password, isEn).isValid
      },
    }

    try {
      const errorMessage = isEn ? "Some fields are incorrect!" : "بعض الحقول غير صحيحه!";
      if (!isAllInptsValid(inptsResults)) throw new Error (errorMessage);

      signinMutation.mutate({ email, password });
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

  // UI & DEBUG
  // console.log('signInForm: ', signInForm);
  // console.log('incorrectField: ', incorrectField);

  return (
    <form
      className={`
        flex flex-col w-[300px] md:w-[400px] mx-auto p-4 gap-4
        ${className}
      `}
      onSubmit={handleSubmit}
      ref={formRef}
      { ...props }
    >  
      <h2
        className="text-center text-5xl text-heading mx-auto"
      >
        {isEn ? 'SIGNIN' : 'تسجيل الدخول'}
      </h2>
      <label
        className="relative flex w-full"
        htmlFor="email"
        data-type="label_element_is_clicked"
        onClick={handleClick}
      >
        <span
          className={`
            absolute translate-y-[-50%]
            px-1 bg-background peer-autofill:top-0
            transition-all duration-300 ease-in-out
            ${isEn ? 'left-3' : 'right-3'}
            ${isEmailFocus ? 'top-0 text-xs text-heading font-bold' : 'top-1/2 text-base text-body-light'}
          `}
        >
          {isEn ? 'EMAIL' : 'ايميل'}
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
        className="relative flex w-full"
        htmlFor="password"
        data-type="label_element_is_clicked"
        onClick={handleClick}
      >
        <span
          className={`
            absolute translate-y-[-50%]
            px-1 bg-background
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
      <BtnA
        className="relative md:col-span-2 bg-primary w-full text-heading-invert font-bold py-2 rounded-md"
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
        href="/signup"
        className="text-heading text-base"
        data-type="navigate_to_signup"
        onClick={handleClick}
      >
        <span
          className="underline"
        >
          {isEn ? 'New here?' : 'جديد هنا؟'}
        </span>{' '}
        <span
          className="font-bold"
        >
          {isEn ? 'Create an account' : 'انشاء حساب جديد'}
        </span>
      </Link>
      <Link
        href="/pass-reset"
        className="text-heading text-base"
      >
        <span
          className="underline"
        >
          {isEn ? 'Forgot password?' : 'نسيت كلمه السر؟'}
        </span>{' '}
        <span
          className="font-bold"
        >
          {isEn ? 'Reset it here' : 'استعيدها هنا'}
        </span>
      </Link>
    </form>
  )
}
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
import { useAlertMessageStore, useLayoutRefStore } from '@/stores/index';

type Props = {
  className?: string;
}

export default function SigninForm ({ className, ...props }: Props) {

  const [ isEmailFocus, setIsEmailFocus ] = useState<boolean>(false);
  const [ isPasswordFocus, setIsPasswordFocus ] = useState<boolean>(false);

  const [ isPassEyeActive, setIsPassEyeActive ] = useState<boolean>(false);

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
        setAlertMessage("Sorry! We're currently working on this feature.");
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
      default:
        console.error('Unknown type: ', type);
    }
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;

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

  return (
    <form
      className={`
        flex flex-col w-[300px] md:w-[400px] mx-auto p-4 gap-4
        ${className}
      `}
      { ...props }
    > 
      <h2
        className="text-center text-5xl text-heading mx-auto"
      >
        SIGNIN
      </h2>
      <label
        className="relative flex w-full"
        htmlFor="email"
      >
        <span
          className={`
            absolute left-3 translate-y-[-50%]
            px-1 bg-background peer-autofill:top-0
            transition-all duration-300 ease-in-out
            ${isEmailFocus ? 'top-0 text-xs text-heading font-bold' : 'top-1/2 text-base text-body-light'}
          `}
        >
          EMAIL
        </span>
        <input
          className={`
            bg-transparent border-solid
            outline-none text-heading autofill:bg-red-500
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
            ${isEmailFocus ? 'border-body border-[2px]' : 'border-[1px] border-inbetween'}
          `}
          id="email"
          name="email"
          type="email"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </label>
      <label
        className="relative flex w-full"
        htmlFor="password"
      >
        <span
          className={`
            absolute left-3 translate-y-[-50%]
            px-1 bg-background
            transition-all duration-300 ease-in-out
            ${isPasswordFocus ? 'top-0 text-xs text-heading font-bold' : 'top-1/2 text-base text-body-light'}

          `}
        >
          PASSWORD
        </span>
        <input
          className={`
            bg-transparent border-solid
            outline-none text-heading
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
            ${isPassEyeActive ? "font-regular" : "font-bold"}
            ${isPasswordFocus ? 'border-body border-[2px]' : 'border-[1px] border-inbetween'}
          `}
          id="password"
          name="password"
          type={isPassEyeActive ? "text" : "password"}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        { isPassEyeActive 
          ? <button
              className="
                group absolute top-1/2 right-4
                translate-y-[-50%] text-heading cursor-pointer
              "
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
              className="
                group absolute top-1/2 right-4
                translate-y-[-50%] text-heading cursor-pointer
              "
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
        className="bg-primary w-full text-heading-invert font-bold py-2 rounded-md"
        data-type="signin_button_is_clicked"
        onClick={handleClick}
      >
        CONTINUE
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
          New here?
        </span>{' '}
        <span
          className="font-bold"
        >
          Create an account
        </span>
      </Link>
      <Link
        href="/pass-reset"
        className="text-heading text-base"
      >
        <span
          className="underline"
        >
          Forgot password?
        </span>{' '}
        <span
          className="font-bold"
        >
          Reset it here
        </span>
      </Link>
    </form>
  )
}
// HOOKS
import { useState, useRef } from "react";
import Link from "next/link";

type Props = {
  className?: string;
}

export default function SigninForm ({ className, ...props }: Props) {

  const [ isEmailFocus, setIsEmailFocus ] = useState<boolean>(false);
  const [ isPasswordFocus, setIsPasswordFocus ] = useState<boolean>(false);

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
  }

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
  }

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
            bg-background px-1
            transition-all duration-300 ease-in-out
            ${isEmailFocus ? 'top-0 text-xs font-bold' : 'top-1/2 text-md'}
          `}
        >
          EMAIL
        </span>
        <input
          className={`
            bg-transparent border-solid
            outline-none
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
            ${isEmailFocus ? 'border-body border-[2px]' : 'border-[1px] border-inbetween'}
          `}
          id="email"
          name="email"
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
            bg-background px-1
            transition-all duration-300 ease-in-out
            ${isPasswordFocus ? 'top-0 text-xs font-bold' : 'top-1/2 text-md'}
          `}
        >
          PASSWORD
        </span>
        <input
          className={`
            bg-transparent border-solid
            outline-none
            transition-all duration-300 ease-in-out
            w-full py-2 px-4 rounded-md
            ${isPasswordFocus ? 'border-body border-[2px]' : 'border-[1px] border-inbetween'}
          `}
          id="password"
          name="password"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </label>
      <Link
        href="/user/signup"
        className="text-heading text-md"
      >
        <span
          className="underline"
        >
          New here?
        </span>{' '}
        <span
          className="font-bold"
        >
          Create an account.
        </span>
      </Link>
      <Link
        href="/user/pass-reset"
        className="text-heading text-md"
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
// HOOKS
import { useEffect, useState, useRef, useId } from 'react';

type Props = {
  isEn?: boolean;
  isLoading: boolean;
  isChecked?: boolean;
  className?: string;
  onSwitchToggle?: any;
} & React.ButtonHTMLAttributes<HTMLElement> ;

export default function Switch ({ 
  isEn = true, 
  isChecked = true, 
  className,
  onSwitchToggle, 
  isLoading, 
  ...props 
}: Props) {

  const inptRef = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    if (inptRef.current) inptRef.current.checked = isChecked;
  }, [isChecked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { checked } = e.currentTarget;

    onSwitchToggle(checked);
  }

  // DEBUG
  // console.log('isChecked: ', isChecked);
  // isLoading = true;
  
  if (isLoading) return (
    <div
      className={`
        --opacity-blink w-10 h-6 bg-background-deep-light
        rounded-full overflow-hidden
        cursor-pointer
        ${isEn ? 'ml-auto' : 'mr-auto'}
      `}
    />
  );

  return (
    <label
      className={`
        relative w-10 h-6
        rounded-full overflow-hidden
        cursor-pointer
        ${className}
      `}
      htmlFor={id}
      {...props }
    >
      <input
        className="
          peer invisible flex items-center gap-2 p-2 ml-auto rounded-lg w-10 text-center
        "
        type="checkbox"
        id={id}
        onChange={handleChange}
        ref={inptRef}
      />
      <div
        className={`
          absolute top-1/2  
          translate-y-[-50%] w-5 h-5 aspect-1/1 
          bg-background rounded-full border border-background-light z-[5]
          transition-all duration-300 ease-in-out
          ${isEn 
            ? 'left-[2px] peer-checked:left-[calc(100%-22px)]' 
            : 'right-[2px] peer-checked:right-[calc(100%-22px)]'
          }
        `}
      />
      <div
        className="
          absolute top-0 left-0   
          w-full h-full aspect-1/1 peer-checked:bg-green-400 bg-inbetween
          transition-all duration-300 ease-in-out
        "
      />
    </label>
  )
}
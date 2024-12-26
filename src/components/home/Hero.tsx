// HOOKS
import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
}

export default function Hero ({ children, className = '', ...props }: Props) {
  return (
    <div
      className={`
        bg-primary h-[300px] rounded-b-[4rem]
        ${className}
      `}
    >
      {children}
    </div>
  )
}
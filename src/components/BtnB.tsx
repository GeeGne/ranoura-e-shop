import type { ReactNode } from 'react';
type Props = {
  children?: ReactNode;
  className?: string;
};

export default function BtnB ({ className, children, ...props }: Props) {
  return (
    <button
      className={`
        ${className} border-solid border-heading border-[1px] p-1 rotate-45 rounded-md
      `}
      { ...props }
    >
      {children}
    </button>
  )
}

// The Children should be an svg with rotate (class or css property) added to minus 45 deg
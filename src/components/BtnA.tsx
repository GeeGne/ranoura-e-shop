import type { ReactNode } from 'react'

type Props = {
  children: ReactNode;
  className?: ReactNode;
  display?: string;
  effect?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function BtnA ({ className = '', display = 'relative', effect = true, children, ...props}: Props) {
  return (
    <button
      className={`
        group overflow-hidden
        ${className} ${display}
      `}
      {...props}
    >
      {children}
      {!effect || <>
        <div 
          className="
            absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] 
            w-[calc(100%+4px)] aspect-[1/1] backdrop-invert-[100%] rounded-full
            transition-all duration-300 ease-in-out
            scale-[0%] group-hover:scale-[100%]
          " 
        />
        <div 
          className="
            absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] 
            w-[calc(100%+4px)] aspect-[1/1] backdrop-invert-[100%] rounded-full
            transition-all delay-200 duration-200 ease-in-out
            scale-[0%] group-hover:scale-[100%]
          " 
        />
      </>}
    </button>
  )
}
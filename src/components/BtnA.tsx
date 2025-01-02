import type { ReactNode } from 'react'

type Props = {
  children: ReactNode;
}

export default function BtnA ({ children, ...props}: Props) {
  return (
    <button
      className="relative group bg-background text-heading text-sm font-bold px-4 py-2 rounded-md shaddow-md overflow-hidden"
      {...props}
    >
      {children}
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
    </button>
  )
}
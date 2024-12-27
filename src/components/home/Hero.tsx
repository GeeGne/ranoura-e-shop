// HOOKS
import { ReactNode } from 'react';

// COMPONENTS
import FilmTape from '@/components/FilmTape';

type Props = {
  className?: string;
}

export default function Hero ({ className = '', ...props }: Props) {
  return (
    <div
      className={`
        relative test z-[1] mb-[20px] bg-primary h-[300px] rounded-b-[4rem]
        ${className}
      `}
    >
      <FilmTape
        className="
          absolute top-1/2 right-0 translate-y-[-50%]   
          origin-center-right rotate-[45deg]
        "
      />
    </div>
  )
}
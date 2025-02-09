import type React from 'react';

// COMPONENTS
import UndrawPrivateData from "@/components/svgs/UndrawPrivateData";
import Facebook from "@/components/svgs/Facebook";

type Props = {
  svg?: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Card ({ svg, title, description , ...props }: Props) {
  return (
    <li
      className="
        grid grid-cols-1 content-center items-center gap-4
        md:grid-rows-[auto_auto] md:grid-cols-[auto_auto] 
        border-solid border-body-extra-light border-[1px]
        bg-background p-4 rounded-2xl z-[5]
      "
      { ...props }
    >
      <div
        className="flex items-center justify-center w-[4rem] h-[4rem] mx-auto md:row-span-2"
      >
        {svg}
      </div>
      <h3
        className="text-md text-heading md:row-span-1 font-bold text-center"
      >
        {title}
      </h3>
      <h4
        className="text-body text-sm md:row-span-1"
      >
        {description}
      </h4>
    </li>
  )
}
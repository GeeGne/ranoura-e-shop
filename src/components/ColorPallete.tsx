// HOOKS
import { useState } from 'react';

type Props = {
  colorsArray?: string[];
}

export default function ColorPallete ({ colorsArray = [] }: Props) {

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <ul className="flex gap-2">
      {colorsArray.map((itm, i) => 
        <li
          className={`
            relative w-4 h-4 p-1 border-solid
            bg-${itm}-400 rounded-full cursor-pointer
            ${currentIndex === i && `
              before:content-[''] before:absolute before:top-1/2 before:left-1/2
              before:translate-x-[-50%] before:translate-y-[-50%]
              before:w-[calc(100%+8px)] before:h-[calc(100%+8px)]
              before:border-solid before:border-primary
              before:border-[1px] before:rounded-full  
            `}
          `}
          onClick={() => setCurrentIndex(i)}
          key={i}
        />
      )}
    </ul>
  )
}
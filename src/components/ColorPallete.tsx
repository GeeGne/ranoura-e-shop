// HOOKS
import { useState, useEffect, useRef } from 'react';

// JSON
import colors from "@/json/colors.json";

type Props = {
  className?: string;
  width?: string;
  height?: string;
  colorsArray?: string[];
  currentColor?: any;
  productId: number;
}

export default function ColorPallete ({ className, currentColor, width = 'w-4', height = 'h-4', productId, colorsArray = [] }: Props) {

  const [ selectedColor, setSelectedColor ] = useState<string>("");
  const [ clickedColor, setClickedColor ] = useState<string>("");
  const getHex = (color: string) => colors.find((itm: any) => itm.name === color)?.hex || '#339933';
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    currentColor(selectedColor, productId);
  }, [selectedColor]);

  useEffect(() => {
    setSelectedColor(colorsArray[0])
    setClickedColor(colorsArray[0])
  }, [colorsArray]);

  return (
    <ul className="flex gap-2">
      {colorsArray.map((color, i) => 
        <li
          className={`
            relative ${width} ${height} p-1 border-solid
            rounded-full cursor-pointer
            before:content-[''] before:absolute before:top-1/2 before:left-1/2
            before:translate-x-[-50%] before:translate-y-[-50%]
            before:w-[calc(100%+8px)] before:h-[calc(100%+8px)]
            before:border-solid
            before:border-[1px] before:rounded-full 
            hover:before:opacity-100
            ${className}
            ${clickedColor === color 
              ? `before:border-heading`
              : selectedColor === color 
                ? `before:border-body-extra-light`
                : `before:border-transparent`
            }
          `}
          style={{backgroundColor: getHex(color)}}
          onMouseEnter={() => setSelectedColor(color)}
          onMouseLeave={() => setSelectedColor(clickedColor)}
          onClick={() => {
            setSelectedColor(color);
            setClickedColor(color)
          }}
          key={i}
        />
      )}
    </ul>
  )
}
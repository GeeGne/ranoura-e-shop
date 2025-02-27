// HOOKS
import { useState } from 'react';

// COMPONENTS
import BtnA from '@/components/BtnA';
import EpArrowLeft from '@/components/svgs/EpArrowLeft';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "/assets/img/outfit.webp";
const outfit2 = "/assets/img/outfit-2.jpg";
const outfit3 = "/assets/img/outfit-3.jpg";
const outfit5 = "/assets/img/outfit-5.jpg";

type Props = {
  className?: string;
  imagesArray?: any;
}

export default function ProductDisplay ({ className, imagesArray, ...props }: Props) {
  const [ selectedIndex, setSelectedIndex ] = useState<number>(0);
  const leftArrowInactive = false;
  const totalLenght = imagesArray.length;
  const sliceArrayInto5 = (array: any[]) => array.slice(0, 5); 

  return (
    <section
      className="grid grid-cols-3 gap-4 w-full h-full"
    >
      <img 
        className="
          col-span-2 row-span-3 order-3 w-full h-full object-center object-cover
          rounded-lg
        "
        alt="Photo"
        src={imagesArray[selectedIndex]}
      />
      {sliceArrayInto5(imagesArray).map((url, i) => 
        <img 
          className={`
            order-${i === 0 ? 1 : i + 2} aspect-[1/1] object-center object-cover
            border-solid border-[2px] 
            cursor-pointer rounded-lg
            transition-all duration-300 ease-in-out
            ${selectedIndex === i 
              ? 'border-primary' 
              : 'border-body-extra-light hover:border-primary brightness-75'
            }
          `}
          alt="Photo"
          src={url}
          key={i}
          onClick={() => setSelectedIndex(i)}
        />    
      )}
      {totalLenght === 6 
        ? <img 
            className={`
              order-7 aspect-[1/1] object-center object-cover
              border-solid border-[2px] 
              cursor-pointer rounded-lg
              transition-all duration-300 ease-in-out
              ${selectedIndex === 5 
                ? 'border-primary' 
                : 'border-body-extra-light hover:border-primary brightness-75'
              }
            `}
            alt="Photo"
            src={imagesArray[5]}
            onClick={() => setSelectedIndex(5)}
          />
        : <div
            className={`
              relative order-7 aspect-[1/1] object-center object-cover
              border-solid border-[2px] 
              border-body-extra-light hover:border-primary
              cursor-pointer rounded-lg overflow-hidden
              transition-all duration-300 ease-in-out

            `}    
          >
            <img 
              className={`
                w-full h-full object-center object-cover brightness-[50%]
              `}
              alt="Photo"
              src={imagesArray[5]}
              onClick={() => setSelectedIndex(5)}
            />
            <div
              className="
                absolute top-0 left-0 w-full h-full
                flex flex-col items-center justify-center
                text-xl text-heading-invert drop-shadow-md 
              "
            >
              <span>
                +3 more
              </span>
              <span className="font-bold underline">
                SEE ALL
              </span>
            </div>  
          </div>
      }
    </section>
  )

  return (
    <section
      className={`
        w-full flex flex-col gap-4
        ${className}
      `}
      {...props}
    >
      <div
        className="relative"
      >
        <img 
          className="w-full aspect-[2/3] rounded-lg object-cover object-center"
          src={outfit5}
          alt="Image"
        />
        <BtnA
          className={`
            top-1/2 left-[-0.5rem] 
            translate-y-[-50%]
            w-12 h-12 rounded-full
            flex items-center justify-center
            ${leftArrowInactive ? 'bg-inbetween cursor-not-allowed' : 'bg-primary cursor-pointer'}
          `}
          display="absolute"
          effect={!leftArrowInactive}
          data-type="scroll_left_button_is_clicked"
        >
          <EpArrowLeft
            className="
              text-heading-invert p-1
            "
            width={32}
            height={32}
            role="button"
            data-type="left_arrow_button_is_clicked"
          />
        </BtnA>
        <BtnA
            className={`
              absolute top-1/2 right-[-0.5rem]
              translate-y-[-50%]
              w-12 h-12 rounded-full
              flex items-center justify-center
              ${leftArrowInactive ? 'bg-inbetween cursor-not-allowed' : 'bg-primary cursor-pointer'}
            `}
            display="absolute"
            effect={!leftArrowInactive}
            data-type="scroll_left_button_is_clicked"
          >
          <EpArrowLeft
            className="
              text-heading-invert p-1 rotate-[180deg]
            "
            width={32}
            height={32}
            role="button"
            data-type="left_arrow_button_is_clicked"
          />
        </BtnA>
      </div>
      <ul
        className="flex flex-row w-full items-center justify-center gap-2"
      >
        <li className="w-4 h-4 bg-inbetween rounded-full cursor-pointer" />
        <li className="w-4 h-4 bg-primary rounded-full cursor-pointer" />
        <li className="w-4 h-4 bg-inbetween rounded-full cursor-pointer" />
      </ul>
    </section>
  )
}
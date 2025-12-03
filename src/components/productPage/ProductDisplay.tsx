// HOOKS
import { useState } from 'react';

// COMPONENTS
import BtnA from '@/components/BtnA';
import EpArrowLeft from '@/components/svgs/EpArrowLeft';

// STORE
import { useAllProductImagesStore, useLanguageStore } from '@/stores/index';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.avif";
const outfit1 = "/assets/img/outfit.webp";
const outfit2 = "/assets/img/outfit-2.avif";
const outfit3 = "/assets/img/outfit-3.avif";
const outfit5 = "/assets/img/outfit-5.avif";

type Props = {
  className?: string;
  imagesArray?: any;
  isLoading?: boolean;
}

export default function ProductDisplay ({ 
  className, 
  imagesArray = [], 
  isLoading = false,
  ...props 
}: Props) {
  
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const setToggle = useAllProductImagesStore(state => state.setToggle);
  const setImages = useAllProductImagesStore(state => state.setImages);
  const [ selectedIndex, setSelectedIndex ] = useState<number>(0);
  const leftArrowInactive = false;
  const totalLenght = imagesArray.length;
  const sliceArrayInto5 = (array: any[]) => array.slice(0, 5); 

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'see_all_images_button_is_clicked':
        setToggle(true);
        setImages(imagesArray)
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG & UI
  // imagesArray = [outfit2];
  // imagesArray = [outfit3, outfit2];
  // imagesArray = [outfit1, outfit3, outfit2];
  // imagesArray = [outfit1, outfit5, outfit3, outfit2];
  // imagesArray = [outfit1, outfit5, outfit3, outfit2, outfit2];
  // imagesArray = [outfit1, outfit5, outfit3, outfit2, outfit1, outfit3];
  // const totalLenght = imagesArray.length;
  
  if (isLoading) return (
    <div>test</div>
  )

  if (totalLenght === 1) return (
    <section
      className="w-full"
    >
      <div
        className="
          w-full aspect-[2/3] rounded-lg overflow-hidden    
        "
      >
        <img 
          className="
            w-full h-full obejct-center object-cover
          "
          alt="Photo"
          src={imagesArray[0]}
        />
      </div>
    </section>
  )
  
  if (totalLenght === 2) return (
    <section
      className="grid grid-cols-3 gap-4 w-full items-center mb-auto"
    >
      <div
        className="
          col-span-2 row-span-2 order-2 w-full h-full object-center object-cover
          rounded-lg overflow-hidden
        "
      >
        <img 
          className="
            w-full h-full obejct-center object-cover
          "
          alt="Photo"
          src={imagesArray[selectedIndex]}
        />
      </div>
      {imagesArray.map((url: string, i: number) => 
        <div
          className={`
            order-${i === 1 ? 3 : 1} aspect-[2/3] object-center object-cover
            border-solid border-[2px] overflow-hidden
            cursor-pointer rounded-lg
            transition-all duration-300 ease-in-out
            ${selectedIndex === i 
              ? 'border-primary' 
              : 'border-body-extra-light hover:border-primary brightness-75'
            }
          `}
          key={i}
          onClick={() => setSelectedIndex(i)}
        >
          <img 
            className={`
              w-full h-full obejct-center object-cover
            `}
            alt="Photo"
            src={url}
          />    
        </div>
      )}
    </section>
  )

  if (totalLenght === 3) return (
    <section
      className="grid grid-cols-3 gap-4 w-full items-center mb-auto"
    >
      <div
        className="
          col-span-2 row-span-3 order-2 w-full h-full object-center object-cover
          rounded-lg overflow-hidden
        "
      >
        <img 
          className="
            w-full h-full obejct-center object-cover
          "
          alt="Photo"
          src={imagesArray[selectedIndex]}
          />
        </div>
      {imagesArray.map((url: string, i:number) => 
        <div
          className={`
            order-${i === 1 ? 3 : i + 1} aspect-[1/1] object-center object-cover
            border-solid border-[2px] 
            cursor-pointer rounded-lg overflow-hidden
            transition-all duration-300 ease-in-out
            ${selectedIndex === i 
              ? 'border-primary' 
              : 'border-body-extra-light hover:border-primary brightness-75'
            }
          `}
          key={i}
          onClick={() => setSelectedIndex(i)}
        >
          <img 
            className={`
              w-full h-full obejct-center object-cover
            `}
            alt="Photo"
            src={url}
          />    
        </div>
      )}
    </section>
  )

  if (totalLenght === 4) return (
    <section
      className="grid grid-cols-3 grid-rows-4 gap-4 w-full items-center mb-auto"
    >
      <div
        className="
        col-span-2 row-span-3 order-2 w-full h-full object-center object-cover
        rounded-lg overflow-hidden
        "
      >
        <img 
          className="
            w-full h-full obejct-center object-cover
          "
          alt="Photo"
          src={imagesArray[selectedIndex]}
        />
      </div>
      <div
        className={`
          order-1 h-full row-span-2
          object-center object-cover overflow-hidden
          border-solid border-[2px] 
          cursor-pointer rounded-lg
          transition-all duration-300 ease-in-out
          ${selectedIndex === 0 
            ? 'border-primary' 
            : 'border-body-extra-light hover:border-primary brightness-75'
          }
        `}
        key={0}
        onClick={() => setSelectedIndex(0)}
      >
        <img 
          className={`
            w-full h-full obejct-center object-cover
          `}
          alt="Photo"
          src={imagesArray[0]}
        />    
      </div>
      <div
        className={`
          order-3 h-full row-span-2
          object-center object-cover overflow-hidden
          border-solid border-[2px] 
          cursor-pointer rounded-lg
          transition-all duration-300 ease-in-out
          ${selectedIndex === 1 
            ? 'border-primary' 
            : 'border-body-extra-light hover:border-primary brightness-75'
          }
        `}
        key={1}
        onClick={() => setSelectedIndex(1)}
      >
        <img 
          className={`
            w-full h-full obejct-center object-cover
          `}
          alt="Photo"
          src={imagesArray[1]}
        />    
      </div>
      <div
        className={`
          order-4 aspect-[1/1] object-center object-cover
          border-solid border-[2px] overflow-hidden
          cursor-pointer rounded-lg
          transition-all duration-300 ease-in-out
          ${selectedIndex === 2 
            ? 'border-primary' 
            : 'border-body-extra-light hover:border-primary brightness-75'
          }
        `}
        key={2}
        onClick={() => setSelectedIndex(2)}
      >
        <img 
          className={`
            w-full h-full obejct-center object-cover
          `}
          alt="Photo"
          src={imagesArray[2]}
        />    
      </div>
      <div
        className={`
          order-5 aspect-[1/1] 
          object-center object-cover overflow-hidden
          border-solid border-[2px] 
          cursor-pointer rounded-lg
          transition-all duration-300 ease-in-out
          ${selectedIndex === 3 
            ? 'border-primary' 
            : 'border-body-extra-light hover:border-primary brightness-75'
          }
        `}
        key={3}
        onClick={() => setSelectedIndex(3)}
      >
        <img 
          className={`
            w-full h-full obejct-center object-cover
          `}
          alt="Photo"
          src={imagesArray[3]}
        />    
        </div>
      </section>
  )

  if (totalLenght === 5) return (
    <section
      className="grid grid-cols-3 gap-4 w-full h-full items-center mb-auto"
    >
      <div
        className="
        col-span-2 row-span-2 order-2 w-full h-full object-center object-cover
        rounded-lg overflow-hidden
      "
      >
        <img 
          className={`
            w-full h-full obejct-center object-cover
          `}
          alt="Photo"
          src={imagesArray[selectedIndex]}
        />
      </div>
      {imagesArray.map((url: string, i: number) => 
        <div
          className={`
            order-${(i === 1)? 3 : i + 1} aspect-[${(i === 0 || i === 1 )? '2/3' : '1/1'}] object-center object-cover
            border-solid border-[2px] overflow-hidden 
            cursor-pointer rounded-lg
            transition-all duration-300 ease-in-out
            ${selectedIndex === i 
              ? 'border-primary' 
              : 'border-body-extra-light hover:border-primary brightness-75'
            }
          `}
          key={i}
          onClick={() => setSelectedIndex(i)}
        >
          <img 
            className={`
              w-full h-full obejct-center object-cover
            `}
            alt="Photo"
            src={url}
          />    
        </div>
      )}
    </section>
  )

  return (
    <section
      className="grid grid-cols-3 gap-4 w-full h-full items-center mb-auto"
    >
      <div
        className="
          col-span-2 row-span-3 order-2 w-full h-full object-center object-cover
          rounded-lg overflow-hidden
        "
      >
        <img 
          className={`
            w-full h-full obejct-center object-cover
          `}
          alt="Photo"
          src={imagesArray[selectedIndex]}
        />
      </div>
      {sliceArrayInto5(imagesArray).map((url, i) => 
        <div
          className={`
            order-${i === 1 ? 3 : i + 1} aspect-[1/1] object-center object-cover
            border-solid border-[2px] overflow-hidden
            cursor-pointer rounded-lg
            transition-all duration-300 ease-in-out
            ${selectedIndex === i 
              ? 'border-primary' 
              : 'border-body-extra-light hover:border-primary brightness-75'
            }
          `}
          key={i}
          onClick={() => setSelectedIndex(i)}
        >
          <img 
            className={`
              w-full h-full obejct-center object-cover
            `}
            alt="Photo"
            src={url}
          />    
        </div>
      )}
      {totalLenght === 6 ?
        <div
          className={`
            order-7 aspect-[1/1] object-center object-cover
            border-solid border-[2px] overflow-hidden
            cursor-pointer rounded-lg
            transition-all duration-300 ease-in-out
            ${selectedIndex === 5 
              ? 'border-primary' 
              : 'border-body-extra-light hover:border-primary brightness-75'
            }
          `}
          onClick={() => setSelectedIndex(5)}
        >
          <img 
            className={`
              w-full h-full obejct-center object-cover
            `}
            alt="Photo"
            src={imagesArray[5]}
          />
        </div> 
        : <button
            className={`
              relative order-7 aspect-[1/1] object-center object-cover
              border-solid border-[2px] overflow-hidden
              border-body-extra-light hover:border-primary
              cursor-pointer rounded-lg overflow-hidden
              transition-all duration-300 ease-in-out
            `}
            data-type="see_all_images_button_is_clicked"
            onClick={handleClick}
          >
            <img 
              className={`
                w-full h-full object-center object-cover brightness-[50%]
              `}
              alt="Photo"
              src={imagesArray[5]}
            />
            <div
              className="
                absolute top-0 left-0 w-full h-full
                flex flex-col items-center justify-center
                text-xl text-heading-invert drop-shadow-md 
              "
            >
              <span>
              {!isEn || '+'}{totalLenght - 5}{isEn || '+'} {isEn ? 'more': 'اخر'}
              </span>
              <span className="font-bold underline">
                {isEn ? 'SEE ALL' : 'عرض الكل'}
              </span>
            </div>  
          </button>
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
// HOOKS
import { useState, useRef } from 'react';

// COMPONENTS
import LineMdChevronDownCircle from '@/components/svgs/LineMdChevronDownCircle';
import LineMdStarPulsatingFilledLoop from '@/components/svgs/LineMdStarPulsatingFilledLoop';

// STORES
import { useLanguageStore } from '@/stores/index';

type Props = {
  descArray?: string[];
  title?: string;
  toggle?: boolean;
  isLoading?: boolean;
} & React.ComponentPropsWithRef<"div">;

export default function ProductLists ({ 
  title = 'NO TITLE', 
  descArray = ['Text is Empty'], 
  toggle = false, 
  isLoading = false,
  ...props 
}: Props) {
  
  // const [ toggle, setToggle ] = useState<boolean>(false);
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const [ overflowToggle, setOverflowToggle ] = useState<boolean>(false);
  const descRef = useRef<any>(null);
  const getScrollHeight = (el: HTMLElement) => el?.scrollHeight + 16 || 0;

  if (isLoading) return (
    <div
      className="
        flex flex-col w-full py-4
        border-solid border-background-light border-y-[1px] mb-[-1px] 
      "
      /* onClick={() => { 
        setToggle(val => !val); 
        overflowToggle 
        ?  setOverflowToggle(val => !val)
        :  setTimeout(() => setOverflowToggle(val => !val), 300); 
      }} */
      { ...props }
    >
      <div
        className={`
          flex items-center justify-between cursor-pointer
          transition-all duration-300 ease-in-out
          ${toggle ? 'text-heaidng font-bold' : 'text-body'}
        `}
      >
        <h3
          className="--opacity-blink bg-background-light text-transparent"
        >
          ////////////
        </h3>
        <div 
          className={`
            --opacity-blink w-5 h-5 bg-background-light rounded-full transition-all duration-300 ease-in-out
            ${toggle ? 'rotate-180' : 'rotate-0'}
          `}
        />
      </div>
      <ul
        className={`
          text-body
          transition-all duration-300 ease-in-out
        `}
        style={{
          maxHeight: toggle ? getScrollHeight(descRef?.current) : '0',
          paddingTop: toggle ? '0.5rem' : '0',
          overflow: overflowToggle ? 'visible' : 'hidden',
          opacity: toggle ? '1' : '0',
        }}

        ref={descRef}
      >
        {[1, 2, 3].map((itm, i) => 
          <li
            className="
              relative px-6 rounded-lg
            "
            key={i}
          >
            <span className="--opacity-blink text-transparent">
              //////////////////////////////////////////////////////////////////////////
            </span>
            <LineMdStarPulsatingFilledLoop 
              className={`
                content-[''] absolute top-[3px] 
                w-4 h-4 
                transition-all duration-300 ease-in-out
                ${isEn ? 'left-0' : 'right-0'}
              `}
            />
          </li>
        )}
      </ul>
    </div>
  )

  return (
    <div
      className="
        flex flex-col w-full py-4
        border-solid border-inbetween border-y-[1px] mb-[-1px] 
      "
      /* onClick={() => { 
        setToggle(val => !val); 
        overflowToggle 
        ?  setOverflowToggle(val => !val)
        :  setTimeout(() => setOverflowToggle(val => !val), 300); 
      }} */
      { ...props }
    >
      <div
        className={`
          flex items-center justify-between cursor-pointer
          transition-all duration-300 ease-in-out
          ${toggle ? 'text-heaidng font-bold' : 'text-body'}
        `}
      >

        <h3
          className="text-base"
        >
          {title}
        </h3>
        <LineMdChevronDownCircle 
          className={`
            transition-all duration-300 ease-in-out
            ${toggle ? 'rotate-180' : 'rotate-0'}
          `}
          width={20}
          height={20}
        />

      </div>
      <ul
        className={`
          text-body
          transition-all duration-300 ease-in-out
        `}
        style={{
          maxHeight: toggle ? getScrollHeight(descRef?.current) : '0',
          paddingTop: toggle ? '0.5rem' : '0',
          overflow: overflowToggle ? 'visible' : 'hidden',
          opacity: toggle ? '1' : '0',
        }}

        ref={descRef}
      >
        {descArray.map((itm, i) => 
          <li
            className="
              relative px-6
            "
            key={i}
          >
            <span>
              {itm}            
            </span>
            <LineMdStarPulsatingFilledLoop 
              className={`
                content-[''] absolute top-[3px] 
                w-4 h-4 
                transition-all duration-300 ease-in-out
                ${isEn ? 'left-0' : 'right-0'}
              `}
            />
          </li>
        )}
      </ul>
    </div>
  )
}
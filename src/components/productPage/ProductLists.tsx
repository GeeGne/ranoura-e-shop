// HOOKS
import { useState, useRef } from 'react';

// COMPONENTS
import LineMdChevronDownCircle from '@/components/svgs/LineMdChevronDownCircle';
import LineMdStarPulsatingFilledLoop from '@/components/svgs/LineMdStarPulsatingFilledLoop';

type Props = {
  descArray?: string[];
  title?: string;
}

export default function ProductLists ({ title = 'NO TITLE', descArray = ['Text is Empty'] }: Props) {
  
  const [ toggle, setToggle ] = useState<boolean>(false);
  const [ overflowToggle, setOverflowToggle ] = useState<boolean>(false);
  const descRef = useRef<any>(null);
  const getScrollHeight = (el: HTMLElement) => el?.scrollHeight + 16 || 0;

  return (
    <div
      className="
        flex flex-col w-full py-4
        border-solid border-inbetween border-y-[1px] mb-[-1px] 
      "
      onClick={() => { 
        setToggle(val => !val); 
        overflowToggle 
        ?  setOverflowToggle(val => !val)
        :  setTimeout(() => setOverflowToggle(val => !val), 300); 
      }}
    >
      <div
        className={`
          flex items-center justify-between cursor-pointer
          transition-all duration-300 ease-in-out
          ${toggle ? 'text-heaidng font-bold' : 'text-body'}
        `}
      >

        <h3
          className="text-md "
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
          overflow: overflowToggle ? 'visible' : 'hidden'
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
              className="
                content-[''] absolute left-0 top-[3px] 
                w-4 h-4 
                transition-all duration-300 ease-in-out
              "
            />
          </li>
        )}
      </ul>
    </div>
  )
}
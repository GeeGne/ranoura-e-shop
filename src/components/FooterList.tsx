// HOOKS
import React, { useState, useRef, useEffect } from 'react';
import PlusIcon from '@/components/svgs/Plus';
import MinusIcon from '@/components/svgs/Minus';
import UnderlineStyle from '@/components/UnderlineStyle';

type Props = {
  title: string,
  content: string[] | React.ReactNode[],
  isHTML?: boolean;
}

export default function FooterList ({ title, content, ...props}: Props) {

  const [ toggle, setToggle ] = useState<boolean>(false);
  const [ overflowToggle, setOverflowToggle ] = useState<boolean>(false);
  const uiRef = useRef<any>(null);

  const getScrollHeight = (el: HTMLElement) => el?.scrollHeight + 16 || 0;

  // DEBUG
  const debug = (toggle = false) => {
    if (!toggle) return;
    console.log('offset height: ', uiRef.current?.offsetHeight)
    console.log('scroll height: ', uiRef.current?.scrollHeight)  
    console.log('window width: ', window?.innerWidth)  
  }
  debug();

  return (
    <div
      className="flex flex-col gap-2 w-full max-w-[600px] mx-auto py-2"
      {...props}
    >
      <button
        className="flex flex-row text-heading-invert text-xl text-bold cursor-pointer justify-between"
        onClick={() => {
          setToggle(val => !val);
          overflowToggle
            ? setOverflowToggle(val => !val)
            : setTimeout(() => setOverflowToggle(val => !val), 200)
        }}
      >
        <span>
          {title}
        </span>
        {toggle
          ? <MinusIcon className="lg:hidden" />
          : <PlusIcon className="lg:hidden" />
        }
      </button>
      <ul
        className={`
          flex flex-col gap-2 text-body-invert overflow-hidden
          transition-all duration-300 ease-in-out lg:min-h-full 
        `}
        style={{
          maxHeight: `${toggle ? getScrollHeight(uiRef.current) : 0}px`, 
          overflow: overflowToggle ? `visible` : 'hidden', 
        }}
        ref={uiRef}
      >
        {content?.map((itm, i) => 
          <li 
            className="
              text-body-invert hover:text-heading-invert cursor-pointer
              transition-all ease-out duration-200
            "
            role="button"
            key={i}
          >
            <span
              className="group relative inline-block"
            >
              {itm}
              <UnderlineStyle />
            </span>
          </li>
        )}
      </ul>
      <hr className={`
          border-2 border-body-invert lg:hidden
        `} 
      />
    </div>
  )
}
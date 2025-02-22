// HOOKS
import React, { useState, useRef, useEffect } from 'react';
import PlusIcon from '@/components/svgs/Plus';
import MinusIcon from '@/components/svgs/Minus';
import UnderlineStyle from '@/components/UnderlineStyle';

// STORES
import { useAlertMessageStore } from '@/stores/index';

type Props = {
  title: string,
  content: string[] | React.ReactNode[],
  isHTML?: boolean;
}

export default function FooterList ({ title, content, ...props}: Props) {

  const [ toggle, setToggle ] = useState<boolean>(false);
  const [ overflowToggle, setOverflowToggle ] = useState<boolean>(false);
  const uiRef = useRef<any>(null);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const getScrollHeight = (el: HTMLElement) => el?.scrollHeight + 16 || 0;

  // DEBUG
  const debug = (toggle = false) => {
    if (!toggle) return;
    console.log('offset height: ', uiRef.current?.offsetHeight)
    console.log('scroll height: ', uiRef.current?.scrollHeight)  
    console.log('window width: ', window?.innerWidth)  
  }
  debug();

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'subList_button_is_clicked':
        setAlertToggle(Date.now());
        setAlertType("warning");
        setAlertMessage("Sorry! We're currently working on this feature.");
        break;
      default:
        console.error('Unknown type: ', type);
    }
  };

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
          transition-all duration-300 ease-in-out lg:min-h-full lg:opacity-100
          ${toggle ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          maxHeight: `${toggle ? getScrollHeight(uiRef.current) : 0}px`, 
          overflow: overflowToggle ? `visible` : 'hidden'
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
            data-type="subList_button_is_clicked"
            onClick={handleClick}
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
// HOOKS
import React, { useState, useRef, useEffect } from 'react';
import PlusIcon from '@/components/svgs/Plus';
import MinusIcon from '@/components/svgs/Minus';
import UnderlineStyle from '@/components/UnderlineStyle';

// STORES
import { useAlertMessageStore, useFooterListStore } from '@/stores/index';

type Props = {
  title: string,
  content: string[] | React.ReactNode[],
  isHTML?: boolean;
  index?: number;
}

export default function FooterList ({ title, content, index, ...props}: Props) {

  const toggleIndex = useFooterListStore(state => state.toggleIndex);
  const setToggleIndex = useFooterListStore(state => state.setToggleIndex);

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
      className="
        flex flex-col lg:gap-4 w-full max-w-[600px] mx-auto py-4 lg:py-0
        border-solid border-heading-invert border-y-[5px] mb-[-5px] lg:border-none
      "
      {...props}
    >
      <button
        className="flex flex-row text-heading-invert text-xl text-bold cursor-pointer justify-between"
        onClick={() => {
          setToggleIndex(toggleIndex === index ? null : index);
        }}
      >
        <span>
          {title}
        </span>
        {toggleIndex === index
          ? <MinusIcon className="lg:hidden" />
          : <PlusIcon className="lg:hidden" />
        }
      </button>
      <ul
        className={`
          flex flex-col gap-2 text-body-invert overflow-hidden overflow-hidden
          transition-all duration-300 ease-in-out lg:min-h-full lg:opacity-100
          ${toggleIndex === index ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          maxHeight: `${toggleIndex === index ? getScrollHeight(uiRef.current) : 0}px`, 
          paddingTop: toggleIndex === index ? '0.5rem' : '0',
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
    </div>
  )
}
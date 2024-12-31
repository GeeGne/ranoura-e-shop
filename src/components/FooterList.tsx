// HOOKS
import { useState, useRef } from 'react';
import PlusIcon from '@/components/svgs/Plus';
import MinusIcon from '@/components/svgs/Minus';

type Props = {
  title: string,
  content: string[]
}

export default function FooterList ({ title, content, ...props}: Props) {

  const [ toggle, setToggle ] = useState<boolean>(false);
  const uiRef = useRef<any>(null);

  const getScrollHeight = (el: HTMLElement) => el?.scrollHeight || 0;

  // DEBUG
  // console.log('offset height: ', uiRef.current?.offsetHeight)
  // console.log('scroll height: ', uiRef.current?.scrollHeight)

  return (
    <div
      className="flex flex-col w-[400px] mx-auto"
      {...props}
    >
      <button
        className="flex flex-row text-heading-invert text-xl text-bold cursor-pointer justify-between"
        onClick={() => setToggle(val => !val)}
      >
        <span>
          {title}
        </span>
        {toggle
          ? <MinusIcon />
          : <PlusIcon />
        }
      </button>
      <ul
        className={`
          flex flex-col gap-2 text-body-invert overflow-hidden
          transition-all duration-300 ease-in-out
        `}
        style={{height: `${toggle ? getScrollHeight(uiRef.current) : 0}px`}}
        ref={uiRef}
      >
        {content?.map((title, i) => 
          <li 
            className="cursor-pointer"
            role="button"
            key={i}
          >
            {title}
          </li>
        )}
      </ul><hr className="border-2 border-body-invert my-4" />
    </div>
  )
}
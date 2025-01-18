// HOOKS
import { useState, useRef } from 'react';

// COMPONENTS
import LineMdChevronSmallRight from '@/components/svgs/LineMdChevronSmallRight';

type Props = {
  title?: string;
}

export default function FilterExpandWrapper ({ title = 'SECTION' }: Props) {
  const [ toggle, setToggle ] = useState<boolean>(false);

  const descRef = useRef<any>(null);
  const getScrollHeight = (el: HTMLElement) => el?.scrollHeight + 16 || 0;

  
  return (
    <div
      className={`
        flex flex-col py-4
        transition-all duration-300 ease-in-out
        ${toggle ? 'gap-2' : 'gap-0'}
      `}
    >
      <div 
        className="flex justify-between cursor-pointer"
        onClick={() => setToggle(val => !val)}
      >
        <h2 
          className={`
            text-md
            transition-all duration-300 ease-in-out
            ${toggle ? 'text-heading font-bold' : 'text-body font-normal'}
          `}
        >
          {title}
        </h2>
        <LineMdChevronSmallRight 
          className={`
            transition-all duration-300 ease-in-out
            ${toggle 
              ? 'text-heading font-bold rotate-[270deg]' 
              : 'text-body font-normal rotate-90'
            }
          `}
        />
      </div>
      <ul
        className={`
          flex flex-col overflow-hidden
          transition-all duration-300 ease-in-out
        `}
        style={{
          maxHeight: toggle ? getScrollHeight(descRef?.current) : '0',
        }}
        ref={descRef}
      >
        <li>
          <label
            className="relative flex gap-2 group"
            htmlFor="test"
          >
            <input 
              className="invisible peer"
              type="checkbox"
              id="test"
              name="test"
            />
            <div
              className="
                absolute top-1/2 left-[0]
                translate-y-[-50%] w-4 h-4 bg-red-500
              "
            />
            <span>
              this is text
            </span>
          </label>
        </li>
        <li>
          is
        </li>
        <li>
          test
        </li>
      </ul>
    </div>  
  )
}
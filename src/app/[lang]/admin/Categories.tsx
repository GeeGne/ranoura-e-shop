"use client"

// HOOKS
import { useState } from 'react';

// SVGS
import LsiconOpenNewOutline from '@/components/svgs/LsiconOpenNewOutline';

// JSON
import adminTabs from '@/json/adminTabs.json';

type Props = {
  props?: React.HTMLAttributes<HTMLElement>;
  className?: string;
};


export default function Categories ({className, props}: Props) {

  const [ toggle, setToggle ] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'close_button_is_clicked':
        setToggle(false);
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  return (
    <section
      className={`
        ${className} p-4
        relative flex flex-col gap-2 overflow-hidden
        ${toggle ? '' : 'w-12'}
      `}
      { ...props }
    >
      <div
        className={`
          flex flex-col gap-2
          h-full
          ${toggle ? '' : 'w-12'}
        `}
      >
        <span>
          C
        </span>
        <span>
          A
        </span>
        <span>
          T
        </span>
        <span>
          E
        </span>
        <span>
          G
        </span>
        <span>
          R
        </span>
        <span>
          I
        </span>
        <span>
          E
        </span>
        <span>
          S
        </span>
      </div>
      <div
        className={`
          flex items-center justify-between text-xl font-medium text-heading
          transition-all duration-300 ease-in-out
          ${toggle ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      >
        <h2
          className="text-content text-xl font-medium underline"
        >
          Categoreis
        </h2>
        <button
          className="border-solid border-inbetween border-[1px] px-2 rounded-[8px]"
          data-type="close_button_is_clicked"
          onClick={handleClick}
        >
          X
        </button>
      </div>
      <div
        className="hidden absolute top-4 right-4"
      >
        <LsiconOpenNewOutline 
          role="button"
          className=""
        />
      </div>
      <ul
        className={`
          flex flex-col gap-2
          transition-all duration-300 ease-in-out
          ${toggle ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      >
        {adminTabs.map((itm, i) =>
          <li
            key={i}
            className="text-body text-base"
          >
            {itm.name}
          </li>
        )}
      </ul>
    </section>
  )
}
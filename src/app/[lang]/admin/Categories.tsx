// HOOKS
import React from 'react';

// SVGS
import LsiconOpenNewOutline from '@/components/svgs/LsiconOpenNewOutline';

// JSON
import adminTabs from '@/json/adminTabs.json';

type Props = {
  props?: React.HTMLAttributes<HTMLElement>;
  className?: string;
};


export default function Categories ({className, props}: Props) {
  return (
    <section
      className={`
        ${className} p-4
        relative flex flex-col gap-2
      `}
      { ...props }
    >
      <div
        className="flex items-center justify-start gap-12"
      >
        <h2
          className="text-content text-xl font-medium underline"
        >
          Categoreis
        </h2>
        <button
          className="absolute top-4 right-4"
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
        className="flex flex-col gap-2"
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
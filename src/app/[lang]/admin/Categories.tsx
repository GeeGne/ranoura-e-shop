// HOOKS
import React from 'react';

// JSON
import adminTabs from '@/json/adminTabs.json';

type Props = {
  props?: React.HTMLAttributes<HTMLElement>;
  className?: string;
};


export default function Categories ({className, props}: Props) {
  return (
    <section
      className={`${className} w-[100px] p-4`}
      { ...props }
    >
      <ul
        className="flex flex-col gap-2"
      >
        {adminTabs.map((itm, i) =>
          <li
            key={i}
          >
            {itm.name}
          </li>
        )}
      </ul>
    </section>
  )
}
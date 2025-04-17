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
      className={`
        ${className} p-4
        flex flex-col gap-2
      `}
      { ...props }
    >
      <h2
        className="text-content text-xl font-medium underline"
      >
        Categoreis
      </h2>
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
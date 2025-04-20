"use client"

// HOOKS
import { useState } from 'react';
import Link from 'next/link';

// COMPONENTS
import CatType from '@/app/[lang]/admin/categories/CatType';
import UnderlineStyle from '@/components/UnderlineStyle';

// SVGS
import LsiconOpenNewOutline from '@/components/svgs/LsiconOpenNewOutline';

// JSON
import adminTabs from '@/json/adminTabs.json';

// STORES
import { useTabNameStore } from '@/stores/index';

type Props = {
  props?: React.HTMLAttributes<HTMLElement>;
  className?: string;
};

export default function Categories ({className, props}: Props) {

  const [ toggle, setToggle ] = useState<boolean>(false);
  const viewArray = adminTabs.filter(tab => tab.type === 'view');
  const editArray = adminTabs.filter(tab => tab.type === 'edit');
  const tabName = useTabNameStore((state: any) => state.tabName);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'close_button_is_clicked':
        setToggle(false);
        break;
      case 'open_button_is_clicked':
        setToggle(true);
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  return (
    <section
      className={`
        ${className} p-4
        relative flex flex-col gap-2 overflow-hidden whitespace-nowrap
        transition-all duration-300 ease-in-out
        ${toggle ? 'w-[200px]' : 'w-12 hover:w-16'}
      `}
      { ...props }
    >
      <div
        className="
          absolute top-0 right-0 w-[2px] h-full 
          bg-primary blur-[2px]
        "
      />
      <div
        className={`
          absolute top-4 left-1/2 translate-x-[-50%]
          flex flex-col gap-1
          h-full text-heading font-bold text-lg items-center
          transition-all duration-300 ease-in-out
          ${toggle ? 'invisible opacity-0' : 'visible opacity-100'}
        `}
        role="button"
        data-type="open_button_is_clicked"
        onClick={handleClick}
      >
        <span>C</span><span>A</span><span>T</span><span>E</span><span>G</span>
        <span>R</span><span>I</span><span>E</span><span>S</span>
        <LsiconOpenNewOutline 
          className="w-6 h-6"
        />
      </div>
      <div
        className={`
          flex items-center justify-between text-xl font-medium text-heading
          transition-all duration-300 ease-in-out
          ${toggle ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      >
        <h2
          className="text-heading text-xl"
        >
          CATEGORIES
        </h2>
        <button
          className="
            border-solid border-inbetween hover:border-body border-[1px] px-2 rounded-[8px]
            transition-all duration-300 ease-in-out
          "
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
      <CatType 
        type="VIEW"
        className={`
          transition-all duration-300 ease-in-out
          ${toggle ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      />
      <ul
        className={`
          flex flex-col gap-2
          transition-all duration-300 ease-in-out
          ${toggle ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      >
        {viewArray.map((itm, i) =>
          <li
            key={i}
            className={`
              transition-all duration-300 ease-in-out
              hover:font-bold hover:text-heading
              ${itm.slug === tabName ? 'text-content font-bold text-base' : 'text-body text-base'}
            `}
          >
            <Link
              href={`/admin/${itm.slug}`}
              className="group relative inline-block"
            >
              {itm.name}
              <UnderlineStyle style={{backgroundColor: 'var(--font-heading-color)'}} />
            </Link>
          </li>          
        )}
      </ul>
      <CatType 
        type="EDIT"
        className={`
          transition-all duration-300 ease-in-out
          ${toggle ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      />
      <ul
        className={`
          flex flex-col gap-2
          transition-all duration-300 ease-in-out
          ${toggle ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      >
        {editArray.map((itm, i) =>
          <li
            key={i}
            className={`
              transition-all duration-300 ease-in-out
              hover:font-bold hover:text-heading
              ${itm.slug === tabName ? 'text-content font-bold text-base' : 'text-body text-base'}
            `}
          >
            <Link
              href={`/admin/${itm.slug}`}
              className="group relative inline-block"
            >
              {itm.name}
              <UnderlineStyle style={{backgroundColor: 'var(--font-heading-color)'}} />
            </Link>
          </li>
        )}
      </ul>
    </section>
  )
}
"use client"

// HOOKS
import { useState } from 'react';
import Link from 'next/link';

// COMPONENTS
import CatType from '@/app/[lang]/admin/categories/CatType';
import UnderlineStyle from '@/components/UnderlineStyle';
import Icon from '@/components/Icon';

// SVGS
import LsiconOpenNewOutline from '@/components/svgs/LsiconOpenNewOutline';

// JSON
import adminTabs from '@/json/adminTabs.json';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

type Props = {
  props?: React.HTMLAttributes<HTMLElement>;
  className?: string;
};

export default function Categories ({className, props}: Props) {

  const lang = useLanguageStore((state) => state.lang);
  const isEn = lang === 'en';
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
        relative flex flex-col gap-2
        bg-primary overflow-hidden whitespace-nowrap
        transition-all duration-300 ease-in-out
        ${toggle ? isEn ? 'w-[200px]' : 'w-[250px]' : 'w-12 hover:w-16'}
      `}
      { ...props }
    >
      <div
        className={`
          absolute top-0 w-[2px] h-full
          bg-background blur-[2px]
          ${isEn ? 'right-0' : 'left-0'}
        `}
      />
      <div
        className={`
          absolute top-4 left-1/2
          flex flex-col gap-1
          h-full text-heading-invert font-bold text-lg items-center
          transition-all duration-300 ease-in-out
          ${toggle ? 'translate-x-[calc(-50%+4rem)] invisible opacity-0' : 'translate-x-[-50%] visible opacity-100'}
        `}
        role="button"
        data-type="open_button_is_clicked"
        onClick={handleClick}
      >
        {isEn 
          ? <><span>C</span><span>A</span><span>T</span><span>E</span><span>G</span>
            <span>R</span><span>I</span><span>E</span><span>S</span></> 
          : <><span>ا</span><span>ل</span><span>ف</span>
            <span>ء</span><span>ا</span><span>ت</span></>
        }
        <LsiconOpenNewOutline 
          className={`
            w-6 h-6 text-heading-invert
            ${isEn ? 'rotate-0' : 'rotate-180'}
          `}
        />
      </div>
      <div
        className={`
          flex items-center justify-between text-xl font-medium text-heading-invert
          transition-all duration-300 ease-in-out
          ${toggle ? 'translate-x-0 visible opacity-100' : 'translate-x-12 invisible opacity-0'}
        `}
      >
        <h2
          className="text-heading-invert text-xl"
        >
          {isEn ? 'CATEGORIES' : 'الفئات'}
        </h2>
        <button
          className="
            border-solid border-inbetween hover:border-body-invert border-[1px] px-2 rounded-[8px]
            transition-all duration-300 ease-in-out
          "
          data-type="close_button_is_clicked"
          onClick={handleClick}
        >
          X
        </button>
      </div>
      <CatType 
        type={isEn ? "VIEW" : "عرض"}
        className={`
          transition-all duration-300 ease-in-out
          ${toggle ? 'translate-x-0 visible opacity-100' : 'translate-x-12 invisible opacity-0'}
        `}
      />
      <ul
        className={`
          flex flex-col gap-2
          transition-all duration-300 ease-in-out
          ${toggle ? 'translate-x-0 visible opacity-100' : 'translate-x-12 invisible opacity-0'}
        `}
      >
        {viewArray.map((itm: any, i) =>
          <li
            key={i}
            className={`
              group p-2 rounded-md 
              transition-all duration-300 ease-in-out 
              hover:bg-[var(--background-deep-light-invert-color)] cursor-pointer
              hover:font-bold hover:text-heading-invert
              ${itm.slug === tabName 
                ? 'text-heading-invert font-bold text-base bg-[var(--background-deep-light-invert-color)]' 
                : 'text-body-invert text-base bg-transparent'
              }
            `}
          >
            <Link
              href={`/admin/${itm.slug}`}
              className="inline-block flex w-full"
            >
              <div
                className="relative flex flex-row gap-2"
              >
                <Icon 
                  svgString={itm.icon}
                  className={`
                    ${itm.slug === tabName 
                      ? 'text-heading-invert' 
                      : 'text-body-invert'
                    }
                    group-hover:text-heading-invert 
                    transition-all duration-300 ease-in-out 
                  `}
                />
                <span>
                  {itm.name[lang]}
                </span>
                <UnderlineStyle />
              </div>
            </Link>
          </li>          
        )}
      </ul>
      <CatType 
        type={isEn ? "EDIT" : "تعديل"}
        className={`
          transition-all duration-300 ease-in-out
          ${toggle ? 'translate-x-0 visible opacity-100' : 'translate-x-12 invisible opacity-0'}
        `}
      />
      <ul
        className={`
          flex flex-col gap-2
          transition-all duration-300 ease-in-out
          ${toggle ? 'translate-x-0 visible opacity-100' : 'translate-x-12 invisible opacity-0'}
        `}
      >
        {editArray.map((itm: any, i) =>
          <li
            key={i}
            className={`
              group p-2 rounded-md 
              transition-all duration-300 ease-in-out 
              hover:bg-[var(--background-deep-light-invert-color)] cursor-pointer
              hover:font-bold hover:text-heading-invert
              ${itm.slug === tabName 
                ? 'text-heading-invert font-bold text-base bg-[var(--background-deep-light-invert-color)]' 
                : 'text-body-invert text-base bg-transparent'
              }
            `}
          >
            <Link
              href={`/admin/${itm.slug}`}
              className="inline-block flex w-full"
            >
              <div
                className="relative flex flex-row items-center gap-2"
              >
                <Icon 
                  svgString={itm.icon}
                  className={`
                    ${itm.slug === tabName 
                      ? 'text-heading-invert' 
                      : 'text-body-invert'
                    }
                    group-hover:text-heading-invert 
                    transition-all duration-300 ease-in-out 
                  `}
                />
                <span>
                  {itm.name[lang]}
                </span>
                <UnderlineStyle />
              </div>
            </Link>
          </li>
        )}
      </ul>
    </section>
  )
}
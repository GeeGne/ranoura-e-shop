// HOOKS
import { useState, useRef, useEffect } from 'react';

// SVGS
import LineMdChevronSmallRight from '@/components/svgs/LineMdChevronSmallRight';
import LineMdConfirmCircleTwotone from '@/components/svgs/LineMdConfirmCircleTwotone';
import LineMdConfirmCircleTwotoneToCircleTwotoneTransition from '@/components/svgs/LineMdConfirmCircleTwotoneToCircleTwotoneTransition';

import LineMdConfirmSquareToSquareTransition from '@/components/svgs/LineMdConfirmSquareToSquareTransition';
import LineMdSquareToConfirmSquareTransition from '@/components/svgs/LineMdSquareToConfirmSquareTransition';

// STORES
import { useFilterWindowStore, useLanguageStore } from '@/stores/index';

type Props = {
  sectionName?: string;
  sectionKey?: string;
  categoriesArray?: object[];
}

export default function FilterExpandWrapper ({ 
  sectionName = 'SECTION',
  sectionKey = 'none',
  categoriesArray = [
    {title: 'this', key: 'this'}, 
    {title: 'is', key: 'is'}, 
    {title: 'test', key: 'test'}
  ]
}: Props
) {
  
  const [ toggle, setToggle ] = useState<boolean>(false);

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const selectedCategories = useFilterWindowStore(state => state.selectedCategories);
  const setSelectedCategories = useFilterWindowStore(state => state.setSelectedCategories);
  const clickedCategory = useFilterWindowStore(state => state.clickedCategory);
  const setClickedCategory = useFilterWindowStore(state => state.setClickedCategory);
  const descRef = useRef<any>(null);
  const getScrollHeight = (el: HTMLElement) => el?.scrollHeight + 16 || 0;
  
  useEffect(() => {
    setToggle(false);
    console.log('clickedCategory: ', clickedCategory);
    if (clickedCategory === sectionKey) setToggle(true) 
  }, [clickedCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    const { key, title, index } = e.currentTarget.dataset;
    const isInputChecked = (ref: any) => ref?.checked;
    
    switch (name) {
      case 'category':
        if (checked) 
          return setSelectedCategories(
            addCategory(selectedCategories, { sectionName, key, title, index }
          ));

        return setSelectedCategories(
          removeCategory(selectedCategories, { sectionName, key, title, index }
        ));
      default:
        console.error('Unknown Name: ', name);
    }
  }

  const addCategory = (array: any[], category: any) => {
    const { key } = category;
    const isCategoryExist = array.some((itm: any) => itm.key === key);

    return isCategoryExist 
      ? array
      : [ ...array, category ]
  }

  const removeCategory = (array: any[], category: any) => {
    const { key } = category;
    const isCategoryExist = array.some((itm: any) => itm.key === key);

    return isCategoryExist 
      ? array.filter(itm => itm.key !== key)
      : array
  }

  // DEBUG
  // console.log('selectedCategories: ', selectedCategories);
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
            text-base
            transition-all duration-300 ease-in-out
            ${toggle ? 'text-heading font-bold' : 'text-body font-normal'}
          `}
        >
          {sectionName}
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
          opacity: toggle ? '1' : '0',
        }}
        ref={descRef}
      >
        {categoriesArray.map((itm: any, i) => 
          <li
            key={i}
          >
            <label
              className="relative flex items-center gap-2 group cursor-pointer"
              htmlFor={itm.key}
            >
              <input 
                className="invisible peer"
                type="checkbox"
                id={itm.key}
                name="category"
                data-index={i}
                data-key={itm.key}
                data-title={itm.title}
                onChange={handleChange}
              />
              {selectedCategories.some(val => val.key === itm.key)
                ? <LineMdSquareToConfirmSquareTransition
                    className={`
                      absolute top-1/2 
                      translate-y-[-50%] w-5 h-5 text-heading
                      ${isEn ? 'left-0' : 'right-0'}
                    `}
                  />
                : <LineMdConfirmSquareToSquareTransition
                    className={`
                      absolute top-1/2 
                      translate-y-[-50%] w-5 h-5 text-body
                      ${isEn ? 'left-0' : 'right-0'}
                    `}
                  />
              } 
              <span
                className={`
                  transition-all duration-300 ease-in-out
                  ${selectedCategories.some(val => val.key === itm.key)
                    ? 'text-heading'
                    : 'text-body'
                  }
                `}
              >
                {itm.title}
              </span>
              {sectionKey === 'colors' &&
                <div
                  className={`w-4 h-4 rounded-full drop-shadow-md`}
                  key={i}
                  style={{backgroundColor: itm.hex}}
                />
              }
            </label> 
          </li>
        )}
      </ul>
    </div>  
  )
}
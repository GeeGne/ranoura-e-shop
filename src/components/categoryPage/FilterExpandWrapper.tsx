// HOOKS
import { useState, useRef } from 'react';

// SVGS
import LineMdChevronSmallRight from '@/components/svgs/LineMdChevronSmallRight';
import LineMdConfirmCircleTwotone from '@/components/svgs/LineMdConfirmCircleTwotone';
import LineMdConfirmCircleTwotoneToCircleTwotoneTransition from '@/components/svgs/LineMdConfirmCircleTwotoneToCircleTwotoneTransition';

// STORES
import { useFilterWindowStore } from '@/stores/index';

type Props = {
  sectionName?: string;
  categoriesArray?: object[];
}

export default function FilterExpandWrapper ({ 
  sectionName = 'SECTION',
  categoriesArray = [
    {title: 'this', key: 'this'}, 
    {title: 'is', key: 'is'}, 
    {title: 'test', key: 'test'}
  ]
}: Props
) {
  const [ toggle, setToggle ] = useState<boolean>(false);
  // const [ selectedCategories, setSelectedCategories ] = useState<any[]>([]);
  const selectedCategories = useFilterWindowStore(state => state.selectedCategories);
  const setSelectedCategories = useFilterWindowStore(state => state.setSelectedCategories);
  const descRef = useRef<any>(null);
  const getScrollHeight = (el: HTMLElement) => el?.scrollHeight + 16 || 0;
  
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
            text-md
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
        }}
        ref={descRef}
      >
        {categoriesArray.length > 0 &&
          categoriesArray.map((itm: any, i) => 
          <li
            key={i}
          >
            <label
              className="relative flex gap-2 group"
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
                ? <LineMdConfirmCircleTwotone
                    className={`
                      absolute top-1/2 left-[0]
                      translate-y-[-50%] w-4 h-4 text-heading
                    `}
                  />
                : <LineMdConfirmCircleTwotoneToCircleTwotoneTransition
                    className={`
                      absolute top-1/2 left-[0]
                      translate-y-[-50%] w-4 h-4 text-body
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
            </label>
          </li>
        )}
      </ul>
    </div>  
  )
}
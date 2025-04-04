// COMPONENTS
import FilterExpandWrapper from "@/components/categoryPage/FilterExpandWrapper";
import ArrowUp from "@/components/svgs/ArrowUp";

// STORES
import { useFilterWindowStore, useLanguageStore } from '@/stores/index';

// JSON
import colors from '@/json/colors.json';

export default function FilterWindow () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const toggle = useFilterWindowStore(state => state.toggle);
  const setToggle = useFilterWindowStore(state => state.setToggle);
  const selectedCategories = useFilterWindowStore(state => state.selectedCategories);
  const setSelectedCategories = useFilterWindowStore(state => state.setSelectedCategories);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type, sectionKey } = e.currentTarget.dataset;

    switch (type) {
      case 'close_button_is_clicked':
        setToggle(false);
        break;
      case 'clear_all_filters_button_is_clicked':
        setSelectedCategories([]);
        break;
      case 'clear_filter_button_is_clicked':
        setSelectedCategories(removeCategory(selectedCategories, sectionKey));
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  const removeCategory = (array: any[], key: any) =>  array.filter(itm => itm.key !== key);

  // DEBUG
  // console.log('test: ', selectedCategories);
  // console.log('test: ', toggle);

  return (
    <div
      className={`
        fixed top-0 left-0 pb-8
        flex flex-col w-screen h-screen bg-[var(--shade-v3-color)] z-[2000]
        transition-all duration-300 ease-in-out
        backdrop-blur-[2px] overflow-y-scroll
        ${toggle ? 'translate-y-[0%]' : 'translate-y-[100%]'}
      `}
    >
      <hr className="border-inbetween"/>
      <div
        className="
          sticky top-0 z-[5]
        "
      >
        <button
          className="
            flex items-center justify-end w-full p-5 opacity-100 cursor-pointer
            w-full text-body text-3xl font-thin
            flex items-center justify-center gap-2 bg-[hsla(0,0%,80%,0.6)] 
            backdrop-blur-[3px] z-[5]
          "
          onClick={handleClick}
          data-type="close_button_is_clicked"
        >
          <ArrowUp 
            className={`
              w-8 h-8 text-between rotate-[180deg] rounded-full 
              border-solid border-body-light border-[1px] p-1
              ${isEn ? 'order-1' : 'order-2'}
            `}
          />
          <h2
            className={`
              ${isEn ? 'order-2' : 'order-1'}
            `}
          >
            {isEn ? 'CLOSE' : 'الغاء'}
          </h2>
        </button>
        <hr className="border-inbetween"/>
        <section
          className="
            flex gap-8 p-4 w-full max-w-[700px] mx-auto backdrop-blur-[3px]
          "
        >
          {selectedCategories.length > 0 &&
            <ul
              className="flex flex-row flex-wrap gap-2"
            >
              {selectedCategories?.map((itm: any, i: number) =>
                <li
                  className="
                    flex items-center text-sm text-heading-invert 
                    bg-heading gap-2 px-2 py-1 cursor-pointer
                    hover:opacity-80
                    transition-all duraiton-200 ease-in-out
                  "
                  role="button"
                  data-type="clear_filter_button_is_clicked"
                  data-section-key={itm.key}
                  key={i}
                  onClick={handleClick}
                >
                  <span>
                    {itm.title}
                  </span>
                  <span
                    className="text-xs border border-heading-invert px-[0.3rem] rounded-full"
                  >
                    x
                  </span>
                </li>
              )}
            </ul>
          }
          <button
            className={`
              shrink-0 underline text-base text-heading whitespace-nowrap
              ${selectedCategories.length > 0 ? 'hover:font-bold cursor-pointer' : 'hover:font-normal cursor-default'}
              transition-all duration-200 ease-in-out  
            `}
            style={{ textDecoration: selectedCategories.length > 0 ? 'underline' : 'none'}}
            data-type="clear_all_filters_button_is_clicked"
            onClick={handleClick}
          >
            {selectedCategories.length > 0 
             ? (isEn ? 'Clear all filters' : 'امسح جميع الفلاتر')
             : (isEn ? 'No Filters are selected' : 'لم يتم تحديد أي فلاتر')
            }
          </button>
        </section>
        <hr className="border-inbetween mx-4 md:w-[668px] md:mx-auto"/>
      </div>
      <section
        className="divide-y divide-inbetween px-4 w-full max-w-[700px] mx-auto"
      >
        <FilterExpandWrapper 
          sectionName={isEn ? "SORT" : "ترتيب"}
          sectionKey="sort"
          categoriesArray={[
            {
              title: isEn ? 'Price:Low To High' : 'السعر: من الأدنى إلى الأعلى'
              , key: 'lth'
            },{
              title: isEn ? 'Price:High To Low' : 'السعر: من الأعلى إلى الأدنى'
              , key: 'htl'
            }, 
          ]}
        />
        <FilterExpandWrapper 
          sectionName={isEn ? "COLORS" : "الوان"}
          sectionKey="colors"
          categoriesArray={ 
            colors.map(({title, name, hex}) => ({ 
               title: title[isEn ? 'en' : 'ar'], 
               key:name, 
               hex 
              } 
            )) 
          }
        />
        <FilterExpandWrapper 
          sectionName={isEn ? "PRICE" : "السعر"}
          sectionKey="price"
          categoriesArray={[
            {title: '0 - 20,000', key: '0t20'}, 
            {title: '20,000 - 40,000', key: '20t40'}, 
            {title: '40,000 - 60,000', key: '40t60'}
          ]}
        />
        <FilterExpandWrapper 
          sectionName={isEn ? "SIZE" : "المقاس"}
          sectionKey="size"
          categoriesArray={[
            {title: 'XS', key: 'xs'}, 
            {title: 'SM', key: 'sm'}, 
            {title: 'MD', key: 'md'}, 
            {title: 'LG', key: 'lg'},
            {title: 'XL', key: 'xl'},
            {title: 'XXL', key: 'xxl'}
          ]}
        />
      </section>
      <hr className="border-inbetween mx-4 md:w-[668px] md:mx-auto"/>
    </div>
  )
}
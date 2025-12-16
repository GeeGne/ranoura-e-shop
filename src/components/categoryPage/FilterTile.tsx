// SVGS
import LineMdFilter from '@/components/svgs/LineMdFilter';
import EntypoPriceTag from '@/components/svgs/EntypoPriceTag';
import LineiconsZeroSize from '@/components/svgs/LineiconsZeroSize';

// STORES
import { useFilterWindowStore, useLanguageStore } from '@/stores/index';

type Props = {
  className?: string;
  isLoading?: boolean;
}

export default function FilterTile ({ 
  className = '',
  isLoading = false
}: Props) {
  
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const setToggle = useFilterWindowStore(state => state.setToggle);
  const selectedCategories = useFilterWindowStore(state => state.selectedCategories);
  const setSelectedCategories = useFilterWindowStore(state => state.setSelectedCategories);
  const clickedCategory = useFilterWindowStore(state => state.clickedCategory);
  const setClickedCategory = useFilterWindowStore(state => state.setClickedCategory);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type, key, categoryName } = e.currentTarget.dataset;
    switch (type) {
      case 'colors_button_is_clicked':
      case 'sort_button_is_clicked':
      case 'price_button_is_clicked':
      case 'size_button_is_clicked':
        setToggle(true);
        setClickedCategory(categoryName || '');
        break;
      case 'clear_filter_button_is_clicked':
        setSelectedCategories(removeCategory(selectedCategories, key));
        break;  
      default:
        console.error('Unknown Type: ', type);
    }
  };

  const removeCategory = (array: any[], key: any) =>  array.filter(itm => itm.key !== key);

  if (isLoading) return (
    <section
      className={`
        --opacity-blink flex flex-col gap-2 items-center
        ${className}
      `}
    >
      <ul
        className="flex flex-row gap-4 text-sm text-body"
      >
        {['/////////////', '////////////////', '////////', '//////////'].map(itm =>
          <li
            className="flex flex-row items-center gap-1 cursor-pointer"
            data-category-name="sort"
            data-type="sort_button_is_clicked"
            onClick={handleClick}
          >
            <span
              className="text-transparent bg-background-light rounded-md underline"
            >
              {itm}
            </span>
            <div 
              className="text-transparent rounded-full bg-background-light w-4 h-4"
            />
          </li>
        )}
      </ul>
    </section>
  )

  return (
    <section
      className={`
        flex flex-col gap-2 items-center
        ${className}
      `}
    >
      <ul
        className="flex flex-row gap-4 text-sm text-body"
      >
        <li
          className="flex flex-row items-center gap-1 cursor-pointer"
          data-category-name="sort"
          data-type="sort_button_is_clicked"
          onClick={handleClick}
        >
          <span
            className="underline"
          >
            {isEn ? 'Sort' : 'ترتيب'}
          </span>
          <LineMdFilter 
            className="text-body w-4 h-4 hover:text-heading"
          />
        </li>
        <li
          className="flex flex-row items-center gap-1 cursor-pointer"
          data-category-name="colors"
          data-type="colors_button_is_clicked"
          onClick={handleClick}
        >
          <span
            className="hover:text-heading underline"
          >
            {isEn ? 'Colors' : 'الوان'}
          </span>
          <div
            className="flex flex-row"
          >
            <div className="w-4 h-4 bg-inbetween rounded-full z-[1] opacity-50"/>
            <div className={`w-4 h-4 bg-secondary ${isEn ? 'ml-[-8px]' : 'mr-[-8px]'} rounded-full z-[2] opacity-50`}/>
            <div className={`w-4 h-4 bg-primary ${isEn ? 'ml-[-8px]' : 'mr-[-8px]'} rounded-full z-[3] opacity-100`}/>
          </div>
        </li>
        <li
          className="flex flex-row items-center gap-1 cursor-pointer"
          data-type="price_button_is_clicked"
          data-category-name="price"
          onClick={handleClick}
        >
          <span
            className="hover:text-heading underline"
          >
            {isEn ? 'Price' : 'السعر'}
          </span>
          <EntypoPriceTag 
            className="text-body w-4 h-4 hover:text-heading"
          />
        </li>
        <li
          className="flex flex-row items-center gap-1 cursor-pointer"
          data-category-name="size"
          data-type="size_button_is_clicked"
          onClick={handleClick}
        >
          <span
            className="hover:text-heading underline"
          >
            {isEn ? 'Size' : 'المقاس'}
          </span>
          <LineiconsZeroSize 
            className="text-body w-4 h-4 hover:text-heading"
          />
        </li>
      </ul>
      {selectedCategories.length > 0 &&
        <ul
          className="
            flex flex-row flex-wrap gap-2 p-4 bg-[var(--background-deep-light-color)] rounded-lg
          "
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
              data-key={itm.key}
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
    </section>
  )
}
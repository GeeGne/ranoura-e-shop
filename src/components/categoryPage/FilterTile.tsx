// SVGS
import LineMdFilter from '@/components/svgs/LineMdFilter';
import EntypoPriceTag from '@/components/svgs/EntypoPriceTag';
import LineiconsZeroSize from '@/components/svgs/LineiconsZeroSize';

// STORES
import { useFilterWindowStore } from '@/stores/index';

type Props = {
  className?: string;
}

export default function FilterTile ({ className = '' }: Props) {
  
  const setToggle = useFilterWindowStore(state => state.setToggle);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;
    
    switch (type) {
      case 'colors_button_is_clicked':
      case 'sort_button_is_clicked':
      case 'price_button_is_clicked':
      case 'size_button_is_clicked':
        setToggle(true);
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  return (
    <section
      className={`
        flex flex-row
        ${className}
      `}
    >
      <ul
        className="flex flex-row gap-4 text-sm text-body"
      >
        <li
          className="flex flex-row items-center gap-1 cursor-pointer"
          data-type="sort_button_is_clicked"
          onClick={handleClick}
        >
          <span
            className="underline"
          >
            Sort
          </span>
          <LineMdFilter 
            className="text-body w-4 h-4 hover:text-heading"
          />
        </li>
        <li
          className="flex flex-row items-center gap-1 cursor-pointer"
          data-type="colors_button_is_clicked"
          onClick={handleClick}
        >
          <span
            className="hover:text-heading underline"
          >
            Colors
          </span>
          <div
            className="flex flex-row"
          >
            <div className="w-4 h-4 bg-inbetween rounded-full z-[5] opacity-50"/>
            <div className="w-4 h-4 bg-secondary ml-[-8px] rounded-full z-[10] opacity-50"/>
            <div className="w-4 h-4 bg-primary ml-[-8px] rounded-full z-[15] opacity-100"/>
          </div>
        </li>
        <li
          className="flex flex-row items-center gap-1 cursor-pointer"
          data-type="price_button_is_clicked"
          onClick={handleClick}
        >
          <span
            className="hover:text-heading underline"
          >
            Price
          </span>
          <EntypoPriceTag 
            className="text-body w-4 h-4 hover:text-heading"
          />
        </li>
        <li
          className="flex flex-row items-center gap-1 cursor-pointer"
          data-type="size_button_is_clicked"
          onClick={handleClick}
        >
          <span
            className="hover:text-heading underline"
          >
            Size
          </span>
          <LineiconsZeroSize 
            className="text-body w-4 h-4 hover:text-heading"
          />
        </li>
      </ul>
    </section>
  )
}
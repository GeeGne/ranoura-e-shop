// COMPONENTS
import FilterExpandWrapper from "@/components/categoryPage/FilterExpandWrapper";
import ArrowUp from "@/components/svgs/ArrowUp";

// STORES
import { useFilterWindowStore } from '@/stores/index';

export default function FilterWindow () {
  const toggle = useFilterWindowStore(state => state.toggle);
  const setToggle = useFilterWindowStore(state => state.setToggle);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'close_button_is_clicked':
        setToggle(false);
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  return (
    <div
      className={`
        fixed top-0 left-0 
        flex flex-col w-full h-full bg-[var(--shade-v2-color)] z-[2000]
        transition-all duration-300 ease-in-out
        backdrop-blur-[2px]
        ${toggle ? 'translate-y-[0%]' : 'translate-y-[100%]'}
      `}
    >
      <hr className="border-inbetween"/>
      <button
        className="
          relative flex items-center justify-end w-full p-2 opacity-100 cursor-pointer
          w-full text-body text-3xl font-thin
          flex items-center justify-center gap-2 bg-[hsla(0,0%,80%,0.6)]           
        "
        onClick={handleClick}
        data-type="close_button_is_clicked"
      >
        <ArrowUp 
          className="w-6 h-6 text-between rotate-[180deg] rounded-full border-solid border-body-light border-[1px] p-1"
        />
        <h2>
          CLOSE
        </h2>
      </button>
      <hr className="border-inbetween"/>
      <section
        className="flex gap-8 p-4"
      >
        <ul
          className="flex flex-row flex-wrap gap-2"
        >
          <li
            className="
              flex items-center text-sm text-heading-invert 
              bg-heading gap-2 px-2 py-1 cursor-pointer
              hover:opacity-80
              transition-all duraiton-200 ease-in-out
            "
            role="button"
          >
            <span>
              Yellow
            </span>
            <span
              className="text-xs border border-heading-invert px-1"
            >
              x
            </span>
          </li>
          <li
            className="
              flex items-center text-sm text-heading-invert 
              bg-heading gap-2 px-2 py-1 cursor-pointer
              hover:opacity-80
              transition-all duraiton-200 ease-in-out
            "
            role="button"
          >
            <span>
              XXL
            </span>
            <span
              className="text-xs border border-heading-invert px-1"
            >
              x
            </span>
          </li>
          <li
            className="
              flex items-center text-sm text-heading-invert 
              bg-heading gap-2 px-2 py-1 cursor-pointer
              hover:opacity-80
              transition-all duraiton-200 ease-in-out
            "
            role="button"
          >
            <span>
              High to Low
            </span>
            <span
              className="text-xs border border-heading-invert px-1"
            >
              x
            </span>
          </li>
        </ul>
        <button
          className="
            underline text-md text-heading hover:font-bold cursor-pointer
            transition-all duration-200 ease-in-out  
          "
        >
          Clear all filters
        </button>
      </section>
      <hr className="border-inbetween mx-4"/>
      <section
        className="divide-y divide-inbetween px-4"
      >
        <FilterExpandWrapper 
          title="SORT"
        />
        <FilterExpandWrapper 
          title="COLORS"
        />
        <FilterExpandWrapper 
          title="PRICE"
        />
        <FilterExpandWrapper 
          title="SIZE"
        />
      </section>
      <hr className="border-inbetween mx-4"/>
    </div>
  )
}
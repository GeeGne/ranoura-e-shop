// SVG
import MeteoconsStarFill from "@/components/svgs/MeteoconsStarFill";
import FluentArrowRight12Filled from "@/components/svgs/FluentArrowRight12Filled";

// JSON
import categories from '@/json/categories.json';

// STORES
import { useNavbarStore, useLanguageStore } from '@/stores/index';

export default function CategoryList () {
  
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const categoryToggle = useNavbarStore((status:any) => status.categoryToggle);
  const setCategoryToggle = useNavbarStore((status:any) => status.setCategoryToggle);
  const setSelectedCategory = useNavbarStore((status:any) => status.setSelectedCategory);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type, key } = e.currentTarget.dataset;

    switch (type) {
      case 'category_button_is_clicked':
        setCategoryToggle(true);
        setSelectedCategory(key);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG
  // console.log('categories: ', categories);

  return (
    <ul
      className="flex flex-col w-full shrink-0 p-8 gap-8"
    >
      {categories.map((itm: any, i) => 
        <li
          className={`
            group relative w-full aspect-square bg-foreground 
            rounded-2xl cursor-pointer overflow-hidden
            ${categoryToggle && 'h-0'}
          `}
          role="button"
          key={i}
          data-type="category_button_is_clicked"
          data-key={itm.type}
          onClick={handleClick}
        >
          <img
            className="
              absolute top-0 left-0 w-full h-full z-[5]
            "
            src={itm.navbarImg}
            alt="An Image"
          />
          <div
            className="
              absolute top-0 left-0 w-full h-full z-[10]
              bg-gradient-to-t from-primary to-30% to-transparent
            "
          />
          <div
            className="
              absolute bottom-0 left-0 w-full 
              flex flex-row p-4 items-center gap-4 z-[15]
            "
          > 
            <MeteoconsStarFill 
              className="w-12 h-12 text-heading bg-background rounded-full"
            />
            <span
              className="
                relative flex text-heading-invert text-lg font-bold
                transition-all ease-in-out duration-400
              "
            >
              {itm.name[lang].toUpperCase()}
              <div
                className="
                  absolute top-[100%] left-0 translate-y-[-50%]
                  w-full h-1 bg-heading-invert
                "
              />
              <FluentArrowRight12Filled
                className="
                  absolute top-[100%] left-[calc(100%-6px)] translate-y-[-50%] text-heading-invert w-8 h-8
                "
              />
              <div
                className="
                  flex w-0 group-hover:w-4 bg-transparent  
                  transition-all ease-in-out duration-400
                "
              />
            </span>
          </div>
        </li>
      )}
    </ul>
  )
}
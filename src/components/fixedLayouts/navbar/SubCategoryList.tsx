// HOOKS
import Link from 'next/link';

// COMPONENTS
import UnderlineStyle from "@/components/UnderlineStyle";

// SVG
import ArrowUp from "@/components/svgs/ArrowUp";

// STORES
import { useLayoutRefStore, useNavbarStore, useLanguageStore } from '@/stores/index';

// JSON
import categories from '@/json/categories.json';
import subCategories from '@/json/subCategories.json';

// UTILS
import getCategory from '@/utils/getCategory';

export default function SubCategoryList () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const layoutRef = useLayoutRefStore((state: any) => state.layoutRef);
  const setToggle = useNavbarStore(state => state.setToggle);
  const categoryToggle = useNavbarStore(state => state.categoryToggle);
  const setCategoryToggle = useNavbarStore(state => state.setCategoryToggle);
  const selectedCategory = useNavbarStore(state => state.selectedCategory);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'navigate_to_category':
        setToggle(false);
        setTimeout(() => 
          layoutRef.scrollTo({top: 0, behavior: "instant"})
        ,200);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG
  // console.log('selectedCategory: ', selectedCategory);
  // console.log('subCategoreskeys: ', subCategories.forEach(itm => console.log(itm.key)));

  return (
    <div
      className="flex flex-col shrink-0 w-full p-4 gap-8"
    >
      <div
        className="relative flex flex-row items-center w-full"
      >
        <ArrowUp 
          className={`
            w-4 h-4 text-body cursor-pointer
            ${isEn ? 'rotate-[270deg]' : 'rotate-[90deg]'}
          `}
          role="button"
          onClick={() => setCategoryToggle(false)}
        />
        <span
          className="
            absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
            text-body text-sm
          "
        >
          {getCategory(categories, selectedCategory)?.name[lang].toUpperCase()}
        </span>
      </div>
      <ul
        className="flex flex-col gap-4"
      >
        {subCategories
          .filter(itm => itm.type === selectedCategory)
          .map((sub: any, i: number) => 
            <li
              className="text-heading font-bold text-6xl cursor-pointer"
              key={i}
              data-type="navigate_to_category"
              onClick={handleClick}
            >
              <Link
                href={`/shop/category/${selectedCategory}/${sub.slug}`}
              >
                <span
                  className="group relative"
                >
                  {sub.name[lang].toUpperCase()}
                  <UnderlineStyle 
                    style={{backgroundColor: 'var(--font-heading-color)'}}
                  />
                </span>
              </Link>
            </li>      
          )}
          <li
            className="text-content font-bold text-6xl cursor-pointer"
            data-type="navigate_to_category"
            onClick={handleClick}
          >
            <Link
              href={`/shop/category/${selectedCategory}`}
            >
              <span
                className="group relative"
              >
                {isEn ? 'SEE ALL' : 'عرض الكل'}
                <UnderlineStyle 
                  style={{backgroundColor: 'var(--content-color)'}}
                />
              </span>
            </Link>
          </li>      
          <li
            className="
              w-full h-full overflow-hidden rounded-lg drop-shadow-lg
            "
          >
            <a
              href={categories.find(itm => itm.slug === selectedCategory)?.imgUrl}
            >
              <img
                className="
                  w-full aspect-square  hover:scale-[105%]
                  transition-all duration-300 ease-in-out
                "
                src={categories.find(itm => itm.slug === selectedCategory)?.navbarImg}
                alt="An Image"
                loading="lazy"
                fetchPriority="low"
              />
            </a>
          </li>      
      </ul>

    </div>
  )
}
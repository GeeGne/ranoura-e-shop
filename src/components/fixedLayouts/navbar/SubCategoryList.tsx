// COMPONENTS
import UnderlineStyle from "@/components/UnderlineStyle";

// SVG
import ArrowUp from "@/components/svgs/ArrowUp";

// STORES
import { useNavbarStore } from '@/stores/index';

// JSON
import subCategories from '@/json/subCategories.json';

export default function SubCategoryList () {

  const categoryToggle = useNavbarStore(state => state.categoryToggle);
  const setCategoryToggle = useNavbarStore(state => state.setCategoryToggle);
  const selectedCategory = useNavbarStore(state => state.selectedCategory);

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
          className="w-4 h-4 rotate-[-90deg] text-body cursor-pointer"
          role="button"
          onClick={() => setCategoryToggle(false)}
        />
        <span
          className="
            absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
            text-body text-sm
          "
        >
          CLOTHING
        </span>
      </div>
      <ul
        className="flex flex-col gap-4"
      >
        {subCategories
          .filter((category: any) => category.categoryKey === selectedCategory)
          .map((itm: any, i: number) => 
            <li
              className="text-heading font-bold text-6xl cursor-pointer"
              key={i}
            >
              <span
                className="group relative"
              >
                {itm.name.toUpperCase()}
                <UnderlineStyle 
                  style={{backgroundColor: 'var(--font-heading-color)'}}
                />
              </span>
            </li>      
          )}
      </ul>

    </div>
  )
}
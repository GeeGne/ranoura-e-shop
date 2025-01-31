// STORES
import { useCartStore, useNavbarStore, useTabNameStore } from '@/stores/index';

// COMPONENTS
import UnderlineStyle from '@/components/UnderlineStyle';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";

// JSON
import categories from '@/json/categories.json';
import subCategories from '@/json/subCategories.json';

export default function SubCategoryListLg () {

  const navbarToggle = useNavbarStore((status:any) => status.toggle);
  const setNavbarToggle = useNavbarStore((status:any) => status.setToggle);
  const selectedCategory = useNavbarStore((status:any) => status.selectedCategory);
  const getCategoryTitle = () => categories.find(category => category.key === selectedCategory)?.title || 'Unknown';

  // DEBUG
  // console.log('selectedCategory', selectedCategory);
  
  return (
    <>
      <div
        className={`
          absolute top-0 left-1/2 translate-x-[-50%] 
          w-[100vw] h-full bg-background z-[20] 
          transition-all ease-in-out duration-300
          ${navbarToggle ? 'lg:visible opacity-100' : 'lg:invisible opacity-0'}
        `}        
      />
      <div
        className={`
          hidden lg:flex absolute top-full left-1/2 translate-x-[-50%] 
          w-[100vw] bg-background z-[20] p-8 shadow-md rounded-b-[3rem]
          transition-all ease-in-out duration-300
          ${navbarToggle ? 'lg:visible opacity-100' : 'lg:invisible opacity-0'}
        `}
        onMouseEnter={() => setNavbarToggle(true)}
        onMouseLeave={() => setNavbarToggle(false)}
      >
        <div
          className="flex flex-col flex-1 text-heading text-3xl font-bold gap-2"
        >
          <span
            className="text-body-extra-light text-xs"
          >
            { getCategoryTitle() }
          </span>
          <ul
            className="flex flex-col gap-2"
          >
            {subCategories
              .filter(subCategory => subCategory.categoryKey === selectedCategory)
              .map((subCategory, i) => 
                <li
                  key={i}
                  className="cursor-pointer"
                >
                  <span
                    className="group relative"
                  >
                    {subCategory.name}
                    <UnderlineStyle 
                      style={{backgroundColor: 'var(--font-heading-color)'}}
                    />
                  </span>
                </li>
              )
            }            
          </ul>
        </div>
        <img
          className="flex-[2] rounded-lg" 
          src={ramdanBanner}
          alt="Image"
        />
      </div>
    </>

  )
}
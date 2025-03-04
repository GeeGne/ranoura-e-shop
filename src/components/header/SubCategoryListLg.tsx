// HOOKS
import Link from 'next/link';

// STORES
import { useCartStore, useNavbarStore, useTabNameStore, useLayoutRefStore } from '@/stores/index';

// COMPONENTS
import UnderlineStyle from '@/components/UnderlineStyle';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";

// JSON
import categories from '@/json/categories.json';
import subCategories from '@/json/subCategories.json';

export default function SubCategoryListLg () {

  const layoutRef = useLayoutRefStore((state: any) => state.layoutRef);
  const navbarToggle = useNavbarStore((status:any) => status.toggle);
  const setNavbarToggle = useNavbarStore((status:any) => status.setToggle);
  const selectedCategory = useNavbarStore((status:any) => status.selectedCategory);
  const getCategoryTitle = () => categories.find(category => category.slug === selectedCategory)?.name || 'Unknown';

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case "navigate_to_category":
        setNavbarToggle(false);
        setTimeout(() => 
          layoutRef.scrollTo({top: 0, behavior: "instant"})
        , 200);
        break;
      console.error("Unkown Type:", type);
    }
  };

  // DEBUG
  // console.log('selectedCategory', selectedCategory);
  
  return (
    <>
      <div
        className={`
          hidden lg:flex absolute top-0 left-1/2 translate-x-[-50%] 
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
              .filter(itm => itm.type === selectedCategory)
              .map((itm, i) => 
                <li
                  key={i}
                  className="cursor-pointer"
                >
                  <Link
                    href={`/shop/category/${itm.type}/${itm.slug}`}
                    data-type="navigate_to_category"
                    onClick={handleClick}
                  >
                    <span
                      className="group relative text-heading"
                    >
                      {itm.name}
                      <UnderlineStyle 
                        style={{backgroundColor: 'var(--font-heading-color)'}}
                      />
                    </span>
                  </Link>
                </li>
              )
            }            
            <li
              className="cursor-pointer"
            >
              <Link
                href={`/shop/category/${selectedCategory}`}
                data-type="navigate_to_category"
                onClick={handleClick}
              >
                <span
                  className="group relative text-content"
                >
                  SEE ALL
                  <UnderlineStyle 
                    style={{backgroundColor: 'var(--content-color)'}}
                  />
                </span>
              </Link>
            </li>  
          </ul>
        </div>
        <img
          className="flex-[2] w-full aspect-[2/1] rounded-lg cursor-pointer object-contain object-right" 
          src={categories?.find(itm => selectedCategory === itm.slug)?.navbarLgImg || ramdanBanner}
          alt="Image"
        />
      </div>
    </>

  )
}
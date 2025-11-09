"use client"

// HOOKS
import { useEffect, useState, useRef, useId } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// STORES
import { 
  useLanguageStore, useAlertMessageStore, 
  useEditProductWindowStore, useActivityWindowStore, 
  useLayoutRefStore, useAddCategoryWindowStore, useViewUsersNavTileStore
} from '@/stores/index';

// COMPONENTS
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import LineMdChevronSmallRight from '@/components/svgs/LineMdChevronSmallRight';
import LineMdChevronSmallDown from '@/components/svgs/LineMdChevronSmallDown';
import EpList from '@/components/svgs/EpList';
import IconamoonSearchLight from '@/components/svgs/IconamoonSearchLight';
import LineMdPlus from '@/components/svgs/LineMdPlus';

// API
import addProduct from '@/lib/api/products/post';

// UTILS
import defaultProductData from '@/utils/defaultProductData';

export default function NavTile ({ onScrollTableData, onScrollTableTrigger }: any) {
  
  const id = useId();
  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const [ isMainRefStuck, setIsMainRefStuck ] = useState<boolean>(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const activityWindowToggle = useActivityWindowStore(state => state.toggle);
  const setActivityWindowToggle = useActivityWindowStore(state => state.setToggle);
  const setActivityWindowMessage = useActivityWindowStore(state => state.setMessage);

  const setEditProductWindowToggle = useEditProductWindowStore(state => state.setToggle);
  const setEditProductWindowTrigger = useEditProductWindowStore(state => state.setTrigger);
  const setEditProductWindowProductData = useEditProductWindowStore(state => state.setProductData);

  const setAddCategoryWindowToggle = useAddCategoryWindowStore(state => state.setToggle);

  const searchNameTerm = useViewUsersNavTileStore(state => state.searchByNameTerm);
  const setSearchNameTerm = useViewUsersNavTileStore(state => state.setSearchByNameTerm);
  const searchEmailTerm = useViewUsersNavTileStore(state => state.searchByEmailTerm);
  const setSearchEmailTerm = useViewUsersNavTileStore(state => state.setSearchByEmailTerm);

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSettled: () => {
      setActivityWindowToggle(false);
    },
    onMutate: () => {
      setActivityWindowToggle(true);
      setActivityWindowMessage(isEn ? 'Creating new Product...' : 'جاري انشاء منتج جديد...')
    },
    onSuccess: (data: any) => {
      const { data: productData } = data;
      queryClient.invalidateQueries({ queryKey: ['products']});
      setAlertToggle(Date.now());
      setAlertType("success");
      setAlertMessage(data?.message[isEn ? 'en' : 'ar']);
      
      setEditProductWindowToggle(true);
      setEditProductWindowTrigger(Date.now());
      setEditProductWindowProductData(productData);
    },
    onError: (error: any) => {
      setAlertToggle(Date.now());
      setAlertType("error");
      setAlertMessage(isEn ? "Couldn't create new product, please try again." : "فشل في محاوله انشاء مجتمع جديد, الرجاء محاوله مره اخرى.")
    }
  });

  useEffect(() => {
    const observeSticky = (stickyRef: HTMLElement) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            const rect = stickyRef.getBoundingClientRect();
            const isAtTop = rect.top === 0;
            setIsMainRefStuck(isAtTop);

            console.log('isAtTop: ', isAtTop);
          })
        },
        {
          threshold: [0, 1], // Watch for both fully in and fully out
          rootMargin: '-1px 0px 0px 0px', // Adjust to catch the exact moment
          root: null
        }
      )

      observer.observe(stickyRef);
    }

    if (mainRef.current) observeSticky(mainRef.current)
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'searchByNameInpt':
        setSearchNameTerm(value);
        break;
      case 'searchByEmailInpt':
        setSearchEmailTerm(value);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  const handleClick = async (e: React.MouseEvent<HTMLElement | SVGElement>) => {
    const { type, scrollDirection } = e.currentTarget.dataset;

    switch (type) {
      case 'right_arrow_button_is_clicked':
        onScrollTableData(scrollDirection);
        onScrollTableTrigger(Date.now());
        break;
      case 'left_arrow_button_is_clicked':
        onScrollTableData(scrollDirection);
        onScrollTableTrigger(Date.now());
        break;
      case 'up_arrow_button_is_clicked':
        onScrollTableData(scrollDirection);
        onScrollTableTrigger(Date.now());
        break;
      case 'down_arrow_button_is_clicked':
        onScrollTableData(scrollDirection);
        onScrollTableTrigger(Date.now());
        break;
      case 'add_category_button_is_clicked':
        setAddCategoryWindowToggle(true);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  };

  // UI & DEBUG
  // console.log("onLayoutScroll: ", onLayoutScroll.target.scrollTop);
  // console.log("isMainRefStuck: ", isMainRefStuck);
  console.log("searchNameTerm: ", searchNameTerm);
  console.log("searchEmailTerm: ", searchEmailTerm);

  return(
    <div
      className={`
        sticky top-0 flex items-center justify-between z-[5] p-4
        ${isEn ? 'left-0' : 'right-0'}
      `}
      ref={mainRef}
    >
      <div 
        className={`
          absolute top-0 left-1/2 translate-x-[-50%] 
          w-[100vw] h-[calc(100%+1rem)]
          bg-gradient-to-t from-transparent to-heading from-0% to-100% z-[-1]
          ${isMainRefStuck 
            ? 'opacity-100'
            : 'opacity-0'
          }
          transition-all duration-200 ease-out
        `}
      />
      <div
        className="flex gap-4"
      >
        <label
          className="relative cursor-text"
          htmlFor={`${id}-searchByNameInpt`}
        >
          <input 
            className="peer bg-background-light text-body-light py-2 px-2 rounded-md border-none outline-none"
            id={`${id}-searchByNameInpt`}
            placeholder=""
            name="searchByNameInpt"
            onChange={handleChange}
          />
          <div
            className="
              absolute left-2 top-1/2 translate-y-[-50%]
              invisible peer-focus:invisible peer-placeholder-shown:visible
              opacity-100 peer-focus:opacity-0 peer-placeholder-shown:opacity-100
              flex gap-1
              transition-all duration-200 ease-out
            "
          >
            <IconamoonSearchLight 
              className="
                text-body-light w-5 h-5 
              "
            />
            <span className="text-body-light font-semibold">Search By Name...</span>
          </div>
        </label>
        <label
          className="relative cursor-text"
          htmlFor={`${id}-searchByEmailInpt`}
        >
          <input 
            className="peer bg-background-light text-body-light py-2 px-2 rounded-md border-none outline-none"
            id={`${id}-searchByEmailInpt`}
            placeholder=""
            name="searchByEmailInpt"
            onChange={handleChange}
          />
          <div
            className="
              absolute left-2 top-1/2 translate-y-[-50%]
              invisible peer-focus:invisible peer-placeholder-shown:visible
              opacity-100 peer-focus:opacity-0 peer-placeholder-shown:opacity-100
              flex gap-1
              transition-all duration-200 ease-out
            "
          >
            <IconamoonSearchLight 
              className="
                text-body-light w-5 h-5 
              "
            />
            <span className="text-body-light font-semibold">Search By Email...</span>
          </div>
        </label>
      </div>
      <div
        className="flex items-center gap-8"
      >
        <button
          className="
            relative flex items-center justify-center gap-2
            text-sm text-heading-invert font-bold 
            bg-content p-2 rounded-lg hover:opacity-80
            transition-all duration-300 ease-in-out
          "
          data-type="add_category_button_is_clicked"
          onClick={handleClick}
        >
          <SvgSpinnersRingResize 
            className={`
              absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
              ${activityWindowToggle ? 'visible opacity-100' : 'invisible opacity-0'}  
            `}
          /> 
          <EpList className="w-5 h-5"/>
          <span
            className={`
              ${activityWindowToggle ? 'invisible opacity-0' : 'visible opacity-100'}  
            `}
          >
            {isEn ? 'BANNED USERS LIST' : 'قائمه المحظورين'}
          </span> 
        </button>
        <div
          className="flex items-center"
        >
          <LineMdChevronSmallRight 
            role="button"
            className={`
              border border-solid border-px 
              rounded-full rotate-180
              hover:opacity-70
              transition-all duration-200 ease-out
              ${isEn ? 'order-1' : 'order-3'}
              ${isMainRefStuck ? 'text-heading-invert border-heading-invert' : 'text-body border-body'}
            `}
            data-type="left_arrow_button_is_clicked"
            data-scroll-direction="left"
            onClick={handleClick}
          />
          <div
            className="flex flex-col order-2 gap-4"
          >
            <LineMdChevronSmallDown 
              role="button"
              className={`
                border border-solid border-px 
                rounded-full rotate-180
                hover:opacity-70
                transition-all duration-200 ease-out
                ${isMainRefStuck ? 'text-heading-invert border-heading-invert' : 'text-body border-body'}
              `}
              data-type="up_arrow_button_is_clicked"
              data-scroll-direction="up"
              onClick={handleClick}
            />
            <LineMdChevronSmallDown 
              role="button"
              className={`
                border border-solid border-px 
                rounded-full
                hover:opacity-70
                transition-all duration-200 ease-out
                ${isMainRefStuck ? 'text-heading-invert border-heading-invert' : 'text-body border-body'}
              `}
              data-type="down_arrow_button_is_clicked"
              data-scroll-direction="down"
              onClick={handleClick}
            />
          </div>
          <LineMdChevronSmallRight 
            role="button"
            className={`
              border border-solid border-px 
              rounded-full
              hover:opacity-70
              transition-all duration-200 ease-out
              ${isEn ? 'order-3' : 'order-1'}
              ${isMainRefStuck ? 'text-heading-invert border-heading-invert' : 'text-body border-body'}
            `}
            data-type="right_arrow_button_is_clicked"
            data-scroll-direction="right"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}
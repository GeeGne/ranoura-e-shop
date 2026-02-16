"use client"

// HOOKS
import { useEffect, useState, useRef, useId } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// STORES
import { 
  useLanguageStore, useAlertMessageStore, 
  useEditProductWindowStore, useActivityWindowStore, 
  useLayoutRefStore, useAddCategoryWindowStore, useViewOrdersNavTileStore
} from '@/stores/index';

// COMPONENTS
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import LineMdChevronSmallRight from '@/components/svgs/LineMdChevronSmallRight';
import LineMdChevronSmallDown from '@/components/svgs/LineMdChevronSmallDown';
import FlowbiteSortOutline from '@/components/svgs/FlowbiteSortOutline';
import BxFilter from '@/components/svgs/BxFilter';
import CarbonCloseFilled from '@/components/svgs/CarbonCloseFilled';
import EpList from '@/components/svgs/EpList';
import IconamoonSearchLight from '@/components/svgs/IconamoonSearchLight';
import LineMdPlus from '@/components/svgs/LineMdPlus';
import LineMdCircle from '@/components/svgs/LineMdCircle';
import LineMdCircleToConfirmCircleTransition from '@/components/svgs/LineMdCircleToConfirmCircleTransition';

// API
import addProduct from '@/lib/api/products/post';

// UTILS
import defaultProductData from '@/utils/defaultProductData';

// JSON
import filterArray from '@/json/OrderStatusInfo.json';

export default function NavTile ({ onScrollTableData, onScrollTableTrigger }: any) {
  
  const id = useId();
  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const sortByArray = [ 
    { name: { en: 'None', ar: 'لاشيء' }, fieldName: 'none', value: 'none' },
    { name: { en: 'Created At', ar: 'تاريخ الانشاء' }, fieldName: 'created_at', value: 'created at' },
    { name: { en: 'Updated At', ar: 'تاريخ التحديث' }, fieldName: 'updated_at', value: 'updated at' },
    { name: { en: 'Canceled At', ar: 'تاريخ الالغاء' }, fieldName: 'canceled_at', value: 'canceled at' }
  ];

  const [ isMainRefStuck, setIsMainRefStuck ] = useState<boolean>(false);
  const [ sortByType, setSortByType ] = useState<string>('descending');
  const mainRef = useRef<HTMLDivElement>(null);
  const sortByInptRef = useRef<HTMLInputElement>(null);
  const showNewInptRef = useRef<HTMLInputElement>(null);

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

  const searchOrderIDTerm = useViewOrdersNavTileStore(state => state.searchByOrderIDTerm);
  const setSearchOrderIDTerm = useViewOrdersNavTileStore(state => state.setSearchByOrderIDTerm);
  const searchNameTerm = useViewOrdersNavTileStore(state => state.searchByNameTerm);
  const setSearchNameTerm = useViewOrdersNavTileStore(state => state.setSearchByNameTerm);
  const searchEmailTerm = useViewOrdersNavTileStore(state => state.searchByEmailTerm);
  const setSearchEmailTerm = useViewOrdersNavTileStore(state => state.setSearchByEmailTerm);
  const selectedSortByField = useViewOrdersNavTileStore(state => state.selectedSortByField);
  const setSelectedSortByField = useViewOrdersNavTileStore(state => state.setSelectedSortByField);
  const selectedFilterTags = useViewOrdersNavTileStore(state => state.selectedFilterTags);
  const setSelectedFilterTags = useViewOrdersNavTileStore(state => state.setSelectedFilterTags);
  const setShowNewTag = useViewOrdersNavTileStore(state => state.setShowNewTag);

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
    const { name, value, checked } = e.currentTarget;

    switch (name) {
      case 'searchByNameInpt':
        setSearchNameTerm(value);
        break;
      case 'searchByEmailInpt':
        setSearchEmailTerm(value);
        break;
      case 'searchByOrderIdInpt':
        setSearchOrderIDTerm(value);
        break;
      case 'showNew':
        setShowNewTag(checked);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLElement | SVGElement>) => {
    e.stopPropagation();

    const { 
      type, scrollDirection, fieldName, 
      sortName, filterName, value, sortType
    } = e.currentTarget.dataset;

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
      case 'sort_by_button_is_clicked':
        console.log('sort button clicked');
        if (sortByInptRef.current) {
          const isChecked = sortByInptRef.current.checked;
          sortByInptRef.current.checked = !isChecked;
        };
        break;
      case 'sort_by_list_button_is_clicked':
        if (sortName && fieldName) setSelectedSortByField({ 
          name: sortName, fieldName, value, sortType 
        });
        break;
      case 'sort_type_button_is_clicked':
        const isASortFieldSelected = selectedSortByField?.value !== 'none';
        if (!isASortFieldSelected) return;

        const newSortType = sortType === 'descending' ? 'ascending' : 'descending'
        setSortByType(newSortType);

        setSelectedSortByField({ ...selectedSortByField, sortType: newSortType})
        break;
      case 'filter_list_button_is_clicked':
        // if (fieldName) setSelectedFilterTags(fieldName);
        const isNoneTagSelected = filterName === 'None' || filterName === 'لاشيء';
        if (isNoneTagSelected) return setSelectedFilterTags([]);

        const hasFilterTag = selectedFilterTags?.some((tag: Record<string, any>) => tag.value === value );
        if (hasFilterTag) return selectedFilterTags;

        if (selectedFilterTags) setSelectedFilterTags([
          ...selectedFilterTags, { name: filterName, fieldName, value } 
        ]);
        break;
      case 'selected_filter_tag_button_is_clicked':
        if (selectedFilterTags) setSelectedFilterTags(
          selectedFilterTags.filter((tag: Record<string, any>) => tag.value !== value
        ));
        break;
      default:
        console.error('Unknown type: ', type);
    }
  };

  // UI & DEBUG
  // console.log("onLayoutScroll: ", onLayoutScroll.target.scrollTop);
  // console.log("isMainRefStuck: ", isMainRefStuck);
  // console.log("searchNameTerm: ", searchNameTerm);
  // console.log("searchEmailTerm: ", searchEmailTerm);
  // console.log("searchOrderIDTerm: ", searchOrderIDTerm);

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
        className="flex flex-col gap-4"
      >
        <div
          className="flex gap-4 flex-wrap"
        >
          <label
            className="relative cursor-text"
            htmlFor={`${id}-searchByOrderIdInpt`}
          >
            <input 
              className="peer bg-white text-body-light py-2 px-2 rounded-md border-none outline-none"
              id={`${id}-searchByOrderIdInpt`}
              placeholder=""
              name="searchByOrderIdInpt"
              onChange={handleChange}
            />
            <div
              className={`
                absolute ${isEn ? 'left-2' : 'right-2'} top-1/2 translate-y-[-50%]
                invisible peer-focus:invisible peer-placeholder-shown:visible
                opacity-100 peer-focus:opacity-0 peer-placeholder-shown:opacity-100
                flex gap-1
                transition-all duration-200 ease-out
              `}
            >
              <IconamoonSearchLight 
                className="
                  text-body-light w-5 h-5 
                "
              />
              <span className="text-body-light font-semibold whitespace-nowrap">{isEn ? 'Search By Order ID...' : 'البحث برقم الطلب...'}</span>
            </div>
          </label>
          <label
            className="relative cursor-text"
            htmlFor={`${id}-searchByNameInpt`}
          >
            <input 
              className="peer bg-white text-body-light py-2 px-2 rounded-md border-none outline-none"
              id={`${id}-searchByNameInpt`}
              placeholder=""
              name="searchByNameInpt"
              onChange={handleChange}
            />
            <div
              className={`
                absolute ${isEn ? 'left-2' : 'right-2'} top-1/2 translate-y-[-50%]
                invisible peer-focus:invisible peer-placeholder-shown:visible
                opacity-100 peer-focus:opacity-0 peer-placeholder-shown:opacity-100
                flex gap-1
                transition-all duration-200 ease-out
              `}
            >
              <IconamoonSearchLight 
                className="
                  text-body-light w-5 h-5 
                "
              />
              <span className="text-body-light font-semibold whitespace-nowrap">{isEn ? 'Search By Name...' : 'البحث بالاسم...'}</span>
            </div>
          </label>
          <label
            className="relative cursor-text"
            htmlFor={`${id}-searchByEmailInpt`}
          >
            <input 
              className="peer bg-white text-body-light py-2 px-2 rounded-md border-none outline-none"
              id={`${id}-searchByEmailInpt`}
              placeholder=""
              name="searchByEmailInpt"
              onChange={handleChange}
            />
            <div
              className={`
                absolute ${isEn ? 'left-2' : 'right-2'} top-1/2 translate-y-[-50%]
                invisible peer-focus:invisible peer-placeholder-shown:visible
                opacity-100 peer-focus:opacity-0 peer-placeholder-shown:opacity-100
                flex gap-1
                transition-all duration-200 ease-out
              `}
            >
              <IconamoonSearchLight 
                className="
                  text-body-light w-5 h-5 
                "
              />
              <span className="text-body-light font-semibold whitespace-nowrap">{isEn ? 'Search By Email...' : 'البحث بالايميل...'}</span>
            </div>
          </label>
        </div>
        <div
          className="flex gap-4 flex-wrap whitespace-nowrap"
        >
          <label
            className="
              flex items-center gap-2
              w-fit p-2 grow-0 rounded-md cursor-pointer
              bg-white hover:bg-background-light has-[:checked]:bg-green-200
              translate-all duration-200 ease-in-out
            "
            htmlFor={`${id}-showNew`}
          >
            <input
              className="
                peer absolute w-0 h-0 invisible opacity-0
              "
              id={`${id}-showNew`}
              type="checkbox"
              name="showNew"
              ref={showNewInptRef}
              onChange={handleChange}
            />
            <LineMdCircle className="w-4 h-4 text-body peer-checked:hidden"/>
            <LineMdCircleToConfirmCircleTransition 
              className="
                hidden w-4 h-4 text-body peer-checked:inline peer-checked:text-emerald-600
                translate-all duration-200 ease-in-out
              "
            />
            <span className="
              text-sm text-body font-semibold peer-checked:text-emerald-600
              translate-all duration-200 ease-in-out
            ">
              {isEn ? 'Show New' : 'عرض الجديد'}
            </span>
          </label>
          <div
            className="
              relative flex items-center w-fit gap-2 p-2 
              grow-0 rounded-md cursor-pointer
              bg-white hover:bg-background-light active:bg-background-deep-light
              translate-all duration-200 ease-in-out
            "
            role="button"
            data-type="sort_by_button_is_clicked"
            onClick={handleClick}
          >
            <div
              className={`
                flex gap-1 items-center p-1 rounded-md
                ${selectedSortByField?.value === 'none'  
                  ? 'hover:bg-transparent active:bg-transparent' 
                  : 'hover:bg-white active:bg-background'
                }
                translate-all duration-200 ease-in-out
              `}
              role="button"
              data-type="sort_type_button_is_clicked"
              data-sort-type={sortByType}
              onClick={handleClick}
            >
              {selectedSortByField?.value === 'none'  ||
                <span
                  className="text-content text-xs font-semibold"
                >
                  {sortByType === 'descending' ? 'A - Z' : 'Z - A'}
                </span>
              }
              <FlowbiteSortOutline 
                className={`
                  w-4 h-4
                  ${selectedSortByField?.value === 'none'  ? 'text-body' :  'text-content'}
                `} 
              />
            </div>
            <label
              className="flex gap-2"
              htmlFor={`${id}-sortByInpt`}
            >
              <input
                className="
                  peer absolute w-0 h-0 invisible opacity-0
                "
                id={`${id}-sortByInpt`}
                type="checkbox"
                name="sortByInpt"
                ref={sortByInptRef}
              />
              <span className="text-sm text-body font-semibold">{isEn ? 'Sort By' : 'ترتيب حسب'}</span>
              {selectedSortByField?.value === 'none'
                ||<span className="text-sm text-content font-semibold">
                    {selectedSortByField?.name}
                </span>
              }
              <ul
                className="
                  absolute top-0 peer-checked:top-[calc(100%+0.5rem)] left-0 w-full
                  flex flex-col gap-1 z-[5]
                  invisible peer-checked:visible opacity-0 peer-checked:opacity-100
                  p-1 rounded-lg shadow-lg bg-white
                  translate-all duration-200 ease-in-out
                "
              >
                {sortByArray.map((itm, i) => 
                  <li
                    key={i}
                    className="
                      text-center hover:bg-background-light
                      text-sm text-body hover:text-heading font-semibold p-1 rounded-lg
                      translate-all duration-200 ease-in-out
                    "
                    role="button"
                    data-type="sort_by_list_button_is_clicked"
                    data-field-name={itm.fieldName}
                    data-value={itm.value}
                    data-sort-name={itm.name[lang]}
                    data-sort-type={sortByType}
                    onClick={handleClick}
                  >
                    {itm.name[lang]}
                  </li>
                )}
              </ul>
            </label>
          </div>
          <label
            className="
              relative flex items-center w-fit gap-2 p-2 
              grow-0 rounded-md cursor-pointer
              bg-white hover:bg-background-light active:bg-background-deep-light
              translate-all duration-200 ease-in-out
            "
            htmlFor={`${id}-filterInpt`}
          >
            <input
              className="
                peer absolute w-0 h-0 invisible opacity-0
              "
              id={`${id}-filterInpt`}
              type="checkbox"
              name="filterInpt"
            />
            <BxFilter className="w-4 h-4 text-body" />
            <span className="text-sm text-body font-semibold">{isEn ? 'Filter' : 'تصنيف'}</span>
            <div
              className="
                absolute top-0 peer-checked:top-[calc(100%+0.5rem)] left-1/2 min-w-full
                translate-x-[-50%]
                flex flex-row gap-4
                invisible peer-checked:visible opacity-0 peer-checked:opacity-100
                p-2 rounded-lg shadow-lg bg-white z-[5]
                translate-all duration-200 ease-in-out
              "
            >
              <div
                className="
                  absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
                  h-[calc(100%-24px)] w-[2px] bg-background-deep-light rounded-full
                "
              />
              <ul
                className={`
                  flex flex-col gap-1 w-[90px]
                  before:content-['status'] before:text-sm before:text-inbetween before:text-center before:font-semibold
                  translate-all duration-200 ease-in-out
                  ${isEn ? `before:content-['status']` : `before:content-['الحاله']`}
                `}
              >
                {filterArray.filter((itm: Record<string, any>) => itm.fieldName === 'status').map((itm, i) => 
                  <li
                    key={i}
                    className="
                      text-center hover:bg-background-light whitespace-nowrap
                      text-sm text-body hover:text-heading font-semibold p-1 rounded-lg
                      translate-all duration-200 ease-in-out
                    "
                    role="button"
                    data-type="filter_list_button_is_clicked"
                    data-filter-name={itm.name[lang]}
                    data-field-name={itm.fieldName}
                    data-value={itm.value}
                    onClick={handleClick}
                  >
                    {itm.name[lang]}
                  </li>
                )}
              </ul>              
              <ul
                className={`
                  flex flex-col gap-1 w-[90px]
                  before:text-sm before:text-inbetween before:text-center before:font-semibold
                  translate-all duration-200 ease-in-out
                  ${isEn ? `before:content-['city']` : `before:content-['المحافطه']`}
                `}
              >
                {filterArray.filter((itm: Record<string, any>) => itm.fieldName === 'city').map((itm, i) => 
                  <li
                    key={i}
                    className="
                      text-center hover:bg-background-light whitespace-nowrap
                      text-sm text-body hover:text-heading font-semibold p-1 rounded-lg
                      translate-all duration-200 ease-in-out
                    "
                    role="button"
                    data-type="filter_list_button_is_clicked"
                    data-filter-name={itm.name[lang]}
                    data-field-name={itm.fieldName}
                    data-value={itm.value}
                    onClick={handleClick}
                  >
                    {itm.name[lang]}
                  </li>
                )}
              </ul>              
            </div>
          </label>
          <ul
            className="flex gap-4 flex-wrap whitespace-nowrap"
          >
            {selectedFilterTags?.map((tag, i) =>
              <li
                key={i}
                className="
                  --zoom-in group relative p-2 
                  rounded-lg text-sm text-center cursor-pointer
                  active:opacity-70 bg-background
                  border border-solid border-px border-heading
                  transition-all duration-200 ease-in-out
                "
                role="button"
                data-type="selected_filter_tag_button_is_clicked"
                data-value={tag.value}
                onClick={handleClick}
              >
                <span
                  className="
                    text-sm font-semibold text-heading
                  "
                >
                  {tag.name}
                </span>
                <CarbonCloseFilled
                  className="
                    absolute top-0 right-0 
                    translate-x-[50%] translate-y-[-50%]
                    text-heading bg-background rounded-full w-5 h-5 p-px
                    scale-0 group-hover:scale-100
                    transition-all duration-200 ease-in-out
                  "
                />
              </li>
            )}
          </ul>
        </div>
      </div>
      <div
        className="flex flex-col items-center gap-8 shrink-0"
      >
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
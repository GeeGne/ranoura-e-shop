// HOOKS
import { useEffect, useRef, useId } from 'react';

// COMPONENTS
import LoadingTable from '@/components/LoadingTable';
import ErrorLayout from '@/components/ErrorLayout';
import MdiCardAccountDetails from '@/components/svgs/MdiCardAccountDetails';
import LetsIconsOrderFill from '@/components/svgs/LetsIconsOrderFill';
import MdiArrowDownDrop from '@/components/svgs/MdiArrowDownDrop';
import IconamoonSearchLight from '@/components/svgs/IconamoonSearchLight';

// STORES
import { 
  useOrderDetailsWindowStore, 
  useShippingDetailsWindowStore,
  useLayoutRefStore,
  useViewOrdersNavTileStore
} from '@/stores/index';

// JSON
import orders from '@/json/userOrders.json';
import statusColors from '@/json/orderStatus.json';

// UTILS
import filterByQuery from '@/utils/filterByQuery';

// ASSETS
const pfpImage = '/assets/img/pfp.avif';

type Props = {
  className?: string;
  lang?: 'en' | 'ar';
  isEn?: boolean;
  type?: 'user_orders_table' | 'orders_table' | 'user_order';
  scroll?: string;
  scrollTrigger?: number;
  data: any[] | null;
  isLoading?: boolean;
  isError?: boolean;
} & React.ComponentPropsWithRef<'div'>;

export default function Orders ({ 
  className,
  lang = 'en', 
  isEn = true, 
  type = 'user_order',
  scroll, 
  scrollTrigger,
  data,
  isLoading = false,
  isError = false,
  ...props
}: Props) {

  const id = useId();
  const setOrderDetailsWindowToggle = useOrderDetailsWindowStore(state => state.setToggle);
  const setShippingDetailsWindowToggle = useShippingDetailsWindowStore(state => state.setToggle);

  const layoutRef = useLayoutRefStore(state => state.layoutRef);
  const mainRef = useRef<HTMLDivElement>(null);

  const searchOrderIDTerm = useViewOrdersNavTileStore(state => state.searchByOrderIDTerm);
  const searchNameTerm = useViewOrdersNavTileStore(state => state.searchByNameTerm);
  const searchEmailTerm = useViewOrdersNavTileStore(state => state.searchByEmailTerm);
  const selectedSortByField = useViewOrdersNavTileStore(state => state.selectedSortByField);
  const selectedFilterTags = useViewOrdersNavTileStore(state => state.selectedFilterTags);

  useEffect(() => {
    if (!scroll) return;
    const mainRefFullWidth: number = mainRef.current?.scrollWidth || 0;
    const mainRefHeight: number = mainRef.current?.scrollHeight || 0;
    const fullHeight: number = layoutRef?.scrollHeight || 0;
    const extraHeight = 120;

    switch (scroll) {
      case 'right':
        mainRef.current?.scrollTo({
          left: isEn ? mainRefFullWidth : 0,
          behavior:'smooth'
        })
        break;
      case 'left':
        mainRef.current?.scrollTo({
          left: isEn ? 0 : -1 * mainRefFullWidth,
          behavior:'smooth'
        })
        break;
      case 'up':
        layoutRef.scrollTo({
          top: fullHeight - mainRefHeight - extraHeight,
          behavior: 'smooth'
        });
        break;
      case 'down':
        layoutRef.scrollTo({
          top: fullHeight,
          behavior:'smooth'
        })
        break;
      case 'none':
        break;
      default:
        console.error("Unknown scroll type: ", scroll);
    }
  }, [ scroll, scrollTrigger ]);

  const getProcessedOrders = () => {
  
    const orders: any = data;
    if (!orders) return [];
    console.log('searchOrderIDTerm: ', searchOrderIDTerm);

    const orderIDFilteredOrders = filterByQuery(
      orders, 
      { 
        searchTerms: [searchOrderIDTerm],
        searchFields: [ 'id' ],
        filteringType: 'contains',
        caseSensitive: false,
        specificSearch: false
      }
    );
    console.log('searchNameTerm: ', searchNameTerm);
    const nameFilteredOrders = filterByQuery(
      orderIDFilteredOrders, 
      { 
        searchTerms: [searchNameTerm],
        searchFields: [ 'customer_full_name' ],
        filteringType: 'contains',
        caseSensitive: false,
        specificSearch: false
      }
    );
    const emailFilteredOrders = filterByQuery(
      nameFilteredOrders, 
      { 
        searchTerms: [searchEmailTerm],
        searchFields: [ 'email' ],
        filteringType: 'contains',
        caseSensitive: false,
        specificSearch: false
      }
    );
    const sortUsers = [...emailFilteredOrders].sort((a, b) => {
      const isSortEmpty = selectedSortByField?.value === 'none';
      if (isSortEmpty) return 0;

      const dateA = new Date(a[selectedSortByField?.fieldName]).getTime();
      const dateB = new Date(b[selectedSortByField?.fieldName]).getTime();
      return dateA - dateB;
    });
    const tagFilteredUsers = sortUsers.filter(user => {
      const areFiltersEmpty = selectedFilterTags?.length === 0;
      if (areFiltersEmpty) return true;
      return selectedFilterTags?.some(tag => user[tag.fieldName] === tag.value);
    });
    
    return tagFilteredUsers;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;

    return date.toLocaleString((isEn ? 'en' : 'ar-EG'), {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTimeAgo = (dateStr: string) => {
    const date: any = new Date(dateStr);
    const now: any = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffDays * 60)

    return `${diffDays || diffHours} ${diffDays ? 'days' : 'hours'} ago`;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | SVGSVGElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'order_details_window_is_clicked':
        setOrderDetailsWindowToggle(true);
        break;
      case 'shipping_details_window_is_clicked':
        setShippingDetailsWindowToggle(true);
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  };

  // DEBUG & UI
  console.log('orders: ', data);

  if (isLoading) return (
    <LoadingTable />
  )

  if (isError) return (
    <ErrorLayout 
      title={isEn ? 'Unable To Load' : 'لم يتم التحميل'}
      description={isEn ? 'Please Refresh the page or try again later' : 'الرجاء اعاده تحميل الصفحه او حاول مره اخرى لاحقا'}
    />
  )

  const processedOrders = getProcessedOrders();
  const isOrdersFilteredArrayEmpty = processedOrders.length === 0;

  if (type === 'orders_table') return (
    <div 
      className={`overflow-x-auto ${className}`} 
      ref={mainRef}
      { ...props }
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead
          className="bg-gray-50"
        >
          <tr>
            <th 
              scope="col" 
              className={`
                px-6 py-3 
                ${isEn ? 'text-left' : 'text-right'} text-xs text-body-light 
                font-medium whitespace-nowrap uppercase tracking-wider
              `}
            >
              {isEn ? 'Username' : 'اسم المستخدم'}
            </th>
            <th 
              scope="col" 
              className={`
                px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
                uppercase tracking-wider whitespace-nowrap
              `}
            >
              {isEn ? 'Order Details' : 'معلوامات الطلب'}
            </th>
            <th 
              scope="col" 
              className={`
                px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
                uppercase tracking-wider whitespace-nowrap
              `}
            >
              {isEn ? 'Status' : 'الحال'}
            </th>
            <th 
              scope="col" 
              className={`
                px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
                uppercase tracking-wider whitespace-nowrap
              `}
            >
              {isEn ? 'Total' : 'المجموع'}
            </th>
            <th 
              scope="col" 
              className={`
                px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
                uppercase tracking-wider whitespace-nowrap
              `}
            >
              {isEn ? 'Order Date' : 'تاريخ الطلب'}
            </th>
            <th 
              scope="col" 
              className={`
                px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
                uppercase tracking-wider whitespace-nowrap
              `}
            >
              {isEn ? 'Updated At' : 'اخر تحديث'}
            </th>
            <th 
              scope="col" 
              className={`
                px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
                uppercase tracking-wider whitespace-nowrap
              `}
            >
              {isEn ? 'Canceled At' : 'تاريخ الالغاء'}
            </th>
            <th 
              scope="col" 
              className={`
                px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
                uppercase tracking-wider whitespace-nowrap
              `}
            >
              {isEn ? 'Options' : 'الخيارات'}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isOrdersFilteredArrayEmpty 
            ? <tr className="px-6 py-4 whitespace-nowrap">
                <td
                  className="p-4"
                  colSpan={10}
                >
                  <div
                    className="w-full justify-center flex gap-2 "
                  >
                    <IconamoonSearchLight className="text-body" />
                    <span
                      className="text-body font-semibold text-lg"
                    >
                      {isEn ? 'No Results Found.' : 'لا توجد اي نتائج.'}
                    </span>
                  </div>
                </td>
              </tr>
            : processedOrders?.map((order: Record<string, any>, i: number) =>
              <tr
                key={i}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img className="w-full h-full object-cover object-center rounded-full" src={order.customer_pfp} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-heading">
                        {order.customer_full_name}
                      </div>
                      <div className="text-sm text-body-light">{order.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="text-sm text-body-light">ID: </span>
                      <span className="font-bold text-sm text-body underline">{order.id}</span>
                    </div>
                    <div>
                      <span className="text-sm text-body-light">Number of items: </span>
                      <span className="font-bold text-sm text-body underline">{order.total_items} </span>
                      <span className="text-sm text-body-light ml-2">Ordered at: </span>
                      <span className="font-bold text-sm text-body underline">{getTimeAgo(order.created_at)}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className="relative text-xs font-bold py-1 px-2"
                    style={{ color: statusColors[order.status]}}
                  >
                    {order.status.toLowerCase()}
                  <div
                    className="absolute top-0 left-0 w-full h-full opacity-20 rounded-full"
                    style={{ backgroundColor: statusColors[order.status]}}
                  />
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {order.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {formatDate(order.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {formatDate(order.updated_at) || 'No information available'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {formatDate(order.canceled_at) || 'No information available'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  <div className="flex gap-2">
                    <LetsIconsOrderFill 
                      className="
                        w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                        bg-background-light hover:bg-background-deep-light
                        active:opacity-60
                        transition-all duration-200 ease-out
                      "
                      role="button"
                      data-type="order_details_window_is_clicked"
                      onClick={handleClick}
                    />
                    <MdiCardAccountDetails 
                      className="
                        w-7 h-7 p-[5px] text-heading rounded-md cursor-pointer
                        bg-background-light hover:bg-background-deep-light
                        active:opacity-60
                        transition-all duration-200 ease-out
                      "
                      role="button"
                      data-type="shipping_details_window_is_clicked"
                      onClick={handleClick}
                    />
                    <label
                      className="
                        relative flex items-center 
                        bg-background-light hover:bg-background-deep-light 
                        rounded-lg cursor-pointer
                        transition-all duration-200 ease-out
                      "
                      htmlFor={`${id}-status`}
                    >
                      <input 
                        className="
                          peer absolute w-0 h-0 opacity-0
                        "
                        type="checkbox"
                        name="statusInpt"
                        id={`${id}-status`}
                      />
                      <div 
                        className="
                          w-[90px] text-center p-1 text-sm bg-transparent font-bold
                          border-none outline-none cursor-pointer
                        "
                        style={{ color: statusColors[order.status]}}
                      >
                        {order.status.toLowerCase()}
                      </div>
                      <MdiArrowDownDrop />
                      <ul
                        className="
                          absolute top-full left-0 w-full 
                          flex flex-col p-2 z-[5]
                          bg-white shadow-lg rounded-lg
                          invisible peer-checked:visible opacity-0 peer-checked:opacity-100
                          transition-all duration-200 ease-out
                        "
                      >
                        {Object.entries(statusColors).map(([ name, color ], i) => 
                          <li
                            key={i}
                            className="
                              p-2 rounded-lg hover:bg-background-light text-body text-sm font-bold
                            "
                          >
                            {name}
                          </li>
                        )} 
                      </ul>
                    </label>
                  </div>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )

  if (type === 'user_orders_table') return (
    <div 
      className={`overflow-x-auto ${className}`} 
      ref={mainRef}
      { ...props }
    >
      <table 
        className="min-w-full divide-y divide-gray-200" 
      >
        <thead
          className="bg-gray-50"
        >
          <tr>
            <th 
              scope="col" 
              className={`
                px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
                uppercase tracking-wider
              `}
            >
              {isEn ? 'Order Details' : 'معلوامات الطلب'}
            </th>
            <th 
              scope="col" 
              className={`
                px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
                uppercase tracking-wider
              `}
            >
              {isEn ? 'Status' : 'الحال'}
            </th>
            <th 
              scope="col" 
              className={`
                px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
                uppercase tracking-wider
              `}
            >
              {isEn ? 'Order Date' : 'تاريخ الطلب'}
            </th>
            <th 
              scope="col" 
              className={`
                px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
                uppercase tracking-wider
              `}
            >
              {isEn ? 'Total' : 'المجموع'}
            </th>
            <th 
              scope="col" 
              className={`
                px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
                uppercase tracking-wider
              `}
            >
              {isEn ? 'Options' : 'الخيارات'}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex flex-col gap-2">
                <div>
                  <span className="text-sm text-body-light">ID: </span>
                  <span className="font-bold text-sm text-body underline">{orders.id}</span>
                </div>
                <div>
                  <span className="text-sm text-body-light">Number of items: </span>
                  <span className="font-bold text-sm text-body underline">{orders.products.length} </span>
                  <span className="text-sm text-body-light ml-2">Ordered at: </span>
                  <span className="font-bold text-sm text-body underline">{getTimeAgo(orders.created_at)}</span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span 
                className="relative text-xs font-bold py-1 px-2"
                style={{ color: statusColors[orders.status]}}
              >
                {orders.status.toLowerCase()}
              <div
                className="absolute top-0 left-0 w-full h-full opacity-20 rounded-full"
                style={{ backgroundColor: statusColors[orders.status]}}
              />
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
              {formatDate(orders.created_at)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
              {orders.total}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
              <div className="flex gap-2">
                <LetsIconsOrderFill 
                  className="
                    w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                    bg-background-light hover:bg-background-deep-light
                    active:opacity-60
                    transition-all duration-200 ease-out
                  "
                  role="button"
                  data-type="order_details_window_is_clicked"
                  onClick={handleClick}
                />
                <MdiCardAccountDetails 
                  className="
                    w-7 h-7 p-[5px] text-heading rounded-md cursor-pointer
                    bg-background-light hover:bg-background-deep-light
                    active:opacity-60
                    transition-all duration-200 ease-out
                  "
                  role="button"
                  data-type="shipping_details_window_is_clicked"
                  onClick={handleClick}
                />
                <label
                  className="
                    relative flex items-center 
                    bg-background-light hover:bg-background-deep-light 
                    rounded-lg cursor-pointer
                    transition-all duration-200 ease-out
                  "
                  htmlFor={`${id}-status`}
                >
                  <input 
                    className="
                      peer absolute w-0 h-0 opacity-0
                    "
                    type="checkbox"
                    name="statusInpt"
                    id={`${id}-status`}
                  />
                  <div 
                    className="
                      w-[90px] text-center p-1 text-sm bg-transparent font-bold
                      border-none outline-none cursor-pointer
                    "
                    style={{ color: statusColors[orders.status]}}
                  >
                    {orders.status.toLowerCase()}
                  </div>
                  <MdiArrowDownDrop />
                  <ul
                    className="
                      absolute top-full left-0 w-full 
                      flex flex-col p-2 z-[5]
                      bg-white shadow-lg rounded-lg
                      invisible peer-checked:visible opacity-0 peer-checked:opacity-100
                      transition-all duration-200 ease-out
                    "
                  >
                    {Object.entries(statusColors).map(([ name, color ], i) => 
                      <li
                        key={i}
                        className="
                          p-2 rounded-lg hover:bg-background-light text-body text-sm font-bold
                        "
                      >
                        {name}
                      </li>
                    )} 
                  </ul>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex flex-col gap-2">
                <div>
                  <span className="text-sm text-body-light">ID: </span>
                  <span className="font-bold text-sm text-body underline">{orders.id}</span>
                </div>
                <div>
                  <span className="text-sm text-body-light">Number of items: </span>
                  <span className="font-bold text-sm text-body underline">{orders.products.length} </span>
                  <span className="text-sm text-body-light ml-2">Ordered at: </span>
                  <span className="font-bold text-sm text-body underline">{getTimeAgo(orders.created_at)}</span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span 
                className="relative text-xs font-bold py-1 px-2"
                style={{ color: statusColors[orders.status]}}
              >
                {orders.status.toLowerCase()}
              <div
                className="absolute top-0 left-0 w-full h-full opacity-20 rounded-full"
                style={{ backgroundColor: statusColors[orders.status]}}
              />
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
              {formatDate(orders.created_at)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
              {orders.total}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
              <div className="flex gap-2">
                <LetsIconsOrderFill 
                  className="
                    w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                    bg-background-light hover:bg-background-deep-light
                    active:opacity-60
                    transition-all duration-200 ease-out
                  "
                  role="button"
                  data-type="order_details_window_is_clicked"
                  onClick={handleClick}
                />
                <MdiCardAccountDetails 
                  className="
                    w-7 h-7 p-[5px] text-heading rounded-md cursor-pointer
                    bg-background-light hover:bg-background-deep-light
                    active:opacity-60
                    transition-all duration-200 ease-out
                  "
                  role="button"
                  data-type="shipping_details_window_is_clicked"
                  onClick={handleClick}
                />
                <label
                  className="
                    relative flex items-center 
                    bg-background-light hover:bg-background-deep-light active:opacity-60 
                    rounded-lg cursor-pointer
                    transition-all duration-200 ease-out
                  "
                  htmlFor={`${id}-status`}
                >
                  <input 
                    className="
                      peer absolute w-0 h-0 opacity-0
                    "
                    type="checkbox"
                    name="statusInpt"
                    id={`${id}-status`}
                  />
                  <div 
                    className="
                      w-[90px] text-center p-1 text-sm bg-transparent font-bold
                      border-none outline-none cursor-pointer
                    "
                    style={{ color: statusColors[orders.status]}}
                  >
                    {orders.status.toLowerCase()}
                  </div>
                  <MdiArrowDownDrop />
                  <ul
                    className="
                      absolute top-full left-0 w-full 
                      flex flex-col p-2
                      bg-white shadow-lg rounded-lg
                      invisible peer-checked:visible opacity-0 peer-checked:opacity-100
                      transition-all duration-200 ease-out
                    "
                  >
                    {Object.entries(statusColors).map(([ name, color ], i) => 
                      <li
                        key={i}
                        className="
                          p-2 rounded-lg hover:bg-background-light text-body text-sm font-bold
                        "
                      >
                        {name}
                      </li>
                    )} 
                  </ul>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex flex-col gap-2">
                <div>
                  <span className="text-sm text-body-light">ID: </span>
                  <span className="font-bold text-sm text-body underline">{orders.id}</span>
                </div>
                <div>
                  <span className="text-sm text-body-light">Number of items: </span>
                  <span className="font-bold text-sm text-body underline">{orders.products.length} </span>
                  <span className="text-sm text-body-light ml-2">Ordered at: </span>
                  <span className="font-bold text-sm text-body underline">{getTimeAgo(orders.created_at)}</span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span 
                className="relative text-xs font-bold py-1 px-2"
                style={{ color: statusColors[orders.status]}}
              >
                {orders.status.toLowerCase()}
              <div
                className="absolute top-0 left-0 w-full h-full opacity-20 rounded-full"
                style={{ backgroundColor: statusColors[orders.status]}}
              />
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
              {formatDate(orders.created_at)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
              {orders.total}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
              <div className="flex gap-2">
                <LetsIconsOrderFill 
                  className="
                    w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                    bg-background-light hover:bg-background-deep-light
                    active:opacity-60
                    transition-all duration-200 ease-out
                  "
                  role="button"
                  data-type="order_details_window_is_clicked"
                  onClick={handleClick}
                />
                <MdiCardAccountDetails 
                  className="
                    w-7 h-7 p-[5px] text-heading rounded-md cursor-pointer
                    bg-background-light hover:bg-background-deep-light
                    active:opacity-60
                    transition-all duration-200 ease-out
                  "
                  role="button"
                  data-type="shipping_details_window_is_clicked"
                  onClick={handleClick}
                />
                <label
                  className="
                    relative flex items-center 
                    bg-background-light hover:bg-background-deep-light active:opacity-60 
                    rounded-lg cursor-pointer
                    transition-all duration-200 ease-out
                  "
                  htmlFor={`${id}-status`}
                >
                  <input 
                    className="
                      peer absolute w-0 h-0 opacity-0
                    "
                    type="checkbox"
                    name="statusInpt"
                    id={`${id}-status`}
                  />
                  <div 
                    className="
                      w-[90px] text-center p-1 text-sm bg-transparent font-bold
                      border-none outline-none cursor-pointer
                    "
                    style={{ color: statusColors[orders.status]}}
                  >
                    {orders.status.toLowerCase()}
                  </div>
                  <MdiArrowDownDrop />
                  <ul
                    className="
                      absolute top-full left-0 w-full 
                      flex flex-col p-2
                      bg-white shadow-lg rounded-lg
                      invisible peer-checked:visible opacity-0 peer-checked:opacity-100
                      transition-all duration-200 ease-out
                    "
                  >
                    {Object.entries(statusColors).map(([ name, color ], i) => 
                      <li
                        key={i}
                        className="
                          p-2 rounded-lg hover:bg-background-light text-body text-sm font-bold
                        "
                      >
                        {name}
                      </li>
                    )} 
                  </ul>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex flex-col gap-2">
                <div>
                  <span className="text-sm text-body-light">ID: </span>
                  <span className="font-bold text-sm text-body underline">{orders.id}</span>
                </div>
                <div>
                  <span className="text-sm text-body-light">Number of items: </span>
                  <span className="font-bold text-sm text-body underline">{orders.products.length} </span>
                  <span className="text-sm text-body-light ml-2">Ordered at: </span>
                  <span className="font-bold text-sm text-body underline">{getTimeAgo(orders.created_at)}</span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span 
                className="relative text-xs font-bold py-1 px-2"
                style={{ color: statusColors[orders.status]}}
              >
                {orders.status.toLowerCase()}
              <div
                className="absolute top-0 left-0 w-full h-full opacity-20 rounded-full"
                style={{ backgroundColor: statusColors[orders.status]}}
              />
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
              {formatDate(orders.created_at)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
              {orders.total}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
              <div className="flex gap-2">
                <LetsIconsOrderFill 
                  className="
                    w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                    bg-background-light hover:bg-background-deep-light
                    active:opacity-60
                    transition-all duration-200 ease-out
                  "
                  role="button"
                  data-type="order_details_window_is_clicked"
                  onClick={handleClick}
                />
                <MdiCardAccountDetails 
                  className="
                    w-7 h-7 p-[5px] text-heading rounded-md cursor-pointer
                    bg-background-light hover:bg-background-deep-light
                    active:opacity-60
                    transition-all duration-200 ease-out
                  "
                  role="button"
                  data-type="shipping_details_window_is_clicked"
                  onClick={handleClick}
                />
                <label
                  className="
                    relative flex items-center 
                    bg-background-light hover:bg-background-deep-light active:opacity-60 
                    rounded-lg cursor-pointer
                    transition-all duration-200 ease-out
                  "
                  htmlFor={`${id}-status`}
                >
                  <input 
                    className="
                      peer absolute w-0 h-0 opacity-0
                    "
                    type="checkbox"
                    name="statusInpt"
                    id={`${id}-status`}
                  />
                  <div 
                    className="
                      w-[90px] text-center p-1 text-sm bg-transparent font-bold
                      border-none outline-none cursor-pointer
                    "
                    style={{ color: statusColors[orders.status]}}
                  >
                    {orders.status.toLowerCase()}
                  </div>
                  <MdiArrowDownDrop />
                  <ul
                    className="
                      absolute top-full left-0 w-full 
                      flex flex-col p-2
                      bg-white shadow-lg rounded-lg
                      invisible peer-checked:visible opacity-0 peer-checked:opacity-100
                      transition-all duration-200 ease-out
                    "
                  >
                    {Object.entries(statusColors).map(([ name, color ], i) => 
                      <li
                        key={i}
                        className="
                          p-2 rounded-lg hover:bg-background-light text-body text-sm font-bold
                        "
                      >
                        {name}
                      </li>
                    )} 
                  </ul>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
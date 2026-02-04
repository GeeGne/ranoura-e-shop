// HOOKS
import { useEffect, useRef, useId } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

// COMPONENTS
import LoadingTable from '@/components/LoadingTable';
import ErrorLayout from '@/components/ErrorLayout';
import MdiCardAccountDetails from '@/components/svgs/MdiCardAccountDetails';
import LetsIconsOrderFill from '@/components/svgs/LetsIconsOrderFill';
import MdiArrowDownDrop from '@/components/svgs/MdiArrowDownDrop';
import IconamoonSearchLight from '@/components/svgs/IconamoonSearchLight';

// STORES
import { 
  useAlertMessageStore,
  useOrderDetailsWindowStore, 
  useShippingDetailsWindowStore,
  useLayoutRefStore,
  useViewOrdersNavTileStore,
  useActivityWindowStore
} from '@/stores/index';

// JSON
import orders from '@/json/userOrders.json';
import statusColorsData from '@/json/orderStatus.json';
import STATUS_TRANSLATIONS from '@/json/statusTranslations.json';
import deliverTo from '@/json/deliverTo.json';

// UTILS
import filterByQuery from '@/utils/filterByQuery';
import getTranslation from '@/utils/getTranslation';

// API
import updateOrder from '@/lib/api/orders/id/put';

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
  const queryClient = useQueryClient();
  const statusColors: Record<string, string> = statusColorsData;
  const setOrderDetailsWindowToggle = useOrderDetailsWindowStore(state => state.setToggle);
  const setOrderDetailsWindowId = useOrderDetailsWindowStore(state => state.setOrderId);

  const setShippingDetailsWindowToggle = useShippingDetailsWindowStore(state => state.setToggle);
  const setShippingDetailsWindowId = useShippingDetailsWindowStore(state => state.setOrderId);

  const layoutRef = useLayoutRefStore(state => state.layoutRef);
  const mainRef = useRef<HTMLDivElement>(null);

  const setActivityWindowToggle = useActivityWindowStore(state => state.setToggle);
  const setActivityWindowMessage = useActivityWindowStore(state => state.setMessage);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);
  const handleAlert = (type: string, message: string) => {
    setAlertToggle(Date.now());
    setAlertType(type);
    setAlertMessage(message);
  };

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

  const updateOrderMutation = useMutation({
    mutationFn: updateOrder,
    onSettled: () => {
      setActivityWindowToggle(false);
    },
    onMutate: () => {
      setActivityWindowToggle(true);
      setActivityWindowMessage(isEn ? 'Updating selected order...' : 'جار تحديث الطلب...');
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [ 'orders' ] });
      queryClient.invalidateQueries({ queryKey: [ 'order', data.data.id ] });
      handleAlert('success', data.message[lang]);
    },
    onError: () => {
      handleAlert('error', isEn ? 'Error while updating order, please try again' : 'حصل خطأ خلال تعديل المنتج, الرجاء المحاوله مره اخرى');
    }
  })

  const getProcessedOrders = () => {
  
    const orders: any = data;
    if (!orders) return [];

    const simplifiedVersion = [...orders].map(({ id, status, customer_snapshot, timestamps }: Record<string ,any>) => ({
      id,
      status,
      name: customer_snapshot.name,
      email: customer_snapshot.email,
      created_at: timestamps.created_at,
      updated_at: timestamps.updated_at,
      canceled_at: timestamps.canceled_at,
    }))
    const orderIDFilteredOrders = filterByQuery(
      simplifiedVersion, 
      { 
        searchTerms: [searchOrderIDTerm],
        searchFields: [ 'id' ],
        filteringType: 'contains',
        caseSensitive: false,
        specificSearch: false
      }
    );
    const nameFilteredOrders = filterByQuery(
      orderIDFilteredOrders, 
      { 
        searchTerms: [searchNameTerm],
        searchFields: [ 'name' ],
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
    const sortOrders = [...emailFilteredOrders].sort((a, b) => {
      const { value, fieldName, sortType }: any = selectedSortByField;
      const isSortEmpty = value === 'none';
      if (isSortEmpty) return 0;

      const dateA = new Date(a[fieldName]).getTime();
      const dateB = new Date(b[fieldName]).getTime();
      if (sortType === 'ascending') return dateA - dateB;
      if (sortType === 'descending') return dateB - dateA;
      return dateA - dateB;
    });
    const tagFilteredOrders = sortOrders.filter(order => {
      const areFiltersEmpty = selectedFilterTags?.length === 0;
      if (areFiltersEmpty) return true;
      return selectedFilterTags?.some(tag => order[tag.fieldName] === tag.value);
    });
    
    const finalOrderResults = tagFilteredOrders.map(order => 
      orders.find((itm: Record<string, any>) => itm.id === order.id)
    );
    return finalOrderResults;
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
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const diffHours = diffDays * 24;
    const diffMinutes = diffHours * 60;

    // console.log('diffDays: ', diffDays);
    // console.log('diffHours: ', diffHours);
    // console.log('diffMinutes: ', diffMinutes);

    const areTimeAgoMoreThanADay = diffDays >= 1;
    const areTmeAgoMoreThanHours = diffHours >= 1;
    return isEn
    ? `
        ${areTimeAgoMoreThanADay 
          ? Math.floor(diffDays) 
          : areTmeAgoMoreThanHours
            ? Math.floor(diffHours)
            : Math.floor(diffMinutes)
        } ${areTimeAgoMoreThanADay 
            ? 'days' 
            : areTmeAgoMoreThanHours
              ? 'hours'
              : 'minutes'
          } ago
      `
    : `
      منذ  ${areTimeAgoMoreThanADay 
          ? Math.floor(diffDays) 
          : areTmeAgoMoreThanHours
            ? Math.floor(diffHours)
            : Math.floor(diffMinutes)
        } ${areTimeAgoMoreThanADay 
            ? 'ايام' 
            : areTmeAgoMoreThanHours
              ? 'ساعات'
              : 'دقايق'
          }
      `
    ;
  };

  const handleClick = (e: React.MouseEvent<HTMLElement | SVGSVGElement>) => {
    const { type, status, orderId } = e.currentTarget.dataset;

    switch (type) {
      case 'order_details_window_is_clicked':
        setOrderDetailsWindowToggle(true);
        if (orderId) setOrderDetailsWindowId(orderId);
        break;
      case 'shipping_details_window_is_clicked':
        setShippingDetailsWindowToggle(true);
        if (orderId) setShippingDetailsWindowId(orderId);
        break;
      case 'status_list_button_is_clicked': 
        if (orderId && status) updateOrderMutation.mutate({ id: orderId, data: { status } });
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  };

  // DEBUG & UI
  console.log('orders: ', data);
  console.log('selectedFilterTags: ', selectedFilterTags);

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
              {isEn ? 'Shipping City' : 'مدينة الشحن'}
            </th>
            <th 
              scope="col" 
              className={`
                px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light 
                uppercase tracking-wider whitespace-nowrap
              `}
            >
              {isEn ? 'Items Total' : 'اجمالي السلع'}
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
                      <img className="w-full h-full object-cover object-center rounded-full" src={order?.customer_snapshot?.avatar || pfpImage} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-heading">
                        {order?.customer_snapshot?.name}
                      </div>
                      <div className="text-sm text-body-light">{order?.customer_snapshot?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="text-sm text-body-light">{isEn ? 'ID:' : 'الرمز:'}</span>{<>&ensp;</>}
                      <span className="font-bold text-sm text-body underline">{order.id}</span>
                    </div>
                    <div>
                      <span className="text-sm text-body-light">{isEn ? 'Number of items:' : 'عدد العناصر:'}</span>{<>&ensp;</>}
                      <span className="font-bold text-sm text-body underline">{order?.items?.total_products}</span>{<>&ensp;</>}{<>&ensp;</>}
                      <span className="text-sm text-body-light">{isEn ? 'Ordered at:' : 'تم الطلب:'}</span>{<>&ensp;</>}
                      <span className="font-bold text-sm text-body underline">{getTimeAgo(order?.created_at)}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className="relative text-xs font-bold py-1 px-2"
                    style={{ color: statusColors[order?.status]}}
                  >
                    {getTranslation(STATUS_TRANSLATIONS, order?.status, lang)}
                  <div
                    className="absolute top-0 left-0 w-full h-full opacity-20 rounded-full"
                    style={{ backgroundColor: statusColors[order?.status]}}
                  />
                  </span>
                </td>
                <td className="gap-4 px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  <div className="flex items-center gap-4">
                    <span>{deliverTo.find(itm => itm.shipping_address === order.shipping.city)?.value[lang].toUpperCase()}</span>
                    <span>|</span>
                    <span>{order.pricing.shipping}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {order.pricing.sub_total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {order.pricing.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {formatDate(order.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {formatDate(order.updated_at) || 'No information available'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {formatDate(order.timestamps.canceled_at) || 'No information available'}
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
                      data-order-id={order.id}
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
                      data-order-id={order.id}
                      onClick={handleClick}
                    />
                    <label
                      className="
                        relative flex items-center 
                        bg-background-light hover:bg-background-deep-light 
                        rounded-lg cursor-pointer
                        transition-all duration-200 ease-out
                      "
                      htmlFor={`${id}-${i}-status`}
                    >
                      <input 
                        className="
                          peer absolute w-0 h-0 opacity-0
                        "
                        type="checkbox"
                        name="statusInpt"
                        id={`${id}-${i}-status`}
                      />
                      <div 
                        className="
                          w-[90px] text-center p-1 text-sm bg-transparent font-bold
                          border-none outline-none cursor-pointer
                        "
                        style={{ color: statusColors[order.status]}}
                      >
                        {getTranslation(STATUS_TRANSLATIONS, order.status, lang)}
                      </div>
                      <MdiArrowDownDrop />
                      <ul
                        className="
                          absolute top-0 peer-checked:top-[calc(100%+0.5rem)] left-0 w-full 
                          flex flex-col p-1 z-[5]
                          bg-white shadow-lg rounded-lg
                          invisible peer-checked:visible opacity-0 peer-checked:opacity-100
                          transition-all duration-200 ease-out
                        "
                      >
                        {Object.entries(statusColors).map(([ name, color ], i) => 
                          <li
                            key={i}
                            className="
                              p-2 rounded-lg hover:bg-background-light 
                              text-body hover:text-heading text-sm font-semibold
                              transition-all duration-200 ease-out
                            "
                            data-type="status_list_button_is_clicked"
                            data-order-id={order.id}
                            data-status={name}
                            onClick={handleClick}
                          >
                            {getTranslation(STATUS_TRANSLATIONS, name, lang)}
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
          {[1, 2, 3, 4, 5, 6].map((itm, i) =>
            <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="text-sm text-body-light">{isEn ? 'ID:' : 'الرمز:'}</span>{<>&ensp;</>}
                    <span className="font-bold text-sm text-body underline">{orders.id}</span>
                  </div>
                  <div>
                    <span className="text-sm text-body-light">{isEn ? 'Number of items:' : 'عدد العناصر:'}</span>{<>&ensp;</>}
                    <span className="font-bold text-sm text-body underline">{orders.products.length}</span>{<>&ensp;&ensp;</>}
                    <span className="text-sm text-body-light">{isEn ? 'Ordered at:' : 'تم الطلب:'}</span>{<>&ensp;</>}
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
          )}
        </tbody>
      </table>
    </div>
  )
}
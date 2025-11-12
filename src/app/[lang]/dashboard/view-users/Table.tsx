// HOOKS
import { useId, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import LoadingTable from '@/components/LoadingTable';
import ErrorLayout from '@/components/ErrorLayout';
import Orders from '@/components/Orders';
import SolarCart4Bold from "@/components/svgs/SolarCart4Bold";
import MdiBan from "@/components/svgs/MdiBan";
import GgUnblock from "@/components/svgs/GgUnblock";
import MdiArrowDownDrop from '@/components/svgs/MdiArrowDownDrop';
import IconamoonSearchLight from '@/components/svgs/IconamoonSearchLight';
import LineMdLink from '@/components/svgs/LineMdLink';
import TablerCopy from '@/components/svgs/TablerCopy';
import MaterialSymbolsCheckRounded from '@/components/svgs/MaterialSymbolsCheckRounded';
import LineMdCloseCircleFilled from '@/components/svgs/LineMdCloseCircleFilled';

// API
import getUsersData from '@/lib/api/users/get';
import updateUserData from '@/lib/api/users/id/put';
import updateUserRole from '@/lib/api/users/id/role/put';
import getAllUserRoles from '@/lib/api/roles/get';

// JSON
import urlsTable from '@/json/cmsTables/urlsTable.json';

// STORES
import { 
  useAlertMessageStore, useActionConfirmWindowStore, 
  useLayoutRefStore, useActivityWindowStore, useViewUsersNavTileStore
} from '@/stores/index';

// UTILS
import filterByQuery from '@/utils/filterByQuery';

// ASSETS
const pfpImage = '/assets/img/pfp.avif';

import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

type Person = {
  id: number;
  name: string;
  age: number;
  email: string;
};

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];

const data: Person[] = [
  { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com' },
];

type UrlCopiedState = {
  toggle: boolean;
  index: number | string;
}

type Props = {
  isEn?: boolean;
  lang?: 'en' | 'ar';
  scroll?: string;
  scrollTrigger?: number;
  data?: Record<any, string> | null | undefined;
  isLoading?: boolean;
  isError?: boolean;
}

export default function Table({ 
  isEn = true, 
  lang = 'en',
  scroll, 
  scrollTrigger, 
  data: usersData = {},
  isLoading = false,
  isError = false
}: Props) {

  const id = useId();
  const queryClient = useQueryClient();

  const layoutRef = useLayoutRefStore(state => state.layoutRef);
  const mainRef = useRef<HTMLDivElement>(null);
  const orderContainerRef = useRef<any[]>([]);
  const userOrdersBtnTimeoutID = useRef<any>(null);

  const action = useActionConfirmWindowStore(state => state.action);
  const setAction = useActionConfirmWindowStore(state => state.setAction);
  const setActionWindowToggle = useActionConfirmWindowStore(state => state.setToggle);
  const setActionWindowIsLoading = useActionConfirmWindowStore(state => state.setIsLoading);
  const setTitle = useActionConfirmWindowStore(state => state.setTitle);
  const setDescription = useActionConfirmWindowStore(state => state.setDescription);
  const setBtnTitle = useActionConfirmWindowStore(state => state.setBtnTitle);

  const setActivityWindowToggle = useActivityWindowStore(state => state.setToggle);
  const setActivityWindowMessage = useActivityWindowStore(state => state.setMessage);

  const setAlertToggle = useAlertMessageStore(state => state.setToggle);
  const setAlertType = useAlertMessageStore(state => state.setType);
  const setAlertMessage = useAlertMessageStore(state => state.setMessage);

  const searchNameTerm = useViewUsersNavTileStore(state => state.searchByNameTerm);
  const searchEmailTerm = useViewUsersNavTileStore(state => state.searchByEmailTerm);
  const selectedSortByField = useViewUsersNavTileStore(state => state.selectedSortByField);

  const [ userOrder, setUserOrder ] = useState<Record<string, any>>({
    toggle: false,
    userId: 0,
    layoutHeight: 0 
  });

  const messages = {
    noData: {en: 'No information available', ar: 'لا توجد معلومات متاحه'}
  }

  useEffect(() => {
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

  useEffect(() => {
    const { name, userId, isConfirmed } = action;
    if (name === 'ban user' && isConfirmed) {
      setActionWindowIsLoading(true);
      updateUserDataMutaion.mutate({ id: userId, is_banned: true });
    }

    if (name === 'unban user' && isConfirmed) {
      setActionWindowIsLoading(true);
      updateUserDataMutaion.mutate({ id: userId, is_banned: false});
    };
  }, [ action ])

  const getUserStatus = (is_banned: boolean, last_login_at: string) => {

    const now = new Date().getTime();
    const userLastlogin = new Date(last_login_at).getTime();
    const differentInMs = now - userLastlogin;
    const differentInDays = differentInMs / (1000 * 60 * 60 * 24)
    const isUserInactive = differentInDays >= 90;
    console.log('differentInDays', differentInDays);

    if (is_banned) return { title: { en: 'Banned', ar: 'محظور' }, textColor: 'oklch(50.5% 0.213 27.518)'};
    if (isUserInactive) return { title: { en: 'Inactive', ar: 'غير نشط' }, textColor: 'oklch(55.4% 0.135 66.442)' };
    return { title: { en: 'Active', ar: 'نشط' }, textColor: 'oklch(53.2% 0.157 131.589)' }
  };

  const addFullNameField = (array: any[]) => array.map(
    (fields: Record<any, string>) => (
      { ...fields, full_name: fields.first_name + ' ' + fields.last_name }
    )
  );

  const sortArray = (array: any[], field: any) => {
    return [...array].sort((a, b) => {
      if (field === 'none' || !field) return 0;
      const dateA = new Date(a[field]).getTime();
      const dateB = new Date(b[field]).getTime();
      return dateA - dateB;
    });
  };

  const checkToggle = (toggle: boolean, hookIndex: number | string, refIndex: number | string) => {
    if (toggle === true && hookIndex === refIndex) return true;
    return false
  };

  const displayDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(isEn ? 'en-US' : 'ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  const displayAlert = (message: any, type: string) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertToggle(Date.now());
  };

  const { data: userRoles } = useQuery({
    queryKey: ['user-roles'],
    queryFn: getAllUserRoles
  });

  const updateUserRoleMutaion = useMutation({
    mutationFn: updateUserRole,
    onSettled: () => {
      setActivityWindowToggle(false);
    },
    onMutate: () => {
      setActivityWindowToggle(true);
      setActivityWindowMessage(isEn ? 'Updating selected user role...' : 'جاري تحديث منصب المستخدم...')
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users']});
      displayAlert(data.message[isEn ? 'en' : 'ar'], "success");
    },
    onError: () => {
      displayAlert(
        isEn 
          ? "Couldn't update Video Settings, please try again." 
          : "فشل في محاوله تحديث اعدادات الفيديو, الرجاء محاوله مره اخرى."
      , "error");
    },
  });

  const updateUserDataMutaion = useMutation({
    mutationFn: updateUserData,
    onSettled: () => {
      setActivityWindowToggle(false);
    },
    onMutate: () => {
      setActivityWindowToggle(true);
      setActivityWindowMessage(isEn ? 'Updating selected user data...' : 'جاري تحديث بيانات المستخدم...')
    },
    onSuccess: (data) => {
      setActionWindowToggle(false);
      setActionWindowIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ['users']});
      displayAlert(data.message[isEn ? 'en' : 'ar'], "success");
    },
    onError: () => {
      displayAlert(
        isEn 
          ? "Couldn't update Video Settings, please try again." 
          : "فشل في محاوله تحديث اعدادات الفيديو, الرجاء محاوله مره اخرى."
      , "error");
    },
  })

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement | HTMLLIElement | SVGSVGElement>) => {
    const { type, userId, userName, selectedRole } = e.currentTarget.dataset;
    const findElement = (elArray: any, dataString: string, value: any) => 
      elArray.find((el: HTMLElement) => el.dataset[dataString] === value);

    switch (type) {
      case 'user_orders_button_is_clicked':
        const orderContainerRefNoNull = orderContainerRef.current.filter(el => el !== null);
        const targetElement = findElement(orderContainerRefNoNull, 'userId', userId);
        const isSameUser = userOrder.userId === userId;
        const isTogglingOpen = !isSameUser || !userOrder.toggle;
        const layoutHeight = isTogglingOpen ? targetElement.scrollHeight : 0 ;

        orderContainerRefNoNull.forEach((el: HTMLElement) => {
          el.style.overflow = 'hidden'
        });

        clearTimeout(userOrdersBtnTimeoutID.current);
        setUserOrder({ 
          toggle: isTogglingOpen,
          userId,
          layoutHeight
        });

        if (isTogglingOpen) {
          userOrdersBtnTimeoutID.current = setTimeout(() => {
            findElement(orderContainerRefNoNull, 'userId', userId).style.overflow = 'visible'
          }, 300);
        };
        break;
      case'role_type_button_is_clicked':
        console.log('selectedRole', selectedRole);

        if (userId && selectedRole) updateUserRoleMutaion.mutate({ userId, roleName: selectedRole })
        break;
      case 'ban_user_button_is_clicked':
        setActionWindowToggle(true);
        if (userId) setAction({ name: "ban user", userId, isConfirmed: false });
        setTitle({
          en: 'Ban User?',
          ar: 'حظر العضو؟'
        })
        setDescription({
          en: `By clicking on Confrim button. The following user "${userName}" will get banned. (Unbanning the user later is possible.)`,
          ar: `في حال الضغط على زر تأكيد الحظر. سوف يتم حظر المستخدم المعروف ب "${userName}". (رفع الحظر عن المستخدم متاح لاحقا)`
        });
        setBtnTitle({ en: 'Confrim (BAN)', ar: 'تأكيد (حظر)'})
        break;
      case 'unBan_user_button_is_clicked':
        setActionWindowToggle(true);
        if (userId) setAction({ name: "unban user", userId, isConfirmed: false });
        setTitle({
          en: 'Un-Ban User?',
          ar: 'رفع الحظر عن العضو؟'
        })
        setDescription({
          en: `By clicking on Confrim button. The following user "${userName}" won't be banned anymore. (Banning the user later is possible.)`,
          ar: `في حال الضغط على زر تأكيد الحظر. سوف يتم رفع حظر المستخدم المعروف ب "${userName}". (حظر المستخدم متاح لاحقا)`
        });
        setBtnTitle({ en: 'Confrim (UNBAN)', ar: 'تأكيد (رفع الحظر)'})
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // DEBUG
  console.log('users: ', usersData?.data);
  console.log('user roles: ', userRoles?.data);
  // console.log('userOrder: ', userOrder);

  if (isLoading) return (
    <LoadingTable />
  )

  if (isError) return (
    <ErrorLayout 
      title={isEn ? 'Unable To Load' : 'لم يتم التحميل'}
      description={isEn ? 'Please Refresh the page or try again later' : 'الرجاء اعاده تحميل الصفحه او حاول مره اخرى لاحقا'}
    />
  )

  const users: any = usersData?.data;
  const usersWithFullName= addFullNameField(users);
  const filteredUsersbasedOnSearcByhNameTerm  = filterByQuery(
    usersWithFullName, 
    { 
      searchTerms: [searchNameTerm],
      searchFields: [ 'full_name' ],
      filteringType: 'contains',
      caseSensitive: false,
      specificSearch: false
    }
  );
  const filteredUsers  = filterByQuery(
    filteredUsersbasedOnSearcByhNameTerm, 
    { 
      searchTerms: [searchEmailTerm],
      searchFields: [ 'email' ],
      filteringType: 'contains',
      caseSensitive: false,
      specificSearch: false
    }
  );
  const sortedUsers = sortArray(filteredUsers, selectedSortByField);
  ;
  const isUsersFilteredArrayEmpty = sortedUsers.length === 0;
  const roles: any = userRoles?.data;

  console.log('addFullNameField(users): ', addFullNameField(users));
  console.log('selectedSortByField: ', selectedSortByField);
  return (
    <div className="overflow-x-auto" ref={mainRef}>
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className={`px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light uppercase tracking-wider whitespace-nowrap`}>
              {isEn ? 'Name' : 'الاسم'}
            </th>
            <th scope="col" className={`px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light uppercase tracking-wider whitespace-nowrap`}>
              {isEn ? 'Phone Number' : 'رقم الهاتف'}
            </th>
            <th scope="col" className={`px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light uppercase tracking-wider whitespace-nowrap`}>
              {isEn ? 'Address' : 'العنوان'}
            </th>
            <th scope="col" className={`px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light uppercase tracking-wider whitespace-nowrap`}>
              {isEn ? 'Role' : 'دور'}
            </th>
            <th scope="col" className={`px-6 py-3  ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light uppercase tracking-wider whitespace-nowrap`}>
              {isEn ? 'Status' : 'الحاله'}
            </th>
            <th scope="col" className={`px-6 py-3  ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light uppercase tracking-wider whitespace-nowrap`}>
              {isEn ? 'Last Login' : 'آخر ظهور'}
            </th>
            <th scope="col" className={`px-6 py-3  ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light uppercase tracking-wider whitespace-nowrap`}>
              {isEn ? 'Date of Birth' : 'تاريخ الولاده'}
            </th>
            <th scope="col" className={`px-6 py-3  ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light uppercase tracking-wider whitespace-nowrap`}>
              {isEn ? 'Created At' : 'تاريخ الانشاء'}
            </th>
            <th scope="col" className={`px-6 py-3  ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light uppercase tracking-wider whitespace-nowrap`}>
              {isEn ? 'Total Orders' : 'اجمالي الاوردرات'}
            </th>
            <th scope="col" className={`px-6 py-3  ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-body-light uppercase tracking-wider whitespace-nowrap`}>
              {isEn ? 'Options' : 'الخيارات'}
            </th>
          </tr>
        </thead>
        {isUsersFilteredArrayEmpty &&
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="px-6 py-4 whitespace-nowrap">
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
          </tbody>
        }
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedUsers?.map((user: Record<string, any>, i: number) => (
            [
              <tr key={`user-${i}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img className="w-full h-full object-cover object-center rounded-full" src={user.profile_img_url || pfpImage} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-heading">
                        {user.full_name}
                      </div>
                      <div className="text-sm text-body-light">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {user.phone_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="list-disc">
                    <li className="text-body text-sm text-gray-900"><span className="text-body font-bold">{isEn ? 'main:' : ':رئيسي'} </span>{user.address.address_details}</li>
                    <li className="text-body text-sm text-gray-900"><span className="text-body font-bold">{isEn ? 'second:' : ':ثانوي'} </span>{user.address.second_address}</li>
                    <li className="text-body text-sm text-gray-900"><span className="text-body font-bold">{isEn ? 'notes:' : ':ملاحظات'} </span>{user.address.notes}</li>
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {user.role.role.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className="relative text-xs font-bold py-1 px-2"
                    style={{ color: getUserStatus(user.is_banned, user.last_login_at).textColor}}
                  >
                    {getUserStatus(user.is_banned, user.last_login_at).title[lang].toLowerCase()}
                  <div
                    className="absolute top-0 left-0 w-full h-full opacity-20 rounded-full"
                    style={{ backgroundColor: getUserStatus(user.is_banned, user.last_login_at).textColor}}
                  />
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {displayDate(user.last_login_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {user.date_of_birth ? displayDate(user.date_of_birth) : messages.noData[lang]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  {displayDate(user.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  0
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-body-light">
                  <div className="flex gap-2">
                    <button 
                      data-type="user_orders_button_is_clicked"
                      data-user-id={user.id}
                      onClick={handleClick}
                    >
                      <SolarCart4Bold 
                        className={`
                          w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                          active:opacity-60
                          transition-all duration-200 ease-out
                          ${(userOrder.toggle && userOrder.userId === user.id) 
                            ? 'bg-content-invert hover:opacity-80' 
                            : 'bg-background-light hover:bg-background-deep-light'
                          }
                        `}
                      />
                    </button>
                    {user.is_banned 
                      ? <GgUnblock 
                        className="
                          w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                          active:opacity-60
                          transition-all duration-200 ease-out
                          bg-background-light hover:bg-background-deep-light
                        "
                        role="button"
                        data-type="unBan_user_button_is_clicked"
                        data-user-id={user.id}
                        data-user-name={user.first_name + ' ' + user.last_name}
                        onClick={handleClick}
                      />
                      : <MdiBan 
                        className="
                          w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                          active:opacity-60
                          transition-all duration-200 ease-out
                          bg-background-light hover:bg-background-deep-light
                        "
                        role="button"
                        data-type="ban_user_button_is_clicked"
                        data-user-id={user.id}
                        data-user-name={user.first_name + ' ' + user.last_name}
                        onClick={handleClick}
                      />
                    }
                    <label
                      className="
                        relative flex gap-2 items-center 
                        bg-background-light hover:bg-background-deep-light 
                        px-2 cursor-pointer rounded-md cursor-pointers
                        transition-all duration-200 ease-out
                      "
                      htmlFor={`${id}-${i}-selectRoleInpt`}
                    >
                      <input 
                        className="
                          peer absolute top-0 left-0 w-0 h-0
                        "
                        type="checkbox"
                        name="selectRoleInpt"
                        id={`${id}-${i}-selectRoleInpt`}
                      />
                      <span className="font-semibold text-heading">{user.role.role.name}</span>
                      <MdiArrowDownDrop className="text-heading"/>
                      <ul
                        className="
                          absolute top-0 peer-checked:top-[calc(100%+0.5rem)] left-0
                          w-full flex flex-col p-2 gap-2 z-[5]  
                          bg-white shadow-lg rounded-lg
                          invisible peer-checked:visible
                          opacity-0 peer-checked:opacity-100
                          transition-all duration-200 ease-out
                        "
                      >
                        {roles.map((role: Record<any, string>) => 
                          <li
                            className="
                              p-2 rounded-lg text-body 
                              hover:bg-background-light hover:text-heading font-semibold
                              transition-all duration-200 ease-out
                            "
                            role="button"
                            data-type="role_type_button_is_clicked"
                            data-selected-role={role.name}
                            data-user-id={user.id}
                            onClick={handleClick}
                          >
                            {role.name}
                          </li>
                        )}
                      </ul>
                    </label>
                  </div>
                </td>
              </tr>,
              <tr key={`order-${i}`}>
                <td
                  className={`w-full bg-background-light`}
                  colSpan={10}
                >
                  <div
                    className={`
                      flex w-full transition-all duration-300 ease-in-out
                    `}
                  >
                    <Orders 
                      className="w-full transition-all duration-300 ease-in-out"
                      lang={lang}
                      isEn={isEn}
                      type="user_orders_table"
                      ref={(el: any) => (orderContainerRef.current[i] = el)}
                      data-user-id={user.id}
                      style={{
                        maxHeight: (userOrder.toggle && (userOrder.userId === user.id))
                          ? userOrder.layoutHeight
                          : 0
                          + 'px'
                      }}
                    />
                  </div>
                </td>
              </tr>
            ]
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="p-4">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 text-left border">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
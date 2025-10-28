// HOOKS
import { useId, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import LoadingTable from '@/components/LoadingTable';
import ErrorLayout from '@/components/ErrorLayout';
import Orders from '@/components/Orders';
import SolarCart4Bold from "@/components/svgs/SolarCart4Bold";
import MdiBan from "@/components/svgs/MdiBan";
import MdiArrowDownDrop from '@/components/svgs/MdiArrowDownDrop';
import LineMdLink from '@/components/svgs/LineMdLink';
import TablerCopy from '@/components/svgs/TablerCopy';
import MaterialSymbolsCheckRounded from '@/components/svgs/MaterialSymbolsCheckRounded';
import LineMdCloseCircleFilled from '@/components/svgs/LineMdCloseCircleFilled';

// API
import getUsersData from '@/lib/api/users/get';

// JSON
import urlsTable from '@/json/cmsTables/urlsTable.json';

// STORES
import { useAlertMessageStore, useLayoutRefStore } from '@/stores/index';

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
}

export default function Table({ 
  isEn = true, 
  lang = 'en',
  scroll, 
  scrollTrigger, 
}: Props) {

  const id = useId();
  const layoutRef = useLayoutRefStore(state => state.layoutRef);
  const mainRef = useRef<HTMLDivElement>(null);
  const orderContainerRef = useRef<any[]>([]);
  const userOrdersBtnTimeoutID = useRef<any>(null);

  const setAlertToggle = useAlertMessageStore(state => state.setToggle);
  const setAlertType = useAlertMessageStore(state => state.setType);
  const setAlertMessage = useAlertMessageStore(state => state.setMessage);

  const [ isUrlCopied, setIsUrlCopied ] = useState<UrlCopiedState>({ toggle: false, index: 0 });
  const isUrlCopiedTimerId = useRef<any>(0);

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

  const { data: usersData, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsersData,
  });

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

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement | HTMLLIElement>) => {
    const { type, userId, selectedRole } = e.currentTarget.dataset;
    const findElement = (elArray: any, dataString: string, value: any) => 
      elArray.find((el: HTMLElement) => el.dataset[dataString] === value);

    switch (type) {
      case 'user_orders_button_is_clicked':
        const targetElement = findElement(orderContainerRef.current, 'userId', userId);
        const isSameUser = userOrder.userId === userId;
        const isTogglingOpen = !isSameUser || !userOrder.toggle;
        const layoutHeight = isTogglingOpen ? targetElement.scrollHeight : 0 ;

        orderContainerRef.current.forEach((el: HTMLElement) => {
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
            findElement(orderContainerRef.current, 'userId', userId).style.overflow = 'visible'
          }, 300);
        };
        break;
      case'role_type_button_is_clicked':
        console.log('selectedRole', selectedRole);
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

  const users: any = usersData.data;
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
        <tbody className="bg-white divide-y divide-gray-200">
          {users?.map((user: Record<string, any>, i: number) => (
            [
              <tr key={`user-${i}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img className="w-full h-full object-cover object-center rounded-full" src={user.profile_img_url || pfpImage} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-heading">
                        {user.first_name + ' ' + user.last_name}
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
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                  </span>
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
                    <MdiBan 
                      className="
                        w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                        active:opacity-60
                        transition-all duration-200 ease-out
                        bg-background-light hover:bg-background-deep-light
                      "
                      role="button"
                    />
                    <label
                      className="
                        relative flex gap-2 items-center 
                        bg-background-light hover:bg-background-deep-light 
                        px-2 cursor-pointer rounded-md cursor-pointers
                        transition-all duration-200 ease-out
                      "
                      htmlFor={`${id}-selectRoleInpt`}
                    >
                      <input 
                        className="
                          peer absolute top-0 left-0 w-0 h-0
                        "
                        type="checkbox"
                        name="selectRoleInpt"
                        id={`${id}-selectRoleInpt`}
                      />
                      <span className="font-semibold text-heading">admin</span>
                      <MdiArrowDownDrop className="text-heading"/>
                      <ul
                        className="
                          absolute top-full left-0
                          w-full flex flex-col p-2 gap-2 z-[5]  
                          bg-white shadow-lg rounded-lg
                          invisible peer-checked:visible
                          opacity-0 peer-checked:opacity-100
                          transition-all duration-200 ease-out
                        "
                      >
                        {['admin', 'costumer'].map(role => 
                          <li
                            className="
                              p-2 rounded-lg text-body 
                              hover:bg-background-light hover:text-heading font-semibold
                              transition-all duration-200 ease-out
                            "
                            role="button"
                            data-type="role_type_button_is_clicked"
                            data-selected-role={role}
                            data-user-id={user.id}
                            onClick={handleClick}
                          >
                            {role}
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
                  colSpan={9}
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
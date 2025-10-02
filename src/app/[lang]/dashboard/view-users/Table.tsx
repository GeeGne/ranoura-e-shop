// HOOKS
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import LoadingTable from '@/components/LoadingTable';
import ErrorLayout from '@/components/ErrorLayout';
import LineMdLink from '@/components/svgs/LineMdLink';
import TablerCopy from '@/components/svgs/TablerCopy';
import MaterialSymbolsCheckRounded from '@/components/svgs/MaterialSymbolsCheckRounded';
import LineMdCloseCircleFilled from '@/components/svgs/LineMdCloseCircleFilled';

// API
import getUsersData from '@/lib/api/users/get';

// JSON
import urlsTable from '@/json/cmsTables/urlsTable.json';

// STORES
import { useAlertMessageStore } from '@/stores/index';

// IMAGES
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
}

export default function Table({ isEn = true }: Props) {

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const [ isUrlCopied, setIsUrlCopied ] = useState<UrlCopiedState>({ toggle: false, index: 0 });
  const isUrlCopiedTimerId = useRef<any>(0);

  const { data: usersData, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsersData,
  });

  const checkToggle = (toggle: boolean, hookIndex: number | string, refIndex: number | string) => {
    if (toggle === true && hookIndex === refIndex) return true;
    return false
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type, index } = e.currentTarget.dataset;

    switch (type) {
      case 'copy_button_is_clicked':
        try {
          await navigator?.clipboard?.writeText("Text is copied");
          setIsUrlCopied({ toggle: true, index: String(index) });
          clearTimeout(isUrlCopiedTimerId.current);
          isUrlCopiedTimerId.current = setTimeout(() => setIsUrlCopied({ toggle: false, index: 0 })
          , 2000);  

          setAlertToggle(Date.now());
          setAlertType('success');
          setAlertMessage(isEn ? 'URL is added to clipboard successfully!' : '!تم نسخ الرابط بنجاح');
        } catch (err) {
          console.error('Error while copying text: ', err)
        }
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

  const people = [
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      status: 'Active',
    },
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      status: 'Active',
    },
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      status: 'Active',
    },
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      status: 'Active',
    }
  ]

  // DEBUG
  console.log('users: ', usersData?.data);

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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className={`px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isEn ? 'Name' : 'الاسم'}
            </th>
            <th scope="col" className={`px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isEn ? 'Phone Number' : 'رقم الهاتف'}
            </th>
            <th scope="col" className={`px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isEn ? 'Address' : 'العنوان'}
            </th>
            <th scope="col" className={`px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isEn ? 'Role' : 'دور'}
            </th>
            <th scope="col" className={`px-6 py-3  ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isEn ? 'Status' : 'الحاله'}
            </th>
            <th scope="col" className={`px-6 py-3  ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isEn ? 'Notes' : 'ملاحظات'}
            </th>
            <th scope="col" className={`px-6 py-3  ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isEn ? 'Date of Birth' : 'تاريخ الولاده'}
            </th>
            <th scope="col" className={`px-6 py-3  ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isEn ? 'Created At' : 'تاريخ الانشاء'}
            </th>
            <th scope="col" className={`px-6 py-3  ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isEn ? 'Options' : 'الخيارات'}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users?.map((user: Record<string, any>, i: number) => (
            <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={user.profile_img_url || pfpImage} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.first_name + ' ' + user.last_name}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.phone_number}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.phone_number}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.role.role.name}
              </td>
            </tr>
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
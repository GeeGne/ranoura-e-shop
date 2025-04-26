// HOOKS
import { useState, useRef } from 'react';
import Link from 'next/link';

// COMPONENTS
import LineMdLink from '@/components/svgs/LineMdLink';
import TablerCopy from '@/components/svgs/TablerCopy';
import MaterialSymbolsCheckRounded from '@/components/svgs/MaterialSymbolsCheckRounded';

// JSON
import urlsTable from '@/json/cmsTables/urlsTable.json';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

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

export default function Table() {

  const [ isUrlCopied, setIsUrlCopied ] = useState<UrlCopiedState>({ toggle: false, index: 0 });
  const isUrlCopiedTimerId = useRef<any>(0);
  const checkToggle = (toggle: boolean, hookIndex: number | string, refIndex: number | string) => {
    if (toggle === true && hookIndex === refIndex) return true;
    return false
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type, index } = e.currentTarget.dataset;

    switch (type) {
      case 'copy_button_is_clicked':
        try {
          await navigator.clipboard.writeText("Text is copied");
          setIsUrlCopied({ toggle: true, index: String(index) });
          clearTimeout(isUrlCopiedTimerId.current);
          isUrlCopiedTimerId.current = setTimeout(() => setIsUrlCopied({ toggle: false, index: 0 })
          , 2000);  
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

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const setTabName = useTabNameStore((state: any) => state.setTabName);

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

  const show = true;
  
  if (show) return (
    <div className="flex flex-col gap-4 overflow-x-auto">
      <h3
        className="sticky left-0 text-lg text-heading"
      >
        {isEn ? 'User' : 'المستخدم'}
      </h3>
      <table
        className="
          min-w-full overflow-hidden 
          divide-y divide-underline bg-white rounded-lg whitespace-nowrap
        "
      >
        <thead className="text-body">
          <tr>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'NAME' : 'الاسم'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'URL' : 'الرابط'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'OPTIONS' : 'الخيارات'}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-underline">
          {urlsTable.filter(itm => itm.type === "user").map((itm, i) => 
            <tr 
              key={i}
              className="hover:bg-yellow-50 transition-all duration-300 ease-in-out"
            >
              <td className="px-6 py-4 text-heading">{itm.name[isEn ? 'en' : 'ar']}</td>
              <td className={`direction-ltr ${isEn ? 'text-left' : 'text-right'} px-6 py-4 text-sm text-body`}>
                <span className="direction-ltr bg-green-100 px-2 py-0 rounded-md">
                  {itm.url}              
                </span>
              </td>
              <td className="px-6">
                <div className="flex gap-2">
                  <LineMdLink className="bg-background-light w-7 h-7 p-1 rounded-md cursor-pointer" />
                  <button 
                    className={`
                      relative bg-background-light rounded-md
                      transition-all duration-500 ease-in-out
                      ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type) 
                        ? 'bg-green-400' 
                        : 'bg-background-light'
                      }
                    `}
                    data-type="copy_button_is_clicked"
                    data-index={i + itm.type}
                    onClick={handleClick}
                  >
                    <TablerCopy 
                      className={`
                        w-7 h-7 p-1 rounded-md cursor-pointer 
                        transition-all duration-200 ease-in-out
                        ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type)
                          ? 'invisible opacity-0'
                          : 'visible opacity-100' 
                        }
                      `}
                    />    
                    <MaterialSymbolsCheckRounded 
                      className={`
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%]
                        w-7 h-7 p-1 rounded-md cursor-pointer 
                        transition-all duration-200 ease-in-out
                        ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type) 
                          ? 'visible opacity-100' 
                          : 'invisible opacity-0'
                        }
                      `}
                    />    
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h3
        className="sticky left-0 text-lg text-heading"
      >
        {isEn ? 'Cloths' : 'الملابس'}
      </h3>
      <table
        className="
          min-w-full overflow-hidden 
          divide-y divide-underline bg-white rounded-lg whitespace-nowrap
        "
      >
        <thead className="text-body">
          <tr>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'NAME' : 'الاسم'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'URL' : 'الرابط'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'OPTIONS' : 'الخيارات'}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-underline">
          {urlsTable.filter(itm => itm.type === "cloths").map((itm, i) => 
            <tr className="hover:bg-yellow-50 transition-all duration-300 ease-in-out">
              <td className="px-6 py-4 text-heading">{itm.name[isEn ? 'en' : 'ar']}</td>
              <td className={`direction-ltr ${isEn ? 'text-left' : 'text-right'} px-6 py-4 text-sm text-body`}>
                <span className="direction-ltr bg-green-100 px-2 py-0 rounded-md">
                  {itm.url}              
                </span>
              </td>
              <td className="px-6">
                <div className="flex gap-2">
                  <LineMdLink className="bg-background-light w-7 h-7 p-1 rounded-md cursor-pointer" />
                  <button 
                    className={`
                      relative bg-background-light rounded-md
                      transition-all duration-500 ease-in-out
                      ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type) 
                        ? 'bg-green-400' 
                        : 'bg-background-light'
                      }
                    `}
                    data-type="copy_button_is_clicked"
                    data-index={i + itm.type}
                    onClick={handleClick}
                  >
                    <TablerCopy 
                      className={`
                        w-7 h-7 p-1 rounded-md cursor-pointer 
                        transition-all duration-200 ease-in-out
                        ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type)
                          ? 'invisible opacity-0'
                          : 'visible opacity-100' 
                        }
                      `}
                    />
                    <MaterialSymbolsCheckRounded 
                      className={`
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%]
                        w-7 h-7 p-1 rounded-md cursor-pointer 
                        transition-all duration-200 ease-in-outnter
                        ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type) 
                          ? 'visible opacity-100' 
                          : 'invisible opacity-0'
                        }
                      `}
                    />
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h3
        className="sticky left-0 text-lg text-heading"
      >
        {isEn ? 'Payment' : 'الدفع'}
      </h3>
      <table
        className="
          min-w-full overflow-hidden 
          divide-y divide-underline bg-white rounded-lg whitespace-nowrap
        "
      >
        <thead className="text-body">
          <tr>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'NAME' : 'الاسم'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'URL' : 'الرابط'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'OPTIONS' : 'الخيارات'}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-underline">
          {urlsTable.filter(itm => itm.type === "payment").map((itm, i) => 
            <tr className="hover:bg-yellow-50 transition-all duration-300 ease-in-out">
              <td className="px-6 py-4 text-heading">{itm.name[isEn ? 'en' : 'ar']}</td>
              <td className={`direction-ltr ${isEn ? 'text-left' : 'text-right'} px-6 py-4 text-sm text-body`}>
                <span className="direction-ltr bg-green-100 px-2 py-0 rounded-md">
                  {itm.url}              
                </span>
              </td>
              <td className="px-6">
                <div className="flex gap-2">
                  <LineMdLink className="bg-background-light w-7 h-7 p-1 rounded-md cursor-pointer" />
                  <button 
                    className={`
                      relative bg-background-light rounded-md
                      transition-all duration-500 ease-in-out
                      ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type) 
                        ? 'bg-green-400' 
                        : 'bg-background-light'
                      }
                    `}
                    data-type="copy_button_is_clicked"
                    data-index={i + itm.type}
                    onClick={handleClick}
                  >
                    <TablerCopy 
                      className={`
                        w-7 h-7 p-1 rounded-md cursor-pointer 
                        transition-all duration-200 ease-in-out
                        ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type)
                          ? 'invisible opacity-0'
                          : 'visible opacity-100' 
                        }
                      `}
                    />
                    <MaterialSymbolsCheckRounded 
                      className={`
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%]
                        w-7 h-7 p-1 rounded-md cursor-pointer 
                        transition-all duration-200 ease-in-outnter
                        ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type) 
                          ? 'visible opacity-100' 
                          : 'invisible opacity-0'
                        }
                      `}
                    />
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h3
        className="sticky left-0 text-lg text-heading"
      >
        {isEn ? 'Customer Service' : 'خدمه العملاء'}
      </h3>
      <table
        className="
          min-w-full overflow-hidden 
          divide-y divide-underline bg-white rounded-lg whitespace-nowrap
        "
      >
        <thead className="text-body">
          <tr>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'NAME' : 'الاسم'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'URL' : 'الرابط'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'OPTIONS' : 'الخيارات'}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-underline">
          {urlsTable.filter(itm => itm.type === "customer-service").map((itm, i) => 
            <tr className="hover:bg-yellow-50 transition-all duration-300 ease-in-out">
              <td className="px-6 py-4 text-heading">{itm.name[isEn ? 'en' : 'ar']}</td>
              <td className={`direction-ltr ${isEn ? 'text-left' : 'text-right'} px-6 py-4 text-sm text-body`}>
                <span className="direction-ltr bg-green-100 px-2 py-0 rounded-md">
                  {itm.url}              
                </span>
              </td>
              <td className="px-6">
                <div className="flex gap-2">                  
                  <LineMdLink className="bg-background-light w-7 h-7 p-1 rounded-md cursor-pointer" />
                  <button 
                    className={`
                      relative bg-background-light rounded-md
                      transition-all duration-500 ease-in-out
                      ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type) 
                        ? 'bg-green-400' 
                        : 'bg-background-light'
                      }
                    `}
                    data-type="copy_button_is_clicked"
                    data-index={i + itm.type}
                    onClick={handleClick}
                  >
                    <TablerCopy 
                      className={`
                        w-7 h-7 p-1 rounded-md cursor-pointer 
                        transition-all duration-200 ease-in-out
                        ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type)
                          ? 'invisible opacity-0'
                          : 'visible opacity-100' 
                        }
                      `}
                    />
                    <MaterialSymbolsCheckRounded 
                      className={`
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%]
                        w-7 h-7 p-1 rounded-md cursor-pointer 
                        transition-all duration-200 ease-in-outnter
                        ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type) 
                          ? 'visible opacity-100' 
                          : 'invisible opacity-0'
                        }
                      `}
                    />
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h3
        className="sticky left-0 text-lg text-heading"
      >
        {isEn ? 'About us' : 'من نحن'}
      </h3>
      <table
        className="
          min-w-full overflow-hidden 
          divide-y divide-underline bg-white rounded-lg whitespace-nowrap
        "
      >
        <thead className="text-body">
          <tr>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'NAME' : 'الاسم'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'URL' : 'الرابط'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'OPTIONS' : 'الخيارات'}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-underline">
          {urlsTable.filter(itm => itm.type === "about-us").map((itm, i) => 
            <tr className="hover:bg-yellow-50 transition-all duration-300 ease-in-out">
              <td className="px-6 py-4 text-heading">{itm.name[isEn ? 'en' : 'ar']}</td>
              <td className={`direction-ltr ${isEn ? 'text-left' : 'text-right'} px-6 py-4 text-sm text-body`}>
                <span className="direction-ltr bg-green-100 px-2 py-0 rounded-md">
                  {itm.url}              
                </span>
              </td>
              <td className="px-6">
                <div className="flex gap-2">
                  <LineMdLink className="bg-background-light w-7 h-7 p-1 rounded-md cursor-pointer" />
                  <button 
                    className={`
                      relative bg-background-light rounded-md
                      transition-all duration-500 ease-in-out
                      ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type) 
                        ? 'bg-green-400' 
                        : 'bg-background-light'
                      }
                    `}
                    data-type="copy_button_is_clicked"
                    data-index={i + itm.type}
                    onClick={handleClick}
                  >
                    <TablerCopy 
                      className={`
                        w-7 h-7 p-1 rounded-md cursor-pointer 
                        transition-all duration-200 ease-in-out
                        ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type)
                          ? 'invisible opacity-0'
                          : 'visible opacity-100' 
                        }
                      `}
                    />
                    <MaterialSymbolsCheckRounded 
                      className={`
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%]
                        w-7 h-7 p-1 rounded-md cursor-pointer 
                        transition-all duration-200 ease-in-outnter
                        ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type) 
                          ? 'visible opacity-100' 
                          : 'invisible opacity-0'
                        }
                      `}
                    />
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {people.map((person) => (
            <tr key={person.email}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{person.name}</div>
                    <div className="text-sm text-gray-500">{person.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{person.title}</div>
                <div className="text-sm text-gray-500">{person.department}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${person.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {person.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {person.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )


  return (
    <div>
      <table className="">
        <thead>
          <tr>tr</tr>
          <tr>tr</tr>
          <tr>tr</tr>
        </thead>
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
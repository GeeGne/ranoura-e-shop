// HOOKS
import { useState, useRef } from 'react';
import Link from 'next/link';

// COMPONENTS
import LineMdLink from '@/components/svgs/LineMdLink';
import TablerCopy from '@/components/svgs/TablerCopy';
import MaterialSymbolsCheckRounded from '@/components/svgs/MaterialSymbolsCheckRounded';
import LineMdCloseCircleFilled from '@/components/svgs/LineMdCloseCircleFilled';
import SocialIcon from '@/components/SocialIcon';
import LineMdTrash from '@/components/svgs/LineMdTrash';

// JSON
import urlsTable from '@/json/cmsTables/urlsTable.json';
import socialLinks from '@/json/socialLinks.json';

// STORES
import { useTabNameStore, useLanguageStore, useAlertMessageStore } from '@/stores/index';

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

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

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

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-heading text-lg font-bold">List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Icon
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Url
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {socialLinks.map((itm, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <SocialIcon className="h-10 w-10 rounded-full" style={{color: itm.color}} icon={itm.icon} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{itm.platform[isEn ? 'en' : 'ar']}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a 
                    className="
                      text-sm text-body underline
                      hover:text-content active:text-heading
                      transition-all duration-200 ease-in-out
                    " 
                    href={itm.url}
                    target="_blank"
                  >
                    {itm.url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    data-type="delete_social_link_button_is_clicked"
                    onClick={handleClick}
                  >
                    <LineMdTrash 
                      className="
                        w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                        bg-background-light hover:bg-background-deep-light active:opacity-60
                        transition-all duration-200 ease-out
                      "
                    />    
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
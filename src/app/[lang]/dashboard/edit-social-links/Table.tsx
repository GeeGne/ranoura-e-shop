// HOOKS
import { useState, useRef } from 'react';
import Link from 'next/link';

// COMPONENTS
import LoadingTable from '@/components/LoadingTable'
import SocialIcon from '@/components/SocialIcon';
import LineMdTrash from '@/components/svgs/LineMdTrash';
import LineMdLink from '@/components/svgs/LineMdLink';
import TablerCopy from '@/components/svgs/TablerCopy';
import MaterialSymbolsCheckRounded from '@/components/svgs/MaterialSymbolsCheckRounded';
import LineMdCloseCircleFilled from '@/components/svgs/LineMdCloseCircleFilled';

// JSON
import socialLinks from '@/json/socialLinks.json';

// STORES
import { useTabNameStore, useLanguageStore, useAlertMessageStore } from '@/stores/index';

type Props = {
  data: Record<string, any> | null;
  isLoading: boolean
}

export default function Table({ data, isLoading }:Props) {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);


  const checkToggle = (toggle: boolean, hookIndex: number | string, refIndex: number | string) => {
    if (toggle === true && hookIndex === refIndex) return true;
    return false
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type, index } = e.currentTarget.dataset;

    switch (type) {
      case 'copy_button_is_clicked':
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  if (isLoading) return (
    <LoadingTable />
  )

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
            {data?.map((itm: Record<string, string>, i: number) => (
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
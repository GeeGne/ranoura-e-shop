// HOOKS
import { useState, useRef } from 'react';
import Link from 'next/link';

// COMPONENTS
import LineMdLink from '@/components/svgs/LineMdLink';
import TablerCopy from '@/components/svgs/TablerCopy';
import MaterialSymbolsCheckRounded from '@/components/svgs/MaterialSymbolsCheckRounded';
import SolarGalleryBold from '@/components/svgs/SolarGalleryBold';
import SolarGalleryCheckBold from '@/components/svgs/SolarGalleryCheckBold';
import LineMdCloseCircleFilled from '@/components/svgs/LineMdCloseCircleFilled';

// JSON
import urlsTable from '@/json/cmsTables/urlsTable.json';
import themePallets from '@/json/themePallets.json';

// STORES
import { useTabNameStore, useLanguageStore, useAlertMessageStore } from '@/stores/index';

import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';


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

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const array = [1]
  
  return (
    <div className="flex flex-col gap-4 overflow-x-auto">
      <h3
        className="sticky left-0 text-lg text-heading"
      >
        {isEn ? 'Schemes' : 'سكيمات'}
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
              {isEn ? 'Pallete' : 'لوح الألوان'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'OPTIONS' : 'الخيارات'}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-underline">
          {themePallets.map((itm, i) => 
            <tr 
              key={i}
              className="hover:bg-yellow-50 transition-all duration-300 ease-in-out"
            >
              {/* <td className="px-6 py-4 text-heading">{itm.name[isEn ? 'en' : 'ar']}</td> */}
              <td className="px-6 py-4 text-heading">{itm.name[isEn ? 'en' : 'ar']}</td>
              <td className={`flex px-6 py-4 text-sm text-body`}>
                <ul className="flex flex-row w rounded-md overflow-hidden">
                  <li
                    className={`p-3`}
                    style={{backgroundColor: itm.primary_color}}
                  />
                  <li
                    className={`p-3`}
                    style={{backgroundColor: itm.secondary_color}}
                  />
                  <li
                    className={`p-3`}
                    style={{backgroundColor: itm.content_color}}
                  />
                  <li
                    className={`p-3`}
                    style={{backgroundColor: itm.content_inbetween_color}}
                  />
                  <li
                    className={`p-3`}
                    style={{backgroundColor: itm.inbetween_color}}
                  />
                  <li
                    className={`p-3`}
                    style={{backgroundColor: itm.content_invert_color}}
                  />
                  <li
                    className={`p-3`}
                    style={{backgroundColor: itm.primary_invert_color}}
                  />
                  <li
                    className={`p-3`}
                    style={{backgroundColor: itm.secondary_invert_color}}
                  />
                </ul>
              </td>
              <td className="px-6">
                <div className="flex gap-2">
                  <button 
                    className={`
                      relative bg-background-light rounded-md
                      transition-all duration-500 ease-in-out
                      ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type) 
                        ? 'bg-green-400' 
                        : 'bg-background-light'
                      }
                    `}
                  >
                    <SolarGalleryBold 
                      className={`
                        w-7 h-7 p-1 rounded-md cursor-pointer 
                        transition-all duration-200 ease-in-out
                        ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, i + itm.type)
                          ? 'invisible opacity-0'
                          : 'visible opacity-100' 
                        }
                      `}
                    />    
                    <SolarGalleryCheckBold 
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
    </div>
  );
}
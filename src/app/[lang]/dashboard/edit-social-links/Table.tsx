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
import { useTabNameStore, useAlertMessageStore } from '@/stores/index';

type Props = {
  data: Record<string, any> | null;
  isLoading: boolean
  lang?: string;
  isEn?: boolean;
}

type UrlCopiedState = {
  toggle: boolean;
  index: number | string;
}

export default function Table({ data, isLoading, isEn = true, lang = 'en' }:Props) {

  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const [ isUrlCopied, setIsUrlCopied ] = useState<UrlCopiedState>({ toggle: false, index: 0 });
  const isUrlCopiedTimerId = useRef<any>(0);

  const checkToggle = (toggle: boolean, hookIndex: number | string, refIndex: number | string) => {
    console.log({ hookIndex, refIndex })
    if (toggle === true && hookIndex === String(refIndex)) return true;
    return false
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type, index, url } = e.currentTarget.dataset;

    switch (type) {
      case 'copy_button_is_clicked':
        try {
          if (url) await navigator?.clipboard?.writeText(url);
          if (index) setIsUrlCopied({ toggle: true, index });
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
              <th scope="col" className={`px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {isEn ? 'Icon' : 'ايقونه'}
              </th>
              <th scope="col" className={`px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {isEn ? 'Url' : 'الرابط'}
              </th>
              <th scope="col" className={`px-6 py-3 ${isEn ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {isEn ? 'Options' : 'الخيارات'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((itm: Record<string, any>, i: number) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 h-10 w-10">
                      <SocialIcon className="h-10 w-10 rounded-full" style={{color: itm.color}} icon={itm.icon} />
                    </div>
                    <div className="">
                      <div className="text-sm font-medium text-gray-900">{itm?.platform[lang]}</div>
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
                  <div
                    className="flex gap-2"
                  >
                    <button 
                      className={`
                        relative bg-background-light rounded-md
                        transition-all duration-500 ease-in-out
                        ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, itm.id) 
                          ? 'bg-green-400' 
                          : 'bg-background-light'
                        }
                      `}
                      data-type="copy_button_is_clicked"
                      data-index={itm.id}
                      data-url={itm.url}
                      onClick={handleClick}
                    >
                      <TablerCopy 
                        className={`
                          w-7 h-7 p-1 rounded-md cursor-pointer 
                          transition-all duration-200 ease-in-out
                          ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, itm.id)
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
                          ${checkToggle(isUrlCopied.toggle, isUrlCopied.index, itm.id) 
                            ? 'visible opacity-100' 
                            : 'invisible opacity-0'
                          }
                        `}
                      />
                    </button>
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
// HOOKS
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import LoadingTable from '@/components/LoadingTable'
import ErrorLayout from '@/components/ErrorLayout';
import LineMdEdit from '@/components/svgs/LineMdEdit';
import LineMdTrash from '@/components/svgs/LineMdTrash';
import SolarGalleryBold from '@/components/svgs/SolarGalleryBold';
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import SolarGalleryCheckBold from '@/components/svgs/SolarGalleryCheckBold';

// JSON
import themePallets from '@/json/themePallets.json';

// STORES
import { useLanguageStore, useAlertMessageStore } from '@/stores/index';

// API
import getThemeVars from '@/lib/api/themes/get';
import updateThemeVars from '@/lib/api/themes/put';

// LIB
import getMessage from '@/lib/messages/index';

// ASSETS
const navBarImg = "/assets/img/background(5).webp";
const navBarLgImg = "/assets/img/background(7).webp";

export default function Table() {

  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const subCategoriesArray = ['Hot Deals', 'Hot Sales'];
  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);
  
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type, index, schemeId } = e.currentTarget.dataset;

    switch (type) {
      case '':
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG & UI
  // console.log('themes data: ', data);

  const isLoading = false;
  const isError = false;

  if (isLoading) return (
    <LoadingTable />
  )

  if (isError) return (
    <ErrorLayout 
      title={isEn ? 'Unable To Load' : 'لم يتم التحميل'}
      description={isEn ? 'Please Refresh the page or try again later' : 'الرجاء اعاده تحميل الصفحه او حاول مره اخرى لاحقا'}
    />
  )
  
  return (
    <div className="flex flex-col gap-4 overflow-x-auto py-4">
      <h3
        className="sticky left-0 text-lg text-heading"
      >
        {isEn ? 'List' : 'القائمه'}
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
              {isEn ? 'SUBCATEGORIES' : 'الفئات الفرعيه'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'NAV IMAGE' : 'شعار الشريط'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'HERO IMAGE' : 'الشعار الرئيسي'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'IMAGE LINK' : 'رابط الصوره'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'OPTIONS' : 'الخيارات'}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-underline">
          <tr 
            className="px-6"
          >
            <td 
              className="
                px-6 py-4 text-sm text-heading font-bold
              "
            >
              What's New
            </td>
            <td 
              className={`
                px-6 py-4 text-sm text-body
                transition-all duration-300 ease-in-out
              `}
            >
              <ul
                className="flex flex-row gap-2"
              >
                {subCategoriesArray.map(val => 
                  <li
                    className="text-heading-invert bg-heading font-bold p-2 rounded-lg"
                  >
                    {val}
                  </li>
                )}
              </ul>
            </td>
            <td 
              className={`
                px-6 py-4 text-sm text-body min-w-[300px] min-h-[250px]
                transition-all duration-300 ease-in-out
              `}
            >
              <img 
                src={navBarImg}
                className="w-[200px] aspect-[1/1] object-center object-cover rounded-lg"
              />
            </td>
            <td 
              className={`
                px-6 py-4 text-sm text-body min-w-[500px] min-h-[250px]
                transition-all duration-300 ease-in-out
              `}
            >
              <img 
                src={navBarLgImg}
                className="w-[400px] aspect-[2/1] object-center object-cover rounded-lgg"
              />
            </td>
            <td className="px-6">
              <div className="flex gap-2">
                <button 
                  className={`
                    relative bg-background-light rounded-md
                    transition-all duration-500 ease-in-out
                    bg-background-light
                  `}
                  data-type="delete_product_button_is_clicked"
                  onClick={handleClick}
                >
                  <LineMdTrash 
                    className={`
                      w-7 h-7 p-1 rounded-md cursor-pointer 
                      transition-all duration-200 ease-in-out text-heading
                      }
                    `}
                  />    
                </button>
                <button 
                  className={`
                    relative bg-background-light rounded-md
                    transition-all duration-500 ease-in-out
                    bg-background-light
                  `}
                  data-type="edit_product_button_is_clicked"
                  onClick={handleClick}
                >
                  <LineMdEdit 
                    className={`
                      w-7 h-7 p-1 rounded-md cursor-pointer 
                      transition-all duration-200 ease-in-out text-heading
                      }
                    `}
                  />    
                </button>
              </div>
            </td>
            <td className="px-6">
              <div className="flex gap-2">
                <button 
                  className={`
                    relative bg-background-light rounded-md
                    transition-all duration-500 ease-in-out
                    bg-background-light
                  `}
                  data-type="delete_product_button_is_clicked"
                  onClick={handleClick}
                >
                  <LineMdTrash 
                    className={`
                      w-7 h-7 p-1 rounded-md cursor-pointer 
                      transition-all duration-200 ease-in-out text-heading
                      }
                    `}
                  />    
                </button>
                <button 
                  className={`
                    relative bg-background-light rounded-md
                    transition-all duration-500 ease-in-out
                    bg-background-light
                  `}
                  data-type="edit_product_button_is_clicked"
                  onClick={handleClick}
                >
                  <LineMdEdit 
                    className={`
                      w-7 h-7 p-1 rounded-md cursor-pointer 
                      transition-all duration-200 ease-in-out text-heading
                      }
                    `}
                  />    
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
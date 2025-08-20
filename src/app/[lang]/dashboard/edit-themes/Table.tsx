// HOOKS
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import LoadingTable from '@/components/LoadingTable'
import ErrorLayout from '@/components/ErrorLayout';
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

export default function Table() {

  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);
  const [ isThemeMutating, setIsThemeMutating ] = useState<{toggle: boolean, index: number}>({
    toggle: false, index: 0
  });
  const isSameTheme = (id: number) => id === themeData?.data?.scheme_id;
  const getTheme = (schemeId: number) => themePallets.find(theme => theme.scheme_id === schemeId)
  
  const { data: themeData, error, isError, isLoading } = useQuery({
    queryKey: ['themes'],
    queryFn: getThemeVars,
  });
  
  const updateThemeVarsMutation = useMutation({
    mutationFn: updateThemeVars,
    onMutate: () => {
      setIsThemeMutating(val => ({ toggle: true, index: val.index }));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['themes']});
      queryClient.refetchQueries({ queryKey: ['themes']});
      setIsThemeMutating(val => ({ toggle: false, index: val.index }));

      setAlertToggle(Date.now());
      setAlertType("success");
      setAlertMessage(data.message[isEn ? 'en' : 'ar']);
    },
    onError: (error: any) => {
      setIsThemeMutating(val => ({ toggle: false, index: val.index }));

      setAlertToggle(Date.now());
      setAlertType("error");
      setAlertMessage(getMessage(error.code, 'en'))
    }
  });

  function isErrorWithCode(error: unknown): error is { code: string } {
    return typeof error === 'object' && error !== null && 'code' in error;
  }
  
  useEffect(() => {
    if (isLoading && !error && !isError) return;
  
    if (error instanceof Error && isErrorWithCode(error)) {
      setAlertToggle(Date.now());
      setAlertType("error");
      setAlertMessage(getMessage(error.code, 'en'))
    }
  }, [error, isError, isLoading]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type, index, schemeId } = e.currentTarget.dataset;

    switch (type) {
      case 'set_theme_button_is_clicked':
        const themeData = getTheme(Number(schemeId));
        if (isSameTheme(Number(schemeId)) || !themeData) return;
        
        updateThemeVarsMutation.mutate(themeData);
        setIsThemeMutating( {toggle: false, index: Number(index) });
        break;
      case 'copy_button_is_clicked':
        try {
          await navigator?.clipboard?.writeText("Text is copied");
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

  // DEBUG & UI
  // console.log('themes data: ', data);

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
              {isEn ? 'PALLETE' : 'لوح الألوان'}
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
              className={`
                transition-all duration-300 ease-in-out
                ${isSameTheme(itm.scheme_id) ? 'bg-content-invert hover:bg-content-invert' : 'bg-transparent hover:bg-yellow-50'}
              `}
            >
              {/* <td className="px-6 py-4 text-heading">{itm.name[isEn ? 'en' : 'ar']}</td> */}
              <td 
                className={`
                  px-6 py-4 ${isSameTheme(itm.scheme_id) ? 'text-content font-bold' : 'text-heading font-normal'}
                `}
              >
                {itm.name[isEn ? 'en' : 'ar']}
              </td>
              <td 
                className={`
                  flex px-6 py-4 text-sm text-body
                  transition-all duration-300 ease-in-out
                `}
              >
                <ul className={`
                  flex flex-row w-[300px] h-[30px] rounded-md overflow-hidden 
                  border-solid
                  ${isSameTheme(itm.scheme_id) ? 'border-content border-[2px]' : 'border-primary border-[1px]'}
                `}>
                  <li
                    className={`
                      flex-1 w-full h-full hover:px-2
                      transition-all duration-200 ease-out
                    `}
                    style={{backgroundColor: itm.primary_color}}
                  />
                  <li
                    className={`
                      flex-1 w-full h-full hover:px-2
                      transition-all duration-200 ease-out
                    `}
                    style={{backgroundColor: itm.secondary_color}}
                  />
                  <li
                    className={`
                      flex-1 w-full h-full hover:px-2
                      transition-all duration-200 ease-out
                    `}
                    style={{backgroundColor: itm.content_color}}
                  />
                  <li
                    className={`
                      flex-1 w-full h-full hover:px-2
                      transition-all duration-200 ease-out
                    `}
                    style={{backgroundColor: itm.content_inbetween_color}}
                  />
                  <li
                    className={`
                      flex-1 w-full h-full hover:px-2
                      transition-all duration-200 ease-out
                    `}
                    style={{backgroundColor: itm.inbetween_color}}
                  />
                  <li
                    className={`
                      flex-1 w-full h-full hover:px-2
                      transition-all duration-200 ease-out
                    `}
                    style={{backgroundColor: itm.content_invert_color}}
                  />
                  <li
                    className={`
                      flex-1 w-full h-full hover:px-2
                      transition-all duration-200 ease-out
                    `}
                    style={{backgroundColor: itm.primary_invert_color}}
                  />
                  <li
                    className={`
                      flex-1 w-full h-full hover:px-2
                      transition-all duration-200 ease-out
                    `}
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
                      ${isSameTheme(itm.scheme_id)
                        ? 'bg-content' 
                        : 'bg-background-light'
                      }
                    `}
                    data-index={i}
                    data-type="set_theme_button_is_clicked"
                    data-scheme-id={itm.scheme_id}
                    onClick={handleClick}
                  >
                    <SvgSpinnersRingResize 
                      className={`
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%]
                        w-7 h-7 p-1 rounded-md cursor-pointer 
                        transition-all duration-200 ease-in-out text-heading
                        ${isThemeMutating.toggle && isThemeMutating.index === i
                          ? 'visible opacity-100'
                          : 'invisible opacity-0' 
                        }
                      `}
                    />    
                    <SolarGalleryBold 
                      className={`
                        w-7 h-7 p-1 rounded-md cursor-pointer 
                        transition-all duration-200 ease-in-out text-heading
                        ${isSameTheme(itm.scheme_id) || isThemeMutating.toggle && isThemeMutating.index === i
                          ? 'invisible opacity-0'
                          : 'visible opacity-100' 
                        }
                      `}
                    />    
                    <SolarGalleryCheckBold 
                      className={`
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%]
                        w-7 h-7 p-1 rounded-md cursor-pointer text-heading-invert
                        transition-all duration-200 ease-in-out
                        ${isSameTheme(itm.scheme_id)
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
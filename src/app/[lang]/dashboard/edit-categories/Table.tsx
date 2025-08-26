// HOOKS
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import LoadingTable from '@/components/LoadingTable'
import ErrorLayout from '@/components/ErrorLayout';
import LineMdEdit from '@/components/svgs/LineMdEdit';
import LineMdTrash from '@/components/svgs/LineMdTrash';
import LineMdPlus from '@/components/svgs/LineMdPlus';
import LineMdMinus from '@/components/svgs/LineMdMinus';
import LineMdMenuToCloseAltTransition from '@/components/svgs/LineMdMenuToCloseAltTransition';
import SolarGalleryBold from '@/components/svgs/SolarGalleryBold';
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import SolarGalleryCheckBold from '@/components/svgs/SolarGalleryCheckBold';

// STORES
import { 
  useLanguageStore, useAlertMessageStore, 
  useLayoutRefStore, useAddSubCategoryWindowStore, useActivityWindowStore
} from '@/stores/index';

// API
import deleteSubCategory from '@/lib/api/sub-categories/slug/delete';

// LIB
import getMessage from '@/lib/messages/index';

// ASSETS
const navBarImg = "/assets/img/background(5).webp";
const navBarLgImg = "/assets/img/background(7).webp";

type Props = {
  scroll?: string;
  scrollTrigger?: number;
  categories?: any[];
  subCategories?: any[];
  isLoading?: boolean;
  isError?: boolean;
  isCategoriesLoading: boolean;
  isCategoriesError: boolean;
  isSubCategoriesLoading: boolean;
  isSubCategoriesError: boolean;
}

export default function Table({
  scroll, 
  scrollTrigger, 
  categories, 
  subCategories, 
  isCategoriesLoading,
  isCategoriesError,
  isSubCategoriesLoading,
  isSubCategoriesError,

}: Props ) {

  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  
  const mainRef = useRef<any>(null);
  const layoutRef = useLayoutRefStore(state => state.layoutRef);
  
  const setNewSubCategoryToggle = useAddSubCategoryWindowStore(state => state.setToggle);
  const setNewSubCategoryType = useAddSubCategoryWindowStore(state => state.setCategorySlug);

  const activityWindowToggle = useActivityWindowStore(state => state.toggle);
  const setActivityWindowToggle = useActivityWindowStore(state => state.setToggle);
  const setActivityWindowMessage = useActivityWindowStore(state => state.setMessage);

  const subCategoriesArray = ['Hot Deals', 'Hot Sales'];
  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

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

  const deleteSubCategoryMutation = useMutation({
    mutationFn: deleteSubCategory,
    onSettled: () => {
      setActivityWindowToggle(false);
    },
    onMutate: () => {
      setActivityWindowToggle(true);
      setActivityWindowMessage(isEn ? 'Deleting the SubCategory...' : 'جاري حذف القسم الفرعي...')
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['sub-categories']});
      setAlertToggle(Date.now());
      setAlertType("success");
      setAlertMessage(data?.message[isEn ? 'en' : 'ar']);
    },
    onError: () => {
      setAlertToggle(Date.now());
      setAlertType("error");
      setAlertMessage(
        isEn 
          ? "Couldn't create new product, please try again." 
          : "فشل في محاوله انشاء مجتمع جديد, الرجاء محاوله مره اخرى."
      )
    }
  })

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement | HTMLLIElement>) => {
    const { type, categorySlug, subCategorySlug } = e.currentTarget.dataset;

    switch (type) {
      case 'sub_category_block_is_clicked':
        console.log('categorySlug: ', categorySlug);
        console.log('subCategorySlug: ', subCategorySlug);
        if (subCategorySlug) deleteSubCategoryMutation.mutate(subCategorySlug)
        break;
      case 'add_new_sub_category_button_is_clicked':
        setNewSubCategoryToggle(true);
        console.log('categorySlug: ', categorySlug);
        if (categorySlug) setNewSubCategoryType(categorySlug);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG & UI
  // console.log('themes data: ', data);
  // console.log('categories: ', categories);
  // console.log('subCategories: ', subCategories);

  if (isCategoriesLoading || isSubCategoriesLoading) return (
    <LoadingTable />
  )

  if (isCategoriesError || isSubCategoriesError) return (
    <ErrorLayout 
      title={isEn ? 'Unable To Load' : 'لم يتم التحميل'}
      description={isEn ? 'Please Refresh the page or try again later' : 'الرجاء اعاده تحميل الصفحه او حاول مره اخرى لاحقا'}
    />
  )
  
  return (
    <div 
      className="relative flex flex-col gap-4 overflow-x-auto"
      ref={mainRef}
    >
      <table
        className="
          min-w-full overflow-hidden
          divide-y divide-underline bg-white rounded-lg whitespace-nowrap
        "
        ref={mainRef}
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
          {categories?.map((category: Record<string, any>) =>
            <tr 
              key={category.id}
              className="px-6"
            >
              <td 
                className="
                  px-6 py-4 text-heading font-bold
                "
              >
                {category.name[lang]}
              </td>
              <td 
                className={`
                  px-6 py-4 text-sm text-body
                  transition-all duration-300 ease-in-out
                `}
              >
                <ul
                  className="flex flex-row flex-wrap min-w-[300px] gap-2"
                >
                  {subCategories
                    ?.filter((subCategory: Record<string, any>) => subCategory.type === category.slug)
                    .map((result: Record<string, any>) => 
                    <li
                      key={result.id}
                      className="
                        group relative flex items-center justify-center text-heading-invert bg-heading text-sm 
                        font-bold px-2 py-1 rounded-lg
                        hover:bg-body active:bg-body-light hover:scale-[1.05]
                        transition-all duration-200 ease-out
                      "
                      role="button"
                      data-type="sub_category_block_is_clicked"
                      data-sub-category-slug={result.slug}
                      data-category-slug={category.slug}
                      onClick={handleClick}
                    >
                      <LineMdMenuToCloseAltTransition
                        className={`
                          absolute top-0 translate-y-[-50%]
                          w-4 h-4 p-[3px] bg-background-light text-heading rounded-full
                          invisible group-hover:visible opacity-0 group-hover:opacity-100 
                          scale-0 group-hover:scale-100
                          transition-all duration-200 ease-out
                          ${isEn ? 'right-0 translate-x-[50%]' : 'left-0 translate-x-[-50%]'}
                        `}
                      />
                      <span>
                        {result.name[lang]}
                      </span>
                    </li>
                  )}
                  <li
                    className="
                      bg-background-light text-sm 
                      font-bold px-2 py-1 rounded-lg
                      hover:bg-background-deep-light active:opacity-60
                      transition-all duration-200 ease-out
                    "
                    role="button"
                    data-type="add_new_sub_category_button_is_clicked"
                    data-category-slug={category.slug}
                    onClick={handleClick}
                  >
                    <LineMdPlus className="text-heading" />
                  </li>
                </ul>
              </td>
              <td 
                className={`
                  px-6 py-4 text-sm text-body min-w-[300px] min-h-[250px]
                  transition-all duration-300 ease-in-out
                `}
              >
                <img 
                  src={category.navbarImg}
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
                  src={category.navbarLgImg}
                  className="w-[400px] aspect-[2/1] object-center object-cover rounded-lgg"
                />
              </td>
              <td className="px-6">
                <Link
                  className="
                    text-content text-sm underline hover:text-heading
                    transition-all duraiton-200 ease-in-out
                  "
                  href="category.imgUrl"
                  target="_blank"
                >
                  {category.imgUrl}
                </Link>
              </td>
              <td className="px-6">
                <div className="flex gap-2">
                  <button 
                    data-type="delete_product_button_is_clicked"
                    onClick={handleClick}
                  >
                    <LineMdTrash 
                      className={`
                        w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                        bg-background-light hover:bg-background-deep-light active:opacity-60
                        transition-all duration-200 ease-out
                      `}
                    />    
                  </button>
                  <button 
                    data-type="edit_product_button_is_clicked"
                    onClick={handleClick}
                  >
                    <LineMdEdit 
                      className={`
                        w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                        bg-background-light hover:bg-background-deep-light active:opacity-60
                        transition-all duration-200 ease-out
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
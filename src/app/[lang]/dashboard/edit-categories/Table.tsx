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
import MingcuteAspectRatioFill from '@/components/svgs/MingcuteAspectRatioFill';
import LineMdMenuToCloseAltTransition from '@/components/svgs/LineMdMenuToCloseAltTransition';
import SolarGalleryBold from '@/components/svgs/SolarGalleryBold';
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import SolarGalleryCheckBold from '@/components/svgs/SolarGalleryCheckBold';

// STORES
import { 
  useLanguageStore, useAlertMessageStore, 
  useLayoutRefStore, useAddSubCategoryWindowStore, 
  useActivityWindowStore, useImageDisplayerWindow
} from '@/stores/index';

// API
import deleteSubCategory from '@/lib/api/sub-categories/slug/delete';
import uploadProductImage from '@/lib/api/object/bucketName/filePath/post';

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

  const setImageDisplayerToggle = useImageDisplayerWindow(state => state.setToggle);
  const setImageDisplayerUrl = useImageDisplayerWindow(state => state.setUrl);

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
      displayAlert(data.message[isEn ? 'en' : 'ar'], "success");
    },
    onError: () => {
      displayAlert(
        isEn 
          ? "Couldn't create new Sub-Category, please try again." 
          : "فشل في محاوله انشاء مجتمع جديد, الرجاء محاوله مره اخرى."
      , "error");
    }
  })

  const uploadSubCategoryImageMutation = useMutation({
    mutationFn: uploadProductImage,
    onSettled: () => {
      setActivityWindowToggle(false);
    },
    onMutate: () => {
      setActivityWindowToggle(true);
    },
    onSuccess: (data) => {
      displayAlert(data.message[isEn ? 'en' : 'ar'], "success");

      // DEBUG
      // console.log('upload image data result: ', data);
    },
    onError: () => {
      displayAlert(isEn ? 'An Error has accured during uploading the image, please try again.' : 'هناك مشكله خلال رفع الصوره, الرجاء المحاوله مره اخرى.', "error");
    }
  })

  const displayAlert = (message: any, type: string) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertToggle(Date.now());
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement | HTMLLIElement | SVGElement>) => {
    const { type, categorySlug, subCategorySlug, imageUrl } = e.currentTarget.dataset;

    switch (type) {
      case 'sub_category_block_is_clicked':
        console.log('categorySlug: ', categorySlug);
        console.log('subCategorySlug: ', subCategorySlug);
        if (subCategorySlug) deleteSubCategoryMutation.mutate(subCategorySlug)
        break;
      case 'add_new_sub_category_button_is_clicked':
        setNewSubCategoryToggle(true);
        if (categorySlug) setNewSubCategoryType(categorySlug);
        break;
      case 'expand_image_button_is_clicked':
        setImageDisplayerToggle(true);
        if (imageUrl) setImageDisplayerUrl(imageUrl);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.currentTarget;
    const { categorySlug, imageType } = e.currentTarget.dataset;

    switch (name) {
      case 'navBarImgEditInpt':
      case 'navBarLgImgEditInpt':
        console.log('files: ', files);
        const subCategoryImage = files[0]
        console.log('subCategoryImage: ', subCategoryImage);
        return;
        uploadSubCategoryImageMutation.mutate({
          bucketName: 'assets',
          filePath: setFilePath(`images/categories/${categorySlug}`, imageType),
          subCategoryImage
        });
        break;
      default:
        console.error('Unknown name: ', name);
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
                <div
                  className="
                    group relative w-[200px] aspect-[1/1] rounded-lg overflow-hidden
                  "
                >
                  <div
                    className="
                      absolute top-0 left-0 w-full h-full bg-shade
                      flex flex-row gap-4 items-center justify-center
                      text-heading-invert
                      unvisible group-hover:visible opacity-0 group-hover:opacity-100
                      transition-all duration-300 ease-in-out
                    "
                  >
                    <LineMdTrash
                      className="
                        w-10 h-10 hover:bg-shade-v2 p-2
                        rounded-md active:opacity-80 cursor-pointer
                        transition-all duration-200 ease-out
                      "
                    />
                    <label
                      className=""
                      htmlFor="navBarImgEditInpt"
                    >
                      <LineMdEdit
                        className="
                          w-10 h-10 hover:bg-shade-v2 p-2
                          rounded-md active:opacity-80 cursor-pointer
                          transition-all duration-200 ease-out
                        "
                      />
                      <input
                        className="
                          absolute top-1/2 left-1/2
                          translate-x-[-50%] translate-y-[-50%] w-0 h-0
                          unvisible opacity-0
                        "
                        type="file"
                        accept="image/*"
                        id="navBarImgEditInpt"
                        name="navBarImgEditInpt"
                        data-image-type="navbar"
                        data-category-slug={category.slug}
                        onChange={handleChange}
                      />
                    </label>
                    <MingcuteAspectRatioFill
                      className="
                        w-10 h-10 hover:bg-shade-v2 p-2
                        rounded-md active:opacity-80 cursor-pointer
                        transition-all duration-200 ease-out
                      "
                      role="button"
                      data-type="expand_image_button_is_clicked"
                      data-image-url={category.navbarImg}
                      onClick={handleClick}
                    />
                  </div>
                  <img 
                    src={category.navbarImg}
                    className="w-full object-center object-cover"
                  />
                </div>
              </td>
              <td
                className={`
                  px-6 py-4 text-sm text-body min-w-[500px] min-h-[250px]
                  transition-all duration-300 ease-in-out
                `}
              >
                <div
                  className="
                    group relative w-[400px] aspect-[2/1] rounded-lg overflow-hidden
                  "
                >
                  <div
                    className="
                      absolute top-0 left-0 w-full h-full bg-shade
                      flex flex-row gap-4 items-center justify-center
                      text-heading-invert
                      unvisible group-hover:visible opacity-0 group-hover:opacity-100
                      transition-all duration-300 ease-in-out
                    "
                  >
                    <LineMdTrash
                      className="
                        w-10 h-10 hover:bg-shade-v2 p-2
                        rounded-md active:opacity-80 cursor-pointer
                        transition-all duration-200 ease-out
                      "
                    />
                    <label
                      className=""
                      htmlFor="navBarLgImgEditInpt"
                    >
                      <LineMdEdit
                        className="
                          w-10 h-10 hover:bg-shade-v2 p-2
                          rounded-md active:opacity-80 cursor-pointer
                          transition-all duration-200 ease-out
                        "
                      />
                      <input
                        className="
                          absolute top-1/2 left-1/2
                          translate-x-[-50%] translate-y-[-50%] w-0 h-0
                          unvisible opacity-0
                        "
                        type="file"
                        accept="image/*"
                        id="navBarLgImgEditInpt"
                        name="navBarLgImgEditInpt"
                        data-image-type="hero"
                        onChange={handleChange}
                      />
                    </label>
                    <MingcuteAspectRatioFill
                      className="
                        w-10 h-10 hover:bg-shade-v2 p-2
                        rounded-md active:opacity-80 cursor-pointer
                        transition-all duration-200 ease-out
                      "
                      role="button"
                      data-type="expand_image_button_is_clicked"
                      data-image-url={category.navbarLgImg}
                      onClick={handleClick}
                    />
                  </div>
                  <img
                    src={category.navbarLgImg}
                    className="w-full object-center object-cover"
                  />
                </div>
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
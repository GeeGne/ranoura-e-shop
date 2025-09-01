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
import MdiLinkEdit from '@/components/svgs/MdiLinkEdit';
import LineMdMinus from '@/components/svgs/LineMdMinus';
import LineMdArrowsDiagonal from '@/components/svgs/LineMdArrowsDiagonal';
import GardenFileImage26 from '@/components/svgs/GardenFileImage26';
import MingcuteAspectRatioFill from '@/components/svgs/MingcuteAspectRatioFill';
import LineMdMenuToCloseAltTransition from '@/components/svgs/LineMdMenuToCloseAltTransition';
import SolarGalleryBold from '@/components/svgs/SolarGalleryBold';
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import SolarGalleryCheckBold from '@/components/svgs/SolarGalleryCheckBold';

// STORES
import { 
  useLanguageStore, useAlertMessageStore, 
  useLayoutRefStore, useAddSubCategoryWindowStore, 
  useActivityWindowStore, useImageDisplayerWindow,
  useEditImageUrlCategoryWindowStore
} from '@/stores/index';

// API
import updateCategory from '@/lib/api/categories/slug/put';
import deleteCategory from '@/lib/api/categories/slug/delete';
import deleteSubCategory from '@/lib/api/sub-categories/slug/delete';
import uploadStorageFile from '@/lib/api/object/bucketName/filePath/post';

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
  const targetedCategorySlug = useRef<string | null>(null);
  const targetedCategoryImageType = useRef<string | null>(null);

  const setEditImageUrlWindowToggle = useEditImageUrlCategoryWindowStore(state => state.setToggle);
  const setEditImageUrlWindowImageUrl = useEditImageUrlCategoryWindowStore(state => state.setImageUrl);
  const setNewSubCategorySetSlug = useEditImageUrlCategoryWindowStore(state => state.setSlug);

  const setNewSubCategoryToggle = useAddSubCategoryWindowStore(state => state.setToggle);
  const setNewSubCategoryType = useAddSubCategoryWindowStore(state => state.setCategorySlug);

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

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSettled: () => {
      setActivityWindowToggle(false);
    },
    onMutate: () => {
      setActivityWindowToggle(true);
      setActivityWindowMessage(isEn ? 'Updating the Category...' : 'جاري تحديث القسم...')
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories']});
      displayAlert(data.message[isEn ? 'en' : 'ar'], "success");
    },
    onError: () => {
      displayAlert(
        isEn 
          ? "Couldn't update Category, please try again." 
          : "فشل في محاوله تحديث القسم, الرجاء محاوله مره اخرى."
      , "error");
    }
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSettled: () => {
      setActivityWindowToggle(false);
    },
    onMutate: () => {
      setActivityWindowToggle(true);
      setActivityWindowMessage(isEn ? 'Deleting the Category...' : 'جاري حذف القسم...')
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories']});
      displayAlert(data.message[isEn ? 'en' : 'ar'], "success");
    },
    onError: () => {
      displayAlert(
        isEn 
          ? "Couldn't delete Category, please try again." 
          : "فشل في محاوله حذف القسم, الرجاء محاوله مره اخرى."
      , "error");
    }
  })

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
          ? "Couldn't delete Sub-Category, please try again." 
          : "فشل في محاوله حذف القسم الفرعي, الرجاء محاوله مره اخرى."
      , "error");
    }
  })

  const uploadCategoryImageMutation = useMutation({
    mutationFn: uploadStorageFile,
    onSettled: () => {
      setActivityWindowToggle(false);
    },
    onMutate: () => {
      setActivityWindowToggle(true);
      setActivityWindowMessage(isEn ? 'Uploading the Image...' : 'جاري رفع الصوره...');
    },
    onSuccess: (results) => {
      const { publicUrl } = results.data;
      displayAlert(results.message[isEn ? 'en' : 'ar'], "success");
      if (targetedCategorySlug.current && targetedCategoryImageType.current) updateCategoryMutation.mutate({ 
        slug: targetedCategorySlug.current, 
        data: { [targetedCategoryImageType.current]: publicUrl } 
      });

      // DEBUG
      // console.log('upload image data result: ', data);
    },
    onError: () => {
      displayAlert(isEn ? 'An Error has accured during uploading the image, please try again.' : 'هناك مشكله خلال رفع الصوره, الرجاء المحاوله مره اخرى.', "error");
    }
  })

  const setFilePath = (filePath: string, imageType: any) => `${filePath}/${Date.now()}-${imageType}`;

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
      case 'edit_image_url_button_is_clicked':
        setEditImageUrlWindowToggle(true);
        if (imageUrl) setEditImageUrlWindowImageUrl(imageUrl);
        if (categorySlug) setNewSubCategorySetSlug(categorySlug);
        break;
      case 'delete_product_button_is_clicked':
        if (categorySlug) deleteCategoryMutation.mutate(categorySlug);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.currentTarget;
    const { categorySlug, imageType, variableName } = e.currentTarget.dataset;

    switch (name) {
      case 'navBarImgEditInpt':
      case 'navBarLgImgEditInpt':
        if (!files) return;
        const file: any = files[0];
        uploadCategoryImageMutation.mutate({
          bucketName: 'assets',
          filePath: setFilePath(`images/categories/${categorySlug}`, imageType),
          file
        });
        if (categorySlug) (targetedCategorySlug.current = categorySlug);
        if (variableName)  (targetedCategoryImageType.current = variableName);

        // DEBUG
        // console.log('file: ', file);
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
                {category.navbarImg 
                  ? <div
                    className="
                    group relative w-[200px] aspect-[1/1] rounded-lg overflow-hidden
                  ">
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
                        htmlFor={`navBarImgEditInpt_${category.slug}`}
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
                          id={`navBarImgEditInpt_${category.slug}`}
                          name="navBarImgEditInpt"
                          data-image-type="navbar"
                          data-variable-name="navbarImg"
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
                  : <label
                    className="
                      flex relative w-[200px] aspect-[1/1] rounded-lg overflow-hidden cursor-pointer
                    "
                    htmlFor="navBarImgEditInpt"
                  >
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
                      data-variable-name="navbarImg"
                      data-category-slug={category.slug}
                      onChange={handleChange}
                    />
                    <div
                      className="
                        absolute top-0 left-0 w-full h-full bg-background-light
                        border border-dashed border-[4px] border-body-light
                        flex flex-row gap-4 items-center justify-center
                        text-heading-invert
                        transition-all duration-300 ease-in-out
                      "
                    />
                    <LineMdPlus
                      className="
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%]
                        w-12 h-12 text-body-light
                      "
                    />
                    <div
                      className="
                        absolute bottom-0 left-1/2 translate-x-[-50%]
                        flex items-center justify-evenly w-full p-4
                      "
                    >
                      <div
                        className="relative bg-body-light p-1 rounded-lg"
                      >
                        <LineMdArrowsDiagonal className="text-background-light w-8 h-8" />
                        <span
                          className="
                            absolute top-1/2 left-1/2
                            translate-x-[-50%] translate-y-[-50%]
                            text-base text-background-light font-bold
                            bg-body-light rounded-full
                          "
                        >
                          1:1
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-2 bg-body-light p-2 rounded-lg"
                      >
                        <GardenFileImage26 className="text-background-light" />
                        <span
                          className="
                            text-base text-background-light font-bold
                            bg-body-light rounded-full
                          "
                        >
                          AVIF
                        </span>
                      </div>
                    </div>
                  </label>
                }
              </td>
              <td
                className={`
                  px-6 py-4 text-sm text-body min-w-[500px] min-h-[250px]
                  transition-all duration-300 ease-in-out
                `}
              >
                {category.navbarLgImg 
                  ? <div
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
                        htmlFor={`navBarLgImgEditInpt_${category.slug}`}
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
                          id={`navBarLgImgEditInpt_${category.slug}`}
                          name="navBarLgImgEditInpt"
                          data-image-type="hero"
                          data-variable-name="navbarLgImg"
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
                      src={category.navbarLgImg}
                      className="w-full object-center object-cover"
                    />
                  </div>
                  : <label
                    className="
                      relative flex w-[400px] aspect-[2/1] rounded-lg overflow-hidden cursor-pointer
                    "
                    htmlFor={`navBarLgImgEditInpt_${category.slug}`}
                  >
                    <input
                      className="
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%] w-0 h-0
                        unvisible opacity-0
                      "
                      type="file"
                      accept="image/*"
                      id={`navBarLgImgEditInpt_${category.slug}`}
                      name="navBarLgImgEditInpt"
                      data-image-type="hero"
                      data-variable-name="navbarLgImg"
                      data-category-slug={category.slug}
                      onChange={handleChange}
                    />
                    <div
                      className="
                        absolute top-0 left-0 w-full h-full bg-background-light
                        border border-dashed border-[4px] border-body-light
                        flex flex-row gap-4 items-center justify-center
                        text-heading-invert
                        transition-all duration-300 ease-in-out
                      "
                    />
                    <LineMdPlus
                      className="
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%]
                        w-12 h-12 text-body-light
                      "
                    />
                    <div
                      className="
                        absolute bottom-0 left-1/2 translate-x-[-50%]
                        flex items-center justify-evenly w-full p-4
                      "
                    >
                      <div
                        className="relative bg-body-light p-1 rounded-lg"
                      >
                        <LineMdArrowsDiagonal className="text-background-light w-8 h-8" />
                        <span
                          className="
                            absolute top-1/2 left-1/2
                            translate-x-[-50%] translate-y-[-50%]
                            text-base text-background-light font-bold
                            bg-body-light rounded-full
                          "
                        >
                          2:1
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-2 bg-body-light p-2 rounded-lg"
                      >
                        <GardenFileImage26 className="text-background-light" />
                        <span
                          className="
                            text-base text-background-light font-bold
                            bg-body-light rounded-full
                          "
                        >
                          AVIF
                        </span>
                      </div>
                    </div>
                  </label>
                }
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
                    data-category-slug={category.slug}
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
                    data-type="edit_image_url_button_is_clicked"
                    data-image-url={category.imgUrl}
                    data-category-slug={category.slug}
                    onClick={handleClick}
                  >
                    <MdiLinkEdit 
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
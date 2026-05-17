// HOOKS
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import LoadingTable from '@/components/LoadingTable'
import ErrorLayout from '@/components/ErrorLayout';
import LineMdEdit from '@/components/svgs/LineMdEdit';
import LineMdTrash from '@/components/svgs/LineMdTrash';
import MdiImageEditOutline from '@/components/svgs/MdiImageEditOutline';
import EvaArrowUpFill from '@/components/svgs/EvaArrowUpFill';
import LineMdPlus from '@/components/svgs/LineMdPlus';
import MdiLinkEdit from '@/components/svgs/MdiLinkEdit';
import LineMdMinus from '@/components/svgs/LineMdMinus';
import LineMdArrowsDiagonal from '@/components/svgs/LineMdArrowsDiagonal';
import FluentZoomFit24Regular from '@/components/svgs/FluentZoomFit24Regular';
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
  useEditImageUrlCategoryWindowStore, useActionConfirmWindowStore
} from '@/stores/index';

// API
import updateSlideShow from '@/lib/api/slide-show/id/put';
import deleteSlideShow from '@/lib/api/slide-show/id/delete';
import deleteSubCategory from '@/lib/api/sub-categories/slug/delete';
import uploadStorageFile from '@/lib/api/object/bucketName/filePath/post';

// LIB
import getMessage from '@/lib/messages/index';

// ASSETS
const imageLG = "/assets/img/slide-show-lg.webp";
const imageMD = "/assets/img/slide-show-md.webp";
const imageSM = "/assets/img/slide-show-sm.webp";

type Props = {
  scroll?: string;
  scrollTrigger?: number;
  album?: Record<string, any>[];
  isLoading?: boolean,
  isError?: boolean
}

export default function Table({
  scroll,
  scrollTrigger,
  album = [],
  isLoading = false,
  isError = false,
}: Props ) {

  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  
  const mainRef = useRef<any>(null);
  const layoutRef = useLayoutRefStore(state => state.layoutRef);
  const targetedID = useRef<number | null>(null);
  const targetedImgType = useRef<string | null>(null);

  const setEditImageUrlWindowToggle = useEditImageUrlCategoryWindowStore(state => state.setToggle);
  const setEditImageUrlWindowImageUrl = useEditImageUrlCategoryWindowStore(state => state.setImageUrl);
  const setNewSubCategorySetSlug = useEditImageUrlCategoryWindowStore(state => state.setSlug);

  const setNewSubCategoryToggle = useAddSubCategoryWindowStore(state => state.setToggle);
  const setNewSubCategoryType = useAddSubCategoryWindowStore(state => state.setCategorySlug);

  const setActivityWindowToggle = useActivityWindowStore(state => state.setToggle);
  const setActivityWindowMessage = useActivityWindowStore(state => state.setMessage);

  const setImageDisplayerToggle = useImageDisplayerWindow(state => state.setToggle);
  const setImageDisplayerUrl = useImageDisplayerWindow(state => state.setUrl);

  const action = useActionConfirmWindowStore(state => state.action);
  const setAction = useActionConfirmWindowStore(state => state.setAction);
  const setActionWindowToggle = useActionConfirmWindowStore(state => state.setToggle);
  const setActionWindowIsLoading = useActionConfirmWindowStore(state => state.setIsLoading);
  const setTitle = useActionConfirmWindowStore(state => state.setTitle);
  const setDescription = useActionConfirmWindowStore(state => state.setDescription);
  const setBtnTitle = useActionConfirmWindowStore(state => state.setBtnTitle);
  const setIsActionWindowLoading = useActionConfirmWindowStore(state => state.setIsLoading);

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

  useEffect(() => {
    const { name, id, isConfirmed, value } = action;
    if (!isConfirmed) return;
    if (name === 'remove slide' && id) return deleteSlideMutation.mutate(Number(id));
    
    if (name === 'slide alt' && id && value) return updateSlideShowMutation
      .mutate({ id: Number(id), alt: value });
    if (name === 'slide url' && id && value) return updateSlideShowMutation
      .mutate({ id: Number(id), url: value });
  }, [action]);

  const updateSlideShowMutation = useMutation({
    mutationFn: updateSlideShow,
    onSettled: () => {
      setActivityWindowToggle(false);
      setIsActionWindowLoading(false);
    },
    onMutate: () => {
      setActivityWindowToggle(true);
      setIsActionWindowLoading(true);
      setActivityWindowMessage(isEn ? 'Updating the Slide...' : 'جاري تحديث الائحه...')
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['slide-show']});
      displayAlert(data.message[lang], "success");
      setActionWindowToggle(false);
    },
    onError: () => {
      displayAlert(
        isEn 
          ? "Couldn't update slide, please try again." 
          : "فشل في محاوله تحديث الائحه, الرجاء محاوله مره اخرى."
      , "error");
    }
  });

  const deleteSlideMutation = useMutation({
    mutationFn: deleteSlideShow,
    onSettled: () => {
      setActionWindowIsLoading(false);
    },
    onMutate: () => {
      setActionWindowIsLoading(true);
      setActivityWindowMessage(isEn ? 'Deleting the Category...' : 'جاري حذف الائحه...')
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['slide-show']});
      displayAlert(data.message[isEn ? 'en' : 'ar'], "success");
      setActionWindowToggle(false);
    },
    onError: () => {
      displayAlert(
        isEn 
          ? "Couldn't delete Slide, please try again." 
          : "فشل في محاوله حذف الائحه, الرجاء محاوله مره اخرى."
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
      if (targetedID.current && targetedImgType.current) updateSlideShowMutation.mutate({ 
        id: targetedID.current,
        [targetedImgType.current]: publicUrl 
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
    const { type, imageUrl, id, alt, url, order } = e.currentTarget.dataset;

    switch (type) {
      case 'down_arrow_button_is_clicked':
        if (!id || !order) return;
        const isSlideLast = Number(order) === album?.length;
        const isSlidesMoreLessTwo = album?.length < 2;
        if (isSlideLast || isSlidesMoreLessTwo) return; 
        try {
          const albumOfNextOrder = album?.find((itm) => itm.order === Number(order) + 1);
          await updateSlideShowMutation.mutateAsync({ 
            id: Number(id), order: Number(order) + 1 
          });

          await updateSlideShowMutation.mutateAsync({ 
            id: albumOfNextOrder?.id, order: albumOfNextOrder?.order - 1 
          });
        } catch (error) {
          console.error('One of the myutaitons faield', error);
        }
        break;
      case 'up_arrow_button_is_clicked':
        if (!id || !order) return;
        const isSlideFirst = Number(order) === 1;
        const isSlidesLessThanTwo = album?.length < 2;
        if (isSlideFirst || isSlidesLessThanTwo) return;
        try {
          const albumOfNextOrder = album?.find((itm) => itm.order === Number(order) - 1);
          await updateSlideShowMutation.mutateAsync({ 
            id: Number(id), order: Number(order) - 1 
          });
         await updateSlideShowMutation.mutateAsync({ 
            id: albumOfNextOrder?.id, order: albumOfNextOrder?.order + 1 
          });
        } catch (error) {
          console.error('One of the myutaitons faield', error);
        }
        break;
      case 'edit_slider_url_button_is_clicked':
        setActionWindowToggle(true);
        const slideShowUrl = url || null;
        if (id) setAction({ 
          name: "slide url", id, isConfirmed: false, 
          type: 'input', value: slideShowUrl
        });
        setTitle({ en: 'Add link for the choosen Slider', ar: 'اضف رابط للشريحه المختاره'})
        setBtnTitle({ en: `Accept`, ar: "موافق" });
        setDescription({ 
          en: `example: ranoura-website.com/clothing/hot-sales`, 
          ar: `مثال: ranoura-website.com/clothing/hot-sales` 
        }
        );
        break;
      case 'edit_slider_alt_button_is_clicked':
        setActionWindowToggle(true);
        const slideShowAlt = alt || null;
        if (id) setAction({ 
          name: "slide alt", id, isConfirmed: false, 
          type: 'input', value: slideShowAlt
        });
        setTitle({ en: 'Describe the choosen Slider', ar: 'اوصف ماهو المتعلق بهذه الشريحه'})
        setBtnTitle({ en: `Accept`, ar: "موافق" });
        setDescription({ 
          en: `example: Follow us on our Facebook page!`, 
          ar: `مثال: قم بمتابعتنا على الفيسبوك!` }
        );
        break;
      case 'delete_slider_button_is_clicked':
        setActionWindowToggle(true);
        if (id) setAction({ name: "remove slide", id, isConfirmed: false, type: 'text' });
        setTitle({ en: `Delete Slide?`, ar: "حذف الائحه؟" });
        setDescription({ 
          en: `Are you sure you want to delete selected Slide?`, 
          ar: `هل انت فعلا تريد حذف الائحه المختاره؟` }
        );
        setBtnTitle({ en: `Confirm (Delete)`, ar: "تأكيد (حذف)" });      
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
    const { categorySlug, imageType, variableName, id } = e.currentTarget.dataset;

    switch (name) {
      case 'slideShowImgLG':
      case 'slideShowImgMD':
      case 'slideShowImgSM':
        if (!files) return;
        const file: any = files[0];
        uploadCategoryImageMutation.mutate({
          bucketName: 'assets',
          filePath: setFilePath(`images/slide-show/${categorySlug}`, imageType),
          file
        });
        if (variableName) (targetedImgType.current = variableName);
        if (id) (targetedID.current = Number(id))
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
              {isEn ? 'ORDER' : 'ترتيب'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'IMAGE SMALL' : 'الصوره (حجم صغير)'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'IMAGE MEDIUM' : 'الصوره (حجم متوسط)'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'IMAGE LARGE' : 'الصوره (حجم كبير)'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'ALT' : 'وصف الصوره'}
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
          {album?.sort((a, b) => a.order - b.order)
            .map((image: Record<string, any>) =>
            <tr 
              key={image.id}
              className="px-6"
            >
              <td 
                className="
                  px-6 py-4 text-body font-semibold text-4xl 
                "
              >
                {image.order}
              </td>
              <td
                className={`
                  px-6 py-4 text-sm text-body
                  transition-all duration-300 ease-in-out
                `}
              >
                {image.img_lg  
                  ? <div
                    className="
                      group relative h-[300px] aspect-[2/1] rounded-lg overflow-hidden
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
                        htmlFor={`slideShowImgLG-${image.id}`}
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
                          id={`slideShowImgLG-${image.id}`}
                          name="slideShowImgLG"
                          data-image-type="LG"
                          data-variable-name="img_lg"
                          data-id={image.id}
                          onChange={handleChange}
                        />
                      </label>
                      <FluentZoomFit24Regular
                        className="
                          w-10 h-10 hover:bg-shade-v2 p-2
                          rounded-md active:opacity-80 cursor-pointer
                          transition-all duration-200 ease-out
                        "
                        role="button"
                        data-type="expand_image_button_is_clicked"
                        data-image-url={image.img_lg}
                        onClick={handleClick}
                      />
                    </div>
                    <img 
                      src={image.img_lg}
                      className="w-full aspect-[2/1] object-center object-cover"
                    />
                  </div>
                  : <label
                    className="
                      flex relative h-[300px] aspect-[2/1] rounded-lg overflow-hidden cursor-pointer
                    "
                    htmlFor={`slideShowImgLG-${image.id}`}
                  >
                    <input
                      className="
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%] w-0 h-0
                        unvisible opacity-0
                      "
                      type="file"
                      accept="image/*"
                      id={`slideShowImgLG-${image.id}`}
                      name="slideShowImgLG"
                      data-image-type="LG"
                      data-variable-name="img_lg"
                      data-id={image.id}
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
              <td
                className={`
                  px-6 py-4 text-sm text-body  
                  transition-all duration-300 ease-in-out
                `}
              >
                {image.img_md
                  ? <div
                    className="
                      group relative w-[400px] aspect-[4/3] rounded-lg overflow-hidden
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
                        htmlFor={`slideShowImgMD-${image.id}`}
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
                          id={`slideShowImgMD-${image.id}`}
                          name="slideShowImgMD"
                          data-image-type="MD"
                          data-variable-name="img_md"
                          data-id={image.id}
                          data-category-slug={image.alt}
                          onChange={handleChange}
                        />
                      </label>
                      <FluentZoomFit24Regular
                        className="
                          w-10 h-10 hover:bg-shade-v2 p-2
                          rounded-md active:opacity-80 cursor-pointer
                          transition-all duration-200 ease-out
                        "
                        role="button"
                        data-type="expand_image_button_is_clicked"
                        data-image-url={image.img_md}
                        onClick={handleClick}
                      />
                    </div>
                    <img 
                      src={image.img_md}
                      className="w-full aspect-[4/3] object-center object-cover"
                    />
                  </div>
                  : <label
                    className="
                      flex relative h-[300px] aspect-[4/3] rounded-lg overflow-hidden cursor-pointer
                    "
                    htmlFor={`slideShowImgMD-${image.id}`}
                  >
                    <input
                      className="
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%] w-0 h-0
                        unvisible opacity-0
                      "
                      type="file"
                      accept="image/*"
                      id={`slideShowImgMD-${image.id}`}
                      name="slideShowImgMD"
                      data-image-type="MD"
                      data-variable-name="img_md"
                      data-id={image.id}
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
                          4:3
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
                  px-6 py-4 text-sm text-body
                  transition-all duration-300 ease-in-out
                `}
              >
                {image.img_sm
                  ? <div
                    className="
                      group relative h-[300px] aspect-[3/4] rounded-lg overflow-hidden
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
                        htmlFor={`slideShowImgSM-${image.id}`}
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
                          id={`slideShowImgSM-${image.id}`}
                          name="slideShowImgSM"
                          data-image-type="SM"
                          data-variable-name="img_sm"
                          data-id={image.id}
                          onChange={handleChange}
                        />
                      </label>
                      <FluentZoomFit24Regular
                        className="
                          w-10 h-10 hover:bg-shade-v2 p-2
                          rounded-md active:opacity-80 cursor-pointer
                          transition-all duration-200 ease-out
                        "
                        role="button"
                        data-type="expand_image_button_is_clicked"
                        data-image-url={image.img_sm}
                        onClick={handleClick}
                      />
                    </div>
                    <img 
                      src={image.img_sm}
                      className="w-full aspect-[3/4] object-center object-cover"
                    />
                  </div>
                  : <label
                    className="
                      flex relative h-[300px] aspect-[3/4] rounded-lg overflow-hidden cursor-pointer
                    "
                    htmlFor={`slideShowImgSM-${image.id}`}
                  >
                    <input
                      className="
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%] w-0 h-0
                        unvisible opacity-0
                      "
                      type="file"
                      accept="image/*"
                      id={`slideShowImgSM-${image.id}`}
                      name="slideShowImgSM"
                      data-image-type="SM"
                      data-variable-name="img_sm"
                      data-id={image.id}
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
                          3:4
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
                <span
                  className="
                    text-body-light text-sm
                    transition-all duraiton-200 ease-in-out
                  "
                >
                  {image.alt || '--'}
                </span>
              </td>
              <td className="px-6">
                {image.url 
                  ? <Link
                    className="
                      text-content text-sm underline hover:text-heading
                      transition-all duraiton-200 ease-in-out
                    "
                    href={image.url}
                    target="_blank"
                  >
                    {image.url}
                  </Link>
                  : <span>
                    --
                  </span>
                }
              </td>
              <td className="px-6">
                <div 
                  className="flex gap-2"
                >
                  <button 
                    className={`${image.order === album.length ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                    data-type="down_arrow_button_is_clicked"
                    data-id={image.id}
                    data-order={image.order}
                    onClick={handleClick}
                  >
                    <EvaArrowUpFill 
                      className={`
                        w-7 h-7 p-1 text-heading rounded-md rotate-180
                        bg-background-light hover:bg-background-deep-light active:opacity-60
                        transition-all duration-200 ease-out
                      `}
                    />
                  </button>
                  <button 
                    className={`${image.order === 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                    data-type="up_arrow_button_is_clicked"
                    data-id={image.id}
                    data-order={image.order}
                    onClick={handleClick}
                  >
                    <EvaArrowUpFill 
                      className={`
                        w-7 h-7 p-1 text-heading rounded-md
                        bg-background-light hover:bg-background-deep-light active:opacity-60
                        transition-all duration-200 ease-out
                      `}
                    />
                  </button>
                  <button 
                    data-type="edit_slider_url_button_is_clicked"
                    data-id={image.id}
                    data-url={image.url}
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
                  <button 
                    data-type="edit_slider_alt_button_is_clicked"
                    data-id={image.id}
                    data-alt={image.alt}
                    onClick={handleClick}
                  >
                    <MdiImageEditOutline 
                      className={`
                        w-7 h-7 p-1 text-heading rounded-md cursor-pointer
                        bg-background-light hover:bg-background-deep-light active:opacity-60
                        transition-all duration-200 ease-out
                      `}
                    />
                  </button>
                  <button 
                    data-id={image.id}
                    data-type="delete_slider_button_is_clicked"
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
          )}
        </tbody>
      </table>
    </div> 
  );
}
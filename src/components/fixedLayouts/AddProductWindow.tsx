// HOOKS
import { useState, useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import RiAddLine from '@/components/svgs/RiAddLine';
import RiCheckFill from '@/components/svgs/RiCheckFill';
import LineMdImageFilled from '@/components/svgs/LineMdImageFilled';
import LineMdPlus from '@/components/svgs/LineMdPlus';
import MdiColor from '@/components/svgs/MdiColor';
import CarbonCategory from '@/components/svgs/CarbonCategory';
import LineMdTrash from '@/components/svgs/LineMdTrash';
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';

// STORES
import { 
  useTabNameStore, useLanguageStore, useAlertMessageStore,
  useAddProductWindowStore, useAddProductImgWindowStore, useProductDataStore
} from '@/stores/index';

// API
import editProduct from '@/lib/api/products/put';
import removeFile from '@/lib/api/object/delete';

// JSON
import colorsArray from '@/json/colors.json';
// import subCategories from '@/json/subCategories.json';
import subCategories from '@/json/subCategoriesV2.json';
import categories from '@/json/categories.json';

// UTILS
import getColor from '@/utils/getColor';
import createSlug from '@/utils/createSlug';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.avif";
const outfit1 = "/assets/img/outfit.webp"
const outfit2 = "assets/img/outfit-2.avif"
const outfit3 = "assets/img/outfit-3.avif"

export default function AddProductWindow () {

  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const addToggle = useAddProductWindowStore(state => state.toggle);
  const setAddToggle = useAddProductWindowStore(state => state.setToggle);
  const editTrigger = useAddProductWindowStore(state => state.trigger);
  const productData = useProductDataStore(state => state.productData);
  const setProductData = useProductDataStore(state => state.setProductData);

  const addImgToggle = useAddProductImgWindowStore(state => state.toggle);
  const setAddImgToggle = useAddProductImgWindowStore(state => state.setToggle);
  const setFilePath = useAddProductImgWindowStore(state => state.setFilePath);
  const setBucketName = useAddProductImgWindowStore(state => state.setBucketName);
  
  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);
  const displayAlert = (message: any, type: string) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertToggle(Date.now());
  };

  const [ isMutating, setIsMutating ] = useState<boolean>(false);
  const [ isRemoveImgMutating, setIsRemoveImgMutating ] = useState<boolean>(false);
  const [ removedImagesFilePathArray, setRemovedImagesFilePathArray ] = useState<any[]>([]);

  const nameEnInptRef = useRef<HTMLInputElement>(null);
  const nameArInptRef = useRef<HTMLInputElement>(null);
  const descriptionEnInptRef = useRef<HTMLInputElement>(null);
  const descriptionArInptRef = useRef<HTMLInputElement>(null);

  const sizeXSInptRef = useRef<(HTMLInputElement | null)>(null);
  const sizeSInptRef = useRef<(HTMLInputElement | null)>(null);
  const sizeMInptRef = useRef<(HTMLInputElement | null)>(null);
  const sizeLInptRef = useRef<(HTMLInputElement | null)>(null);
  const sizeXLInptRef = useRef<(HTMLInputElement | null)>(null);
  
  const priceInptRef = useRef<(HTMLInputElement | null)>(null);
  const discountInptRef = useRef<(HTMLInputElement | null)>(null);

  const newInptRef = useRef<(HTMLInputElement | null)>(null);

  const stateAvailableInptRef = useRef<(HTMLInputElement | null)>(null);
  const statetOutOfStockInptRef = useRef<(HTMLInputElement | null)>(null);
  const stateHiddenInptRef = useRef<(HTMLInputElement | null)>(null);

  const typeInptRefs = useRef<any[]>([]);

  const categoriesInptRefs = useRef<any[]>([]);

  useEffect(() => {
    const setDefaultValues = () => {
      // Images (reset to default)
      setRemovedImagesFilePathArray([]);

      // Name And Description
      if (nameEnInptRef.current) 
        nameEnInptRef.current.value = productData?.name.en;
      if (nameArInptRef.current) 
        nameArInptRef.current.value = productData?.name.ar;
      if (descriptionEnInptRef.current) 
        descriptionEnInptRef.current.value = productData?.description.en;
      if (descriptionArInptRef.current) 
        descriptionArInptRef.current.value = productData?.description.ar;

      // Sizes
      if (sizeXSInptRef.current)
        sizeXSInptRef.current.checked = productData?.sizes.includes("XS") ? true : false;
      if (sizeSInptRef.current) 
        sizeSInptRef.current.checked = productData?.sizes.includes("S") ? true : false;
      if (sizeMInptRef.current) 
        sizeMInptRef.current.checked = productData?.sizes.includes("M") ? true : false;
      if (sizeLInptRef.current) 
        sizeLInptRef.current.checked = productData?.sizes.includes("L") ? true : false;
      if (sizeXLInptRef.current) 
        sizeXLInptRef.current.checked = productData?.sizes.includes("XL") ? true : false;

      // Price and Discount
      if (priceInptRef.current) 
        priceInptRef.current.value = String(productData?.price);
      if (discountInptRef.current) 
        discountInptRef.current.value = String(productData?.discount_percent);

      // New
      if (newInptRef.current) 
        newInptRef.current.checked = productData?.is_new;

      // State
      const state = productData?.state;
      if (stateAvailableInptRef.current) 
        stateAvailableInptRef.current.checked = state === "available" ? true : false;
      if (statetOutOfStockInptRef.current) 
        statetOutOfStockInptRef.current.checked = state === "out-of-stock" ? true : false;
      if (stateHiddenInptRef.current) 
        stateHiddenInptRef.current.checked = state === "hidden" ? true : false;

      // Type
        const checkedRef = typeInptRefs.current.find(el => el.dataset.type === productData?.type)
        if (checkedRef) {
          checkedRef.checked = true;
        } else {
          typeInptRefs.current.forEach(el => el.checked = false);
        };

      // Categories
      if (categoriesInptRefs.current) 
        console.log('categories el: ', categoriesInptRefs.current);
        categoriesInptRefs.current
          .forEach(el => (el.checked = productData?.categories.includes(el.dataset.path) ? true : false));
    }
    // return;
    if (!productData) return;
    setDefaultValues();
  }, [productData]);

  const filterDeletedImages = (url: string, color:string) => {
    let images = [ ...productData?.images ]
    const imageIndex = images.findIndex(image => image.color === color);
    const views = images[imageIndex].views.filter((view: any) => view.url !== url)
    images[imageIndex] = { ...images[imageIndex], views };
    if (images[imageIndex].views.length === 0) images = images.filter(image => image.color !== color);
    const colors = images.map(image => image.color);

    return { images, colors };
  };

  const editProductMutation = useMutation({
    mutationFn: editProduct,
    onSettled: () => {
      setIsMutating(false);
    },
    onMutate: () => {
      setIsMutating(true);
    },
    onSuccess: (result) => {
      const { message, data: updatedProductData } = result
      console.log('product Data success results: ', result);
      displayAlert(message[isEn ? 'en' : 'ar'], "success");
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setProductData(updatedProductData);
      setAddToggle(false);
    },
    onError: (data) => {
      displayAlert(data.message, "error");
    }
  })

  const removeFileFromStorageMutation = useMutation({
    mutationFn: removeFile,
  })
  
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { type, bucketName, url, color } = e.currentTarget.dataset;

    switch (type) {
      case 'fixed_window_is_clicked':
        setAddToggle(false);
        break;
      case 'fixed_box_is_clicked':
        break;
      case 'add_new_image_button_is_clicked':
        setAddImgToggle(true);
        break;
      case 'delete_product_image_button_is_clicked':
        if (url && color) {
          const { images, colors} = filterDeletedImages(url, color);
          setProductData({ ...productData, images, colors });
          setRemovedImagesFilePathArray(val => ([ ...val, url ]));
        }
        break;
      case 'accept_button_is_clicked':
        editProductMutation.mutate(productData);
        const bucketName = "assets";

        removeFileFromStorageMutation.mutate({
          bucketName,
          filePath: removedImagesFilePathArray,
        });
        break;
      case 'cancel_button_is_clicked':
        setAddToggle(false);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.currentTarget;
    const { info } = e.currentTarget.dataset;

    switch(name) {
      case'nameEn':
        setProductData({ 
          ...productData, name: {en: value, ar: productData?.name.ar}, slug: createSlug(value) 
        });
        break;
      case'nameAr':
        setProductData({ 
          ...productData, name: {en: productData?.name.en, ar: value} 
        });
        break;
      case'descriptionEn':
        setProductData({ 
          ...productData, description: {en: value, ar: productData?.description.ar} 
        });
        break;
      case'descriptionAr':
        setProductData({ 
          ...productData, description: {en: productData?.description.en, ar: value }
        });
        break;
      case'sizes':
      case'categories':
        const removeDuplicates = (arr: any[]) => [ ...new Set(arr) ]; 
        const array = removeDuplicates(productData[name]);
        if (checked) return setProductData({ 
          ...productData, [name]: [ ...array, info ] 
        });
        setProductData({ ...productData, [name]: array.filter((name: string) => name !== info ) });
        break;
      case 'price':
      case 'discount_percent':
        setProductData({ ...productData, [name]: Number(value) });
        break;
      case 'is_new':
        setProductData({ ...productData, [name]: checked });
        break;
      case 'state':
        setProductData({ ...productData, [name]: info });
      case 'type':
        const categoriesArray = [ ...productData?.categories ];
        const categoriesFiltered = categoriesArray.filter(val => !val.includes('clothing'));
        setProductData({ 
          ...productData, [name]: info , categories: [ ...categoriesFiltered, `clothing/${info}` ]
        });

        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  // DEBUG & UI
  // console.log('productData: ', productData);
  console.log('addToggle: ', addToggle);
  console.log('productData: ', productData);
  console.log('productData: ', productData);
  console.log('removedImagesFilePathArray: ', removedImagesFilePathArray);
  // console.log('subCategory: ', subCategories.filter(subCategory => subCategory.parent_category_slug !== 'clothing').map((subCategory, index) => ({ ...subCategory, index })))
  
  return (
    <div
      className={`
        fixed top-0 left-0
        w-full h-full
        bg-[var(--shade-color)] z-[1000]
        transition-all duration-200 ease-out
        ${addToggle ? 'visible opacity-100 backdrop-blur-[3px]' : 'invisible opacity-0 backdrop-blur-[0px]'}
      `}
      data-type="fixed_window_is_clicked"
      onClick={handleClick}
    >
      <div
        className={`
          absolute top-1/2 left-1/2
          translate-x-[-50%] translate-y-[-50%]
          h-[calc(100%-2rem)] rounded-lg overflow-y-auto
          bg-background overflow-hidden
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${addToggle ? 'scale-100 opacity-100' : 'scale-[0.8] opacity-0'}
        `}
        data-type="fixed_box_is_clicked"
        onClick={handleClick}
      >
        <section
          className="
            flex text-body-light justify-center py-4 font-bold
          "
        >
          <h2>
            {isEn ? 'ADD NEW PRODUCT' : 'اضف منتج جديد'}
          </h2>
        </section>
        <hr className="px-2 border-inbetween"/>
        <section
          className="flex flex-col gap-4 items-center py-4"
        >
          <ul
            className="flex gap-4 w-[516px] overflow-x-scroll mx-auto"
          >
            {productData?.images.map((image: any, i: number) => 
              image.views.map((view: Record<string, string>, viewIndex: number) =>
                <li
                  key={`${i}-${viewIndex}`}
                  className="
                    flex flex-row gap-4 shrink-0
                  "
                >
                  <div
                    className="
                      relative shrink-0 w-[200px] h-[300px] rounded-md overflow-hidden
                    "
                  >
                  <div
                    className="
                      group absolute top-0 left-0
                      flex items-center justify-center
                      w-full h-full hover:bg-shade z-[15]
                      transition-all duration-300 ease-in-out
                    "
                  >
                    <button
                      className="
                        relative flex items-center gap-2 p-2 rounded-md
                        invisible group-hover:visible opacity-0 group-hover:opacity-100 hover:bg-shade-v2
                        transition-all duration-300 ease-in-out
                      "
                      data-color={image.color}
                      data-bucket-name="assets"
                      data-url={view.url}
                      data-type="delete_product_image_button_is_clicked"
                      onClick={handleClick}
                    >
                      <LineMdTrash 
                        className={`
                          text-heading-invert 
                          ${isRemoveImgMutating ? 'opacity-0' : 'opacity-100'}
                        `} />
                      <span
                        className={`
                          font-bold text-heading-invert
                          ${isRemoveImgMutating ? 'opacity-0' : 'opacity-100'}
                        `}
                      >
                        {isEn ? 'DELETE' : 'مسح'}
                      </span>
                      <SvgSpinnersRingResize 
                        className={`
                          absolute top-1/2 left-1/2
                          translate-x-[-50%] translate-y-[-50%]
                          text-heading-invert
                          ${isRemoveImgMutating ? 'opacity-100' : 'opacity-0'}
                        `}
                      />
                    </button>
                  </div>
                    <img 
                      src={view.url}
                      className="
                        w-full h-full object-cover object-center rounded-md
                      "
                    />
                    <div
                      className="
                        absolute flex flex-col gap-2 bottom-2 left-2 z-[10]
                      "
                    >
                      <div
                        className="
                          flex items-center justify-evenly bg-shade 
                          rounded-full w-[50px] h-[25px] 
                          border border-solid border-background border-[2px] overflow-hidden
                        "
                      >
                        <MdiColor className="text-heading-invert w-5 h-5" />
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: getColor(colorsArray, image.color).hex }}
                        />
                      </div>
                      <div
                        className="
                          flex items-center justify-evenly bg-shade 
                          rounded-full w-[50px] h-[25px]
                          border border-solid border-background border-[2px] overflow-hidden
                        "
                      >
                        <LineMdImageFilled className="text-heading-invert w-5 h-5" />
                        <div 
                          className="
                            rounded-full text-sm font-bold text-center text-heading-invert
                          ">
                          {view.tag.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            )}
            <li
              className="
                flex flex-col shrink-0 items-center justify-center 
                w-[200px] h-[300px] rounded-md bg-background-light cursor-pointer
                border border-dashed border-inbetween border-[2px]
              "
              role="button"
              data-type="add_new_image_button_is_clicked"
              onClick={handleClick}
            >
              <LineMdImageFilled 
                className="text-inbetween w-6 h-6"
              />
              <span
                className="text-inbetween text-sm font-bold"
              >
                {isEn ? 'Add New Image' : 'اضف صوره جديده'}
              </span>
              <LineMdPlus
                className="text-inbetween w-7 h-7 py-1"
              />
            </li>
          </ul>
        </section>
        <section
          className="
            flex flex-col gap-2 w-full h-auto p-2
          "
        >
          <label
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="add_nameEn"
          >
            <h3 className="text-body font-bold ml-auto">
              {isEn ? 'NAME' : 'الاسم'}
            </h3>
            <h4 className="px-1 bg-heading text-heading-invert text-sm font-bold rounded-md">
              EN
            </h4>
            <input 
              className="p-2 text-heading rounded-lg"
              type="text"
              id="add_nameEn"
              name="nameEn"
              onChange={handleChange}
              ref={nameEnInptRef}
            />
            <h4 className="px-1 bg-heading text-heading-invert text-sm font-bold rounded-md">
              AR
            </h4>
            <input 
              className="p-2 text-heading rounded-lg"
              type="text"
              id="add_nameAr"
              name="nameAr"
              onChange={handleChange}
              ref={nameArInptRef}
            />
          </label>
          <label
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="add_descritpionEn"
          >
            <h3 className="text-body font-bold ml-auto">
              {isEn ? 'DESCRIPTION' : 'الوصف'}
            </h3>
            <h4 className="px-1 bg-heading text-heading-invert text-sm font-bold rounded-md">
              EN
            </h4>
            <input 
              className="p-2 text-heading rounded-lg"
              type="text"
              id="add_descritpionEn"
              name="descriptionEn"
              onChange={handleChange}
              ref={descriptionEnInptRef}
            />
            <h4 className="px-1 bg-heading text-heading-invert text-sm font-bold rounded-md">
              AR
            </h4>
            <input 
              className="p-2 text-heading rounded-lg"
              type="text"
              id="add_descriptionAr"
              name="descriptionAr"
              onChange={handleChange}
              ref={descriptionArInptRef}
            />
          </label>
          <div
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
          >
            <h3 className="text-body font-bold">
              {isEn ? 'SIZES' : 'المقاسات'}
            </h3>
            <form
              className={`
                flex gap-4 
                ${isEn ? 'ml-auto' : 'mr-auto'}
              `}
            >
              <label
                className="
                  peer-checked:bg-green-500 relative flex gap-2 items-center 
                  border border-inbetween px-2 py-1 
                  rounded-lg bg-background overflow-hidden cursor-pointer
                "
                htmlFor="add_sizeXSmall"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="add_sizeXSmall"
                  name="sizes"
                  data-info="XS"
                  onChange={handleChange}
                  ref={sizeXSInptRef}
                />{' '}
                <h4
                  className="
                    peer-checked:text-heading text-body text-sm font-bold z-[5]
                    transition-all duration-300 ease-in-out
                    "
                >
                  XS
                </h4>
                <RiAddLine
                  className={`
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <RiCheckFill
                  className={`
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-green-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
              <label
                className="
                  peer-checked:bg-green-500 relative flex gap-2 items-center 
                  border border-inbetween px-2 py-1 
                  rounded-lg bg-background overflow-hidden cursor-pointer
                "
                htmlFor="add_sizeSmall"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="add_sizeSmall"
                  name="sizes"
                  data-info="S"
                  onChange={handleChange}
                  ref={sizeSInptRef}
                />{' '}
                <h4
                  className="
                    peer-checked:text-heading text-body text-sm font-bold z-[5]
                    transition-all duration-300 ease-in-out
                    "
                >
                  S
                </h4>
                <RiAddLine
                  className={`
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <RiCheckFill
                  className={`
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-green-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
              <label
                className="
                  peer-checked:bg-green-500 relative flex gap-2 items-center 
                  border border-inbetween px-2 py-1 
                  rounded-lg bg-background overflow-hidden cursor-pointer
                "
                htmlFor="add_sizeMedium"
                >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="add_sizeMedium"
                  name="sizes"
                  data-info="M"
                  onChange={handleChange}
                  ref={sizeMInptRef}
                />{' '}
                <h4
                  className="
                    peer-checked:text-heading text-body text-sm font-bold z-[5]
                    transition-all duration-300 ease-in-out
                    "
                >
                  M
                </h4>
                <RiAddLine
                  className={`
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <RiCheckFill
                  className={`
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-green-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
              <label
                className="
                  peer-checked:bg-green-500 relative flex gap-2 items-center 
                  border border-inbetween px-2 py-1 
                  rounded-lg bg-background overflow-hidden cursor-pointer
                "
                htmlFor="add_sizeLarge"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="add_sizeLarge"
                  name="sizes"
                  data-info="L"
                  onChange={handleChange}
                  ref={sizeLInptRef}
                />{' '}
                <h4
                  className="
                    peer-checked:text-heading text-body text-sm font-bold z-[5]
                    transition-all duration-300 ease-in-out
                    "
                >
                  L
                </h4>
                <RiAddLine
                  className={`
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <RiCheckFill
                  className={`
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-green-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
              <label
                className="
                  peer-checked:bg-green-500 relative flex gap-2 items-center 
                  border border-inbetween px-2 py-1 
                  rounded-lg bg-background overflow-hidden cursor-pointer
                "
                htmlFor="add_sizeExtraLarge"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="add_sizeExtraLarge"
                  name="sizes"
                  data-info="XL"
                  onChange={handleChange}
                  ref={sizeXLInptRef}
                />{' '}
                <h4
                  className="
                    peer-checked:text-heading text-body text-sm font-bold z-[5]
                    transition-all duration-300 ease-in-out
                    "
                >
                  XL
                </h4>
                <RiAddLine
                  className={`
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <RiCheckFill
                  className={`
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-green-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
              <label
                className="
                  peer-checked:bg-green-500 relative flex gap-2 items-center 
                  border border-inbetween px-2 py-1 
                  rounded-lg bg-background overflow-hidden cursor-pointer
                "
                htmlFor="add_sizeDoubleExtraLarge"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="add_sizeDoubleExtraLarge"
                  name="sizes"
                  data-info="2XL"
                  onChange={handleChange}
                  ref={sizeXLInptRef}
                />{' '}
                <h4
                  className="
                    peer-checked:text-heading text-body text-sm font-bold z-[5]
                    transition-all duration-300 ease-in-out
                    "
                >
                  2XL
                </h4>
                <RiAddLine
                  className={`
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <RiCheckFill
                  className={`
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-green-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
            </form>  
          </div>
          <div
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
          >
            <h3 className="text-body font-bold">
              {isEn ? 'COLORS' : 'الالوان'}
            </h3>
              <ul
                className={`
                  flex items-center gap-2 py-2
                  ${isEn ? 'ml-auto' : 'mr-auto'}
                `}
              >
                {productData?.colors.length >= 1 
                  && productData?.colors.map((color: string, i: number) => 
                    <li
                      key={i}
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: getColor(colorsArray, color).hex }}
                    />  
                )}
              </ul>
          </div>
          <label
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="add_price"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'PRICE' : 'السعر'}
            </h3>
            <input
              className={`
                flex items-center gap-2 p-2 rounded-lg w-20
                ${isEn ? 'ml-auto' : 'mr-auto'}
              `}
              type="text"
              name="price"
              id="add_price"
              onChange={handleChange}
              ref={priceInptRef}
            />
          </label>
          <label
            className="
              flex gap-2 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="add_discount_percent"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'DISCOUNT' : 'التخفيض'}
            </h3>
            <input
              className={`
                flex items-center gap-2 p-2 rounded-lg w-10 text-center\
                ${isEn ? 'ml-auto' : 'mr-auto'}
              `}
              type="text"
              name="discount_percent"
              id="add_discount_percent"
              onChange={handleChange}
              ref={discountInptRef}
            />
            <span className="text-heading font-bold">%</span>
          </label>
          <div
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
          >
            <h3 className="text-body font-bold">
              {isEn ? 'NEW' : 'جديد'}
            </h3>
            <label
              className={`
                relative w-10 h-5 
                rounded-full overflow-hidden border border-inbetween
                bg-green-500 cursor-pointer
                ${isEn ? 'ml-auto' : 'mr-auto'}
              `}
              htmlFor="add_new"
            >
              <input
                className="
                  peer invisible flex items-center gap-2 p-2 ml-auto rounded-lg w-10 text-center
                "
                type="checkbox"
                name="is_new"
                id="add_new"
                onChange={handleChange}
                ref={newInptRef}
              />
              <div
                className={`
                  absolute top-1/2  
                  translate-y-[-50%] w-4 h-4 aspect-1/1 
                  bg-background rounded-full border border-background-light z-[5]
                  transition-all duration-300 ease-in-out
                  ${isEn 
                    ? 'left-[2px] peer-checked:left-[calc(100%-18px)]' 
                    : 'right-[2px] peer-checked:right-[calc(100%-18px)]'
                  }
                `}
              />
              <div
                className="
                  absolute top-0 left-0   
                  w-full h-full aspect-1/1 peer-checked:bg-green-500 bg-inbetween
                  transition-all duration-300 ease-in-out
                "
              />
            </label>
          </div>
          <div
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
          >
            <h3 className="text-body font-bold">
              {isEn ? 'STATE' : 'الحاله'}
            </h3>
            <form
              className={`
                flex gap-4
                ${isEn ? 'ml-auto' : 'mr-auto'}
              `}
            >
              <label
                className={`
                  relative flex gap-2 items-center 
                  border border-inbetween px-2 py-1 
                  rounded-lg bg-background overflow-hidden cursor-pointer
                  ${isEn ? 'order-1' : 'order-3'}
                `}
                htmlFor="add_stateAvailable"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="radio"
                  id="add_stateAvailable"
                  name="state"
                  data-info="available"
                  onChange={handleChange}
                  ref={stateAvailableInptRef}
                />{' '}
                <h4
                  className="
                    peer-checked:text-heading text-body text-sm font-bold z-[5]
                    transition-all duration-300 ease-in-out
                  "
                >
                  {isEn ? 'available' : 'متاح'}
                </h4>
                <RiAddLine
                  className={`
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <RiCheckFill
                  className={`
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-green-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
              <label
                className={`
                  relative flex gap-2 items-center 
                  border border-inbetween px-2 py-1 
                  rounded-lg bg-background overflow-hidden cursor-pointer
                  ${isEn ? 'order-2' : 'order-2'}
                `}
                htmlFor="add_stateOutOfStock"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="radio"
                  id="add_stateOutOfStock"
                  name="state"
                  data-info="out-of-stock"
                  onChange={handleChange}
                  ref={statetOutOfStockInptRef}
                />{' '}
                <h4
                  className="
                    peer-checked:text-heading text-body text-sm font-bold z-[5]
                    transition-all duration-300 ease-in-out
                  "
                >
                  {isEn ? 'out of stock' : 'غير متوفر'}
                </h4>
                <RiAddLine
                  className={`
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <RiCheckFill
                  className={`
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-yellow-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
              <label
                className={`
                  relative flex gap-2 items-center 
                  border border-inbetween px-2 py-1 
                  rounded-lg bg-background overflow-hidden cursor-pointer
                  ${isEn ? 'order-3' : 'order-1'}
                `}
                htmlFor="add_stateHidden"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="radio"
                  id="add_stateHidden"
                  name="state"
                  data-info="hidden"
                  onChange={handleChange}
                  ref={stateHiddenInptRef}
                />{' '}
                <h4
                  className="
                    peer-checked:text-heading text-body text-sm font-bold z-[5]
                    transition-all duration-300 ease-in-out
                  "
                >
                  {isEn ? 'hidden' : 'مخفي'}
                </h4>
                <RiAddLine
                  className={`
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <RiCheckFill
                  className={`
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-red-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
            </form>
          </div>
          <div
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
          >
            <h3 className="w-[300px] text-body font-bold">
              {isEn ? 'TYPE' : 'الصنف'}
            </h3>
            <form
              className="flex flex-wrap justify-end gap-4 ml-auto"
            >
              {subCategories
                .filter(subCategory => subCategory.parent_category_slug === 'clothing')
                .map((category, i) =>
                <label
                  key={i}
                  className="
                    relative flex gap-2 items-center 
                    border border-inbetween px-2 py-1 
                    rounded-lg bg-background overflow-hidden cursor-pointer
                  "
                  htmlFor={'add_' + category.path}
                >
                  <input
                    className="peer invisible text-heading rounded-lg" 
                    type="radio"
                    id={'add_' + category.path}
                    name="type"
                    data-type={category.slug}
                    data-info={category.slug}
                    onChange={handleChange}
                    ref={(el: any) => typeInptRefs.current[i] = el}
                  />{' '}
                  <h4
                    className="
                      peer-checked:text-heading text-body text-sm font-bold z-[5]
                      transition-all duration-300 ease-in-out
                    "
                  >
                    {category.name[isEn ? 'en' : 'ar']}
                  </h4>
                  <RiAddLine
                    className={`
                      peer-checked:invisible visible
                      peer-checked:opacity-0 opacity-100 
                      absolute w-4 h-4 text-body z-[5]
                      transition-all duration-300 ease-in-out
                      ${isEn ? 'left-2' : 'right-2'}
                    `}
                  />
                  <RiCheckFill
                    className={`
                      peer-checked:visible invisible
                      peer-checked:opacity-100 opacity-0 
                      absolute w-4 h-4 text-heading z-[5]
                      transition-all duration-300 ease-in-out
                      ${isEn ? 'left-2' : 'right-2'}
                    `}
                  />
                  <div 
                    className="
                      peer-checked:visible invisible
                      peer-checked:opacity-100 opacity-0 
                      absolute top-0 left-0 w-full h-full
                      bg-green-400
                      transition-all duration-300 ease-in-out
                    "
                  />
                </label>
              )}             
            </form>
          </div>
          <div
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
          >
            <h3 className="w-auto text-body font-bold">
              {isEn ? 'CATEGORIES' : 'فئات'}
            </h3>
            <form
              className="flex flex-1 flex-wrap justify-end gap-4 ml-auto"
            >
              <ul
                className="flex flex-col gap-4"
              >
                {categories
                  .filter(category => category.slug !== 'clothing')
                  .map((category, i) =>
                  <li
                    key={i}
                    className="flex flex-col gap-4 bg-background p-4 rounded-lg border border-solid border-[2px] border-body-light-invert"
                  >
                    <div
                      className="flex items-center gap-2"
                    >
                      <CarbonCategory 
                        className="text-heading w-4"
                      />
                      <h3
                        className="text-lg text-heading font-bold"
                      >
                        {category.name[isEn ? 'en' : 'ar']}
                      </h3>
                    </div>
                    <ul
                      className="flex w-full gap-4"
                    >
                      {subCategories
                        .filter(subCategory => subCategory.parent_category_slug !== 'clothing')
                        .map((subCategory, index) => ({ index, ...subCategory }))
                        .filter(subCategory => subCategory.parent_category_slug === category.slug)
                        .map((subCategory, index) =>
                        <li
                          key={index}
                        >
                          <label
                            className="
                              relative flex gap-2 items-center 
                              border border-inbetween px-2 py-1 
                              rounded-lg bg-background overflow-hidden cursor-pointer
                            "
                            htmlFor={'add_' + subCategory.path}
                          >
                            <input
                              className="peer invisible text-heading rounded-lg" 
                              type="checkbox"
                              id={'add_' + subCategory.path}
                              name="categories"
                              data-info={subCategory.path}
                              data-path={subCategory.path}
                              onChange={handleChange}
                              ref={(el: any) => categoriesInptRefs.current[subCategory.index] = el}
                            />{' '}
                            <h4
                              className="
                                peer-checked:text-heading text-body text-sm font-bold z-[5]
                                transition-all duration-300 ease-in-out
                              "
                            >
                              {subCategory.name[isEn ? 'en' : 'ar']}
                            </h4>
                            <RiAddLine
                              className={`
                                peer-checked:invisible visible
                                peer-checked:opacity-0 opacity-100 
                                absolute w-4 h-4 text-body z-[5]
                                transition-all duration-300 ease-in-out
                                ${isEn ? 'left-2' : 'right-2'}
                              `}
                            />
                            <RiCheckFill
                              className={`
                                peer-checked:visible invisible
                                peer-checked:opacity-100 opacity-0 
                                absolute w-4 h-4 text-heading z-[5]
                                transition-all duration-300 ease-in-out
                                ${isEn ? 'left-2' : 'right-2'}
                              `}
                            />
                            <div 
                              className="
                                peer-checked:visible invisible
                                peer-checked:opacity-100 opacity-0 
                                absolute top-0 left-0 w-full h-full
                                bg-green-400
                                transition-all duration-300 ease-in-out
                              "
                            />
                          </label>
                        </li>
                      )}                                   
                    </ul>
                  </li>
                )}
              </ul>
            </form>
          </div>
        </section>
        <hr className="px-2 border-inbetween"/>
        <section
          className="
            relative flex w-full
          "
        >
          <div
            className="
              absolute top-1/2 left-1/2
              translate-x-[-50%] translate-y-[-50%]
              w-[1px] h-full bg-inbetween
            "
          />
          <button
            className="
              flex-1 text-heading p-1
              hover:bg-background-deep-light
              transition-all duration-300 ease-in-out
            "
            data-type="cancel_button_is_clicked"
            onClick={handleClick}
          >
            {isEn ? 'cancel' : 'تراجع'}
          </button>
          <button
            className="
              flex justify-center flex-1 text-content p-1 
              hover:bg-background-deep-light
              transition-all duration-300 ease-in-out
            "
            data-type="accept_button_is_clicked"
            onClick={handleClick}
          >
            {isMutating 
              ? <SvgSpinnersRingResize />
              : isEn 
              ? 'accept' 
              : 'قبول'
            }
          </button>
        </section>
      </div>
    </div>
  )
}
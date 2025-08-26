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
  useEditProductWindowStore, useAddProductImgWindowStore
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

export default function EditProductWindow () {

  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const editToggle = useEditProductWindowStore(state => state.toggle);
  const setEditToggle = useEditProductWindowStore(state => state.setToggle);
  const editTrigger = useEditProductWindowStore(state => state.trigger);
  const productData = useEditProductWindowStore(state => state.productData);
  const setProductData = useEditProductWindowStore(state => state.setProductData);

  const setAddToggle = useAddProductImgWindowStore(state => state.setToggle);
  
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
  const [ updatedData, setUpdatedData ] = useState<Record<any, any>>({test: 'asfd'});

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

  const filterDeletedImages = (url: string, color:string) => {
    let images = [ ...updatedData?.images ]
    const imageIndex = images.findIndex(image => image.color === color);
    const views = images[imageIndex].views.filter((view: any) => view.url !== url)
    images[imageIndex] = { ...images[imageIndex], views };
    if (images[imageIndex].views.length === 0) images = images.filter(image => image.color !== color);
    const colors = images.map(image => image.color);

    return { images, colors };
  };

  // const productData1 = {
  const productData1 = {
    id: 3,
    name: { en: "Blossom Sweater", ar: "سترة بلوسوم" },
    slug: "bolssom-sweater",
    description: { "en": "Cozy Floral-Embroidered Relaxed Sweater", "ar": "كنزة مريحة مطرزة بزهور" },
    type: "t-shirts",
    categories: ["clothing/outfit-pairs", "sale/latest-arrivals", "sale/hot-deals", "event/ramadan-nights"],
    is_new: true,
    state: "available",
    sizes: ["M", "L"],
    colors: ["White", "Black"],
    images: [
      {
        main: "/assets/img/cloth-c-white.avif",
        second: "/assets/img/cloth-c-white-view-b.avif",
        color: "White"
      },{
        main: "/assets/img/cloth-c-black.avif",
        second: "/assets/img/cloth-c-black-view-b.avif",
        color: "Black"
      }
    ],
    stock: {
      XS: { "emerald": 5, "black": 3 },
      S: { "emerald": 10, "black": 8 },
      M: { "emerald": 7, "black": 6 },
      L: { "emerald": 4, "black": 2 }
    },
    price: 45000,
    discount_percent: 45,
    lists: [
      {
        title: {"en": "PRODUCT DETAILS", "ar": "تفاصيل عن القطعه"},
        descriptionLists: {
          en: [
            "Brand: Ranoura",
            "Material: Fabric",
            "Fit: Tight to boy",
            "NeckLine: None",
            "Sleeves: Yes",
            "Design: Italic"
          ],
          ar: [
            "العلامة التجارية: رانورا",
            "المادة: قماش",
            "المقاس: ضيق على الجسم",
            "خط العنق: لا يوجد",
            "الأكمام: نعم",
            "التصميم: مائل"
          ]
        }
      },{
        title: {en: "SIZE INFO", ar: "معلومات عن المقاسات"},
        descriptionLists: {
          en: [
            "True to size",
            "XXS: 0",
            "XS: 0-2",
            "MD: 2-4",
            "LG: 4-6",
            "XL: 6-9"
          ],
          ar: [
            "True to size",
            "XXS: 0",
            "XS: 0-2",
            "MD: 2-4",
            "LG: 4-6",
            "XL: 6-9"
          ]
        }
      },{
        title: {"en": "ABOUT RANOURA✧･ﾟ*", "ar": "حول رانورا*ﾟ･✧"},
        descriptionLists: {
          en: [
            "Welcome to Ranoura – where elegance meets excellence. At Ranoura, we pride ourselves on crafting garments from the finest high-end fabrics, designed for those who appreciate quality, style, and sophistication. Each piece is meticulously tailored to provide a perfect blend of comfort and luxury, ensuring you feel confident and radiant in every moment. Discover timeless designs and impeccable craftsmanship that redefine fashion, only at Ranoura."
          ],
          ar: [
            "مرحبًا بكم في رانورا – حيث تلتقي الأناقة بالتميز. في رانورا، نفخر بصناعة الملابس من أجود الأقمشة الفاخرة، مصممة لأولئك الذين يقدرون الجودة والأناقة والرقي. كل قطعة مصممة بعناية فائقة لتوفر مزيجًا مثاليًا من الراحة والفخامة، مما يضمن شعورك بالثقة والإشراق في كل لحظة. اكتشف التصاميم الخالدة والحرفية اللا مثيل لها التي تعيد تعريف الموضة، فقط في رانورا."
          ]
        }
      },{
        title: {"en": "DELIVERY", "ar": "التوصيل"},
        descriptionLists: {
          en: [
            "Get your favorite Ranoura pieces delivered straight to your doorstep! Enjoy fast and reliable shipping with options for standard delivery (three to five business days) or express delivery (one to two business days) for those last-minute style needs. We carefully package every item to ensure it arrives in perfect condition, ready to shine in your wardrobe."
          ],
          ar: [
            "احصل على قطع رانورا المفضلة لديك ويتم توصيلها مباشرة إلى عتبة بابك! استمتع بالشحن السريع والموثوق مع خيارات التوصيل القياسي (من ثلاثة إلى خمسة أيام عمل) أو التوصيل السريع (من يوم إلى يومين عمل) لتلبية احتياجات الأناقة في اللحظة الأخيرة. نحن نعبئ كل قطعة بعناية لضمان وصولها في حالة مثالية، جاهزة للتألق في خزانة ملابسك."
          ]
        }
      },{
        title: {"en": "RETURNS", "ar": "المرجوعات"},
        descriptionLists: {
          en: [
            "At Ranoura, your satisfaction is our priority. If something isn't quite right, you can easily return it within fourteen days of receiving your order. Items must be unworn, unwashed, and with original tags attached. Simply follow our hassle-free returns process, and we'll ensure you get a refund or exchange as quickly as possible."
          ], 
          ar: [
            "في رانورا، رضاكم هو أولويتنا. إذا كان هناك شيء غير مناسب تمامًا، يمكنكم إرجاعه بسهولة خلال أربعة عشر يومًا من استلام طلبكم. يجب أن تكون الأغراض غير ملبوسة وغير مغسولة ومع العلامات الأصلية مرفقة. ما عليكم سوى اتباع عملية الإرجاع السهلة لدينا، وسنضمن حصولكم على استرداد أو استبدال في أسرع وقت ممكن."
          ]
        }  
      }
    ]
  }

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
    setUpdatedData(productData);
  }, [productData, editTrigger]);

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
      setEditToggle(false);
    },
    onError: (data) => {
      displayAlert(data.message, "error");
    }
  })

  const removeFileFromStorageMutation = useMutation({
    mutationFn: removeFile,
  })
  
  const addIsProcessingNote = () => {
    setAlertToggle(Date.now());
    setAlertType("warning");
    setAlertMessage(isEn ? 'Please wait until the operation is finished' : 'الرجاء الانتظار حتى انتهاء من العمليه');
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { type, bucketName, url, color } = e.currentTarget.dataset;

    switch (type) {
      case 'fixed_window_is_clicked':
        setEditToggle(false);
        break;
      case 'fixed_box_is_clicked':
        break;
      case 'add_new_image_button_is_clicked':
        setAddToggle(true);
        break;
      case 'delete_product_image_button_is_clicked':
        if (url && color) {
          const { images, colors} = filterDeletedImages(url, color);
          setUpdatedData(val => ({ ...val, images, colors }));
          setRemovedImagesFilePathArray(val => ([ ...val, url ]));
        }
        break;
      case 'accept_button_is_clicked':
        if (isMutating) return addIsProcessingNote();
    
        editProductMutation.mutate(updatedData);
        const bucketName = "assets";

        removeFileFromStorageMutation.mutate({
          bucketName,
          filePath: removedImagesFilePathArray,
        });
        break;
      case 'cancel_button_is_clicked':
        if (isMutating) {
          setAlertToggle(Date.now());
          setAlertType("warning");
          setAlertMessage(isEn ? 'Please wait until the operation is finished' : 'الرجاء الانتظار حتى انتهاء من العمليه');
          return;
        };
        setEditToggle(false);
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
        setUpdatedData(val => ({ 
          ...val, name: {en: value, ar: val.name.ar}, slug: createSlug(value) 
        }));
        break;
      case'nameAr':
        setUpdatedData(val => ({ 
          ...val, name: {en: val.name.en, ar: value} 
        }));
        break;
      case'descriptionEn':
        setUpdatedData(val => ({ 
          ...val, description: {en: value, ar: val.description.ar} 
        }));
        break;
      case'descriptionAr':
        setUpdatedData(val => ({ 
          ...val, description: {en: val.description.en, ar: value }
        }));
        break;
      case'sizes':
      case'categories':
        const removeDuplicates = (arr: any[]) => [ ...new Set(arr) ]; 
        const array = removeDuplicates(updatedData[name]);
        if (checked) return setUpdatedData(val => ({ 
          ...val, [name]: [ ...array, info ] 
        }));
        setUpdatedData(val => ({ ...val, [name]: array.filter((name: string) => name !== info ) }));
        break;
      case 'price':
      case 'discount_percent':
        setUpdatedData(val => ({ ...val, [name]: Number(value) }));
        break;
      case 'is_new':
        setUpdatedData(val => ({ ...val, [name]: checked }));
        break;
      case 'state':
        setUpdatedData(val => ({ ...val, [name]: info }));
      case 'type':
        const categoriesArray = [ ...updatedData.categories ];
        const categoriesFiltered = categoriesArray.filter(val => !val.includes('clothing'));
        setUpdatedData(val => ({ 
          ...val, [name]: info , categories: [ ...categoriesFiltered, `clothing/${info}` ]
        }));
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  // DEBUG & UI
  // console.log('productData: ', productData);
  // console.log('updatedData: ', updatedData);
  // console.log('removedImagesFilePathArray: ', removedImagesFilePathArray);
  // console.log('subCategory: ', subCategories.filter(subCategory => subCategory.parent_category_slug !== 'clothing').map((subCategory, index) => ({ ...subCategory, index })))
  
  if (!productData) return;

  return (
    <div
      className={`
        fixed top-0 left-0
        w-full h-full
        bg-[var(--shade-color)] z-[1000]
        transition-all duration-200 ease-out
        ${editToggle ? 'visible opacity-100 backdrop-blur-[3px]' : 'invisible opacity-0 backdrop-blur-[0px]'}
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
          ${editToggle ? 'scale-100 opacity-100' : 'scale-[0.8] opacity-0'}
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
            {isEn ? 'EDIT PRODUCT' : 'تعديل المنتج'}
          </h2>
        </section>
        <hr className="px-2 border-inbetween"/>
        <section
          className="flex flex-col gap-4 items-center py-4"
        >
          <ul
            className="flex gap-4 w-[516px] overflow-x-scroll mx-auto"
          >
            {updatedData.images?.map((image: any, i: number) => 
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
            htmlFor="nameEn"
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
              id="nameEn"
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
              id="nameAr"
              name="nameAr"
              onChange={handleChange}
              ref={nameArInptRef}
            />
          </label>
          <label
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="descritpionEn"
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
              id="descriptionEn"
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
              id="descriptionAr"
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
                htmlFor="sizeXSmall"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="sizeXSmall"
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
                htmlFor="sizeSmall"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="sizeSmall"
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
                htmlFor="sizeMedium"
                >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="sizeMedium"
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
                htmlFor="sizeLarge"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="sizeLarge"
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
                htmlFor="sizeExtraLarge"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="sizeExtraLarge"
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
                htmlFor="sizeDoubleExtraLarge"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="sizeDoubleExtraLarge"
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
                {productData?.colors.map((color: string, i: number) => 
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
            htmlFor="price"
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
              id="price"
              onChange={handleChange}
              ref={priceInptRef}
            />
          </label>
          <label
            className="
              flex gap-2 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="discount_percent"
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
              id="discount_percent"
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
              htmlFor="new"
            >
              <input
                className="
                  peer invisible flex items-center gap-2 p-2 ml-auto rounded-lg w-10 text-center
                "
                type="checkbox"
                name="is_new"
                id="new"
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
                htmlFor="stateAvailable"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="radio"
                  id="stateAvailable"
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
                htmlFor="stateOutOfStock"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="radio"
                  id="stateOutOfStock"
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
                htmlFor="stateHidden"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="radio"
                  id="stateHidden"
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
                  htmlFor={category.path}
                >
                  <input
                    className="peer invisible text-heading rounded-lg" 
                    type="radio"
                    id={category.path}
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
                            htmlFor={subCategory.path}
                          >
                            <input
                              className="peer invisible text-heading rounded-lg" 
                              type="checkbox"
                              id={subCategory.path}
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
            className={`
              flex justify-center flex-1 text-content p-1 
              hover:bg-background-deep-light
              transition-all duration-300 ease-in-out
              ${isMutating ? 'cursor-progress' : 'cursor-pointer'}
            `}
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
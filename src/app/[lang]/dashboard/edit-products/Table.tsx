// HOOKS
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import ColorPallete from '@/components/ColorPallete';
import LoadingTable from '@/components/LoadingTable';
import ErrorLayout from '@/components/ErrorLayout';
import LineMdLink from '@/components/svgs/LineMdLink';
import TablerCopy from '@/components/svgs/TablerCopy';
import MaterialSymbolsCheckRounded from '@/components/svgs/MaterialSymbolsCheckRounded';
import SolarGalleryBold from '@/components/svgs/SolarGalleryBold';
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import SolarGalleryCheckBold from '@/components/svgs/SolarGalleryCheckBold';
import LineMdCloseCircleFilled from '@/components/svgs/LineMdCloseCircleFilled';
import LineMdEdit from '@/components/svgs/LineMdEdit';
import LineMdTrash from '@/components/svgs/LineMdTrash';
import LineMdChevronSmallRight from '@/components/svgs/LineMdChevronSmallRight';
import LineMdImageFilled from '@/components/svgs/LineMdImageFilled';
import MdiColor from '@/components/svgs/MdiColor';

// JSON
import urlsTable from '@/json/cmsTables/urlsTable.json';
import themePallets from '@/json/themePallets.json';
import messages from '@/json/messages.json';
import colorsArray from '@/json/colors.json';

// STORES
import { 
  useTabNameStore, useLanguageStore, 
  useAlertMessageStore, useEditProductWindowStore, 
  useAddProductWindowStore, useProductDataStore
} from '@/stores/index';

// API
import getThemeVars from '@/lib/api/themes/get';
import updateThemeVars from '@/lib/api/themes/put';

// UTILS
import updateThemeVariables from '@/utils/updateThemeVariables';
import getColor from '@/utils/getColor';

// LIB
import getMessage from '@/lib/messages/index';

import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

type Props = {
  products?: any[];
  isLoading?: boolean;
  isError?: boolean;
}

export default function Table({ products, isLoading = false, isError = false }: Props) {

  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const setEditProductWindowToggle = useEditProductWindowStore(state => state.setToggle);
  const setEditProductWindowTrigger = useEditProductWindowStore(state => state.setTrigger);
  const setEditProductWindowProductData = useEditProductWindowStore(state => state.setProductData);

  const setProductData = useProductDataStore(state => state.setProductData);

  const setAddToggle = useAddProductWindowStore(state => state.setToggle);
  const [ isThemeMutating, setIsThemeMutating ] = useState<{toggle: boolean, index: number}>({
    toggle: false, index: 0
  });
  
  const mainRef = useRef<HTMLDivElement>(null);
  const imgUlRefs = useRef<(HTMLUListElement | null)[]>([]);

  const getProduct = (id: string) => products?.find(product => product.id === id);

  const getStateColor = (state: string) => {
    switch (state) {
      case 'available':
        return 'oklch(79.2% 0.209 151.711)'
      case 'out-of-stock':
        return 'oklch(85.2% 0.199 91.936)';
      case 'hidden':
        return 'oklch(70.4% 0.191 22.216)';
      default:
        console.error('Unknown state: ', state);
        return 'oklch(70.4% 0.191 22.216)';
    }
  }

  useEffect(() => {
    const setImgLiElWidth = () => {
      imgUlRefs.current.forEach((el: any) => {{
        const fullWidth = el.scrollWidth;
        el.style.width = `${fullWidth}px`;
        console.log('fullWidth for UL: ', fullWidth);
      }})
    }

    setImgLiElWidth();
  }, [products]);

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

  const handleClick = async (e: React.MouseEvent<HTMLElement | SVGElement>) => {
    const { type, productId } = e.currentTarget.dataset;
      const fullWidth: number = mainRef.current?.scrollWidth || 0;

    switch (type) {
      case 'right_arrow_button_is_clicked':
        mainRef.current?.scrollTo({
          left: isEn ? fullWidth : 0,
          behavior:'smooth'
        })
        break;
      case 'left_arrow_button_is_clicked':
        mainRef.current?.scrollTo({
          left: isEn ? 0 : -1 * fullWidth,
          behavior:'smooth'
        })
        break;
      case 'add_product_button_is_clicked':
        setAddToggle(true);
        setProductData({
          name: { en: "", ar: "" },
          slug: "",
          description: { "en": "", "ar": "" },
          type: "",
          categories: [],
          is_new: false,
          state: "",
          sizes: [],
          colors: [],
          images: [],
          stock: {
            XS: { "emerald": 5, "black": 3 },
            S: { "emerald": 10, "black": 8 },
            M: { "emerald": 7, "black": 6 },
            L: { "emerald": 4, "black": 2 }
          },
          price: 0,
          discount_percent: 0,
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
        });
        break;
      case 'edit_product_button_is_clicked':
        setEditProductWindowToggle(true);
        if (productId) 
          setProductData(getProduct(productId));
          setEditProductWindowTrigger(Date.now());
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
    <div 
      className="relative flex flex-col gap-4 overflow-x-auto"
      ref={mainRef}
    >
      <div
        className={`
          sticky left-0 flex items-center justify-between
          ${isEn ? 'left-0' : 'right-0'}
        `}
      >
        <h3
          className="text-heading"
        >
          {isEn ? 'List' : 'القائمه'}
        </h3>
        <div
          className="flex items-center gap-4"
        >
          <button
            className="
              text-sm text-heading-invert font-bold 
              bg-content p-2 rounded-lg hover:opacity-80
              transition-all duration-300 ease-in-out
            "
            data-type="add_product_button_is_clicked"
            onClick={handleClick}
          >
            {isEn ? '+ ADD PRODUCT' : '+ اضف منتج'}
          </button>
          <LineMdChevronSmallRight 
            role="button"
            className={`
              border border-solid border-body border-px 
              text-body rounded-full rotate-180
              hover:opacity-70
              transition-all duration-200 ease-in-out
              ${isEn ? 'order-1' : 'order-2'}
            `}
            data-type="left_arrow_button_is_clicked"
            onClick={handleClick}
          />
          <LineMdChevronSmallRight 
            role="button"
            className={`
              border border-solid border-body border-px 
              text-body rounded-full
              hover:opacity-70
              transition-all duration-200 ease-in-out
              ${isEn ? 'order-2' : 'order-1'}
            `}
            data-type="right_arrow_button_is_clicked"
            onClick={handleClick}
          />
        </div>
      </div>
      <table
        className="
          min-w-full overflow-hidden 
          divide-y divide-underline bg-white rounded-lg whitespace-nowrap
        "
      >
        <thead className="text-body sicky top-0">
          <tr>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'NAME' : 'الاسم'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'ID' : 'الرمز'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'PRICE' : 'السعر'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'DISCOUNT' : 'التخفيض'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'COLORS' : 'الالوان'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'SIZES' : 'المقاسات'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'DESCRIPTION' : 'الوصف'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'IMAGES' : 'الصور'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'TYPE' : 'الصنف'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'CATEGORIES' : 'الفئات'}
            </th>
            <th scope="col" className={`px-6 py-3 font-medium ${isEn ? 'text-left' : 'text-right'} text-xs font-medium tracking-wider`}>
              {isEn ? 'OPTIONS' : 'الخيارات'}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-underline">
          {products?.map((itm, i) => 
            <tr 
              key={i}
              className={`
                transition-all duration-300 ease-in-out
                bg-transparent hover:bg-yellow-50
              `}
            >
              {/* <td className="px-6 py-4 text-heading">{itm.name[isEn ? 'en' : 'ar']}</td> */}
              <td 
                className={`
                  px-6 py-4 text-heading font-normal
                `}
              >
                <div
                  className="
                    flex flex-row items-center w-[300px] h-[150px] items-center gap-2
                  "
                >
                  <div
                    className="
                      group relative flex w-2 hover:w-8 h-[225px] rounded-md shrink-0
                      transition-all duration-300 ease-in-out
                    "
                    style={{ backgroundColor: getStateColor(itm.state) }}
                  >
                    <ul
                      className="
                        absolute top-1/2 left-1/2
                        translate-x-[-50%] translate-y-[-50%]
                        text-body font-bold text-center text-sm
                        unvisible group-hover:visible opacity-0 group-hover:opacity-100
                        transition-all delay-200 duration-300 ease-in-out
                      "
                    >
                      {Array.from(itm.state.replace(/~/g, ' ')).map((char: any, i) =>
                        <li key={i}>{char}</li>
                      )}
                    </ul>
                  </div>
                  <img 
                    src={itm.images[0].views[0].url}
                    className="
                      h-[225px] aspect-[2/3] shrink-0
                      object-cover object-center rounded-lg
                    "
                  />
                  <span
                    className="flex items-center shrink-0 h-[150px]"
                  >
                    {itm.name[isEn ? 'en' : 'ar']}
                  </span>
                </div>
              </td>
              <td 
                className={`
                  px-6 py-4 text-sm text-body
                  transition-all duration-300 ease-in-out
                `}
              >
                <span
                  className="
                    flex items-center h-[150px] 
                  "
                >
                  {itm?.id}
                </span>
              </td>
              <td 
                className={`
                  px-6 py-4 text-sm text-body
                  transition-all duration-300 ease-in-out
                `}
              >
                <span
                  className="
                    flex items-center h-[150px] 
                  "
                >
                  {itm?.price}
                </span>
              </td>
              <td 
                className={`
                  px-6 py-4 text-sm text-body
                  transition-all duration-300 ease-in-out
                `}
              >
                <span
                  className="
                    flex items-center h-[150px] 
                  "
                >
                  {itm?.discount_percent}%
                </span>
              </td>
              <td 
                className={`
                  px-6 py-4 text-sm text-body
                  transition-all duration-300 ease-in-out
                `}
              >
                <ul
                  className="
                    flex items-center gap-2 h-[150px] 
                  "
                >
                  {itm.colors.map((color: string, index: number) => 
                    <li
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: getColor(colorsArray, color).hex }}
                      key={index}
                    />  
                  )}
                </ul>
              </td>
              <td 
                className={`
                  px-6 py-4 text-sm text-body
                  transition-all duration-300 ease-in-out
                `}
              >
                <ul
                  className="
                    flex items-center h-[150px] gap-2 
                  "
                >
                  {itm.sizes.map((size: string, i: number) =>
                    <li
                      key={i}
                      className="
                        flex items-center justify-center 
                        bg-primary w-6 h-6 text-heading-invert rounded-md
                      "
                    >
                      {size}
                    </li>
                  )}
                </ul>
              </td>
              <td 
                className={`
                  px-6 py-4 text-sm text-body
                  transition-all duration-300 ease-in-out
                `}
              >
                <span
                  className="
                    flex items-center h-[150px] 
                  "
                >
                  {itm?.description[lang]}
                </span>
              </td>
              <td
                className={`
                  px-6 py-4 text-sm text-body 
                  transition-all duration-300 ease-in-out
                `}
              >
                <ul
                  className="flex flex-row gap-4 items-center"
                  ref={el => { imgUlRefs.current[i] = el }}
                >
                  {itm.images.map((image: any, i: number) => 
                    image.views.map((view: Record<string, string>, viewIndex: number) =>
                      <li
                        key={`${i}-${viewIndex}`}
                        className="flex gap-4 shrink-0"
                      >
                        <div
                        className="flex flex-col gap-2 shrink-0"
                        >
                          <img
                            src={view.url}
                            className="w-[120px] aspect-[2/3] object-cover object-center rounded-lg "
                          />
                          <div
                            className="flex justify-evenly items-center"
                          >
                            <div
                              className="
                                flex bg-background-light rounded-full overflow-hidden
                                border border-solid border-px border-background-deep-light
                              "
                            >
                              <MdiColor 
                                className="p-1 w-6 h-6 text-body"
                              />
                              <div
                                className="p-1 w-6 h-6"
                                style={{ backgroundColor: getColor(colorsArray, image.color).hex }}
                              />
                            </div>
                            <div
                              className="
                                flex bg-background-light rounded-full overflow-hidden
                                border border-solid border-px border-background-deep-light
                              "
                            >
                              <LineMdImageFilled 
                                className="p-1 w-6 h-6 text-body"
                              />
                              <div
                                className="
                                  flex items-center justify-center p-1 w-6 h-6 
                                  text-sm font-bold text-heading-invert text-center
                                  bg-heading
                                "
                              >
                                {view.tag.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </td>
              <td 
                className={`
                  px-6 py-4
                  transition-all duration-300 ease-in-out
                `}
              >
                <h3
                  className="
                    flex items-center h-[150px] gap-2 text-heading text-md
                  "
                >
                  {itm.type}
                </h3>
              </td>
              <td 
                className={`
                  px-6 py-4 text-sm text-body
                  transition-all duration-300 ease-in-out
                `}
              >
                <ul
                  className="
                    flex items-center h-[150px] gap-2 
                  "
                >
                  {itm.categories.map((category: string, i: number) =>
                    <li
                      key={i}
                      className="
                        flex items-center justify-center 
                        bg-primary w-auto h-6 px-2 text-heading-invert rounded-md
                      "
                    >
                      {category}
                    </li>
                  )}
                </ul>
              </td>
              <td className="px-6">
                <div className="flex gap-2">
                  <button 
                    className={`
                      relative bg-background-light rounded-md
                      transition-all duration-500 ease-in-out
                      bg-background-light
                    `}
                    data-product-id={itm.id}
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
                    data-product-id={itm.id}
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
          )}
        </tbody>
      </table>
    </div>
  );
}
// HOOKS
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import LoadingTable from '@/components/LoadingTable';
import ErrorLayout from '@/components/ErrorLayout';
import LineMdEdit from '@/components/svgs/LineMdEdit';
import LineMdTrash from '@/components/svgs/LineMdTrash';
import LineMdImageFilled from '@/components/svgs/LineMdImageFilled';
import MdiColor from '@/components/svgs/MdiColor';

// JSON
import colorsArray from '@/json/colors.json';

// STORES
import { 
  useLanguageStore, useLayoutRefStore, 
  useActionConfirmWindowStore, useAlertMessageStore,
  useEditProductWindowStore
} from '@/stores/index';

// API
import deleteProduct from '@/lib/api/products/delete';

// UTILS
import getColor from '@/utils/getColor';

type Props = {
  scroll?: string;
  scrollTrigger?: number;
  products?: any[];
  isLoading?: boolean;
  isError?: boolean;
}

const blankImg = "/assets/img/empty(2).webp";

export default function Table({ scroll, scrollTrigger, products, isLoading = false, isError = false }: Props) {

  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const layoutRef = useLayoutRefStore(state => state.layoutRef);

  const action = useActionConfirmWindowStore(state => state.action);
  const setAction = useActionConfirmWindowStore(state => state.setAction);
  const setActionWindowToggle = useActionConfirmWindowStore(state => state.setToggle);
  const setActionWindowIsLoading = useActionConfirmWindowStore(state => state.setIsLoading);
  const setTitle = useActionConfirmWindowStore(state => state.setTitle);
  const setDescription = useActionConfirmWindowStore(state => state.setDescription);
  const setBtnTitle = useActionConfirmWindowStore(state => state.setBtnTitle);
  

  const setEditProductWindowToggle = useEditProductWindowStore(state => state.setToggle);
  const setEditProductWindowTrigger = useEditProductWindowStore(state => state.setTrigger);
  const setEditProductWindowProductData = useEditProductWindowStore(state => state.setProductData);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const mainRef = useRef<HTMLDivElement>(null);
  const imgUlRefs = useRef<(HTMLUListElement | null)[]>([]);

  const getProduct = (id: string) => products?.find(product => product.id === id);
  const doesProductHaveImg = (product: Record<string, string>) => product.images.length !== 0;

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
    const { name, productId, isConfirmed } = action;
    if (name !== "remove product" || !isConfirmed) return;
    if (productId) useDeleteProductMuation.mutate(productId.toString());
  }, [action])

  useEffect(() => {
    const setImgLiElWidth = () => {
      imgUlRefs?.current.filter(el => el).forEach((el: any) => {{
        const fullWidth = el.scrollWidth;
        el.style.width = `${fullWidth}px`;
        console.log('fullWidth for UL: ', fullWidth);
      }})
    }

    setImgLiElWidth();
  }, [products]);

  useEffect(() => {
    const fullWidth: number = mainRef.current?.scrollWidth || 0;
    const fullHeight: number = layoutRef?.scrollHeight || 0;

    switch (scroll) {
      case 'right':
        mainRef.current?.scrollTo({
          left: isEn ? fullWidth : 0,
          behavior:'smooth'
        })
        break;
      case 'left':
        mainRef.current?.scrollTo({
          left: isEn ? 0 : -1 * fullWidth,
          behavior:'smooth'
        })
        break;
      case 'up':
        layoutRef.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        console.log('click');
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
  console.log('scrollTrigger: ', scrollTrigger);
  function isErrorWithCode(error: unknown): error is { code: string } {
    return typeof error === 'object' && error !== null && 'code' in error;
  }

  const useDeleteProductMuation = useMutation({
    mutationFn: deleteProduct,
    onSettled: () => {
      setActionWindowIsLoading(false);
    },
    onMutate: () => {
      setActionWindowIsLoading(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setActionWindowToggle(false);
      setAlertToggle(Date.now());
      setAlertType("success");
      setAlertMessage(data.message[lang]);
    },
    onError: () => {
      setAlertToggle(Date.now());
      setAlertType("error");
      setAlertMessage(isEn ? 'Error while deleting the product, please try again later.' : 'حدث خطأ لحذف المنتج, الرجاء المحاوله مره اخرى.');
    }
  })

  const handleClick = async (e: React.MouseEvent<HTMLElement | SVGElement>) => {
    const { type, productId, productName } = e.currentTarget.dataset;

    switch (type) {
      case 'delete_product_button_is_clicked':
        setActionWindowToggle(true);
        if (productId) setAction({ name: "remove product", productId, isConfirmed: false });
        setTitle({ en: `Delete Product?`, ar: "حذف المنتج؟" });
        setDescription({ en: `Are you sure you want to delete "${productName}"? This action cannot be undone.`, ar: "تأكيد مطلوب" });
        setBtnTitle({ en: `Confirm (Delete)`, ar: "تأكيد (حذف)" });
        break;
      case 'edit_product_button_is_clicked':
        setEditProductWindowToggle(true);
        if (productId) 
          setEditProductWindowProductData(getProduct(productId));
          setEditProductWindowTrigger(Date.now());
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
                  h-[250px] px-6 py-4 text-heading font-normal
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
                    src={doesProductHaveImg(itm) ? itm.images[0].views[0].url : blankImg}
                    className="
                      h-[225px] aspect-[2/3] shrink-0
                      object-cover object-center rounded-lg
                    "
                  />
                  <span
                    className="flex items-center shrink-0 h-[150px]"
                  >
                    {itm.name[isEn ? 'en' : 'ar'] || '---'}
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
                  {itm?.description[lang] || '---'}
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
                  {itm.type || '---'}
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
                    data-product-name={itm.name[lang]}
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
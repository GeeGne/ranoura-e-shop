"use client"

// HOOKS
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

// COMPONENT
import ProductDisplay from '@/components/productPage/ProductDisplay';
import ProductSize from '@/components/productPage/ProductSize';
import ProductLists from '@/components/productPage/ProductLists';
import BreadCrumb from '@/components/BreadCrumb';
import ColorPallete from '@/components/ColorPallete';
import PriceTag from '@/components/PriceTag';
import BtnA from '@/components/BtnA';
import FamiconsBagAddOutlineBold from '@/components/svgs/FamiconsBagAddOutlineBold';
import LineMdChevronSmallDown from '@/components/svgs/LineMdChevronSmallDown';
import IonNavigate from '@/components/svgs/PepiconsPencilOpenCircleFilled';

// STORES
import { useTabNameStore, useAlertMessageStore, useCartStore } from '@/stores/index';

// JSON
import products from '@/json/products.json';

// UTILS
import useSetSearchParams from '@/utils/useSetSearchParams';
import useDeleteAllSearchParams from '@/utils/useDeleteAllSearchParams';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "/assets/img/outfit.jpg";
const outfit2 = "/assets/img/outfit-2.jpg";
const outfit3 = "/assets/img/outfit-3.jpg";

export default function page () {

  const router = useRouter();
  const searchParams = useSearchParams();
  const setSearchParams = useSetSearchParams();
  const deleteAllSearchParams = useDeleteAllSearchParams();

  const [ pickedColor, setPickedColor ] = useState<any>(null)
  const [ setColorTrigger, setSetColorTrigger ] = useState<any>(null)
  const quantitiyInptRef = useRef<any>(null);
  const cart = useCartStore(state => state.cart);
  const setCart = useCartStore(state => state.setCart);
  const { productId } = useParams();
  const product = products.find(product => product.id === Number(productId));
  // const productName = slugArray[0];
  // const productId = slugArray[1];

  const slugNameAndLinkArray = [
    {
      name: "All Clothes",
      href: "/shop"
    },{
      name: product?.name,
      href: `/shop/${product?.id}/${product?.slug}`
    } 
  ];

  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);
  const [ productListsActiveIndex, setProductListsActiveIndex ] = useState<number | null>(null);

  useEffect(() => {
    setTabName('product');
  }, []);

  useEffect(() => {

  }, [searchParams]);

  const getImagesUrls = (array: any[] ) => 
    array?.reduce((acc: any[] , itm) => itm.second ? [...acc, itm.main, itm.second] : [...acc, itm.main], []);

  const onColorChange = (selectedColor: string, clickedColor: string) => {
    if (selectedColor === "" || clickedColor === "") return;
    setSearchParams("color", clickedColor);
  }

  // const setSearchParams = (key: string, value: string) => {
    // const params = new URLSearchParams(searchParams.toString())
    // params.set(key, value)
    // router.push(`${window.location.pathname}?${params.toString()}`)
  // }

  const handleClick = (e: any) => {
    e.stopPropagation();

    const { type, productName, index, quantity: totalQuantity } = e.currentTarget.dataset;

    switch (type) {
      case 'add_to_bag_button_is_clicked':
        const size = searchParams.get("size");
        const quantity = Number(searchParams.get("quantity")) || 1;
        const color = searchParams.get("color");
        setAlertToggle(Date.now());

        setSetColorTrigger(Date.now());
        setPickedColor("");
        deleteAllSearchParams();

        if (color && size) {
          const cartArray = [ ...cart ];
          const newProduct = { id: Number(productId), size, quantity: Number(quantity), color };
          const isProductMatched = cart.some(product => 
            product.id === Number(productId) && product.size === size && product.color === color
          );

          if (isProductMatched) setCart(
            cart.map(product => {
              if (product.id === Number(productId)) 
                return {
                  ...product, 
                  quantity: product.quantity + Number(quantity) < 9 ? product.quantity + Number(quantity) : 9
                }
              return true;
            })
          );

          if (!isProductMatched) setCart([ ...cart, newProduct ]);

          setAlertType("product added");
          setAlertMessage(`"${productName}" is Added.` || "Unknown product name");  
          return;
        }

        setAlertType("error");
        setAlertMessage(`Select your preferred color and size to continue`);
        break;
      case 'productList_is_clicked':
        setProductListsActiveIndex(val => val === Number(index) ? null : Number(index));
        break;
      case 'quantity_list_is_clicked':
        setProductListsActiveIndex(val => val === Number(index) ? null : Number(index));
        setSearchParams('quantity', totalQuantity);
        setTimeout(() => quantitiyInptRef.current.blur(), 100);
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  // DEBUG
  // console.log('slug:', slugArray);
  // console.log('slug:', useParams());
  // console.log('product ID: ', product_id);
  // console.log('productName:', productName);
  // console.log('productId:', productId);
  // console.log('product: ', product);
  // console.log('images: ', 
  // [].reduce((acc: string[], itm) => [...acc, itm.main, itm.second], [])
  // );
  // console.log('cart: ', cart);

  return (
    <div
      className="
        flex flex-col gap-8 md:gap-8 p-4 
        md:grid md:grid-cols-2 md:max-w-[1400px] md:mx-auto
      "
    >
      <BreadCrumb
        className="md:col-span-2"
        slugNameAndLinkArray={slugNameAndLinkArray} 
      />
      <ProductDisplay 
        className="md:row-span-2 md:max-w-[600px] md:mx-auto"
        imagesArray={getImagesUrls(product?.images || [])}
      />
      <section
        className="flex flex-col gap-4 md:row-span-2 md:py-8 lg:row-span-1"
      >
        <h2
          className="text-lg font-bold text-heading"
        >
          {product?.name}
        </h2>
        <h3
          className="text-md text-body"
        >
          {product?.description}
        </h3>
        <PriceTag price={product?.price} discount={product?.discount_percent}/>
        <ProductSize sizes={product?.sizes} />
        <ColorPallete 
          className="mb-4"
          width="w-6"
          height="h-6"
          colorsArray={product?.colors}
          productId={product?.id}
          pickFirstIndexByDefault={false}
          setColor={pickedColor}
          setColorTrigger={setColorTrigger}
          currentColor={onColorChange}
        />
        <section
          className="hidden lg:inline md:col-span-2 lg:col-span-2"
        >
          {product?.lists.map(({ title, descriptionLists }, i) => 
            <ProductLists
              key={i}
              title={title}
              descArray={descriptionLists}
              data-type="productList_is_clicked"
              data-index={i}
              toggle={productListsActiveIndex === i ? true : false}
              onClick={handleClick}
            />
          )}
        </section>
        <div
          className="
            relative flex w-full mt-auto
          "
        >
          <BtnA
            className="
              order-2 flex-1 flex justify-center items-center gap-2 font-bold text-base text-heading-invert 
              cool-bg-grad-m py-2 rounded-r-lg 
            "
            data-type="add_to_bag_button_is_clicked"
            data-product-name="Long Jeans With a Skirt"
            onClick={handleClick}
          >
            <FamiconsBagAddOutlineBold 
              width={16} 
              height={16}
            />
            ADD TO BAG
          </BtnA>
          <label
            className="
              relative order-1 relative flex z-[10]
            "
          >
            <input 
              className="
                peer w-16 bg-transparent rounded-l-lg text-left
                text-heading text-md font-bold px-4 focus:outline-none
                border-solid border-primary border-[2px]
              "
              name="quantity"
              id="quantity"
              type="text"
              value={searchParams.get("quantity") || 1}
              readOnly
              ref={quantitiyInptRef}
            />
            <LineMdChevronSmallDown 
              className="
                absolute top-1/2 right-4 translate-y-[-50%] w-4 h-4 text-heading
              "
            />
            <ul
              className="
                absolute top-full left-0 
                w-full text-body text-md rounded-md bg-background drop-shadow-lg
                origin-top scale-y-[0%] peer-focus:scale-y-[100%]
                invisible peer-focus:visible opacity-0 peer-focus:opacity-100
                transition-all delay-100 duration-200 ease-in-out
              "
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num =>
                <li
                  className="
                    text-center hover:bg-content-invert hover:font-bold hover:text-content 
                    m-1 rounded-md cursor-pointer
                    transition-all duration-200 ease-in-out
                  "
                  key={num}
                  data-quantity={num}
                  data-type="quantity_list_is_clicked"
                  onClick={handleClick}
                >
                  {num}
                </li>
              )}
            </ul>
          </label>
        </div>
      </section>
      <section
        className="lg:hidden md:col-span-2 lg:col-span-1"
      >
        {product?.lists.map(({ title, descriptionLists }, i) => 
          <ProductLists
            key={i}
            title={title}
            descArray={descriptionLists}
            data-type="productList_is_clicked"
            data-index={i}
            toggle={productListsActiveIndex === i ? true : false}
            onClick={handleClick}
          />
        )}
      </section>
    </div>
  )
}
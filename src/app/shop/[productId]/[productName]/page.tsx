"use client"

// HOOKS
import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// COMPONENT
import ProductDisplay from '@/components/productPage/ProductDisplay';
import ProductSize from '@/components/productPage/ProductSize';
import ProductLists from '@/components/productPage/ProductLists';
import BreadCrumb from '@/components/BreadCrumb';
import ColorPallete from '@/components/ColorPallete';
import PriceTag from '@/components/PriceTag';
import BtnA from '@/components/BtnA';
import FamiconsBagAddOutlineBold from '@/components/svgs/FamiconsBagAddOutlineBold';
import IonNavigate from '@/components/svgs/PepiconsPencilOpenCircleFilled';

// STORES
import { useTabNameStore, useAlertMessageStore, useCartStore } from '@/stores/index';

// JSON
import products from '@/json/products.json';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "/assets/img/outfit.jpg";
const outfit2 = "/assets/img/outfit-2.jpg";
const outfit3 = "/assets/img/outfit-3.jpg";

export default function page () {

  const searchParams = useSearchParams();
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

  const onColorChange = () => {

  }

  const handleClick = (e: any) => {
    const { type, productName, index, size, quantity, color } = e.currentTarget.dataset;

    switch (type) {
      case 'add_to_bag_button_is_clicked':
        const { size } = searchParams;
        const newProduct = { id: Number(productId), size: "M", quantity: 2, color: "purple" };
        setCart([...cart, newProduct]);
        setAlertToggle(Date.now());
        setAlertType("product added");
        setAlertMessage(`"${productName}" is Added.` || "Unknown product name");
        break;
      case 'productList_is_clicked':
        setProductListsActiveIndex(val => val === Number(index) ? null : Number(index));
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
  console.log('cart: ', cart);

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
        <BtnA
          className="
            flex justify-center items-center gap-2 font-bold text-base text-heading-invert 
            cool-bg-grad-m py-2 rounded-lg mt-auto
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
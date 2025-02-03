"use client"

// HOOKS
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

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
import { useTabNameStore, useAlertMessageStore } from '@/stores/index';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "/assets/img/outfit.jpg";
const outfit2 = "/assets/img/outfit-2.jpg";
const outfit3 = "/assets/img/outfit-3.jpg";

export default function ProductPage () {
  const slugArray = useParams().productNameAndId || [];
  // const productName = slugArray[0];
  // const productId = slugArray[1];

  const slugNameAndLinkArray = [
    {
      name: "Product",
      href: "/product"
    },{
      name: "Jeans",
      href: "/product/jeans"
    } 
  ];

  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  useEffect(() => {
    setTabName('product');
  }, []);

  const onColorChange = () => {

  }

  const handleClick = (e: any) => {
    const { type, productName } = e.currentTarget.dataset;

    switch (type) {
      case 'add_to_bag_button_is_clicked':
        setAlertToggle(Date.now());
        setAlertType("product added");
        setAlertMessage(`"${productName}" is Added.` || "Unknown product name");
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  // DEBUG
  // console.log('slug:', slugArray);
  // console.log('productName:', productName);
  // console.log('productId:', productId);

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
      />
      <section
        className="flex flex-col gap-4 md:row-span-2 md:py-8 lg:row-span-1"
      >
        <h2
          className="text-lg font-bold text-heading"
        >
          Long Jeans With a Skirt
        </h2>
        <PriceTag price={2000} discount={10}/>
        <ProductSize />
        <ColorPallete 
          className="mb-8"
          width="w-6"
          height="h-6"
          colorsArray={['black', 'red']}
          productId={2}
          currentColor={onColorChange}
        />
        <BtnA
          className="
            flex justify-center items-center gap-2 font-bold text-md text-heading-invert 
            bg-gradient-to-r from-primary to-inbetween py-2 rounded-lg mt-auto
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
        className="md:col-span-2 lg:col-span-1"
      >
        <ProductLists 
          title="PRODUCT DETAILS"
          descArray={[
            'Brand: Ranoura.',
            'Material: Fabric.',
            'Fit: Tight to body.',
            'NeckLine: None.',
            'Sleeves: Yes.',
            'Design: Italic'
          ]}
        />
        <ProductLists 
          title="SIZE INFO"
          descArray={[
            'True to size.',
            'XXS: 0.',
            'XS: 0-2',
            'MD: 2-4',
            'LG: 4-6',
            'XL: 6-9'
          ]}
        />
        <ProductLists 
          title="ABOUT RANOURA✧･ﾟ*"
          descArray={[
            'Welcome to Ranoura – where elegance meets excellence. At Ranoura, we pride ourselves on crafting garments from the finest high-end fabrics, designed for those who appreciate quality, style, and sophistication. Each piece is meticulously tailored to provide a perfect blend of comfort and luxury, ensuring you feel confident and radiant in every moment. Discover timeless designs and impeccable craftsmanship that redefine fashion, only at Ranoura.'
          ]}
        />
        <ProductLists 
          title="DELIVERY"
          descArray={[
            'Get your favorite Ranura pieces delivered straight to your doorstep! Enjoy fast and reliable shipping with options for standard delivery (three to five business days) or express delivery (one to two business days) for those last-minute style needs. We carefully package every item to ensure it arrives in perfect condition, ready to shine in your wardrobe.'
          ]}
        />
        <ProductLists 
          title="RETURNS"
          descArray={[
            `At Ranura, your satisfaction is our priority. If something isn't quite right, you can easily return it within fourteen days of receiving your order. Items must be unworn, unwashed, and with original tags attached. Simply follow our hassle-free returns process, and we'll ensure you get a refund or exchange as quickly as possible.`
          ]}
        />
      </section>
    </div>
  )
}
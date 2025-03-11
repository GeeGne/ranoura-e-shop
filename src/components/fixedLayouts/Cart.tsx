// HOOKS
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from "react";

// COMPONENTS
import PriceTag from '@/components/PriceTag'
import SolarCart4Outline from "@/components/svgs/SolarCart4Outline";
import ArrowUp from "@/components/svgs/ArrowUp";
import DisplayImg from "@/components/DisplayImg";
import BtnA from "@/components/BtnA";

// STORES
import { useCartStore, useLayoutRefStore, useAlertMessageStore } from '@/stores/index';

// SVG
import EpArrowLeft from "@/components/svgs/EpArrowLeft";
import IcOutlineClear from '@/components/svgs/IcOutlineClear';
import IcOutlineCreate from "@/components/svgs/IcOutlineCreate";

// JSON
import products from '@/json/products.json';
import colors from '@/json/colors.json';

// UTILS
import calculatePriceAfterDiscount from "@/utils/calculatePriceAfterDiscount";
import getProduct from '@/utils/getProduct';
import getImgUrl from '@/utils/getImgUrl';
import getColor from '@/utils/getColor';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "assets/img/outfit.jpg"
const outfit2 = "assets/img/outfit-2.jpg"
const outfit3 = "assets/img/outfit-3.jpg"

export default function Cart () {

  const router = useRouter();
  const layoutRef = useLayoutRefStore((state: any) => state.layoutRef);

  const toggle = useCartStore((status:any) => status.toggle);
  const setToggle = useCartStore((status:any) => status.setToggle);
  const cart = useCartStore((status:any) => status.cart);
  const setCart = useCartStore((status:any) => status.setCart);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const [ inputToggle, setInputToggle ] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type, index, productName, size, color } = e.currentTarget.dataset;

    switch (type) {
      case 'close_button_is_clicked':
        setToggle(false);
        break;
      case 'navigate_to_checkout':
        setToggle(false);
        router.push('/checkout');
        setTimeout(() => 
          layoutRef.scrollTo({top: 0, behavior: "instant"})
        ,200);
        break;
      case 'delete_button_is_clicked':
        setAlertToggle(Date.now());
        setAlertType('product removed');
        setAlertMessage(`"${productName}" has been removed from your cart`);
        setCart(cart.filter((itm: any) => !(itm.id === Number(index) && itm.color === color && itm.size === size) ));
        break;
      case 'edit_button_is_clicked':
        setToggle(false);
        setAlertToggle(Date.now());
        setAlertType('warning');
        setAlertMessage(`"${productName}" is removed! Re-select your options and add it back to the cart`);
        setCart(cart.filter((itm: any) => !(itm.id === Number(index) && itm.color === color && itm.size === size) ));
        setTimeout(() => 
          layoutRef.scrollTo({top: 0, behavior: "instant"})
        ,200);
        break;
      default:
        console.error('Unknown type: :', type);
    }
  }

  const handleFocus = (e: any) => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'quantity':
        // setInputToggle(true);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  const handleBlur = (e: any) => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'quantity':
        // setInputToggle(false);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  // DEBUG & UI
  // console.log('cart: ', cart);
  // console.log('img main url ', );

  return (
    <div
      className={`
        fixed top-0 left-0 
        flex flex-col w-full h-screen bg-[var(--shade-v2-color)] z-[2000]
        transition-all duration-300 ease-in-out
        backdrop-blur-[2px]
        ${toggle ? 'translate-y-[0%]' : 'translate-y-[-100%]'}
      `}
    >
      <button
        className="
        relative flex items-center justify-end 
        w-full max-w-[1400px] mx-auto px-4 py-8 opacity-100 cursor-pointer"
        onClick={handleClick}
        data-type="close_button_is_clicked"
      >
        <div
          className="nav-active-effect z-10"
        >
          <SolarCart4Outline
            className="
              text-heading-invert cursor-pointer
            "
            width={24}
            height={24}
          />
        </div>
        <div
          className="
            absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
            w-screen h-full text-body text-4xl font-thin
            flex items-center justify-center gap-2 bg-[hsla(0,0%,80%,0.6)]  
          "
        >
          <ArrowUp 
            className="w-8 h-8 text-between rounded-full border-solid border-body-light border-[1px] p-1"
          />
          <h2>
            CLOSE
          </h2>
        </div>
      </button>
      <hr className="border-inbetween"/>
      <section
        className="flex flex-1 flex-col bg-transparent w-full max-w-[600px] mx-auto overflow-hidden"
      >
        <div
          className="flex items-center justify-between p-4"
        >
          <span
            className="text-2xl text-heading"
          >
            Cart
          </span>
          <span
            className="text-2xl text-heading border-heading border-solid border-[1px] rounded-full px-2"
          >
            {cart.length}
          </span>
        </div>
        <hr className="border-inbetween"/>
        <ul className="flex flex-col flex-1 py-4 px-2 gap-8 overflow-y-scroll">
          {cart.map((product: any, i: number) => 
            <li className="flex" key={i}>
              <DisplayImg
                className="w-[100px] md:w-[200px] aspect-[2/3] object-cover rounded-lg"
                alt={getProduct(products, product.id).name}
                src={getImgUrl(getProduct(products, product.id).images, product.color)?.main}
              />
              <div className="flex flex-col flex-1 px-4">
                <div className="flex text-heading text-lg font-bold justify-between">
                  <h3>
                    {getProduct(products, product.id)?.name} 
                  </h3>
                  <span
                    className="font-bold text-lg text-content"
                  >
                    {calculatePriceAfterDiscount({ 
                      price: getProduct(products, product.id).price, 
                      discount: getProduct(products, product.id).discount_percent
                    }) * product.quantity} SYP
                  </span>
                </div>
                <div className="flex items-center gap-2 font-bold py-4">
                  <span>
                    {product.size}
                  </span>
                  <span>|</span>
                  <span 
                    className={`h-4 w-4 rounded-full`}
                    style={{backgroundColor: getColor(colors, product.color).hex}}
                  />
                  <span>
                    {product.color}
                  </span>
                </div>
                  <div className="flex gap-4 items-center w-full">
                    <span className="text-body">
                      Price: 
                    </span>
                      {/* {calculatePriceAfterDiscount({ 
                          price: getProduct(products, product.id).price, 
                          discount: getProduct(products, product.id).discount 
                        }) * product.quantity} SYP */}
                      <PriceTag 
                        className="" 
                        price={getProduct(products, product.id).price} 
                        discount={getProduct(products, product.id).discount_percent}
                      />
                  </div>       
                  <label 
                    className="flex justify-between w-[150px]"
                    htmlFor="cartQuantity"
                  >
                    <span className="text-body">
                      Quanitity:
                    </span>
                    <div
                      className="relative"
                    >
                      <input
                        className="w-12 bg-transparent text-center outline-none border-none"
                        id="cartQuantity"
                        name="cartQuantity"
                        value={product.quantity}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        readOnly
                      />
                      <div 
                        className="
                          absolute top-0 left-0 w-full h-full
                          flex items-center justify-end
                          border-solid border-b-[2px] border-body

                      ">
                        <EpArrowLeft className="w-4 h-4 rotate-[265deg]" />
                      </div>
                      <ul
                        className={`
                          absolute top-full left-0 w-full h-auto py-2
                          flex-col bg-[var(--background-light-color)] rounded-lg cursor-pointer
                          ${inputToggle ? 'flex' : 'hidden'}
                        `}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => 
                          <li 
                            className="hover:bg-[var(--background-deep-light-color)] w-full text-center"
                            key={num}
                          >
                            {num}
                          </li>
                        )}
                      </ul>
                    </div>
                  </label>
                  <div 
                    className="
                      flex flex-col gap-2 text-sm md:text-base mt-auto pt-8
                      translate-all duration-300 ease-in-out
                    "
                  >
                  <Link
                    className="
                      flex items-center justify-center gap-1 
                      border-solid border-body border-[2px] rounded-md
                      translate-all duration-300 ease-in-out
                      hover:bg-body hover:text-heading-invert
                    "
                    href={`/shop/${getProduct(products, product.id).id}/${getProduct(products, product.id).slug}`}
                    data-type="edit_button_is_clicked"
                    data-product-name={getProduct(products, product.id).name}
                    data-size={product.size}
                    data-color={product.color}
                    data-index={product.id}
                    onClick={handleClick}
                  >
                    <IcOutlineCreate
                      className="w-4 h-4"
                    />
                    <span>EDIT</span>
                  </Link>
                  <button
                    className="
                      flex items-center justify-center gap-1 
                      border-solid border-body border-[2px] rounded-md
                      translate-all duration-300 ease-in-out
                      hover:bg-body hover:text-heading-invert
                    "
                    data-type="delete_button_is_clicked"
                    data-product-name={getProduct(products, product.id).name}
                    data-size={product.size}
                    data-color={product.color}
                    data-index={product.id}
                    onClick={handleClick}
                  >
                    <IcOutlineClear
                      className="w-4 h-4"
                    />
                    <span>DELETE</span>
                  </button>
                </div>
              </div>
            </li>
          )}
        </ul>
        <hr className="border-inbetween"/>
        <section
          className="flex flex-col items-center gap-4 p-4"
        >
          <div className="flex flex-row justify-between w-full font-bold text-lg">
            <h3 className="">Total Price: </h3>
            <h3 className="">16000 SYP</h3>
          </div>
          <BtnA
            className="w-full text-base text-heading-invert py-2 px-2 bg-primary rounded-md"
            data-type="navigate_to_checkout"
            onClick={handleClick}
          >
            Head to Checkout
          </BtnA>
        </section>
      </section>
    </div>
  )
}
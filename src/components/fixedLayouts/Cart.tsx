// HOOKS
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef } from "react";

// COMPONENTS
import PriceTag from '@/components/PriceTag'
import SolarCart4Outline from "@/components/svgs/SolarCart4Outline";
import ArrowUp from "@/components/svgs/ArrowUp";
import DisplayImg from "@/components/DisplayImg";
import BtnA from "@/components/BtnA";

// STORES
import { 
  useCartStore, useLayoutRefStore, 
  useAlertMessageStore, useLanguageStore
} from '@/stores/index';

// SVG
import CartEmpty from "@/components/svgs/CartEmpty";
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

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const toggle = useCartStore((status:any) => status.toggle);
  const setToggle = useCartStore((status:any) => status.setToggle);
  const cart = useCartStore((status:any) => status.cart);
  const setCart = useCartStore((status:any) => status.setCart);
  const isCartEmpty = cart.length === 0;

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const [ inputToggle, setInputToggle ] = useState<boolean>(false);

  const amountInptRefs = useRef<HTMLElement | any>([]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type, index, productName, size, color, productId, quantity } = e.currentTarget.dataset;

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
      case 'product_amount_is_clicked':
        const cartArray = [ ...cart ]; 
        cartArray[Number(index)].quantity = Number(quantity);
        setCart(cartArray);
        setTimeout(() =>  
          amountInptRefs.current.find((itm: any, i: number) => i === Number(index)).blur()
        , 100);
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

  if (isCartEmpty) return (
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
            className={`
              ${isEn ? 'order-1' : 'order-2'}
              w-8 h-8 text-between rounded-full 
              border-solid border-body-light border-[1px] p-1
            `}
          />
          <h2
            className={`
              ${isEn ? 'order-2' : 'order-1'}  
            `}
          >
            {isEn ? 'CLOSE' : 'الغاء'}
          </h2>
        </div>
      </button>
      <hr className="border-inbetween"/>
      <div
        className="flex flex-col gap-8 w-full items-center max-w-[800px] p-8 m-auto translate-y-[0rem] overflow-y-scroll"
      >
        <CartEmpty 
          className="flex w-full h-auto text-content-inbetween"
        />
        <h2
          className="text-heading text-xl font-base"
        >
          <span className="text-content text-3xl font-bold">{isEn ? 'I' : 'ي'}</span>
          {isEn ? 't looks like your Cart is Empty' : 'بدو أن عربة التسوق الخاصة بك فارغة'}
        </h2>
        <BtnA 
          className="shrink-0 bg-primary text-heading-invert font-bold py-2 px-4 rounded-md"
          data-type="close_button_is_clicked"
          onClick={handleClick}
        >
          {isEn ? 'Close Cart' : 'رجوع'}
        </BtnA>
      </div>
    </div>
  )

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
            className={`
              ${isEn ? 'order-1' : 'order-2'}
              w-8 h-8 between rounded-full 
              border-solid border-body-light border-[1px] p-1
            `}
          />
          <h2 
            className={`
              ${isEn ? 'order-2' : 'order-1'}
            `}
          >
            {isEn ? 'CLOSE' : 'الغاء'}
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
            {isEn ? 'Cart' : 'السله'}
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
                alt={getProduct(products, product.id).name[lang]}
                src={getImgUrl(getProduct(products, product.id).images, product.color)?.main}
              />
              <div className="flex flex-col flex-1 px-4">
                <div className="flex text-heading text-lg justify-between">
                  <h3>
                    {getProduct(products, product.id)?.name[lang]} 
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
                    style={{backgroundColor: getColor(colors, product.color)?.hex}}
                  />
                  <span>
                    {product.color}
                  </span>
                </div>
                  <div className="flex gap-2 items-center w-full">
                    <span className="text-body">
                      {isEn ? 'Price:' : 'السعر'} 
                    </span>
                      {/* {calculatePriceAfterDiscount({ 
                          price: getProduct(products, product.id).price, 
                          discount: getProduct(products, product.id).discount 
                        }) * product.quantity} SYP */}
                      <PriceTag 
                        className="" 
                        hidePercent={true}
                        textSize="base"
                        price={getProduct(products, product.id).price} 
                        discount={getProduct(products, product.id).discount_percent}
                      />
                  </div>       
                  <label 
                    className="flex gap-2 items-center w-[150px]"
                    htmlFor={`cartQuantity_${i}`}
                  >
                    <span className="text-body">
                      {isEn ? 'Quanitity' : 'الكميه'}:
                    </span>
                    <div
                      className="relative"
                    >
                      <input
                        className="peer w-12 bg-transparent text-center text-sm outline-none border-none"
                        readOnly
                        id={`cartQuantity_${i}`}
                        name={`cartQuantity_${i}`}
                        value={product.quantity}
                        data-index={i}
                        ref={(el: any) => amountInptRefs.current[i] = el}
                        // onFocus={handleFocus}
                        // onBlur={handleBlur}
                      />
                      <div 
                        className="
                          absolute top-0 left-0 w-full h-full
                          flex items-center justify-end
                          border-solid border-b-[2px] border-body
                        "
                      >
                        <EpArrowLeft className="w-3 h-3 rotate-[265deg]" />
                      </div>
                      <ul
                        className={`
                          invisible peer-focus:visible opacity-0 peer-focus:opacity-100 
                          scale-y-[0%] peer-focus:scale-y-[100%] origin-top
                          absolute top-full left-0 w-full h-auto p-1 drop-shadow-lg
                          flex-col bg-[var(--background-light-color)] rounded-md cursor-pointer
                          transition-all delay-100 duration-300 ease-in-out
                        `}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => 
                          <li 
                            className="
                              hover:bg-content-invert w-full text-sm 
                                text-center text-body hover:text-content hover:font-bold rounded-md
                              transition-all duration-300 ease-in-out
                            "
                            key={num}
                            data-index={i}
                            data-type="product_amount_is_clicked"
                            data-product-id={product.id}
                            data-quantity={num}
                            onClick={handleClick}
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
                    data-product-name={getProduct(products, product.id).name[lang]}
                    data-size={product.size}
                    data-color={product.color}
                    data-index={product.id}
                    onClick={handleClick}
                  >
                    <IcOutlineCreate
                      className="w-4 h-4"
                    />
                    <span>{isEn ? 'EDIT' : 'تعديل'}</span>
                  </Link>
                  <button
                    className="
                      flex items-center justify-center gap-1 
                      border-solid border-body border-[2px] rounded-md
                      translate-all duration-300 ease-in-out
                      hover:bg-body hover:text-heading-invert
                    "
                    data-type="delete_button_is_clicked"
                    data-product-name={getProduct(products, product.id).name[lang]}
                    data-size={product.size}
                    data-color={product.color}
                    data-index={product.id}
                    onClick={handleClick}
                  >
                    <IcOutlineClear
                      className="w-4 h-4"
                    />
                    <span>{isEn ? 'DELETE' : 'مسح'}</span>
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
            <h3 className="">{isEn ? 'Total Price: ': 'مجمل السعر: '}</h3>
            <h3 className="">16000 SYP</h3>
          </div>
          <BtnA
            className="w-full text-base text-heading-invert py-2 px-2 bg-primary rounded-md"
            data-type="navigate_to_checkout"
            onClick={handleClick}
          >
            {isEn ? 'Head to Checkout' : 'توجه الى الدفع'}
          </BtnA>
        </section>
      </section>
    </div>
  )
}
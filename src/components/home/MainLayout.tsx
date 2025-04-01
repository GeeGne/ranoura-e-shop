// HOOKS
import Link from 'next/link';

// COMPONENTS
import DisplayImg from "@/components/DisplayImg";
import BtnA from "@/components/BtnA";

// STORES
import { useLayoutRefStore, useAlertMessageStore, useLanguageStore } from '@/stores/index';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "assets/img/outfit.webp"
const outfit2 = "assets/img/outfit-2.jpg"
const outfit3 = "assets/img/outfit-3.jpg"

export default function MainLayout () {

  const layoutRef = useLayoutRefStore((state: any) => state.layoutRef);
  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const handleClick = (e: any) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'shopNow_button_is_clicked':
        setTimeout(() => 
          layoutRef.scrollTo({top: 0, behavior: "instant"})
        ,200);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  };
  
  return (
    <section
      className="
        grid grid-cols-10 gap-4 p-4
        w-full aspect-[2/9] md:aspect-[2/3] lg:aspect-[2.21/1] 
      "
    >
      <div
        className="
          relative w-full h-full col-span-10 lg:col-span-4 lg:row-span-2 rounded-2xl overflow-hidden
        "
      >
        <DisplayImg 
          className="absolute top-0 left-0 w-full h-full object-cover object-right bg-background-light z-[5]"
          src={outfit1}
          alt="Image"
        />
        <div
          className="
            absolute top-0 left-0 w-full h-full object-cover px-4 py-8 z-[10] bg-gradient-to-t from-[hsla(0,29%,30%,0.4)]
            flex flex-col gap-4 items-center justify-end 
          "
        >
          <h2
            className="text-xl text-heading-invert font-bold drop-shadow-md"
          >
            {isEn ? 'RAMADAN NIGHTS' : 'ليالي رمضان'}
          </h2>
          <h3
            className="text-base text-heading-invert"
          >
            {isEn 
              ? 'Illuminate Your Style with Ramadan Nights – Exclusive Deals Await!'
              : 'أنِقْ إطلالتك الرمضانية بعروضٍ لا تُضاهى'
            }
          </h3>
          <Link
            href="shop/category/event/ramadan-nights"
          >
            <BtnA
              className="bg-background text-heading text-sm font-bold px-4 py-2 shadow-md drop-shadow-lg rounded-md"
              data-type="shopNow_button_is_clicked"
              onClick={handleClick}
            >
              {isEn ? 'SHOP NOW' : 'تسوق الان'}
            </BtnA>
          </Link>
        </div>
      </div>
      
      <div
        className="
          relative w-full h-full col-span-10 md:col-span-6 rounded-2xl overflow-hidden
        "
      >
        <DisplayImg 
          className="absolute top-0 left-0 w-full h-full object-cover bg-background-light"
          src={outfit3}
          alt="Image"
        />
        <div
          className="
            absolute top-0 left-0 w-full h-full object-cover px-4 py-8 z-[10] bg-gradient-to-t from-[hsla(0,29%,30%,0.4)]
            flex flex-col gap-4 items-center justify-end 
          "
        >
          <h2
            className="text-xl text-heading-invert font-bold drop-shadow-md"
          >
            {isEn ? 'HOT DEALS' : 'عروض ساخنة'}
          </h2>
          <h3
            className="text-base text-heading-invert"
          >
            {isEn 
              ? `"Unbeatable Discounts, Limited Time Offers! Discover exclusive deals on your favorite products. Shop now before they're gone!"`
              : '"عروض مهولة! استفيد قبل ما تخلص! تشكيلات حصرية بسعر خرافي. لا تفوتك!"'
            }
          </h3>
          <Link
            href="/shop/category/sale/hot-deals"
          >
            <BtnA
              className="bg-background text-heading text-sm font-bold px-4 py-2 shadow-md drop-shadow-lg rounded-md"
              data-type="shopNow_button_is_clicked"
              onClick={handleClick}
            >
              {isEn ? 'SHOP NOW' : 'تسوق الان'}
            </BtnA>
          </Link>
        </div>
      </div>
      
      <div
        className="
          relative w-full h-full col-span-10 md:col-span-4 lg:col-span-6 rounded-2xl overflow-hidden
        "
      >
        <DisplayImg 
          className="absolute top-0 left-0 w-full h-full object-cover bg-background-light"
          src={outfit2}
          alt="Image"
        />
          <div
            className="
              absolute top-0 left-0 w-full h-full object-cover px-4 py-8 z-[10] bg-gradient-to-t from-[hsla(0,29%,30%,0.4)]
              flex flex-col gap-4 items-center justify-end 
            "
        >
          <h2
            className="text-xl text-heading-invert font-bold drop-shadow-md"
          >
            {isEn ? 'LATEST ARRIVALS' : 'وصل حديثاً'}
          </h2>
          <h3
            className="text-base text-heading-invert"
          >
            {isEn 
              ? `"Fresh Styles, Hot Prices! Explore our new clothing collection with exclusive deals you won't want to miss. Upgrade your wardrobe today!"`
              : `"تصاميم جديدة وأسعار تنافسية! جرب تشكيلة الملابس الجديدة مع خصومات حصرية لا تفوتها. انعش إطلالتك الآن!"`  
            }
          </h3>
          <Link
            href="/shop/category/sale/latest-arrivals"
          >
            <BtnA
              className="bg-background text-heading text-sm font-bold px-4 py-2 shadow-md drop-shadow-lg rounded-md"
              data-type="shopNow_button_is_clicked"
              onClick={handleClick}
            >
              {isEn ? 'SHOP NOW' : 'تسوق الان'}
            </BtnA>
          </Link>
        </div>
      </div>
    </section>
  )  
}
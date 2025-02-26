// COMPONENTS
import DisplayImg from "@/components/DisplayImg";
import BtnA from "@/components/BtnA";

// STORES
import { useAlertMessageStore } from '@/stores/index';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "assets/img/outfit.webp"
const outfit2 = "assets/img/outfit-2.jpg"
const outfit3 = "assets/img/outfit-3.jpg"

export default function MainLayout () {
  
  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const handleClick = (e: any) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'shopNow_button_is_clicked':
        setAlertToggle(Date.now());
        setAlertType("warning");
        setAlertMessage("Sorry! We're currently working on this feature.");
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
            RAMADAN NIGHTS
          </h2>
          <h3
            className="text-base text-heading-invert"
          >
            Illuminate Your Style with Ramadan Nights – Exclusive Deals Await!
          </h3>
          <BtnA
            className="bg-background text-heading text-sm font-bold px-4 py-2 shadow-md drop-shadow-lg rounded-md"
            data-type="shopNow_button_is_clicked"
            onClick={handleClick}
          >
            SHOP NOW
          </BtnA>
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
            HOT DEALS
          </h2>
          <h3
            className="text-base text-heading-invert"
          >
            "Unbeatable Discounts, Limited Time Offers! Discover exclusive deals on your favorite products. Shop now before they're gone!"
          </h3>
          <BtnA
            className="bg-background text-heading text-sm font-bold px-4 py-2 shadow-md drop-shadow-lg rounded-md"
            data-type="shopNow_button_is_clicked"
            onClick={handleClick}
          >
            SHOP NOW
          </BtnA>
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
            LATEST ARRIVALS
          </h2>
          <h3
            className="text-base text-heading-invert"
          >
            "Fresh Styles, Hot Prices! Explore our new clothing collection with exclusive deals you won't want to miss. Upgrade your wardrobe today!"
          </h3>
          <BtnA
            className="bg-background text-heading text-sm font-bold px-4 py-2 shadow-md drop-shadow-lg rounded-md"
            data-type="shopNow_button_is_clicked"
            onClick={handleClick}
          >
            SHOP NOW
          </BtnA>
        </div>
      </div>
    </section>
  )  
}
// COMPONENTS
import DisplayImg from "@/components/DisplayImg";
import BtnA from "@/components/BtnA";
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "assets/img/outfit.jpg"
const outfit2 = "assets/img/outfit-2.jpg"
const outfit3 = "assets/img/outfit-3.jpg"

export default function MainLayout () {
  return (
    <section
      className="
        grid grid-cols-10 gap-4 p-4
        w-full aspect-[3/9] md:aspect-[2/3] lg:aspect-[6/5] 
      "
    >
      <div
        className="
          relative w-full h-full col-span-10 rounded-2xl overflow-hidden
        "
      >
        <DisplayImg 
          className="absolute top-0 left-0 w-full h-full object-cover object-right bg-[hsl(255,37%,87%)] z-[5]"
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
            className="text-xl text-heading-invert font-bold"
          >
            RAMADAN NIGHTS
          </h2>
          <h3
            className="text-md text-heading-invert"
          >
            Illuminate Your Style with Ramadan Nights – Exclusive Deals Await!
          </h3>
          <BtnA>
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
          className="absolute top-0 left-0 w-full h-full object-cover bg-green-400"
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
            className="text-xl text-heading-invert font-bold"
          >
            HOT DEALS
          </h2>
          <h3
            className="text-md text-heading-invert"
          >
            "Unbeatable Discounts, Limited Time Offers! Discover exclusive deals on your favorite products. Shop now before they're gone!"
          </h3>
          <BtnA>
            SHOP NOW
          </BtnA>
        </div>
      </div>
      
      <div
        className="
          relative w-full h-full col-span-10 md:col-span-4 rounded-2xl overflow-hidden
        "
      >
        <DisplayImg 
          className="absolute top-0 left-0 w-full h-full object-cover bg-blue-400"
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
            className="text-xl text-heading-invert font-bold"
          >
            LATEST ARRIVALS
          </h2>
          <h3
            className="text-md text-heading-invert"
          >
            "Fresh Styles, Hot Prices! Explore our new clothing collection with exclusive deals you won't want to miss. Upgrade your wardrobe today!"
          </h3>
          <BtnA>
            SHOP NOW
          </BtnA>
        </div>
      </div>
      
    </section>
  )  
}
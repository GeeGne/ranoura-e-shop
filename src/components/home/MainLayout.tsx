// COMPONENTS
import DisplayImg from "@/components/DisplayImg";
import BtnA from "@/components/BtnA";
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";

export default function MainLayout () {
  return (
    <section
      className="
        grid grid-cols-10 gap-4 p-4
        w-full aspect-[1/1] md:aspect-[4/3] lg:aspect-[6/3] 
      "
    >
      <div
        className="
          relative w-full h-full col-span-10 rounded-2xl overflow-hidden
        "
      >
        <DisplayImg 
          className="absolute top-0 left-0 w-full h-full object-contain object-right bg-[hsl(28,28%,71%)] z-[5]"
          src={ramdanBanner2}
          alt="Image"
        />
        <div
          className="
            absolute top-0 left-0 w-1/2 h-full object-cover px-4 z-[10]
            flex flex-col gap-4 items-center justify-center
          "
        >
          <h2
            className="text-xl text-heading font-bold"
          >
            RAMADAN NIGHTS
          </h2>
          <h3
            className="text-md text-body font-bold"
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
          relative w-full h-full col-span-6 rounded-2xl overflow-hidden
        "
      >
        <DisplayImg 
          className="absolute top-0 left-0 w-full h-full object-cover bg-green-400"
          src={ramdanBanner}
          alt="Image"
        />
      </div>
      
      <div
        className="
          relative w-full h-full col-span-4 rounded-2xl overflow-hidden
        "
      >
        <DisplayImg 
          className="absolute top-0 left-0 w-full h-full object-cover bg-blue-400"
          src={ramdanBanner}
          alt="Image"
        />
      </div>
      
    </section>
  )  
}
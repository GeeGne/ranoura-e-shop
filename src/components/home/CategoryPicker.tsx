// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "/assets/img/outfit.jpg";
const outfit2 = "/assets/img/outfit-2.jpg";
const outfit3 = "/assets/img/outfit-3.jpg";

export default function CategoryPicker () {
  return (
    <section
      className="flex p-4"
    >
      <ul
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        <li
          className="relative w-full aspect-[1/1] rounded-full overflow-hidden"
        >
          <img 
            src={outfit1}
            alt="image"
            className="shrink-0 w-full object-cover"
          />
          <div
            className="
              absolute top-1/2 left-1/2 
              translate-x-[-50%] translate-y-[-50%] w-[calc(100%-1rem)] h-[calc(100%-1rem)] 
              flex items-center justify-center bg-[hsla(0,0%,0%,0.3)] rounded-full
              border border-white border-[2px] border-dashed
            "
          >
            <h3
              className="text-lg text-heading-invert font-bold"
            >
              JEANS
            </h3>
          </div>
        </li>
        <li
          className="relative w-full aspect-[1/1] rounded-full overflow-hidden"
        >
          <img 
            src={outfit1}
            alt="image"
            className="shrink-0 w-full object-cover"
          />
          <div
            className="
              absolute top-1/2 left-1/2 
              translate-x-[-50%] translate-y-[-50%] w-[calc(100%-1rem)] h-[calc(100%-1rem)] 
              flex items-center justify-center bg-[hsla(0,0%,0%,0.3)] rounded-full
              border border-white border-[2px] border-dashed
            "
          >
            <h3
              className="text-lg text-heading-invert font-bold"
            >
              JEANS
            </h3>
          </div>
        </li>
        <li
          className="relative w-full aspect-[1/1] rounded-full overflow-hidden"
        >
          <img 
            src={outfit1}
            alt="image"
            className="shrink-0 w-full object-cover"
          />
          <div
            className="
              absolute top-1/2 left-1/2 
              translate-x-[-50%] translate-y-[-50%] w-[calc(100%-1rem)] h-[calc(100%-1rem)] 
              flex items-center justify-center bg-[hsla(0,0%,0%,0.3)] rounded-full
              border border-white border-[2px] border-dashed
            "
          >
            <h3
              className="text-lg text-heading-invert font-bold"
            >
              JEANS
            </h3>
          </div>
        </li>
      </ul>
    </section>
  )
}
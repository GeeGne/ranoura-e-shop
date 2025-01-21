// JSON
import category from "@/json/category.json";

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "/assets/img/outfit.jpg";
const outfit2 = "/assets/img/outfit-2.jpg";
const outfit3 = "/assets/img/outfit-3.jpg";
const bag = "/assets/img/bag.png";
const jacket = "/assets/img/jacket.png";
const jeans = "/assets/img/jeans.png";

export default function CategoryPicker () {
  return (
    <section
      className="flex p-4"
    >
      <ul
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full gap-4"
      >
        {category.map((itm, i) => 
          <li
            className="group relative w-full aspect-[1/1] rounded-full cursor-pointer"
            key={i}
          >
            <img 
              src={itm.imgURL}
              alt="image"
              className="
                absolute top-1/2 left-1/2 
                translate-x-[-50%] translate-y-[-50%] 
                shrink-0 w-full h-full object-center object-contain 
                drop-shadow-md z-[15] 
              "
            />
            <div
              className="
                absolute top-1/2 left-1/2 
                translate-x-[-50%] translate-y-[-50%] w-[calc(100%-2rem)] h-[calc(100%-2rem)] 
                flex items-center justify-center bg-[hsla(0,0%,0%,0.3)] rounded-full
                border border-primary border-[6px] border-double z-[10]
              "
            >
            </div>
            <div
              className="
                --category-rotate absolute top-0 left-0 bottom-0 right-0
                w-[calc(100%)] h-[calc(100%)] 
                flex items-center justify-center rounded-full
                border border-primary border-[8px] border-dashed
                transition-all duration-300 ease-in-out
                transform scale-[50%] group-hover:scale-[100%]
                opacity-0 group-hover:opacity-100 z-[1]
              "
            >
            </div>
            <div
              className="
                absolute top-1/2 left-1/2 
                translate-x-[-50%] translate-y-[-50%] w-full h-full 
                flex items-center justify-center z-[20]
              "          
            >
              <h3
                className="text-lg text-heading-invert font-bold drop-shadow-md"
              >
                {itm.categoryName}
              </h3>            
            </div>
          </li>
        )}
      </ul>
    </section>
  )
}
// STORES
import { useAlertMessageStore } from '@/stores/index';

// COMPONENTS
import Blob from "@/components/svgs/layered_shapes/Blob"
import LayeredStepsHaikeiMd from "@/components/svgs/layered_shapes/LayeredStepsHaikeiMd"

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

export default function CategoryPickerV2 () {
  
  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'category_list_is_clicked':
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
      className="flex flex-col gap-4 py-8"
    >
      <section
        className="flex  px-4"
      >
        <span
            className="relative flex text-3xl text-heading font-bold transform"
          >
            SHOP BY CATEGORY
            <div
              className="absolute bottom-0 left-0 w-[calc(100%+1rem)] h-[40%] backdrop-invert origin-left translate-x-4"
            />
        </span>
      </section>
      <ul
        className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full gap-0"
      >
        <LayeredStepsHaikeiMd
          className="
            hidden absolute top-1/2 left-1/2
            translate-x-[-50%] translate-y-[-50%] scale-[120%]
            w-full h-full 
          "
        />

        {category.map((itm, i) => 
          <li
            className={`
              group relative flex items-center justify-center w-full h-full aspect-[1/1] cursor-pointer bg-500 drop-shadow-md hover:z-[5]
            `}
            key={i}
          >
            <h3
              className="
                absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%]
                text-center flex-1 text-lg text-heading-invert font-bold drop-shadow-md outlined-text z-[10]
              "
            >
              {itm.categoryName}
            </h3>
            <img 
              src={itm.imgURL}
              alt="image"
              className="
                w-full h-full object-cover object-center brightness-[90%] hover:brightness-[100%]
                hover:scale-[110%] hover:z-[5]
                transition-all duraiton-300 ease-out
              "
            />
            <div
              className="
                hidden absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%]
                w-full h-full rounded-md
                bg-primary
              "
            />
          </li>
        )}
      </ul>
    </section>
  )
}
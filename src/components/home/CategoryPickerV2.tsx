// HOOKS
import Link from 'next/link';

// STORES
import { useLayoutRefStore,  useAlertMessageStore } from '@/stores/index';

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
  
  const layoutRef = useLayoutRefStore((state: any) => state.layoutRef);
  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'navigate_to_category':
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
      className="flex flex-col gap-4 py-8"
    >
      <section
        className="flex px-4"
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
            key={i}
          >
            <Link
              className={`
                group relative flex items-center justify-center w-full h-full aspect-[1/1] cursor-pointer bg-500 drop-shadow-md hover:z-[5]
                hover:scale-[110%]
                transition-all duraiton-300 ease-out
              `}
              href={`/shop/category/${itm.name}`}
              data-type="navigate_to_category"
              onClick={handleClick}
            >
            <h3
              className="
                absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%]
                text-center flex-1 text-lg text-heading-invert font-bold drop-shadow-md outlined-text z-[10]
              "
            >
              {itm.name.toUpperCase()}
            </h3>
            <img 
              src={itm.imgURL}
              alt="image"
              className="
                w-full h-full object-cover object-center brightness-[95%] group-hover:brightness-[100%] group-hover:contrast-[100%]
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
            </Link>
          </li>
        )}
      </ul>
    </section>
  )
}
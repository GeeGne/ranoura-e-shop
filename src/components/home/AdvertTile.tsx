// COMPONENTS
import DisplayImg from '@/components/DisplayImg';
import PriceTag from '@/components/PriceTag';
import ColorPallete from '@/components/ColorPallete';
import BtnA from '@/components/BtnA';
import EpArrowLeft from '@/components/svgs/EpArrowLeft';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "assets/img/outfit.jpg"
const outfit2 = "assets/img/outfit-2.jpg"
const outfit3 = "assets/img/outfit-3.jpg"

export default function AdvertTile () {
  return (
    <section
      className="flex flex-col gap-4 px-4"
    >
      <div
        className="flex justify-between"
      >
        <span
          className="relative text-3xl text-heading font-bold transform"
        >
          WHATS NEW?
          <div
            className="absolute bottom-0 left-0 w-[calc(100%+1rem)] h-[40%] backdrop-invert translate-x-4"
          />
        </span>
        <div className="flex gap-4">
          <BtnA
            className="
              w-8 h-8 bg-primary rounded-full
            "
          >
            <EpArrowLeft
              className="
                text-heading-invert p-1
              "
              width={32}
              height={32}
              role="button"
              data-type="left_arrow_button_is_clicked"
            />
          </BtnA>
          <BtnA
            className="
              w-8 h-8 bg-primary rounded-full
            "
          >
            <EpArrowLeft
              className="
                text-heading-invert p-1 rotate-180
              "
              width={32}
              height={32}
              role="button"
              data-type="left_arrow_button_is_clicked"
            />
          </BtnA>
        </div>
      </div>
      <div
        className="w-full"
      >
        <ul
          className="flex flex-row gap-4"
        >
          <li
            className="flex flex-col shrink-0 gap-2 w-[250px] md:w-[300px]"
          >
            <div
              className="relative"
            >
              <DisplayImg 
                className="w-full aspect-[2/3] object-cover object-center rounded-lg"
                src={outfit1}
                alt="Image"
              />
              <span 
                className="absolute bottom-2 left-2 text-xs text-body-invert bg-primary px-2 py-1 rounded-lg"
              >
                NEW
              </span>
            </div>
            <h3
              className="text-heading text-md"
            >
              Cozy Jacket
            </h3>
            <PriceTag />
            <ColorPallete />
          </li>
          <li
            className="flex flex-col shrink-0 gap-2 w-[250px] md:w-[300px]"
          >
            <div
              className="relative"
            >
              <DisplayImg 
                className="w-full aspect-[2/3] object-cover object-center rounded-lg"
                src={outfit1}
                alt="Image"
              />
              <span 
                className="absolute bottom-2 left-2 text-xs text-body-invert bg-primary px-2 py-1 rounded-lg"
              >
                NEW
              </span>
            </div>
            <h3
              className="text-heading text-md"
            >
              Cozy Jacket
            </h3>
            <PriceTag />
            <ColorPallete />
          </li>
          <li
            className="flex flex-col shrink-0 gap-2 w-[250px] md:w-[300px]"
          >
            <div
              className="relative"
            >
              <DisplayImg 
                className="w-full aspect-[2/3] object-cover object-center rounded-lg"
                src={outfit1}
                alt="Image"
              />
              <span 
                className="absolute bottom-2 left-2 text-xs text-body-invert bg-primary px-2 py-1 rounded-lg"
              >
                NEW
              </span>
            </div>
            <h3
              className="text-heading text-md"
            >
              Cozy Jacket
            </h3>
            <PriceTag />
            <ColorPallete />
          </li>
          <li
            className="flex flex-col shrink-0 gap-2 w-[250px] md:w-[300px]"
          >
            <div
              className="relative"
            >
              <DisplayImg 
                className="w-full aspect-[2/3] object-cover object-center rounded-lg"
                src={outfit1}
                alt="Image"
              />
              <span 
                className="absolute bottom-2 left-2 text-xs text-body-invert bg-primary px-2 py-1 rounded-lg"
              >
                NEW
              </span>
            </div>
            <h3
              className="text-heading text-md"
            >
              Cozy Jacket
            </h3>
            <PriceTag />
            <ColorPallete />
          </li>
        </ul>
      </div>
    </section>
  )
}
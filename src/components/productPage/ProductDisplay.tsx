// COMPONENTS
import BtnA from '@/components/BtnA';
import EpArrowLeft from '@/components/svgs/EpArrowLeft';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "/assets/img/outfit.webp";
const outfit2 = "/assets/img/outfit-2.jpg";
const outfit3 = "/assets/img/outfit-3.jpg";
const outfit5 = "/assets/img/outfit-5.jpg";

type Props = {
  className?: string;
}

export default function ProductDisplay ({ className, ...props }: Props) {

  const leftArrowInactive = false;

  return (
    <section
      className={`
        w-full flex flex-col gap-4
        ${className}
      `}
      {...props}
    >
      <div
        className="relative"
      >
        <img 
          className="w-full aspect-[2/3] rounded-lg object-cover object-center"
          src={outfit5}
          alt="Image"
        />
        <BtnA
          className={`
            top-1/2 left-[-0.5rem] 
            translate-y-[-50%]
            w-12 h-12 rounded-full
            flex items-center justify-center
            ${leftArrowInactive ? 'bg-inbetween cursor-not-allowed' : 'bg-primary cursor-pointer'}
          `}
          display="absolute"
          effect={!leftArrowInactive}
          data-type="scroll_left_button_is_clicked"
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
            className={`
              absolute top-1/2 right-[-0.5rem]
              translate-y-[-50%]
              w-12 h-12 rounded-full
              flex items-center justify-center
              ${leftArrowInactive ? 'bg-inbetween cursor-not-allowed' : 'bg-primary cursor-pointer'}
            `}
            display="absolute"
            effect={!leftArrowInactive}
            data-type="scroll_left_button_is_clicked"
          >
          <EpArrowLeft
            className="
              text-heading-invert p-1 rotate-[180deg]
            "
            width={32}
            height={32}
            role="button"
            data-type="left_arrow_button_is_clicked"
          />
        </BtnA>
      </div>
      <ul
        className="flex flex-row w-full items-center justify-center gap-2"
      >
        <li className="w-4 h-4 bg-inbetween rounded-full cursor-pointer" />
        <li className="w-4 h-4 bg-primary rounded-full cursor-pointer" />
        <li className="w-4 h-4 bg-inbetween rounded-full cursor-pointer" />
      </ul>
    </section>
  )
}
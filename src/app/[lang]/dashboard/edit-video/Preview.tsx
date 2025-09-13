// COMPONENTS
import VideoDisplay from "@/app/[lang]/dashboard/edit-video/VideoDisplay";
import IonDesktopOutline from "@/components/svgs/IonDesktopOutline";
import FamiconsTabletPortraitSharp from "@/components/svgs/FamiconsTabletPortraitSharp";
import FamiconsPhonePortraitOutline from "@/components/svgs/FamiconsPhonePortraitOutline";
import HugeiconsArrowExpand01 from "@/components/svgs/HugeiconsArrowExpand01";

type Props = {
  isEn?: boolean;
};

export default function Preview ({ isEn = true }: Props) {
  return (
    <section>
      <span className="text-heading font-bold text-lg">
        {isEn ? "Preview" : "العرض"}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          className="
            flex flex-col gap-2 items-center justify-center 
            bg-background-light p-4 rounded-lg
          "
        >
          <span className="text-body font-bold">
            {isEn ? "DESKTOP" : "سطح المكتب"}
          </span>
          <div className="relative w-12 h-12">
            <IonDesktopOutline
              className="
                absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
                w-full h-full text-body bg-background-light z-[5]
              "
            />
            <HugeiconsArrowExpand01
              className="
                hidden absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%]
                text-body rotate-45 w-[100px] h-[100px]
              "
            />
          </div>
          <VideoDisplay className="w-[300px] aspect-[16/9]" />
        </div>
        <div
          className="
            flex flex-col gap-2 items-center justify-center 
            bg-background-light p-4 rounded-lg
          "
        >
          <span className="text-body font-bold">
            {isEn ? "SMARTPHONE" : "هاتف"}
          </span>
          <div className="relative w-12 h-12">
            <FamiconsPhonePortraitOutline
              className="
                absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
                w-full h-full text-body bg-background-light z-[5]
              "
            />
            <HugeiconsArrowExpand01
              className="
                hidden absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%]
                text-body rotate-45 w-[100px] h-[100px]
              "
            />
          </div>
          <VideoDisplay className="w-[200px] aspect-[9/16]" />
        </div>
        <div
          className="
            flex flex-col gap-2 items-center justify-center 
            bg-background-light p-4 rounded-lg
          "
        >
          <span className="text-body font-bold">
            {isEn ? "TABLET" : "تابلت"}
          </span>
          <div className="relative w-12 h-12">
            <FamiconsTabletPortraitSharp
              className="
                absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
                w-full h-full text-body bg-background-light z-[5]
              "
            />
            <HugeiconsArrowExpand01
              className="
                hidden absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%]
                text-body rotate-45 w-[100px] h-[100px]
              "
            />
          </div>
          <VideoDisplay className="w-[250px] aspect-[3/4]" />
        </div>
        <div
          className="
            flex flex-col gap-2 items-center justify-center 
            bg-background-light p-4 rounded-lg
          "
        >
          <span className="text-body font-bold">
            {isEn ? "POSTER" : "بوستر"}
          </span>
          <div className="relative w-12 h-12">
            <FamiconsTabletPortraitSharp
              className="
                absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
                w-full h-full text-body bg-background-light z-[5]
              "
            />
            <HugeiconsArrowExpand01
              className="
                hidden absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%]
                text-body rotate-45 w-[100px] h-[100px]
              "
            />
          </div>
          <VideoDisplay className="w-[250px] aspect-[3/4]" />
        </div>
      </div>
    </section>
  )
}
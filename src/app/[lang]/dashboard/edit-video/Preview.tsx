// COMPONENTS
import VideoDisplay from "@/app/[lang]/dashboard/edit-video/VideoDisplay";
import IonDesktopOutline from "@/components/svgs/IonDesktopOutline";
import LineMdImageFilled from "@/components/svgs/LineMdImageFilled";
import FamiconsTabletPortraitSharp from "@/components/svgs/FamiconsTabletPortraitSharp";
import FamiconsPhonePortraitOutline from "@/components/svgs/FamiconsPhonePortraitOutline";
import HugeiconsArrowExpand01 from "@/components/svgs/HugeiconsArrowExpand01";

type Props = {
  isEn?: boolean;
  isLoading: boolean;
  data: Record<string, any> | null;
};

export default function Preview ({ isEn = true, isLoading, data }: Props) {
  const layoutDetailsArray = [
    {
      title: { en: 'DESKTOP', ar: 'سطح المكتب' },
      svgName: IonDesktopOutline,
      style: 'w-[300px] aspect-[16/9]'
    },{
      title: { en: 'SMARTPHONE', ar: 'هاتف' },
      svgName: FamiconsPhonePortraitOutline,
      style: 'w-[200px] aspect-[9/16]'
    },{
      title: { en: 'TABLET', ar: 'تابلت' },
      svgName: FamiconsTabletPortraitSharp,
      style: 'w-[250px] aspect-[3/4]'
    },{
      title: { en: 'POSTER', ar: 'بوستر' },
      svgName: LineMdImageFilled,
      style: 'w-[250px] aspect-[3/4]'
    },
  ]

  // DEBUG && UI
  // isLoading = true;

  if (isLoading) return (
    <section>
      <span className="--opacity-blink w-20 text-transparent bg-background-deep-light rounded-full font-bold text-lg">
        ///////////////
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {layoutDetailsArray.map((itm, i) =>
          <div
            key={i}
            className="
              flex flex-col gap-2 items-center justify-center bg-background-light p-4 rounded-lg
            "
          >
            <span className="--opacity-blink w-20 text-transparent bg-background-deep-light rounded-lg font-bold">
              {itm.title[isEn ? 'en' : 'ar']}
            </span>
            <div className="--opacity-blink w-12 h-12 bg-background-deep-light rounded-lg"/>
            <VideoDisplay className={itm.style} isLoading={true} />
          </div>
        )}
      </div>
    </section>
  );

  return (
    <section className="flex flex-col gap-4">
      <span className="text-heading font-bold text-lg">
        {isEn ? "Preview" : "العرض"}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {layoutDetailsArray.map((itm, i) =>
          <div
            key={i}
            className="
              flex flex-col gap-2 items-center justify-center 
              bg-background-light p-4 rounded-lg
            "
          >
            <span className="text-body font-bold">
              {itm.title[isEn ? 'en' : 'ar']}
            </span>
            <div className="relative w-12 h-12">
              <itm.svgName
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
            {itm.title.en === 'POSTER' 
              ? <img 
                  src={data?.poster_url}
                  className="rounded-lg object-cover object-center"
                />
              : <VideoDisplay 
                className={itm.style} 
                isLoading={isLoading}
                data={data}
              />
            }
          </div>
        )}
      </div>
    </section>
  )
}
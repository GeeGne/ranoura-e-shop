// SVGS
import DesktopMode from '@/components/svgs/DesktopMode';
import SmartPhoneMode from '@/components/svgs/SmartPhoneMode';
import MdiFileImageOutline from '@/components/svgs/MdiFileImageOutline';
import MingcuteAspectRatioFill from '@/components/svgs/MingcuteAspectRatioFill';
import MdiLessThanOrEqual from '@/components/svgs/MdiLessThanOrEqual';
import FluentSlideSize24Regular from '@/components/svgs/FluentSlideSize24Regular';
import PhFileImage from '@/components/svgs/PhFileImage';
import HugeiconsFileDown from '@/components/svgs/HugeiconsFileDown';
import StashImageArrowUp from '@/components/svgs/StashImageArrowUp';
import IconoirWebpFormat from '@/components/svgs/IconoirWebpFormat';
import TabletView from '@/components/svgs/TabletView';

type Props = {
  type: string;
  isEn: boolean;
}

export default function Description ({ type, isEn }: Props) {

  const isDesktop = type === 'desktop';
  const isHybrid = type === 'hybrid';
  const isCompact = type === 'compact';

  if (isDesktop && isEn) return (
    <div
      className="flex flex-col gap-4"
    >
      <div
        className="grid grid-cols-4 divide divide-body divide-x-[1px] w-full"
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          <PhFileImage className="w-14 h-14 text-body" strokeWidth={3.5} />
          <span className="text-body font-bold text-2xl">AVIF</span>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <StashImageArrowUp className="w-14 h-14 text-body" strokeWidth={0.5}/>
          <div className="flex items-center gap-1">
            <span className="text-body font-bold text-2xl">1 MB</span>
            <MdiLessThanOrEqual className="font-body w-6 h-6" strokeWidth={1} />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <FluentSlideSize24Regular className="text-body w-14 h-14" strokeWidth={0.3} />
          <div className="flex justify-center items-center font-bold text-2xl text-body">2:1</div>
        </div>
        <div className="flex items-center justify-center">
          <div
            className="relative"
          >
            <DesktopMode className="w-[100px] h-auto text-body z-[10]" />
            <MingcuteAspectRatioFill 
              className="
                absolute bottom-0 left-0 
                translate-x-[-50%] translate-y-[25%]
                w-[50px] h-[50px] text-shade
              "
            />
          </div>
        </div>
      </div>
      <ul
        className="list-disc px-4 text-body text-sm max-w-[550px]"
      >
        <li>
          <span className="font-bold">Aspect Ratio: 2:1</span> 
          <ul className="list-[circle] list-inside">
            <li>
              <b className="font-semibold">Standard: &nbsp;</b>1200px wide x 600px high.
            </li>
            <li>
              <b className="font-semibold">High quality: &nbsp;</b>1920px wide x 960px high.
            </li>
          </ul>
        </li>
        <li>
          <span className="font-bold">Tips:</span>
          <ul
            className="list-[circle] px-4"
          >
            <li>
              Use a wide, landscape-oriented image that represents the entire frame.
            </li>
            <li>
              Adding a button symbol says "SHOP NOW", "CHECK OFFER" etc.. is a good practice.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )

  if (isDesktop && !isEn) return (
    <div className="flex flex-col gap-4">
      <ul className="grid grid-cols-4 divide divide-body divide-x-[1px] w-full">
        <li className="flex flex-col gap-2 items-center justify-center">
          <PhFileImage className="w-14 h-14 text-body" strokeWidth={3.5} />
          <span className="text-body font-bold text-2xl">AVIF</span>
        </li>
        <li className="flex flex-col gap-2 items-center justify-center">
          <StashImageArrowUp className="w-14 h-14 text-body" strokeWidth={0.5} />
          <div className="flex items-center gap-1">
            <span className="text-body font-bold text-2xl">1 MB</span>
            <MdiLessThanOrEqual className="font-body w-6 h-6" strokeWidth={1} />
          </div>
        </li>
        <li className="flex flex-col gap-2 items-center justify-center">
          <FluentSlideSize24Regular className="text-body w-14 h-14" strokeWidth={0.3} />
          <div className="flex justify-center items-center font-bold text-2xl text-body">2:1</div>
        </li>
        <li className="flex items-center justify-center">
          <div className="relative">
            <DesktopMode className="w-[100px] h-auto text-body z-[10]" />
            <MingcuteAspectRatioFill
              className="
                absolute bottom-0 left-0
                translate-x-[-50%] translate-y-[25%]
                w-[50px] h-[50px] text-shade
              "
            />
          </div>
        </li>
      </ul>
      <ul className="list-disc px-4 text-body text-sm max-w-[550px]">
        <li>
          <span className="font-bold">نسبة العرض إلى الارتفاع: 2:1</span>
          <ul className="list-[circle] list-inside">
            <li>
              <b className="font-semibold">القياسي: &nbsp;</b>1200 بكسل عرض × 600 بكسل ارتفاع.
            </li>
            <li>
              <b className="font-semibold">جودة عالية: &nbsp;</b>1920 بكسل عرض × 960 بكسل ارتفاع.
            </li>
          </ul>
        </li>
        <li>
          <span className="font-bold">نصائح:</span>
          <ul className="list-[circle] px-4">
            <li>
              استخدم صورة عريضة باتجاه أفقي (Landscape) تعبر عن الإطار بأكمله.
            </li>
            <li>
              إضافة رمز زر مثل "تسوق الآن" أو "عرض العرض" تعتبر ممارسة جيدة.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )

  if (isHybrid && isEn) return (
    <div
      className="flex flex-col gap-4"
    >
      <div
        className="grid grid-cols-4 divide divide-body divide-x-[1px] w-full"
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          <PhFileImage className="w-14 h-14 text-body" strokeWidth={3.5} />
          <span className="text-body font-bold text-2xl">AVIF</span>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <StashImageArrowUp className="w-14 h-14 text-body" strokeWidth={0.5}/>
          <div className="flex items-center gap-1">
            <span className="text-body font-bold text-2xl">800 KB</span>
            <MdiLessThanOrEqual className="font-body w-6 h-6" strokeWidth={1} />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <FluentSlideSize24Regular className="text-body w-14 h-14" strokeWidth={0.3} />
          <div className="flex justify-center items-center font-bold text-2xl text-body">4:3</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <div
              className="relative"
            >
              <TabletView className="w-[100px] h-auto text-body z-[10]" />
              <MingcuteAspectRatioFill 
                className="
                  absolute bottom-0 left-0 
                  translate-x-[-50%] translate-y-[25%]
                  w-[50px] h-[50px] text-shade
                "
              />
            </div>
          </div>
        </div>
      </div>
      <ul
        className="list-disc px-4 text-body text-sm max-w-[550px]"
      >
        <li>
          <span className="font-bold">Aspect Ratio: 4:3</span> Standard: 1024px wide x 768px high, Hight quality: 1440px wide x 1080px high.
        </li>
        <li>
          <span className="font-bold">Tips:</span>
          <ul
            className="list-[circle] list-inside"
          >
            <li>
              Use a simple, recognizable symbol or a tightly cropped product photo from your category.
            </li>
            <li>
              Adding a button symbol says "SHOP NOW", "CHECK OFFER" etc.. is a good practice.
            </li>
            <li>
              Avoid small text or complex details, as it will be displayed at a small size.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )

  if (isHybrid && !isEn) return (
    <div className="flex flex-col gap-4">
      <div className="text-body text-sm flex flex-col gap-2 max-w-[550px]">
        <span className="text-heading">
          ستُستخدم هذه الصورة في قائمة التنقل على الأجهزة المحمولة وكأيقونة في المساحات المضغوطة.
        </span>  
        <ul className="list-disc px-4">
          <li>
            <span className="font-bold">الغرض:</span> أيقونة صغيرة أو صورة مصغرة.
          </li>
          <li>
            <span className="font-bold">نسبة العرض إلى الارتفاع: 1:1</span> (يجب أن تكون الصورة مربعًا مثاليًا. على سبيل المثال: 400 بكسل عرض × 400 بكسل ارتفاع).
          </li>
          <li>
            <span className="font-bold">التنسيق الموصى به: AVIF</span> (للحصول على أفضل جودة وأسرع تحميل). يتم قبول PNG أو JPG عالي الجودة أيضًا.
          </li>
          <li>
            <span className="font-bold">الحد الأقصى لحجم الملف:</span> استهدف أقل من 400 كيلوبايت.
          </li>
          <li>
            <span className="font-bold">نصائح:</span>
            <ul className="list-disc px-4">
              <li>
                استخدم رمزًا بسيطًا يمكن التعرف عليه أو صورة منتج مقطوعة بإحكام من فئتك.
              </li>
              <li>
                تجنب النصوص الصغيرة أو التفاصيل المعقدة، حيث سيتم عرضها بحجم صغير.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
  if (isCompact && isEn) return (
    <div
      className="flex flex-col gap-4"
    >
      <div
        className="grid grid-cols-4 divide divide-body divide-x-[1px] w-full"
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          <PhFileImage className="w-14 h-14 text-body" strokeWidth={3.5} />
          <span className="text-body font-bold text-2xl">AVIF</span>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <StashImageArrowUp className="w-14 h-14 text-body" strokeWidth={0.5}/>
          <div className="flex items-center gap-1">
            <span className="text-body font-bold text-2xl">600 KB</span>
            <MdiLessThanOrEqual className="font-body w-6 h-6" strokeWidth={1} />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <FluentSlideSize24Regular className="text-body w-14 h-14" strokeWidth={0.3} />
          <div className="flex justify-center items-center font-bold text-2xl text-body">3:4</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <div
              className="relative"
            >
              <SmartPhoneMode className="w-[100px] h-auto text-body z-[10]" />
              <MingcuteAspectRatioFill 
                className="
                  absolute bottom-0 left-0 
                  translate-x-[-50%] translate-y-[25%]
                  w-[50px] h-[50px] text-shade
                "
              />
            </div>
          </div>
        </div>
      </div>
      <ul
        className="list-disc px-4 text-body text-sm max-w-[550px]"
      >
        <li>
          <span className="font-bold">Aspect Ratio: 3:4</span> (Image must be a perfect square. For example: 400px wide x 400px high).
        </li>
        <li>
          <span className="font-bold">Tips:</span>
          <ul
            className="list-[circle] px-4"
          >
            <li>
              Use a simple, recognizable symbol or a tightly cropped product photo from your category.
            </li>
            <li>
              Adding a button symbol says "SHOP NOW", "CHECK OFFER" etc.. is a good practice.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )

  if (isCompact && !isEn) return (
    <div className="flex flex-col gap-4">
      <div className="text-body text-sm flex flex-col gap-2 max-w-[550px]">
        <span className="text-heading">
          ستُستخدم هذه الصورة في قائمة التنقل على الأجهزة المحمولة وكأيقونة في المساحات المضغوطة.
        </span>  
        <ul className="list-disc px-4">
          <li>
            <span className="font-bold">الغرض:</span> أيقونة صغيرة أو صورة مصغرة.
          </li>
          <li>
            <span className="font-bold">نسبة العرض إلى الارتفاع: 1:1</span> (يجب أن تكون الصورة مربعًا مثاليًا. على سبيل المثال: 400 بكسل عرض × 400 بكسل ارتفاع).
          </li>
          <li>
            <span className="font-bold">التنسيق الموصى به: AVIF</span> (للحصول على أفضل جودة وأسرع تحميل). يتم قبول PNG أو JPG عالي الجودة أيضًا.
          </li>
          <li>
            <span className="font-bold">الحد الأقصى لحجم الملف:</span> استهدف أقل من 400 كيلوبايت.
          </li>
          <li>
            <span className="font-bold">نصائح:</span>
            <ul className="list-disc px-4">
              <li>
                استخدم رمزًا بسيطًا يمكن التعرف عليه أو صورة منتج مقطوعة بإحكام من فئتك.
              </li>
              <li>
                تجنب النصوص الصغيرة أو التفاصيل المعقدة، حيث سيتم عرضها بحجم صغير.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
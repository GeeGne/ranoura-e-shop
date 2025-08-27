type Props = {
  type: string;
  isEn: boolean;
}

export default function Description ({ type, isEn }: Props) {

  const isDesktop = type === 'desktop';
  const isCompact = type === 'compact';

  if (isDesktop && isEn) return (
    <div
      className="flex flex-col gap-4"
    >
      <div
        className="text-body text-sm flex flex-col gap-2 max-w-[550px]"
      >
        <span
          className="text-heading"
        >
          This image will be displayed prominently at the top of the category page on desktop computers.
        </span>  
        <ul
          className="list-disc px-4"
        >
          <li>
            <span className="font-bold">Purpose:</span> Large banner image.
          </li>
          <li>
            <span className="font-bold">Aspect Ratio: 2:1</span> (Width must be exactly twice the height. For example: 1200px wide x 600px high).
          </li>
          <li>
            <span className="font-bold">Recommended Format: AVIF</span> (For the best quality and fastest loading). PNG or high-quality JPG are also accepted.
          </li>
          <li>
            <span className="font-bold">Max File Size:</span> Aim for under 400 KB.
          </li>
          <li>
            <span className="font-bold">Tips:</span>
            <ul
              className="list-disc px-4"
            >
              <li>
                Use a wide, landscape-oriented image that represents the entire category.
              </li>
              <li>
                Ensure any important details are centered, as the edges may be cropped on some screens.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )

  if (isDesktop && !isEn) return (
    <div className="flex flex-col gap-4">
      <div className="text-body text-sm flex flex-col gap-2 max-w-[550px]">
        <span className="text-heading">
          ستظهر هذه الصورة بشكل بارز في أعلى صفحة الفئة على أجهزة الكمبيوتر المكتبية.
        </span>  
        <ul className="list-disc px-4">
          <li>
            <span className="font-bold">الغرض:</span> صورة بانر كبيرة.
          </li>
          <li>
            <span className="font-bold">نسبة العرض إلى الارتفاع: 2:1</span> (يجب أن يكون العرض ضعف الارتفاع بالضبط. على سبيل المثال: 1200 بكسل عرض × 600 بكسل ارتفاع).
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
                استخدم صورة أفقية واسعة تمثل الفئة بأكملها.
              </li>
              <li>
                تأكد من أن أي تفاصيل مهمة تكون في المنتصف، حيث قد يتم اقتصاف الحواف على بعض الشاشات.
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
        className="text-body text-sm flex flex-col gap-2 max-w-[550px]"
      >
        <span
          className="text-heading"
        >
          This image will be used in the navigation menu on mobile devices and as an icon in compact spaces.
        </span>  
        <ul
          className="list-disc px-4"
        >
          <li>
            <span className="font-bold">Purpose:</span> Small icon or thumbnail.
          </li>
          <li>
            <span className="font-bold">Aspect Ratio: 1:1</span> (Image must be a perfect square. For example: 400px wide x 400px high).
          </li>
          <li>
            <span className="font-bold">Recommended Format: AVIF</span> (For the best quality and fastest loading). PNG or high-quality JPG are also accepted.
          </li>
          <li>
            <span className="font-bold">Max File Size:</span> Aim for under 400 KB.
          </li>
          <li>
            <span className="font-bold">Tips:</span>
            <ul
              className="list-disc px-4"
            >
              <li>
                Use a simple, recognizable symbol or a tightly cropped product photo from your category.
              </li>
              <li>
                Avoid small text or complex details, as it will be displayed at a small size.
              </li>
            </ul>
          </li>
        </ul>
      </div>
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
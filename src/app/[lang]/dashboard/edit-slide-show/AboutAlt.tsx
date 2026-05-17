import StashImageSearchLight from '@/components/svgs/StashImageSearchLight';

export default function AboutAlt (
  { lang = 'en', isEn = true }: { lang: string, isEn: boolean }
) {
  return (
    <div
      className="flex gap-4 w-full rounded-lg bg-white p-4"
    >
      <div
        className="flex items-center justify-center shrink-0 w-[100px] h-[100px] bg-primary rounded-lg shadow-lg"
      >
        <StashImageSearchLight className="text-heading-invert w-12 h-12"/>
        <span className="text-heading-invert font-bold text-2xl">ALT</span>
      </div>
      {isEn 
        ? <h3 className="text-body">Alt text (alternative text) is a short, descriptive HTML attribute added to an image tag that describes its content for <b>screen readers</b>, <b>SEO</b>, and when images fail to load. It is <b>curcial for web accessibility</b>, allowing visually impaired users to understand visual content, and it <b>helps search engines index images</b>.</h3>
        : <h3 className="text-body">النص البديل هو سمة HTML قصيرة ووصفية تُضاف إلى وسوم الصور لوصف محتواها لـ <b>قارئات الشاشة</b>، <b>تحسين محركات البحث (SEO)</b>، وعند فشل تحميل الصور. إنه <b>ضروري لإتاحة الوصول إلى الويب</b>، حيث يسمح للمستخدمين ضعاف البصر بفهم المحتوى المرئي، كما <b>يساعد محركات البحث في فهرسة الصور</b>.</h3> 
      }
    </div>
  )
}
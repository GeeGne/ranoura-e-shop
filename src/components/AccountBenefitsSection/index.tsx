// COMPONENTS
import LayeredStepsHaikeiMd from "@/components/svgs/layered_shapes/LayeredStepsHaikeiMd";
import Card from "@/components/AccountBenefitsSection/Card";
import UndrawPrivateData from "@/components/svgs/UndrawPrivateData";
import OfferSvg from "@/components/svgs/Offer";
import Location from "@/components/svgs/Location";
import Date from "@/components/svgs/Date";
import Notification from "@/components/svgs/Notification";
import CloudStorage from "@/components/svgs/CloudStorage";
import SvgSpinnersPulseRingsMultiple from "@/components/svgs/activity/SvgSpinnersPulseRingsMultiple";

// STORES
import { useLanguageStore } from '@/stores/index';

type Props = {
  className?: string;
}

export default function AccountBenefitsSection ({ className, ...props }: Props) {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  return (
    <section
      className={`
        grid md:grid-cols-4 lg:grid-cols-3 gap-8 max-w-[450px] md:max-w-[1100px] mx-auto
        ${className}
      `}
      { ...props }
    >
      <h2
        className={`
          md:col-span-4 lg:col-span-3 text-heading text-center font-bold text-2xl
        `}
      >
        {isEn ? 'Why Making New Account?' : 'لماذا تنشأ حسابًا جديدًا؟'}
      </h2>
      <UndrawPrivateData 
        className="md:col-span-2 lg:col-span-2 w-[300px] md:w-[400px] lg:w-[500px] h-auto mx-auto text-content"
      />
      <section
        className="
          relative grid grid-cols-1 md:col-span-2 lg:col-span-1 gap-8
          before:content-[''] before:absolute before:bottom-0 before:left-1/2
          before:translate-x-[-50%] before:w-[0.5px] before:h-full before:bg-body-extra-light
          after:content-[''] after:absolute after:md:hidden after:top-[-56px] after:left-1/2
          after:translate-x-[-50%] after:w-4 after:h-4 after:bg-body-extra-light after:rounded-full
        "
      >
        <SvgSpinnersPulseRingsMultiple 
          className="
            absolute md:hidden top-[-68px] left-1/2 
            translate-x-[-50%] w-10 h-10 text-body
          "
        />
        <div
          className="
            absolute md:hidden bottom-full left-1/2
            translate-x-[-50%] w-[0.5px] h-12 bg-body-extra-light
          "      
        />
        <Card 
          svg={<CloudStorage className="w-full h-auto text-content" />}
          title={isEn 
            ? "Save Personal Data for Faster Checkouts" 
            : "احفظ البيانات الشخصية لتسريع عمليات الدفع"
          }
          description={isEn 
            ? "Skip filling in details every time! Save your name, address, and payment information securely for isntant checkout. Perfect for busy shoppers who want to worder their favorite styles in seconds."
            : "تخطَ تعبئة التفاصيل في كل مرة! احفظ اسمك وعنوانك ومعلومات الدفع الخاصة بك بشكل آمن لتتمكن من الدفع الفوري. مثالي للمتسوقين المشغولين الذين يرغبون في طلب أنماطهم المفضلة في ثوانٍ."
          }
          className="md:relative"
        >
          <div
            className={`
              absolute invisible md:visible top-1/2
              translate-y-[-50%] w-12 h-[0.5px] bg-body-extra-light
              ${isEn ? 'right-full' : 'left-full'}
            `}
          />
          <SvgSpinnersPulseRingsMultiple
            className={`
              absolute invisible md:visible top-1/2
              translate-y-[-50%] w-10 h-10 text-body-extra-light
              ${isEn ? 'right-[calc(100%+20px)]' : 'left-[calc(100%+20px)]'}
            `}
          />
          <div
            className={`
              absolute invisible md:visible top-1/2
              translate-y-[-50%] w-4 h-4 bg-body-extra-light rounded-full
              ${isEn ? 'right-[calc(100%+2rem)]' : 'left-[calc(100%+2rem)]'}
            `}
          />
        </Card>
        <Card 
          svg={<Location className="w-full h-auto text-content" />}
          title={isEn 
            ? "Order Tracking & History"
            : "تتبع الطلبات والسجل"
          }
          description={isEn 
            ? "Track your order real-time form 'Processing' to 'Delivered.' Plus, revisist past pruchases to reorder beloved itmes or share reviews to help others shop confidently."
            : `تتبع طلبك في الوقت الفعلي من "قيد المعالجة" إلى "تم التسليم". بالإضافة إلى ذلك، راجع المشتريات السابقة لإعادة طلب العناصر المفضلة لديك أو شارك تقييماتك لمساعدة الآخرين على التسوق بثقة.`
          }
        />
        <Card 
          svg={<Date className="w-full h-auto text-content" />}
          title={isEn ? "Delivery Date & Updates" : "تاريخ التسليم والتحديثات"}
          description={isEn 
            ? "Get live updates via email or SMS so you never miss a delivery. Adjust delivery prefernces or reschedule directly from your account dashboard."
            : "احصل على تحديثات مباشرة عبر البريد الإلكتروني أو الرسائل النصية حتى لا تفوتك أي عملية تسليم. اضبط تفضيلات التسليم أو أعد جدولتها مباشرة من لوحة تحكم حسابك."
          }
        />
        <Card 
          svg={<Notification className="w-full h-auto text-content" />}
          title={isEn ? "Restock Alerts" : "تنبيهات إعادة التخزين"}
          description={isEn 
            ? "Love a sold-out item? Enable notifiactions, and well alert you the moment it's back on stock. Never miss out on trending styles again!."
            : "هل أعجبك منتج نفد من المخزون؟ فعّل الإشعارات، وسننبهك فور عودته إلى المخزون. لا تفوت أحدث الأنماط الرائجة مجددًا!"
          }
        />
        <Card 
          svg={<OfferSvg className="w-full h-auto text-content" />}
          title={isEn 
            ? "Exclusive Access to Sales & Early lanuches" 
            : "وصول حصري إلى العروض والإطلاقات المبكرة"
          }
          description={isEn 
            ? "Unlock VIP perks like realy access to seasonal sales, limited-edition collections, and members-only discounts. Your account is your key to curated fashion."
            : "افتح امتيازات كبار الشخصيات مثل الوصول المبكر إلى عروض الموسم، والمجموعات محدودة الإصدار، والخصومات الحصرية للأعضاء فقط. حسابك هو مفتاحك لعالم الموضة المختارة بعناية."
          }
        />
      </section>
    </section>
  )
}
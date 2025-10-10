// HOOKS
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import FooterList from '@/components/FooterList';
import SocialIcon from '@/components/SocialIcon';
import Facebook from '@/components/svgs/Facebook';
import Instagram from '@/components/svgs/Instagram';
import Telegram from '@/components/svgs/Telegram';
import Phone from '@/components/svgs/Phone';
import Email from '@/components/svgs/Email';
import BtnA from '@/components/BtnA';

// STORES
import { useAlertMessageStore, useLanguageStore } from '@/stores/index';

// JSON
import socialLinks from '@/json/socialLinks.json';

//API
import getSocialLinks from '@/lib/api/social-links/get';

// ASSETS
const logo = '/assets/img/ranoura-logo(2).png';
const background = '/public/assets/img/background(2).avif';

type Props = {
  className?: string;
}

export default function Footer ({ className, ...props }: Props) {

  const lang = useLanguageStore((state) => state.lang);
  const isEn = lang === 'en';

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const { data: socialLinks, isLoading, isError } = useQuery({
    queryKey: ['social-links'],
    queryFn: getSocialLinks,
  })

  const iconMap = {
    facebook: Facebook,
    instagram: Instagram,
    telegram: Telegram
  }

  const handleClick = (e: any) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'subscribe_button_is_clicked':
        setAlertToggle(Date.now());
        setAlertType("warning");
        setAlertMessage("Sorry! We're currently working on this feature.");
        break;
      default:
        console.error('Unknown type: ', type);
    }
  };

  return (
    <footer 
      className={`
        relative flex flex-col gap-4 p-4 bg-primary
        before:content-[''] before:absolute before:top-0 before:left-1/2
        before:translate-x-[-50%] before:w-screen before:h-full before:bg-primary before:z-[-1]\
        ${className}
      `}
      {...props}
    >
      <section
        className="
          grid grid-cols-1 lg:grid-cols-5 lg:gap-4
        "
      >
        <div
          className="hidden lg:inline lg:col-span-5 relative w-full [mask-image:linear-gradient(to_top,transparent_10%,black_50%)] overflow-hidden"
        >
          <img 
            src={logo}
            alt="Ranoura Logo"
            className="opacity-100 w-full h-auto object-fit object-center [mask-image:linear-gradient(to_top,transparent_10%,black_20%)]"
          />
          <div
            className="opacity-0 absolute w-full h-full inset-0 bg-cover overflow-hidden"
            style={{
              backgroundImage: `url('/assets/img/background(9).avif')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              maskImage: `url('/assets/img/ranoura-logo(2).png')`,
              WebkitMaskImage: `url('/assets/img/ranoura-logo(2).png')`,
              maskPosition: 'center',
              maskRepeat: 'no-repeat',
              maskSize: 'cover'
            }}
          />
        </div>
        <div
          className="lg:col-span-2 flex flex-col gap-2 shirnk-0 w-full max-w-[600px] lg:max-w-auto mx-auto pb-4"
        >
          <div
            className="inline lg:hidden relative w-full [mask-image:linear-gradient(to_top,transparent_10%,black_30%)] overflow-hidden"
          >
            <img 
              src={logo}
              alt="Ranoura Logo"
              className="opacity-100 w-full h-auto object-fit object-center [mask-image:linear-gradient(to_top,transparent_10%,black_30%)]"
            />
            <div
              className="opacity-0 absolute w-full h-full inset-0 bg-cover overflow-hidden"
              style={{
                backgroundImage: `url('/assets/img/background(9).avif')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                maskImage: `url('/assets/img/ranoura-logo(2).png')`,
                WebkitMaskImage: `url('/assets/img/ranoura-logo(2).png')`,
                maskPosition: 'center',
                maskRepeat: 'no-repeat',
                maskSize: 'cover',
              }}
            />
          </div>
          <span
            className="text-base text-body-invert"
          >
            {isEn 
              ? 'I am not arrogant. I know my limitations, but I also believe in my abilities. When we are united and work sincerely, we can overcome difficulties. Cooperation and mutual understanding bring light to our path. Life is a continuous journey of learning and improvement. Together, we can achieve great things and leave a meaningful impact.' 
              :'نحن في رانورا، نؤمن بأن الأزياء هي لغة عالمية تعبر عن هويتنا. بدأنا رحلتنا من الصفر، حاملين شغفاً بتقديم أزياء عالمية المستوى تصنع فارقاً. نستخدم أجود الخامات ونوظف أحدث التقنيات لضمان جودة لا تضاهى في كل قطعة نصنعها. هدفنا هو أن نكون العلامة التجارية العالمية المفضلة، حيث يجد العملاء كل ما يحتاجونه من الأزياء المميزة والأنيقة'
            }
          </span>
          <div className="flex shirnk-0">
            <input 
              className="
                p-2 bg-primary font-bold text-heading-invert border-solid border-[2px] focus:border-[2px] border-heading-invert focus:border-heading-invert outline-none
                placeholder:font-bold placeholder:text-heading-invert 

              "
              placeholder={isEn ? "Enter your email" : "اكتب إيميلك"}
            />
            <BtnA
              className="p-2 bg-heading-invert font-bold text-heading border-solid border-[2px] border-heading-invert"
              data-type="subscribe_button_is_clicked"
              onClick={handleClick}
            >
              {isEn ? 'SUBSCRIBE' : 'اشتراك'}
            </BtnA>
          </div>
        </div>
        <FooterList 
          index={0}
          title={isEn ? 'COSTUMER SERVICE' : 'خدمة العملاء'} 
          content={
            isEn 
            ? ['Privacy Policy', 'Returns & Refunds', 'Delivery and Shipment'] 
            : ['سياسة الخصوصية', 'إرجاع واسترداد الأموال', 'التوصيل والشحن']
          } 
        />
        <FooterList 
          index={1}
          title={isEn ? 'ABOUT US' : 'من نحن'} 
          content={isEn ? ['About Us', 'FAQs'] : ['حولنا', 'الأسئلة الشائعة']} 
        />
        <FooterList 
          index={2}
          title={isEn ? 'CONTACT US' : 'تواصل معنا'} 
          content={[
            <div key="1" className="flex gap-2"><Phone />+9639302942</div>, 
            <div key="2" className="flex gap-2"><Email />support@ranoura.com</div> 
          ]} 
        />
      </section>
      <section
        className="flex flex-col items-center gap-4"
      ><hr className="w-full border-body-light-invert" />
        <div
          className="flex flex-col gap-2 items-center"
        >
          <span
            className="text-heading-invert text-xl text-bold"
          >
            {isEn ? 'SOCIAL LINKS' : 'حساباتنا على السوشال'}
          </span>
          <ul
            className="flex flex-row gap-2 text-body-invert"
          >
            {isLoading && [1, 2, 3].map((num, i) =>
              <SocialIcon
                key={i}
                isLoading={isLoading}
              />
            )}
            {socialLinks?.data?.map((result: Record<string, any>, i: number) => 
              <li key={i}>
                <Link
                  href={result.url}
                  target="blank"
                >
                  <SocialIcon 
                    className="
                      text-body-invert hover:text-blue-400 hover:scale-125 cursor-pointer
                      transition-all ease-in-out duration-300
                    "
                    icon={result.icon}
                    onMouseEnter={e => e.currentTarget.style.color = result.color} 
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--font-body-invert-color)'} 
                  />
                </Link>
              </li>          
            )}
          </ul>
        </div>
        <div
          className="
            flex flex-row gap-2 items-center text-heading-invert font-bold text-[16px]
          "
          style={{direction: 'ltr', fontFamily: `'Sofia Sans Condensed', sans-serif`}}
        >
          <Link
            href="/en"
            scroll={false}
            className={`
              ${isEn 
                ? 'font-medium text-heading-invert' 
                : 'text-body-invert font-light'
              }
              hover:font-medium hover:text-heading-invert
              transition-all duration-300 ease-in-out
            `}
          >
            English
          </Link> {'|'}
          <Link
            href="/ar"
            scroll={false}
            className={`
              hover:font-medium hover:text-heading-invert
              ${isEn ? 'text-body-invert font-light' : 'font-medium text-heading-invert'}
              transition-all duration-300 ease-in-out 
            `}
          >
            العربيه
          </Link>
        </div>
        <div>
          <span
            className="text-body-light-invert text-sm"
          >
            {isEn 
              ? 'Syria © 2025 RANOURA all rights reserved' 
              : 'سوريا © 2025 رانورا جميع الحقوق محفوظة'
            }
          </span>
        </div>
        {/* <div className="flex gap-2">
          <span className="text-heading-invert font-light">خفيف</span>
          <span className="text-heading-invert font-base">عادي</span>
          <span className="text-heading-invert font-medium">وسط</span>
          <span className="text-heading-invert font-semibold">شوي سميك</span>
          <span className="text-heading-invert font-bold">سميك</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-heading-invert text-xs">اكس سمال</span>
          <span className="text-heading-invert text-sm">سمال</span>
          <span className="text-heading-invert text-base">عادي</span>
          <span className="text-heading-invert text-lg">ال جي</span>
          <span className="text-heading-invert text-xl">اكس ال</span>
          <span className="text-heading-invert text-2xl">اكس اكس ال</span>
        </div> */}
      </section>
    </footer>
  )
}
// COMPONENTS
import DesktopMode from '@/components/svgs/DesktopMode';
import SmartPhoneMode from '@/components/svgs/SmartPhoneMode';
import MingcuteAspectRatioFill from '@/components/svgs/MingcuteAspectRatioFill';
import Description from '@/app/[lang]/dashboard/edit-categories/instructions/Description';

// STORES
import { useLanguageStore } from '@/stores/index';

// ASSETS
const NavBarLgImg = '/assets/img/NavBarImg-example.avif';
const NavBarCompactImg = '/assets/img/NavBarCompactImg-example.avif';

export default function Instructions () {
  
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  return (
    <section
      className="py-4 rounded-lg"
    >
      <h3
        className="text-heading text-lg font-bold"
      >
        {isEn ? 'Image Display Instructions' : 'تفاصيل عرض الصوره'}
      </h3>
      <div
        className="flex flex-col lg:flex-row justify-between lg:justify-normal gap-8 p-4"
      >
        <div
          className="relative flex flex-col lg:flex-1 items-center gap-4 bg-white p-4 rounded-lg"
        >
          <div
            className="
              absolute top-0 left-0 w-[75px] h-[75px] 
              flex items-center justify-center
              bg-body-light rounded-lg"
          >
            <span
              className="text-heading-invert font-bold text-[70px]"
            >
              1
            </span>
          </div>
          <div
            className="relative"
          >
            <DesktopMode className="w-[200px] h-auto text-content z-[10]" />
            <MingcuteAspectRatioFill 
              className="
                absolute bottom-0 left-0 
                translate-x-[-50%] translate-y-[25%]
                w-[130px] h-[130px] text-shade
              "
            />
          </div>
          <span
            className="text-content font-bold"
          >
            {isEn ? 'Desktop Mode (full-screen)' : 'وضع سطح مكتب (ابعاد كامله)'}
          </span>
          <Description 
            type="desktop"
            isEn={isEn} 
          />
          <img 
            src={NavBarLgImg}
            className="w-[600px] object-cover obejct-center shrink-0 rounded-lg"
          />
        </div>
        <div
          className="relative flex flex-col lg:flex-1 items-center gap-4 bg-white p-4 rounded-lg"
        >
        <div
            className="
              absolute top-0 left-0 w-[75px] h-[75px] 
              flex items-center justify-center
              bg-body-light rounded-lg"
          >
            <span
              className="text-heading-invert font-bold text-[70px]"
            >
              2
            </span>
          </div>

          <div
            className="relative"
          >
            <SmartPhoneMode className="w-[100px] h-auto text-content" />
            <MingcuteAspectRatioFill 
              className="
                absolute bottom-0 left-0 
                translate-x-[-50%] translate-y-[25%]
                w-[130px] h-[130px] text-shade
              "
            />
          </div>
          <span
            className="text-content font-bold"
          >
            {isEn ? 'Compact Mode (Smartphone, Tablet)' : 'وضع مصغر (موبايل, تابلت)'}
          </span>
          <Description 
            type="compact" 
            isEn={isEn} 
          />
          <img 
            src={NavBarCompactImg}
            className="w-[400px] object-cover object-center shrink-0 rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
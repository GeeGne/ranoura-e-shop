// COMPONENTS
import DesktopMode from '@/components/svgs/DesktopMode';
import MingcuteAspectRatioFill from '@/components/svgs/MingcuteAspectRatioFill';
import SolarSliderVerticalMinimalisticBold from '@/components/svgs/SolarSliderVerticalMinimalisticBold';
import SmartPhoneMode from '@/components/svgs/SmartPhoneMode';
import Description from '@/app/[lang]/dashboard/edit-slide-show/instructions/Description';

// STORES
import { useLanguageStore } from '@/stores/index';

// ASSETS
const NavBarLgImg = '/assets/img/NavBarImg-example.avif';
const NavBarCompactImg = '/assets/img/NavBarCompactImg-example.avif';
const imageLG = "/assets/img/slide-show-lg.avif";
const imageMD = "/assets/img/slide-show-md.avif";
const imageSM = "/assets/img/slide-show-sm.avif";

export default function Instructions () {
  
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  return (
    <section
      className="flex flex-col gap-4 rounded-lg"
    >
      <h3
        className="text-heading text-lg font-bold"
      >
        {isEn ? 'Image Display Instructions' : 'تفاصيل عرض الصوره'}
      </h3>
      <div
        className="flex flex-col lg:flex-row lg:flex-wrap justify-between lg:justify-normal gap-8"
      >
        <div
          className="relative flex flex-col lg:flex-1 lg:min-w-[450px] items-center gap-4 bg-white p-4 rounded-lg"
        >
          <div
            className={`
              absolute top-0 ${isEn ? 'left-0' : 'right-0'} w-[50px] h-[50px] 
              flex items-center justify-center
              bg-body-light rounded-lg
            `}
          >
            <span
              className="text-heading-invert font-bold text-[50px]"
            >
              1
            </span>
          </div>
          <div
            className="hidden relative"
          >
            <DesktopMode className="w-[200px] h-auto text-body z-[10]" />
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
            src={imageLG}
            className="w-[600px] object-cover obejct-center shrink-0 rounded-lg"
          />
        </div>
        <div
          className="relative flex flex-col lg:flex-1 items-center lg:min-w-[500px] gap-4 bg-white p-4 rounded-lg"
        >
          <div
            className={`
              absolute top-0 ${isEn ? 'left-0' : 'right-0'} w-[50px] h-[50px] 
              flex items-center justify-center
              bg-body-light rounded-lg
            `}
          >
            <span
              className="text-heading-invert font-bold text-[50px]"
            >
              2
            </span>
          </div>
          <div
            className="hidden relative"
          >
            <DesktopMode className="w-[200px] h-auto text-body z-[10]" />
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
            {isEn ? 'Hybrid Mode (Tablet & Desktop)' : 'وضع متوسط (شاشه & تابلت)'}
          </span>
          <Description 
            type="hybrid"
            isEn={isEn} 
          />
          <img 
            src={imageMD}
            className="w-[600px] object-cover obejct-center shrink-0 rounded-lg"
          />
        </div>
        <div
          className="relative flex flex-col lg:flex-1 items-center lg:min-w-[450px] gap-4 bg-white p-4 rounded-lg"
        >
        <div
            className={`
              absolute top-0 ${isEn ? 'left-0' : 'right-0'} w-[50px] h-[50px] 
              flex items-center justify-center
              bg-body-light rounded-lg
            `}
          >
            <span
              className="text-heading-invert font-bold text-[50px]"
            >
              3
            </span>
          </div>
          <div
            className="hidden relative"
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
            src={imageSM}
            className="w-[250px] object-cover object-center shrink-0 rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
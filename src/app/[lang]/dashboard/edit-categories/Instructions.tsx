// COMPONENTS
import DesktopMode from '@/components/svgs/DesktopMode';
import SmartPhoneMode from '@/components/svgs/SmartPhoneMode';
import MingcuteAspectRatioFill from '@/components/svgs/MingcuteAspectRatioFill';

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
      className="bg-background-light p-4 rounded-lg"
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
          className="relative flex flex-col lg:flex-1 items-center gap-4 bg-background p-4 rounded-lg"
        >
          <div
            className="
              absolute top-0 left-0 w-[75px] h-[75px] 
              flex items-center justify-center
              bg-body-light rounded-lg"
          >
            <span
              className="text-body-invert font-bold text-[70px]"
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
            Desktop Mode (full-screen)
          </span>
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
                  <span className="font-bold">Aspect Ratio:</span> 2:1 (Width must be exactly twice the height. For example: 1200px wide x 600px high).
                </li>
                <li>
                  <span className="font-bold">Recommended Format:</span> AVIF (For the best quality and fastest loading). PNG or high-quality JPG are also accepted.
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
          <img 
            src={NavBarLgImg}
            className="w-[600px] object-cover obejct-center shrink-0 rounded-lg"
          />
        </div>
        <div
          className="relative flex flex-col lg:flex-1 items-center gap-4 bg-background p-4 rounded-lg"
        >
        <div
            className="
              absolute top-0 left-0 w-[75px] h-[75px] 
              flex items-center justify-center
              bg-body-light rounded-lg"
          >
            <span
              className="text-body-invert font-bold text-[70px]"
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
            Compact Mode (Smartphone, Tablet)
          </span>
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
                  <span className="font-bold">Aspect Ratio:</span> 2:1 (Width must be exactly twice the height. For example: 1200px wide x 600px high).
                </li>
                <li>
                  <span className="font-bold">Recommended Format:</span> AVIF (For the best quality and fastest loading). PNG or high-quality JPG are also accepted.
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
          <img 
            src={NavBarCompactImg}
            className="w-[400px] object-cover object-center shrink-0 rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
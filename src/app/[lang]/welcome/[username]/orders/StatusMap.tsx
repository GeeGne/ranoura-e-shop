// COMPONENTS
import LineMdConfirmCircleFilled from '@/components/svgs/LineMdConfirmCircleFilled';
import LineMdCircleFilled from '@/components/svgs/LineMdCircleFilled';

// JSON
import STATUS_TRANSLATIONS from '@/json/translate/STATUS_TRANSLATIONS.json';

// LIB
import getTranslation from '@/utils/getTranslation';

export default function StatusMap () {
  const status: string = "SHIPPED";

  if (status === "CONFIRMED") return (
    <div className="flex flex-col w-full text-transparent items-center gap-2">
      <section 
        className="relative flex w-[calc(100%-1rem)]"
      >
        <div 
          className="
            absolute top-1/2 translate-y-[-50%] left-0 w-[calc(100%-1rem)] h-2 bg-green-500
          "
        />
        <ul 
          className="
            w-full h-full
            flex justify-between items-center
          "
        >
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            1
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            2
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            3
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            4
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
        </ul>
      <div 
        className="
          --status-mask-ani absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
          w-full text-transparent h-[50px] brightness-[150%]
        "
      >
        <div 
          className="
            absolute top-1/2 translate-y-[-50%] left-0 w-[calc(100%-1rem)] h-2 bg-green-500
          "
        />
        <ul className="
            absolute top-0 left-0 w-full h-full
            flex justify-between items-center
          "
        >
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            1
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            2
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            3
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            4
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
        </ul>
      </div>
      </section>
      <ul className="flex justify-between w-full">
        <span 
          className="text-inbetween font-bold" 
        >
          {getTranslation(STATUS_TRANSLATIONS, 'PENDING').toUpperCase()}
        </span>
        <span 
          className="text-inbetween font-bold" 
        >
          {getTranslation(STATUS_TRANSLATIONS, 'CONFIRMED').toUpperCase()}
        </span>
        <span 
          className="text-inbetween font-bold" 
        >
          {getTranslation(STATUS_TRANSLATIONS, 'SHIPPED').toUpperCase()}
        </span>
        <span 
          className="text-heading font-bold" 
        >
          {getTranslation(STATUS_TRANSLATIONS, 'DELIVERED').toUpperCase()}
        </span>
      </ul>
    </div>
  )

  if (status === "SHIPPED") return (
    <div className="flex flex-col w-full text-transparent items-center gap-2">
      <section 
        className="relative flex w-[calc(100%-1rem)]"
      >
        <div 
          className="
            absolute top-1/2 translate-y-[-50%] left-0 w-[calc(100%-1rem)] h-2 bg-[oklch(70.4%0.14182.503)]
          "
        />
        <ul 
          className="
            w-full h-full
            flex justify-between items-center z-[10]
          "
        >
          <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%0.14182.503)]">
            1
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%0.14182.503)]">
            2
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%0.14182.503)]">
            3
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-inbetween">
            4
            <LineMdCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
        </ul>
        <div 
          className="
            absolute top-1/2 translate-y-[-50%] right-0 w-[33.33%] h-2 bg-inbetween z-[5]
          "
        />
        <div 
          className="
            --status-mask-ani absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
            w-full text-transparent h-[50px] brightness-[150%]
          "
        >
          <div 
            className="
              absolute top-1/2 translate-y-[-50%] left-0 w-[calc(100%-1rem)] h-2 bg-[oklch(70.4%0.14182.503)]
            "
          />
          <ul className="
              absolute top-0 left-0 w-full h-full
              flex justify-between items-center z-[20]
            "
          >
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%0.14182.503)]">
              1
              <LineMdConfirmCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%0.14182.503)]">
              2
              <LineMdConfirmCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%0.14182.503)]">
              3
              <LineMdConfirmCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%0.14182.503)]">
              4
              <LineMdCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
          </ul>
        </div>
      </section>
      <ul className="flex justify-between w-full">
        <span 
          className="text-inbetween font-bold" 
        >
          {getTranslation(STATUS_TRANSLATIONS, 'PENDING').toUpperCase()}
        </span>
        <span 
          className="text-inbetween font-bold" 
        >
          {getTranslation(STATUS_TRANSLATIONS, 'CONFIRMED').toUpperCase()}
        </span>
        <span 
          className="text-heading font-bold" 
        >
          {getTranslation(STATUS_TRANSLATIONS, 'SHIPPED').toUpperCase()}
        </span>
        <span 
          className="text-inbetween font-bold" 
        >
          {getTranslation(STATUS_TRANSLATIONS, 'DELIVERED').toUpperCase()}
        </span>
      </ul>
    </div>
  )
}
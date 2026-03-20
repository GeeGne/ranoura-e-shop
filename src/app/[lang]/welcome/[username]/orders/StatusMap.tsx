// COMPONENTS
import LineMdConfirmCircleFilled from '@/components/svgs/LineMdConfirmCircleFilled';
import LineMdCircleFilled from '@/components/svgs/LineMdCircleFilled';

// JSON
import STATUS_TRANSLATIONS from '@/json/translate/STATUS_TRANSLATIONS.json';

// LIB
import getTranslation from '@/utils/getTranslation';

type Props = {
  lang?: 'en' | 'ar';
  isEn?: boolean;
  status?: string;
  isLoading?: boolean;
}

export default function StatusMap ({
  lang = 'en',
  isEn = true,
  status = 'PENDING',
  isLoading = false
}: Props) {

  if (isLoading) return (
    <div className="flex flex-col w-full text-transparent items-center gap-2">
      <section 
        className="--opacity-blink relative flex w-[calc(100%-1rem)]"
      >
        <div 
          className="
            absolute top-1/2 translate-y-[-50%] left-0 w-[calc(100%-1rem)] h-2 bg-background-deep-light
          "
        />
        <ul 
          className="
            w-full h-full
            flex justify-between items-center
          "
        >
          <li className="relative w-[50px] h-[50px] rounded-full bg-background-deep-light">
            1
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-background-deep-light">
            2
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-background-deep-light">
            3
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-background-deep-light">
            4
          </li>
        </ul>
      </section>
      <ul className="flex justify-between w-full">
        <span 
          className="--opacity-blink text-transparent bg-background-deep-light rounded-md font-bold" 
        >
          {getTranslation(STATUS_TRANSLATIONS, 'PENDING', lang)?.toUpperCase()}
        </span>
        <span 
          className="--opacity-blink text-transparent bg-background-deep-light rounded-md font-bold" 
        >
          {getTranslation(STATUS_TRANSLATIONS, 'CONFIRMED', lang)?.toUpperCase()}
        </span>
        <span 
          className="--opacity-blink text-transparent bg-background-deep-light rounded-md font-bold" 
        >
          {getTranslation(STATUS_TRANSLATIONS, 'SHIPPED', lang)?.toUpperCase()}
        </span>
        <span 
          className="--opacity-blink text-transparent bg-background-deep-light rounded-md font-bold" 
        >
          {getTranslation(STATUS_TRANSLATIONS, 'DELIVERED', lang)?.toUpperCase()}
        </span>
      </ul>
    </div>
  )

  if (isEn) {
    if (status === "DELIVERED") return (
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
            w-full text-transparent h-[50px] brightness-[125%]
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
            {getTranslation(STATUS_TRANSLATIONS, 'PENDING', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'CONFIRMED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'SHIPPED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-heading font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'DELIVERED', lang)?.toUpperCase()}
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
              absolute top-1/2 translate-y-[-50%] left-0 w-[calc(100%-1rem)] h-2 bg-[oklch(70.4%_0.14_182.503)]
            "
          />
          <ul 
            className="
              w-full h-full
              flex justify-between items-center z-[15]
            "
          >
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
              1
              <LineMdConfirmCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
              2
              <LineMdConfirmCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
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
              absolute top-1/2 translate-y-[-50%] right-[50px] w-[calc(33.33%-67px)] h-2 bg-inbetween z-[25]
            "
          />
          <div 
            className="
              --status-mask-ani-progressing absolute top-1/2 translate-y-[-50%] right-[50px]
              w-[calc(33.33%-67px)] h-2 bg-inbetween z-[10] brightness-[120%] z-[30]
            "
          />
          <div 
            className="
              --status-mask-ani absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
              w-full text-transparent h-[50px] brightness-[125%] z-[20]
            "
          >
            <div 
              className="
                absolute top-1/2 translate-y-[-50%] left-0 w-[calc(68%-1rem)] h-2 bg-[oklch(70.4%_0.14_182.503)]
              "
            />
            <ul className="
                absolute top-0 left-0 w-full h-full
                flex justify-between items-center z-[5]
              "
            >
              <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
                1
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
                2
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
                3
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="invisible relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
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
            {getTranslation(STATUS_TRANSLATIONS, 'PENDING', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'CONFIRMED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-heading font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'SHIPPED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'DELIVERED', lang)?.toUpperCase()}
          </span>
        </ul>
      </div>
    )

    if (status === "CONFIRMED") return (
      <div className="flex flex-col w-full text-transparent items-center gap-2">
        <section 
          className="relative flex w-[calc(100%-1rem)]"
        >
          <div 
            className="
              absolute top-1/2 translate-y-[-50%] left-0 w-[calc(33.33%-1rem)] h-2 bg-[oklch(68.5%_0.169_237.323)]
            "
          />
          <ul 
            className="
              w-full h-full
              flex justify-between items-center z-[15]
            "
          >
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
              1
              <LineMdConfirmCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
              2
              <LineMdConfirmCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-inbetween">
              3
              <LineMdCircleFilled 
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
              absolute top-1/2 translate-y-[-50%] right-[50px] 
              w-[calc(33.33%-67px)] h-2 bg-inbetween z-[25]
            "
          />
          <div 
            className="
              absolute top-1/2 translate-y-[-50%] right-[calc(33.33%+33px)]
              w-[calc(33.33%-66px)] h-2 bg-inbetween z-[25]
            "
          />
          <div 
            className="
              --status-mask-ani-progressing absolute top-1/2 translate-y-[-50%] right-[calc(33.33%+33px)]
              w-[calc(33.33%-66px)] h-2 bg-inbetween brightness-[120%] z-[30]
            "
          />
          <div 
            className="
              --status-mask-ani absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
              w-full text-transparent h-[50px] brightness-[125%] z-[20]
            "
          >
            <div 
              className="
                absolute top-1/2 translate-y-[-50%] left-0 w-[calc(33.33%-1rem)] h-2 bg-[oklch(68.5%_0.169_237.323)]
              "
            />
            <ul className="
                absolute top-0 left-0 w-full h-full
                flex justify-between items-center z-[5]
              "
            >
              <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
                1
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
                2
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="invisible relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
                3
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="invisible relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
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
            {getTranslation(STATUS_TRANSLATIONS, 'PENDING', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-heading font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'CONFIRMED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'SHIPPED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'DELIVERED', lang)?.toUpperCase()}
          </span>
        </ul>
      </div>
    )

    if (status === "PENDING") return (
      <div className="flex flex-col w-full text-transparent items-center gap-2">
        <section 
          className="relative flex w-[calc(100%-1rem)]"
        >
          <ul 
            className="
              w-full h-full
              flex justify-between items-center z-[15]
            "
          >
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(79.5%_0.184_86.047)]">
              1
              <LineMdConfirmCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-inbetween">
              2
              <LineMdCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-inbetween">
              3
              <LineMdCircleFilled 
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
              absolute top-1/2 translate-y-[-50%] left-[50px] 
              w-[calc(33.33%-67px)] h-2 bg-inbetween z-[25]
            "
          />
          <div 
            className="
              absolute top-1/2 translate-y-[-50%] right-[50px] 
              w-[calc(33.33%-67px)] h-2 bg-inbetween z-[25]
            "
          />
          <div 
            className="
              absolute top-1/2 translate-y-[-50%] right-[calc(33.33%+33px)]
              w-[calc(33.33%-66px)] h-2 bg-inbetween z-[25]
            "
          />
          <div 
            className="
              --status-mask-ani-progressing absolute top-1/2 translate-y-[-50%] left-[50px]
              w-[calc(33.33%-66px)] h-2 bg-inbetween brightness-[120%] z-[30]
            "
          />
          <div 
            className="
              --status-mask-ani absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
              w-full text-transparent h-[50px] brightness-[125%] z-[20]
            "
          >
            <ul className="
                absolute top-0 left-0 w-full h-full
                flex justify-between items-center z-[5]
              "
            >
              <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(79.5%_0.184_86.047)]">
                1
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="invisible relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
                2
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="invisible relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
                3
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="invisible relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
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
            className="text-heading font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'PENDING', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'CONFIRMED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'SHIPPED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'DELIVERED', lang)?.toUpperCase()}
          </span>
        </ul>
      </div>
    )
  }

  if (!isEn) {
    if (status === "DELIVERED") return (
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
            --status-mask-ar-ani absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
            w-full text-transparent h-[50px] brightness-[125%]
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
            {getTranslation(STATUS_TRANSLATIONS, 'PENDING', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'CONFIRMED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'SHIPPED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-heading font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'DELIVERED', lang)?.toUpperCase()}
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
              absolute top-1/2 translate-y-[-50%] right-0 w-[calc(100%-1rem)] h-2 bg-[oklch(70.4%_0.14_182.503)]
            "
          />
          <ul 
            className="
              w-full h-full
              flex justify-between items-center z-[15]
            "
          >
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
              1
              <LineMdConfirmCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
              2
              <LineMdConfirmCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
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
              absolute top-1/2 translate-y-[-50%] left-[50px] w-[calc(33.33%-67px)] h-2 bg-inbetween z-[25]
            "
          />
          <div 
            className="
              --status-mask-ar-ani-progressing absolute top-1/2 translate-y-[-50%] left-[50px]
              w-[calc(33.33%-67px)] h-2 bg-inbetween z-[10] brightness-[120%] z-[30]
            "
          />
          <div 
            className="
              --status-mask-ar-ani absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
              w-full text-transparent h-[50px] brightness-[125%] z-[20]
            "
          >
            <div 
              className="
                absolute top-1/2 translate-y-[-50%] right-0 w-[calc(68%-1rem)] h-2 bg-[oklch(70.4%_0.14_182.503)]
              "
            />
            <ul className="
                absolute top-0 left-0 w-full h-full
                flex justify-between items-center z-[5]
              "
            >
              <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
                1
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
                2
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
                3
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="invisible relative w-[50px] h-[50px] rounded-full bg-[oklch(70.4%_0.14_182.503)]">
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
            {getTranslation(STATUS_TRANSLATIONS, 'PENDING', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'CONFIRMED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-heading font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'SHIPPED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'DELIVERED', lang)?.toUpperCase()}
          </span>
        </ul>
      </div>
    )

    if (status === "CONFIRMED") return (
      <div className="flex flex-col w-full text-transparent items-center gap-2">
        <section 
          className="relative flex w-[calc(100%-1rem)]"
        >
          <div 
            className="
              absolute top-1/2 translate-y-[-50%] right-0 w-[calc(33.33%-1rem)] h-2 bg-[oklch(68.5%_0.169_237.323)]
            "
          />
          <ul 
            className="
              w-full h-full
              flex justify-between items-center z-[15]
            "
          >
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
              1
              <LineMdConfirmCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
              2
              <LineMdConfirmCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-inbetween">
              3
              <LineMdCircleFilled 
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
              absolute top-1/2 translate-y-[-50%] left-[50px] 
              w-[calc(33.33%-67px)] h-2 bg-inbetween z-[25]
            "
          />
          <div 
            className="
              absolute top-1/2 translate-y-[-50%] right-[calc(33.33%+33px)]
              w-[calc(33.33%-66px)] h-2 bg-inbetween z-[25]
            "
          />
          <div 
            className="
              --status-mask-ar-ani-progressing absolute top-1/2 translate-y-[-50%] left-[calc(33.33%+33px)]
              w-[calc(33.33%-66px)] h-2 bg-inbetween brightness-[120%] z-[30]
            "
          />
          <div 
            className="
              --status-mask-ar-ani absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
              w-full text-transparent h-[50px] brightness-[125%] z-[20]
            "
          >
            <div 
              className="
                absolute top-1/2 translate-y-[-50%] right-0 w-[calc(33.33%-1rem)] h-2 bg-[oklch(68.5%_0.169_237.323)]
              "
            />
            <ul className="
                absolute top-0 right-0 w-full h-full
                flex justify-between items-center z-[5]
              "
            >
              <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
                1
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
                2
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="invisible relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
                3
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="invisible relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
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
            {getTranslation(STATUS_TRANSLATIONS, 'PENDING', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-heading font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'CONFIRMED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'SHIPPED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'DELIVERED', lang)?.toUpperCase()}
          </span>
        </ul>
      </div>
    )

    if (status === "PENDING") return (
      <div className="flex flex-col w-full text-transparent items-center gap-2">
        <section 
          className="relative flex w-[calc(100%-1rem)]"
        >
          <ul 
            className="
              w-full h-full
              flex justify-between items-center z-[15]
            "
          >
            <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(79.5%_0.184_86.047)]">
              1
              <LineMdConfirmCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-inbetween">
              2
              <LineMdCircleFilled 
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
              />
            </li>
            <li className="relative w-[50px] h-[50px] rounded-full bg-inbetween">
              3
              <LineMdCircleFilled 
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
              absolute top-1/2 translate-y-[-50%] left-[50px] 
              w-[calc(33.33%-67px)] h-2 bg-inbetween z-[25]
            "
          />
          <div 
            className="
              absolute top-1/2 translate-y-[-50%] right-[50px] 
              w-[calc(33.33%-67px)] h-2 bg-inbetween z-[25]
            "
          />
          <div 
            className="
              absolute top-1/2 translate-y-[-50%] right-[calc(33.33%+33px)]
              w-[calc(33.33%-66px)] h-2 bg-inbetween z-[25]
            "
          />
          <div 
            className="
              --status-mask-ar-ani-progressing absolute top-1/2 translate-y-[-50%] right-[50px]
              w-[calc(33.33%-66px)] h-2 bg-inbetween brightness-[120%] z-[30]
            "
          />
          <div 
            className="
              --status-mask-ar-ani absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
              w-full text-transparent h-[50px] brightness-[125%] z-[20]
            "
          >
            <ul className="
                absolute top-0 left-0 w-full h-full
                flex justify-between items-center z-[5]
              "
            >
              <li className="relative w-[50px] h-[50px] rounded-full bg-[oklch(79.5%_0.184_86.047)]">
                1
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="invisible relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
                2
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="invisible relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
                3
                <LineMdConfirmCircleFilled 
                  className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
                />
              </li>
              <li className="invisible relative w-[50px] h-[50px] rounded-full bg-[oklch(68.5%_0.169_237.323)]">
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
            className="text-heading font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'PENDING', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'CONFIRMED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'SHIPPED', lang)?.toUpperCase()}
          </span>
          <span 
            className="text-inbetween font-bold" 
          >
            {getTranslation(STATUS_TRANSLATIONS, 'DELIVERED', lang)?.toUpperCase()}
          </span>
        </ul>
      </div>
    )
  }
}
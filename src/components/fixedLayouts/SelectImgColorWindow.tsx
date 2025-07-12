// HOOKS
import { useState, useReducer } from 'react';

// COMPONENTS
import RiAddLine from '@/components/svgs/RiAddLine';
import RiCheckFill from '@/components/svgs/RiCheckFill';
import LineMdImageFilled from '@/components/svgs/LineMdImageFilled';
import LineMdPlus from '@/components/svgs/LineMdPlus';
import MdiColor from '@/components/svgs/MdiColor';
import LineMdConfirm from '@/components/svgs/LineMdConfirm';

// STORES
import { useTabNameStore, useLanguageStore, useSelectImgColorWindowStore } from '@/stores/index';

// JSON
import colorsArray from '@/json/colors.json';

// UTILS
import getColor from '@/utils/getColor';

export default function SelectImgColorWindow () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const toggle = useSelectImgColorWindowStore(state => state.toggle);
  const setToggle = useSelectImgColorWindowStore(state => state.setToggle);
  const selectedColor = useSelectImgColorWindowStore(state => state.selectedColor);
  const setSelectedColor = useSelectImgColorWindowStore(state => state.setSelectedColor);

  const [ selectedColorByName, setSelectedColorByName ] = useState<any>('');

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { type, colorName } = e.currentTarget.dataset;

    switch (type) {
      case 'fixed_window_is_clicked':
        setToggle(false);
        break;
      case 'fixed_box_is_clicked':
        break;
      case 'add_new_image_button_is_clicked':
        break;
      case 'color_button_is_clicked':
        setSelectedColorByName(colorName);
        break;
      case 'cancel_button_is_clicked':
        setToggle(false);
        break;
      case 'accept_button_is_clicked':
        setSelectedColor(getColor(colorsArray, selectedColorByName));
        setToggle(false);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG & UI
  // const toggle = true;
  // console.log('toggle: ', toggle);

  return (
    <div
      className={`
        fixed top-0 left-0
        w-full h-full
        bg-[var(--shade-color)] z-[5000]
        transition-all duration-200 ease-out
        ${toggle ? 'visible opacity-100 backdrop-blur-[3px]' : 'invisible opacity-0 backdrop-blur-[0px]'}
      `}
      data-type="fixed_window_is_clicked"
      onClick={handleClick}
    >
      <div
        className={`
          absolute top-1/2 left-1/2 
          translate-x-[-50%] translate-y-[-50%]
          h-[calc(100%-2rem)] rounded-lg overflow-y-scroll
          bg-background overflow-hidden
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${toggle ? 'scale-100 opacity-100' : 'scale-[80%] opacity-0'}
        `}
        data-type="fixed_box_is_clicked"
        onClick={handleClick}
      >
        <section
          className="
            flex text-body-light justify-center py-4 font-bold px-2
          "
        >
          <h2>
            {isEn ? 'CHOOSE COLOR' : 'اختر لون'}
          </h2>
        </section>
        <hr className="border-inbetween" />
        <section
          className="flex flex-col gap-2 w-full px-2 py-4"
        >
          <ul
            className="grid grid-cols-4 gap-2 w-[550px]"
          >
            {colorsArray.map((itm, i) =>
              <li
                key={i}
                className="
                  relative h-[70px] rounded-lg cursor-pointer
                "
                role="button"
                data-type="color_button_is_clicked"
                data-index={i}
                data-color-name={itm.name}
                onClick={handleClick}
              >
                <div
                  className={`
                    absolute top-0 left-0
                    w-full h-full rounded-lg
                    transtition-all duration-300 ease-in-out
                    ${selectedColorByName === itm.name ? 'bg-green-500' : 'bg-transparent'}
                  `}
                />
                <div
                  className={`
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%]
                    w-[calc(100%-1rem)] h-[calc(100%-1rem)]
                    rounded-lg
                  `}
                  style={{backgroundColor: itm.hex}}
                />
                <span
                  className="
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%]
                    text-heading-invert text-sm font-bold 
                    whitespace-nowrap z-[10]
                  "
                >
                  {itm.title[isEn ? 'en' : 'ar']}
                </span>
                <span
                  className="
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%]
                    text-transparent text-sm font-bold h-4
                    drop-shadow-lg bg-shade blur-[3px]
                    px-1 z-[5]
                  "
                >
                  {itm.title[isEn ? 'en' : 'ar']}
                </span>
                <div
                  className={`
                    absolute top-0 left-0
                    w-full h-full backdrop-blur-[4px]
                    rounded-lg flex items-center justify-center gap-1
                    text-heading-invert font-bold bg-shade z-[15]
                    transition-all duration-300 ease-in-out opacity-0
                    ${selectedColorByName === itm.name ? 'hover:opacity-0' : 'hover:opacity-100'}
                  `}
                >
                  <span>{isEn ? 'select' : 'اختار'}</span>
                  <LineMdConfirm className="w-4 h-4" />
                </div>
              </li>
            )}
          </ul>
        </section>
        <hr className="border-inbetween" />
        <section
          className="
            relative flex w-full
          "
        >
          <div
            className="
              absolute top-1/2 left-1/2
              translate-x-[-50%] translate-y-[-50%]
              w-[1px] h-full bg-inbetween
            "
          />
          <button
            className="
              flex-1 text-heading p-1
              hover:bg-background-deep-light
              transition-all duration-300 ease-in-out
            "
            data-type="cancel_button_is_clicked"
            onClick={handleClick}
          >
            cancel
          </button>
          <button
            className="
              flex-1 text-content p-1 
              hover:bg-background-deep-light
              transition-all duration-300 ease-in-out
            "
            data-type="accept_button_is_clicked"
            onClick={handleClick}
          >
            accept
          </button>
        </section>
      </div>
    </div>
  )
}
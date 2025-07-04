// COMPONENTS
import RiAddLine from '@/components/svgs/RiAddLine';
import RiCheckFill from '@/components/svgs/RiCheckFill';
import LineMdImageFilled from '@/components/svgs/LineMdImageFilled';
import LineMdPlus from '@/components/svgs/LineMdPlus';
import MdiColor from '@/components/svgs/MdiColor';

// STORES
import { 
  useTabNameStore, useLanguageStore, 
  useAddProductImgWindowStore, useSelectImgColorWindowStore
} from '@/stores/index';

// JSON
import colorsArray from '@/json/colors.json';

// UTILS
import getColor from '@/utils/getColor';

export default function AddProductImgAddWindow () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const addToggle = useAddProductImgWindowStore(state => state.toggle);
  const setAddToggle = useAddProductImgWindowStore(state => state.setToggle);

  const colorToggle = useSelectImgColorWindowStore(state => state.toggle);
  const setColorToggle = useSelectImgColorWindowStore(state => state.setToggle);
  const selectedColor = useSelectImgColorWindowStore(state => state.selectedColor);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'cancel_button_is_clicked':
        setAddToggle(false);
        break;
      case 'add_new_image_button_is_clicked':
        break;
      case 'change_color_button_is_clicked':
        setColorToggle(true);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG & UI
  // const addToggle = true;
  // console.log('addToggle: ', addToggle);
  // console.log('selectedColor: ', selectedColor);

  return (
    <div
      className={`
        fixed top-0 left-0
        w-full h-full
        bg-[var(--shade-color)] z-[4000]
        transition-all duration-200 ease-out
        ${addToggle ? 'visible opacity-100 backdrop-blur-[3px]' : 'invisible opacity-0 backdrop-blur-[0px]'}
      `}
    >
      <div
        className={`
          absolute top-1/2 left-1/2
          translate-x-[-50%] translate-y-[-50%]
          h-auto rounded-lg
          bg-background overflow-hidden
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${addToggle ? 'scale-100 opacity-100' : 'scale-[80%] opacity-0'}
        `}
      >
        <section
          className="
            flex text-body-light justify-center py-4 font-bold px-2
          "
        >
          <h2>
            {isEn ? 'ADD PRODUCT IMAGE' : 'اضف صوره للمنتج'}
          </h2>
        </section>
        <hr className="border-inbetween" />
        <section
          className="flex flex-col gap-2 w-full px-2 py-4"
        >
          <div
            className="flex items-center w-full p-2 gap-8 bg-background-light rounded-lg"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'IMAGE UPLOAD' : ''}
            </h3>
            <div
              className="
                flex flex-col items-center justify-center 
                w-[300px] h-[200px] aspect-2/3 rounded-md mx-auto
                bg-background-light cursor-pointer 
                border border-dashed border-inbetween border-[2px]
              "
              role="button"
              data-type="add_new_image_button_is_clicked"
              onClick={handleClick}
            >
              <LineMdImageFilled 
                className="text-inbetween w-8 h-8"
              />
              <span
                className="text-body text-center text-s font-bold"
              >
                Drag & drop or click to upload
              </span>
              <span
                className="text-inbetween text-center text-s"
              >
                (Recommended: 1200x800px, AVIF)
              </span>
              <div
                className="
                  flex gap-2 p-2 bg-content rounded-lg mt-2 hover:opacity-80
                  transition-all duration-300 ease-in-out
                "
              >
                <LineMdPlus 
                  className="text-heading-invert"
                />
                <span
                  className="text-heading-invert"
                >
                  Upload Image

                </span>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-between w-full p-2 gap-8 bg-background-light rounded-lg"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'COLOR ASSIGNMENT' : 'الالوان'}
            </h3>
            <div
              className="flex flex-col gap-2 w-[130px] bg-background-deep-light p-2 rounded-lg"
            >
              <div
                className="relative flex bg-yellow-500 w-full h-[50px] rounded-lg text-center text-heading-invert"
                style={{backgroundColor: selectedColor?.hex || 'black'}}
              >
                <span
                  className="
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%]
                    text-sm text-heading-invert z-[10]
                    "
                >
                  {selectedColor?.name || 'unSelected'}
                </span>
                <div
                  className="
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%]
                    text-sm text-transparent bg-shade drop-shadow-lg
                    h-4 px-1 blur-[3px] z-[5] rounded-full 
                  "
                >
                  {selectedColor?.name || 'unSelected'}
                </div>
              </div>
              <button 
                className="
                  flex items-center gap-1 justify-center 
                  text-sm text-body font-bold 
                  bg-background-light hover:bg-background
                  py-2 rounded-lg
                  transition-all duration-300 ease-in-out
                "
                data-type="change_color_button_is_clicked"
                onClick={handleClick}
              >
                <MdiColor className="text-body w-4 h-4"/>
                <span>
                  Change Color
                </span>
              </button>
            </div>
          </div>
          <div
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
          >
            <h3 className="text-body font-bold">
              {isEn ? 'TYPE' : 'الصنف'}
            </h3>
            <form
              className="flex gap-4 ml-auto"
            >
              <label
                className="
                  relative flex gap-2 items-center 
                  border border-inbetween px-2 py-1 
                  rounded-lg bg-background overflow-hidden cursor-pointer
                "
                htmlFor="imageTypeA"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="radio"
                  id="imageTypeA"
                  name="imageType"
                />{' '}
                <h4
                  className="
                    peer-checked:text-heading text-body text-sm font-bold z-[5]
                    transition-all duration-300 ease-in-outs
                  "
                >
                  {isEn ? 'A (Primary)' : 'A (رئيسي)'}
                </h4>
                <RiAddLine
                  className="
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute left-2 w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <RiCheckFill
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute left-2 w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-green-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
              <label
                className="
                  relative flex gap-2 items-center 
                  border border-inbetween px-2 py-1 
                  rounded-lg bg-background overflow-hidden cursor-pointer
                "
                htmlFor="imageTypeB"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="radio"
                  id="imageTypeB"
                  name="imageType"
                />{' '}
                <h4
                  className="
                    peer-checked:text-heading text-body text-sm font-bold z-[5]
                    transition-all duration-300 ease-in-outs
                  "
                >
                  {isEn ? 'B (Secondary)' : 'B (ثانوي)'}
                </h4>
                <RiAddLine
                  className="
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute left-2 w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <RiCheckFill
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute left-2 w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-green-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
            </form>
          </div>
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
          >
            accept
          </button>
        </section>
      </div>
    </div>
  )
}
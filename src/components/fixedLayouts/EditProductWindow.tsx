// COMPONENTS
import RiAddLine from '@/components/svgs/RiAddLine';
import RiCheckFill from '@/components/svgs/RiCheckFill';

// STORES
import { useTabNameStore, useLanguageStore, useEditProductWindowStore } from '@/stores/index';

// JSON
import colorsArray from '@/json/colors.json';

// UTILS
import getColor from '@/utils/getColor';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.avif";
const outfit1 = "/assets/img/outfit.webp"
const outfit2 = "assets/img/outfit-2.avif"
const outfit3 = "assets/img/outfit-3.avif"


export default function EditProductWindow () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const toggle = useEditProductWindowStore(state => state.toggle);
  const setToggle = useEditProductWindowStore(state => state.setToggle);
  const productColors = ["Sky", "Coral", "Pink", "Wine"];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'cancel_button_is_clicked':
        setToggle(false);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  return (
    <div
      className={`
        fixed top-0 left-0
        w-full h-full
        bg-[var(--shade-color)] z-[3000]
        transition-all duration-300 ease-out
        ${toggle ? 'visible opacity-100 backdrop-blur-[3px]' : 'invisible opacity-0 backdrop-blur-[0px]'}
      `}
    >
      <div
        className={`
          absolute top-1/2 left-1/2
          translate-x-[-50%] translate-y-[-50%]
          h-auto rounded-lg
          bg-background overflow-hidden
          transition-all delay-200 duration-300 ease-[cubic-bezier(.24,.16,.35,1.29)]
          ${toggle ? 'scale-100' : 'scale-50'}
        `}
      >
        <section
          className="
            flex text-body-light justify-center py-4 font-bold
          "
        >
          <h2>
            {isEn ? 'EDIT PRODUCT' : 'تعديل المنتج'}
          </h2>
        </section>
        <hr className="px-2 border-inbetween"/>
        <section
          className="flex w-full justify-center py-4"
        >
          <img 
            src={outfit1}
            className="
              w-[100px] aspect-2/3 rounded-md
            "
          />
        </section>
        <section
          className="
            flex flex-col gap-2 w-full h-full p-2
          "
        >
          <label
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="nameEn"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'NAME' : 'الاسم'}
            </h3>
            <h4 className="ml-auto">
              en:
            </h4>
            <input 
              className="p-2 text-heading rounded-lg"
              value="swater very hot" 
              type="text"
              id="nameEn"
              name="nameEn"
              readOnly
            />
            <h4>
              ar:
            </h4>
            <input 
              className="p-2 text-heading rounded-lg"
              value="swater very hot" 
              type="text"
              id="nameAr"
              name="nameAr"
              readOnly
            />
          </label>
          <label
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="descritpionEn"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'DESCRIPTION' : 'حول'}
            </h3>
            <h4 className="ml-auto">
              en:
            </h4>
            <input 
              className="p-2 text-heading rounded-lg"
              value="swater very hot" 
              type="text"
              id="descriptionEn"
              name="descriptionEn"
              readOnly
            />
            <h4>
              ar:
            </h4>
            <input 
              className="p-2 text-heading rounded-lg"
              value="swater very hot" 
              type="text"
              id="descripionAr"
              name="descripionAr"
              readOnly
            />
          </label>
          <div
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
          >
            <h3 className="text-body font-bold">
              {isEn ? 'SIZES' : 'المقاسات'}
            </h3>
            <form
              className="flex gap-4 ml-auto"
            >
              <label
                className="peer-checked:bg-green-500 relative flex gap-2 items-center border border-inbetween px-2 py-1 rounded-lg bg-background overflow-hidden"
                htmlFor="sizeXSmall"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="sizeXSmall"
                  name="sizeXSmall"
                />{' '}
                <h4
                  className="text-heading text-sm font-bold z-[5]"
                >
                  XS
                </h4>
                <RiAddLine
                  className="
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute left-2 w-4 h-4 z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <RiCheckFill
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute left-2 w-4 h-4 z-[5]
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
                className="peer-checked:bg-green-500 relative flex gap-2 items-center border border-inbetween px-2 py-1 rounded-lg bg-background overflow-hidden"
                htmlFor="sizeSmall"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="sizeSmall"
                  name="sizeSmall"
                />{' '}
                <h4
                  className="text-heading text-sm font-bold z-[5]"
                >
                  S
                </h4>
                <RiAddLine
                  className="
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute left-2 w-4 h-4 z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <RiCheckFill
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute left-2 w-4 h-4 z-[5]
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
                className="peer-checked:bg-green-500 relative flex gap-2 items-center border border-inbetween px-2 py-1 rounded-lg bg-background overflow-hidden"
                htmlFor="sizeMedium"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="sizeMedium"
                  name="sizeMedium"
                />{' '}
                <h4
                  className="text-heading text-sm font-bold z-[5]"
                >
                  M
                </h4>
                <RiAddLine
                  className="
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute left-2 w-4 h-4 z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <RiCheckFill
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute left-2 w-4 h-4 z-[5]
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
                className="peer-checked:bg-green-500 relative flex gap-2 items-center border border-inbetween px-2 py-1 rounded-lg bg-background overflow-hidden"
                htmlFor="sizeLarge"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="sizeLarge"
                  name="sizeLarge"
                />{' '}
                <h4
                  className="text-heading text-sm font-bold z-[5]"
                >
                  L
                </h4>
                <RiAddLine
                  className="
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute left-2 w-4 h-4 z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <RiCheckFill
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute left-2 w-4 h-4 z-[5]
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
                className="peer-checked:bg-green-500 relative flex gap-2 items-center border border-inbetween px-2 py-1 rounded-lg bg-background overflow-hidden"
                htmlFor="sizeExtraLarge"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="checkbox"
                  id="sizeExtraLarge"
                  name="sizeExtraLarge"
                />{' '}
                <h4
                  className="text-heading text-sm font-bold z-[5]"
                >
                  XL
                </h4>
                <RiAddLine
                  className="
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute left-2 w-4 h-4 z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <RiCheckFill
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute left-2 w-4 h-4 z-[5]
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
          <label
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="descritpionEn"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'COLORS' : 'الالوان'}
            </h3>
              <ul
                className="
                  flex items-center gap-2 py-2 ml-auto 
                "
              >
                {productColors.map((color: string, index: number) => 
                  <li
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: getColor(colorsArray, color).hex }}
                    key={index}
                  />  
                )}
              </ul>
          </label>
          <label
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="price"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'PRICE' : 'السعر'}
            </h3>
              <input
                className="
                  flex items-center gap-2 p-2 ml-auto rounded-lg w-20
                "
                type="text"
                name="price"
                id="price"
                value="20"
              />
          </label>
          <label
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="discount"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'DISCOUNT' : 'التخفيض'}
            </h3>
              <input
                className="
                  flex items-center gap-2 p-2 ml-auto rounded-lg w-20
                "
                type="text"
                name="discount"
                id="discount"
                value="20"
              />
          </label>
        </section>
        <hr className="px-2 border-inbetween"/>
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
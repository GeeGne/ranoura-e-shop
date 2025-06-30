// COMPONENTS
import RiAddLine from '@/components/svgs/RiAddLine';
import RiCheckFill from '@/components/svgs/RiCheckFill';

// STORES
import { useTabNameStore, useLanguageStore, useAddProductImgWindowStore } from '@/stores/index';

// JSON
import colorsArray from '@/json/colors.json';

// UTILS
import getColor from '@/utils/getColor';

export default function AddProductImgAddWindow () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  // const toggle = useAddProductImgWindowStore(state => state.toggle);
  const setToggle = useAddProductImgWindowStore(state => state.setToggle);

  // DEBUG & UI
  const toggle = true;

  return (
    <div
      className={`
        fixed top-0 left-0
        w-full h-full
        bg-[var(--shade-color)] z-[4000]
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
        <section>
          <button
            className="
              flex-1 text-heading p-1
              hover:bg-background-deep-light
              transition-all duration-300 ease-in-out
            "
            data-type="cancel_button_is_clicked"
            // onClick={handleClick}
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
// STORES
import { useTabNameStore, useLanguageStore, useEditProductWindowStore } from '@/stores/index';

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
          w-[200px] h-auto rounded-lg
          bg-background overflow-hidden
          transition-all delay-200 duration-300 ease-[cubic-bezier(.24,.16,.35,1.29)]
          ${toggle ? 'scale-100' : 'scale-50'}
        `}
      >
        <h2
          className="
            flex text-body-light justify-center py-4 font-bold
          "
        >
          {isEn ? 'EDIT PRODUCT' : 'تعديل المنتج'}
        </h2>
        <hr className="px-2 border-inbetween"/>
        <div
          className="flex w-full justify-center py-4"
        >
          <img 
            src={outfit1}
            className="
              w-[100px] aspect-2/3 rounded-md
            "
          />
        </div>
        <hr className="px-2 border-inbetween"/>
        <div
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
        </div>
      </div>
    </div>
  )
}
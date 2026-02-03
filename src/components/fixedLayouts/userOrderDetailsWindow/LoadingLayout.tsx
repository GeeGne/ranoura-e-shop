// COMPONENTS
import GrommetIconsCheckboxSelected from '@/components/svgs/GrommetIconsCheckboxSelected';
import IcRoundUpdate from '@/components/svgs/IcRoundUpdate';
import LaShippingFast from '@/components/svgs/LaShippingFast';
import PhAddressBook from '@/components/svgs/PhAddressBook';

// STORES
import { useLanguageStore, useOrderDetailsWindowStore } from '@/stores/index';

export default function LoadingTable () {
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const toggle = useOrderDetailsWindowStore(state => state.toggle);
  const setToggle = useOrderDetailsWindowStore(state => state.setToggle);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'fixed_window_is_clicked':
        setToggle(false);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  };

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
          w-[80%] flex flex-col px-4
          rounded-lg overflow-y-scroll h-[calc(100vh-4rem)] bg-background
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${toggle ? 'scale-100 opacity-100' : 'scale-[80%] opacity-0'}
        `}
        data-type="fixed_box_is_clicked"
      >
        <section
          className="flex items-center justify-between py-4"
        >
          <div>
            <span
              className="text-body font-bold"
            >
              ORDER ID:&nbsp;
            </span>
            <span
              className="--opacity-blink text-transparent bg-background-deep-light rounded-md text-heading font-bold"
            >
              //////////////////////////////////////////////////////////////
            </span>
          </div>
          <div
            className="--opacity-blink text-transparent bg-background-deep-light rounded-md relative font-bold px-2 py-1"
          >
            /////////
            <div
              className="absolute top-0 left-0 w-full h-full opacity-20 rounded-full"
            />
          </div>
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="grid grid-cols-2 py-4"
        >
          <div
            className="flex flex-col gap-2 items-center"
          >
            <div
              className="--opacity-blink text-transparent bg-background-deep-light w-[150px] h-[150px] object-cover object-center rounded-full" 
            />
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">//////////////////////////</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">////////////////////////////////////////////////////</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">///////////////////////////////////</span>
          </div>
          <div
            className="flex justify-end gap-2"
          >
            <IcRoundUpdate className="text-body"/>
            <span className="h-fit --opacity-blink text-transparent bg-background-deep-light rounded-md">/////////////////////////////</span>
          </div>
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="flex flex-col gap-4 py-4"
        >
          <div className="flex items-center gap-2">
            <GrommetIconsCheckboxSelected className="w-6 h-6 text-body"/>
            <span className="text-lg font-bold text-body">{isEn ? 'ORDERED ITEMS' : 'الاغراض المطلوبه'}</span>
          </div>
          <ul
            className="flex flex-col gap-4 py-4"
          >
            {[1, 2, 3].map((num: number) => 
              <li className="flex gap-4 " key={num}>
                <div
                  className="--opacity-blink bg-background-deep-light rounded-md flex w-[150px] aspect-[2/3] object-center object-cover grow-0 rounded-lg"
                  data-type="img"
                />
                <div className="flex flex-col flex-1 gap-2">
                  <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md w-fit ">////////////////</span>
                  <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md w-fit ">/////////////////////////////</span>
                  <div className="flex items-center mt-auto gap-2">
                    <div 
                      className="
                        flex gap-2 py-1 px-2
                        rounded-full bg-background-light w-fit
                      "
                    >
                      <div 
                        className="--opacity-blink text-transparent bg-background-deep-light rounded-full w-5 h-5" 
                      />
                      <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md text-sm font-bold">////////</span>
                    </div>
                    <div className="--opacity-blink text-transparent bg-background-deep-light h-fit text-sm rounded-md font-bold px-1 py-0">////</div>
                      <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md text-sm text-body font-bold px-1 ">
                        ///
                      </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 items-end">
                  <span 
                    className="
                      --opacity-blink text-transparent bg-background-deep-light rounded-full
                      text-body font-bold border border-px border-background-deep-light 
                      px-3 py-1 rounded-full my-auto
                    "
                    >
                      //////////////
                  </span>
                  <span
                    className="
                      --opacity-blink text-transparent bg-background-deep-light rounded-md text-heading font-semibold mt-auto
                    "
                  >
                    //////////////////
                  </span>
                </div>
              </li>
            )}
          </ul>
          <div className="flex w-full justify-between">
            <span className="font-bold text-body">{isEn ? 'SUB UNTIS' : 'عدد الوحدات'}</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md font-bold">//////</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-body">{isEn ? 'TOTAL ITEMS' : 'عدد الاغراض'}</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md font-bold">//////</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold text-body">{isEn ? 'SUB TOTAL' : 'المجموع الجزئي'}</span>
            <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md font-bold">/////////////////</span>
          </div>
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="flex flex-col py-4 gap-4"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <LaShippingFast className="w-6 h-6 text-body"/>
              <span className="text-lg font-bold text-body">{isEn ? 'SHIPPING' : 'التوصيل'}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">{isEn ? 'City:' : 'المحافظه'}</span>
              <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">////////////</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">{isEn ? 'Ship Cost:': 'تكلفه التوصيل'}</span>
              <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">/////////////////</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <PhAddressBook className="w-6 h-6 text-body"/>
              <span className="text-lg font-bold text-body">{isEn ? 'ADDRESS' : 'العنوان'}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">{isEn ? 'Main Address:' : 'العنوان الرئيسي'}</span>
              <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">//////////////////////////////////////////////////////////////////////</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">{isEn ? 'Secondary Address:' : 'العنوان الثاني'}</span>
              <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">////////////////////////////////////////////</span>
            </div>
            <div className="flex gap-4">
              <span className="text-body">{isEn ? 'Notes:' : 'ملاحظات'}</span>
              <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md">//////////////////////////////////////////</span>
            </div>
          </div>
        </section>
        <hr className="border-background-deep-light"/>
        <section
          className="flex justify-between py-4 gap-4"
        >
          <span className="text-body font-bold">{isEn ? 'TOTAL' : 'الاجمالي'}</span>
          <span className="--opacity-blink text-transparent bg-background-deep-light rounded-md font-bold">///////////////////</span>
        </section>
      </div>
    </div>
  )
};
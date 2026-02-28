import type React from 'react';

// COMPONENTS
import EmptyBox from '@/components/svgs/EmptyBox';

type Props = {
  lang?: 'en' | 'ar';
  isEn?: boolean;
} & React.ComponentProps<'section'>;

export default function NoOrder ({ 
  lang = 'en',
  isEn = true,
  ...props 
}: Props) {
  return (
    <section
      className="flex flex-col gap-4 w-full p-4 mt-[-1rem] max-w-[1400px] lg:mx-auto bg-[var(--background-light-color)]"
      { ...props }
    >
      <div
        className="
          flex flex-col md:flex-row items-center justify-center 
          gap-4 p-4 w-full max-w-[1400px] mx-auto bg-background rounded-lg
        "
      >
        <div 
          className="
            relative flex flex-col items-center justify-center 
            w-full h-full md:w-auto md:h-auto
            bg-content-invert md:bg-transparent pb-[30px] rounded-lg
          "
        >
          <div className="custom-shape-divider-bottom-1772168163 md:hidden">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="fill-background"></path>
            </svg>
          </div>
          <EmptyBox 
            className="row-span-2 w-[250px] h-[250px] md:w-[300px] md:h-[300px] text-content"
          />
          <span className="md:hidden text-body font-bold text-lg">
            {isEn ? 'NO ORDER FOUND' : 'لم يتم العثور على طلب'}
          </span>
        </div>
        <div className="flex flex-col whitespace-nowrap">
          <span className="hidden md:inline text-body font-bold text-lg">
            {isEn ? 'NO ORDER FOUND.' : 'لم يتم العثور على طلب'}
          </span>
          <div>
            <span className="text-body-light font-semibold text-lg">
              {isEn ? 'Ready to place your' : 'جاهز لاول مره'}
            </span>&ensp;
            <button 
              className="
                relative text-lg p-2 bg-content-invert rounded-md text-transparent whitespace-nowrap
                hover:scale-105 active:scale-95 shadow-md hover:shadow-lg
                transition-all duration-200 ease-in-out
              "
            >
              {isEn ? 'First Order?' : 'تطلب؟'}
              <span 
                className="
                  absolute top-1/2 left-1/2
                  translate-x-[-50%] translate-y-[-50%]
                  text-lg font-extrabold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text
                  z-[5]

                "
              >
                {isEn ? 'First Order?' : 'تطلب؟'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
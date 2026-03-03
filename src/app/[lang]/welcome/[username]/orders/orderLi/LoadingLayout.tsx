import type React from 'react';

// COMPONENTS
import StatusMap from '@/app/[lang]/welcome/[username]/orders/StatusMap';
import ItemsList from '@/components/ItemsList';

type Props = {
  lang?: 'en' | 'ar';
  isEn?: boolean;
} & React.ComponentProps<'ul'>;

export default function LoadingLayout ({
  lang = 'en',
  isEn = true,
  ...props
}: Props) {
  return (
    <ul
      className="flex flex-col gap-4 w-full p-4 mt-[-1rem] max-w-[1400px] lg:mx-auto bg-[var(--background-light-color)]"
      { ...props }
    >
      {[1, 2, 3]?.map((num: number, i: number) => 
        <li
          key={i}
          className="flex flex-col gap-4 w-full p-4 max-w-[1400px] mx-auto bg-background rounded-lg"
        >
          <StatusMap 
            lang={lang} 
            isEn={isEn}
            isLoading={true}
          />
          <div
            className="flex text-lg justify-between"
          >
            <h3 className="--opacity-blink rounded-md text-transparent bg-background-deep-light font-semibold">
              ////////////////
            </h3>
            <h3 
              className="--opacity-blink rounded-md text-transparent bg-background-deep-light font-bold"
            >
              /////////
            </h3>
          </div>
          <div
            className="flex justify-between"
          >
            <h3 className="--opacity-blink rounded-md text-transparent bg-background-deep-light">
              {isEn ? 'Requested Date' : 'تاريخ الطلب'}
            </h3>
            <h3 className="--opacity-blink rounded-md text-transparent bg-background-deep-light font-semibold">
              ////////////////////
            </h3>
          </div>
          <hr className="--opacity-blink border-background-deep-light" />
          <h2 className="--opacity-blink rounded-md text-transparent bg-background-deep-light font-semibold text-lg">
            //////////////////
          </h2>
          <ItemsList 
            lang={lang}
            isLoading={true}
          />
          <div
            className="flex text-lg justify-between"
          >
            <h3 className="--opacity-blink rounded-md text-transparent bg-background-deep-light font-semibold">
              //////
            </h3>
            <h3 className="--opacity-blink rounded-md text-transparent bg-background-deep-light font-semibold">
              ////
            </h3>
          </div>
          <hr className="--opacity-blink border-background-deep-light" />
          <div
            className="flex justify-between"
          >
            <h3 className="--opacity-blink rounded-md text-transparent bg-background-deep-light">
              /////////////
            </h3>
            <h3 className="--opacity-blink rounded-md text-transparent bg-background-deep-light font-semibold">
              ///
            </h3>
          </div>
          <div
            className="flex text-lg justify-between"
          >
            <h3 className="--opacity-blink rounded-md text-transparent bg-background-deep-light font-bold">
              ////////
            </h3>
            <h3 className="--opacity-blink rounded-md text-transparent bg-background-deep-light font-bold">
              /////
            </h3>
          </div>
        </li>     
      )}
    </ul>
  )
}
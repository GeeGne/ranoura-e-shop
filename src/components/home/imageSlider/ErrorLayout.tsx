// HOOKS
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import MdiReload from '@/components/svgs/MdiReload';

// API
import getSlideShows from '@/lib/api/slide-show/get';

type Props = {
  className?: string;
  isEn?: boolean;
} 

export default function ErrorLayout ({
  className = "",
  isEn = true,
  ...props
}: Props) {

  const array = [1, 2, 3]
  const { refetch: refetchSlides } = useQuery({
    queryKey: [ 'slide-show' ],
    queryFn: getSlideShows
  });

  const handleClick = (e: React.MouseEvent<HTMLElement | any>) => {
    e.stopPropagation();
  
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'reload_products_button_is_clicked':
        if (refetchSlides) refetchSlides();
        break;
      default:
        console.error('Unknown type: ', type);
    }
  };

  return (
    <section
      className={`
        relative flex w-full overflow-hidden ${className}
      `}
      {...props}
      style={{direction: 'ltr'}}
    >
      <div
        className="
          absolute top-0 left-0 
          flex flex-col items-center justify-center gap-4
          w-full h-full z-[5] backdrop-brightness-[75%]"
      >
        <h2 className="text-heading-invert font-semibold text-xl">
          {isEn ? 'FAILED TO LOAD LATEST NEWS' : 'فشل في تحميل اخر الاخبار'}
        </h2>
        <button
          className="
            group flex gap-2 border-solid border-px border-heading-invert 
            p-2 rounded-md hover:bg-heading-invert
            transition-all duraiton-200 ease-in-out
          "
          data-type="reload_products_button_is_clicked"
          onClick={handleClick}
        >
          <span 
            className="
              text-heading-invert group-hover:text-heading font-semibold
              transition-all duraiton-200 ease-in-out
            ">
              {isEn ? 'RELOAD' : 'اعاده المحاوله'}
            </span>
          <MdiReload 
            className="
              text-heading-invert group-hover:text-heading
              transition-all duraiton-200 ease-in-out
            " 
          />
        </button>
      </div>
      <ul
        className={`
          flex w-full
          duration-300 ease-in-out
        `}
      >
        <li
          className="--opacity-blink bg-background-light w-full aspect-[3/4] md:aspect-[4/3] lg:aspect-[2/1] shrink-0 cursor-pointer"
        />
      </ul>
      <ul
        className="
          absolute bottom-4 left-1/2 translate-x-[-50%]
          flex flex-row gap-2
        "
      >
        {array?.map((itm: number, i: number) => (
          <li
            className={`
              --opacity-blink relative w-[40px] h-[4px] bg-background-deep-light
              rounded-full border-solid border-[1px] border-background overflow-hidden
            `}
            key={i}
          />
        ))}
      </ul>
      <div
        className="
          --opacity-blink absolute w-8 h-8 top-1/2 left-4 translate-y-[-50%]
          bg-body-invert text-heading rounded-md border-solid border-[2px] p-1 opacity-70 hover:opacity-100
          backdrop-blur-[5px] cursor-pointer
          ease-out duration-200 transition-all 
        "
        role="button"
        data-type="left_arrow_button_is_clicked"
      />
      <div
        className="
          --opacity-blink absolute top-1/2 right-4 translate-y-[-50%]
          w-8 h-8
          bg-body-invert text-heading rounded-md border-solid border-[2px] p-1 opacity-70 hover:opacity-100
          backdrop-blur-[5px] cursor-pointer rotate-180
          ease-out duration-200 transition-all 
        "
        role="button"
        data-type="right_arrow_button_is_clicked"
      />
    </section>
  )
}
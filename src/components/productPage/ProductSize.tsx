import { useState } from 'react';

type Props = {
  sizes?: string[];
};

export default function ProductSize ({ sizes }: Props) {
  
  const [ active, setActive ] = useState<number>(0);

  // const active = true;
  const available = false;
  const sizesArray = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  const handleActive = (e: React.MouseEvent<HTMLElement>) => {
    
    const index = Number(e.currentTarget.dataset.index);
    const { size } = e.currentTarget.dataset;
    const isSizeAvailable = !sizes?.some(avaliableSize => avaliableSize === size);

    if (isSizeAvailable) return;
    
    setActive(index);
  }

  // DEBUG
  // console.log('active: ', active);
  // console.log('sizes: ', sizes);

  return (
    <section>
      <ul
        className="flex flex-row flex-wrap gap-2"
      >
        {sizesArray.map((size, i) =>
          <li
            key={i}
            className={`
              flex items-center justify-center 
              font-bold text-lg 
              w-12 h-12 rounded-md
              border-solid border-[2px]
              transition-all duration-300 ease-out z-[5]
              ${sizes?.some(clothSize => clothSize === size) 
                ? active === i 
                  ? 'text-heading-invert bg-heading hover:bg-[var(--background-deep-light-invert-color)] border-heading hover:border-heading cursor-pointer' 
                  : 'text-body-light border-body-light hover:text-heading hover:border-heading cursor-pointer'
                : ` relative text-body-extra-light
                    border-body-extra-light cursor-not-allowed
                    before:content-[''] before:absolute before:top-1/2 before:left-1/2
                    before:translate-x-[-50%] before:translate-y-[-50%] before:rotate-[45deg] before:origin-center
                    before:w-[2px] before:h-[calc(100%+1rem)] before:bg-body-extra-light before:z-[-1]
                  `
              }
            `}
            role="button"
            data-index={i}
            data-active={i}
            data-size={size}
            data-available={available}
            onClick={handleActive}
          >
            <span>
              {size.toUpperCase()}
            </span>
          </li>
        )}
      </ul>
    </section>
  )
}
import { useState } from 'react';

export default function ProductSize () {
  
  const [ active, setActive ] = useState<number>(0);

  // const active = true;
  const available = false;
  const sizesArray = [
    {
      size: "XS",
      available: true,
    },{
      size: "SM",
      available: true,
    },{
      size: "LG",
      available: false,
    },{
      size: "XL",
      available: true,
    },{
      size: "2XL",
      available: false, 
    }
  ]

  const handleActive = (e: React.MouseEvent<HTMLElement>) => {
    
    const index = Number(e.currentTarget.dataset.index);
    const { available, size } = e.currentTarget.dataset;
    if (available === "false") return;
    
    // const isExist = active.some(itm => itm === index);
    // setActive((val) => isExist ? val.filter(itm => itm !== index) : [...val, index])
    setActive(index)
  }

  // DEBUG
  // console.log('active: ', active);

  return (
    <section>
      <ul
        className="flex flex-row flex-wrap gap-2"
      >
        {sizesArray.map(({size, available}, i) =>
          <li
            key={i}
            className={`
              flex items-center justify-center 
              font-bold text-lg 
              w-12 h-12 rounded-md
              border-solid border-[2px]
              transition-all duration-300 ease-out z-[5]
              ${available 
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
              {size}
            </span>
          </li>
        )}
      </ul>
    </section>
  )
}
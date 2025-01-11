export default function ProductSize () {
  
  const active = true;

  return (
    <section>
      <ul
        className="flex flex-row flex-wrap gap-2"
      >
        <li
          className="
            flex items-center justify-center 
            font-bold text-lg text-body-light hover:text-heading 
            w-12 h-12 rounded-md cursor-pointer
            border-solid border-body-light hover:border-heading border-[2px]
            transition-all duration-300 ease-out
          "
        >
          XS
        </li>
        <li
          className={`
            flex items-center justify-center 
            font-bold text-lg hover:text-heading 
            w-12 h-12 rounded-md cursor-pointer
            border-solid hover:border-heading border-[2px]
            transition-all duration-300 ease-out
            ${active ? 'text-heading-invert bg-heading border-heading' : 'text-body-light border-body-light'}
          `}
        >
          SM
        </li>
        <li
          className="
            flex items-center justify-center 
            font-bold text-lg text-body-light hover:text-heading 
            w-12 h-12 rounded-md cursor-pointer
            border-solid border-body-light hover:border-heading border-[2px]
            transition-all duration-300 ease-out
          "
        >
          LG
        </li>
        <li
          className="
            flex items-center justify-center 
            font-bold text-lg text-body-light hover:text-heading 
            w-12 h-12 rounded-md cursor-pointer
            border-solid border-body-light hover:border-heading border-[2px]
            transition-all duration-300 ease-out
          "
        >
          XL
        </li>
        <li
          className="
            flex items-center justify-center 
            font-bold text-lg text-body-light hover:text-heading 
            w-12 h-12 rounded-md cursor-pointer
            border-solid border-body-light hover:border-heading border-[2px]
            transition-all duration-300 ease-out
          "
        >
          2XL
        </li>
      </ul>
    </section>
  )
}
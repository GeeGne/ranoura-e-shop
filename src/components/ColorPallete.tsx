export default function ColorPallete () {
  return (
    <ul className="flex gap-2">
      <li
        className="
          relative w-4 h-4 p-1 border-solid
          bg-red-400 rounded-full cursor-pointer
          before:content-[''] before:absolute before:top-1/2 before:left-1/2
          before:translate-x-[-50%] before:translate-y-[-50%]
          before:w-[calc(100%+8px)] before:h-[calc(100%+8px)]
          before:border-solid before:border-primary
          before:border-[1px] before:rounded-full
        "
      >
      </li>
      <li
        className="
          relative w-4 h-4 p-1 border-solid 
          bg-yellow-400 rounded-full
        "
      >
      </li>
      <li
        className="
          relative w-4 h-4 p-1 border-solid 
          bg-orange-400 rounded-full
        "
      >
      </li>
    </ul>
  )
}
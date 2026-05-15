export default function LoadingLayout ({
  className = "",
  ...props
}) {

  const array = [1, 2, 3]
  
  return (
    <section
      className={`
        relative flex w-full overflow-hidden ${className}
      `}
      {...props}
      style={{direction: 'ltr'}}
    >
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
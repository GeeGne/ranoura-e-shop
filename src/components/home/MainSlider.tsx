// COMPONENTS
import FilmTape from "@/components/FilmTape";
import DisplayImg from "@/components/DisplayImg";


export default function MainSlider () {

  return (
    <div
      className="
        relative flex w-full 
        bg-primary
      "
    >
      <span
        className="
          w-full text-[23vw] text-center font-bold text-clip text-[var(--primary-invert-color)]
          "
      >
        RAN
      </span>
      <span
        className="
          w-full text-[23vw] text-center font-bold text-[var(--primary-invert-color)] z-[14]

        "
      >
        URA
      </span>
      <span
        className="
          absolute top-1/2 left-1/2 
          translate-y-[-50%] translate-x-[-50%] z-[5] 
          w-full text-[37vw] text-center font-bold text-[var(--primary-invert-color)]
        "
      >
        O
      </span>
      <span
        className="
          masked-object-center-to-right 
          absolute top-1/2 left-1/2 
          translate-y-[-50%] translate-x-[-50%] z-[15] 
          w-full text-[37vw] text-center font-bold text-[var(--primary-invert-color)]
        "
      >
        O
      </span>
      <div
        className="
          absolute top-1/2 left-1/2 
          translate-y-[-50%] translate-x-[-50%] z-[10] 
          rotate-[75deg] origin-center
          scale-[100%] md:scale-[100%]
        "
      >
        <FilmTape
          className="
            test1
          "
        />
      </div>
    </div>
  )
}
// HOOKS
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import FilmTape from "@/components/FilmTape";

// API
import getGeneralSettingsData from '@/lib/api/general-settings/get';

export default function MainSlider ({ ...props }) {

  const { data: generalSettingsData, isLoading, isError } = useQuery({
    queryKey: ['general-settings'],
    queryFn: getGeneralSettingsData
  });

  const  isFilmTapeEnabled = !isError && !isLoading && generalSettingsData?.data?.film_tape;

  // DEBUG & UI
  // console.log('generalSettingsData: ', generalSettingsData);

  return (
    <div
      className={`
        flex w-full 
        bg-primary
        ${isFilmTapeEnabled ? 'relative' : 'hidden'}
      `}
      { ...props }
      style={{direction: 'ltr', fontFamily: 'Sofia Sans Condensed, sans-serif'}}
    >
      <span
        className="
          w-full text-[23vw] text-center font-bold text-clip text-transparent
          bg-gradient-to-t from-transparent to-[var(--primary-invert-color)] from-30% to-60%
          "
      >
        RAN
      </span>
      <span
        className="
          w-full text-[23vw] text-center font-bold text-clip text-transparent z-[14]
          bg-gradient-to-t from-transparent to-[var(--primary-invert-color)] from-30% to-60%


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
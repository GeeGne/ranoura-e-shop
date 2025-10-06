// COMPONENTS
import EpUser from "@/components/svgs/EpUser";
import LineMdPlus from '@/components/svgs/LineMdPlus';

// ASSETS
const img_url = 'public/assets/img/pfp_img.png';

type Props = {
  data?: Record<string, any>;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
} & React.ComponentPropsWithRef<"section">;

export default function UserPfp ({
  data = {},
  isLoading = false, 
  isError = false,
  className, 
  ...props
}: Props) {

  const { profile_img_url } = data;

  return (
    <section
      className={`
        flex items-center justify-center
        ${className}
      `}
      { ...props }
    >
      <button
        className={`
          relative flex items-center justify-center 
          rounded-full w-[100px] h-[100px] cursor-pointer
          ${isLoading ? '--opacity-blink bg-inbetween' : 'bg-background-light'}
        `}
      >
        <EpUser 
          className={`w-12 h-12 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
        <div 
          className="
            absolute top-[calc(100%-2rem)] right-0 
            w-7 h-7 bg-heading opacity-80 rounded-full
            flex items-center justify-center
          "
        >
          <LineMdPlus 
            className="text-heading-invert "
          />
        </div>
      </button>
    </section>
  )
  
  return (
    <section
      className={`
        flex items-center justify-center
        ${className}
      `}
      { ...props }
    >
      <div
        className={`
          flex items-center justify-center 
          rounded-full w-[100px] h-[100px]
          ${isLoading ? '--opacity-blink bg-inbetween' : 'bg-background-light'}
        `}
      >
        <EpUser 
          className={`w-12 h-12 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />   
      </div>
    </section>
  )
}
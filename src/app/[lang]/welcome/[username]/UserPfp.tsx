
// COMPONENTS
import EpUser from "@/components/svgs/EpUser";

type Props = {
  className?: string;
  isLoading?: boolean;
} & React.ComponentPropsWithRef<"section">;

export default function UserPfp ({ isLoading = false, className, ...props}: Props) {
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
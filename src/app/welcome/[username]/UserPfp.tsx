
// COMPONENTS
import EpUser from "@/components/svgs/EpUser";

type Props = {
  className?: string;
} & React.ComponentPropsWithRef<"section">;

export default function UserPfp ({ className, ...props}: Props) {
  return (
    <section
      className={`
        flex items-center justify-center
        ${className}
      `}
      { ...props }
    >
      <div
        className="
          flex items-center justify-center 
          bg-[var(--background-light-color)] rounded-full w-[100px] h-[100px]
        "
      >
        <EpUser 
          className="w-12 h-12"
        />   
      </div>
    </section>
  )
}
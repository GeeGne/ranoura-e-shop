const img1 = '/assets/img/background(2).avif';
const img2 = '/assets/img/background(16).avif';

type Props = {
  isLoading?: boolean;
} & React.ComponentPropsWithRef<"section">;

export default function Banner ({ isLoading = false, ...props }: Props) {

  return (
    <section
      className={`
        w-full aspect-[320/50] md:aspect-[728/90] 
        //h-[150px] //md:h-[200px] //lg:h-[250px]
        ${isLoading ? '--opacity-blink bg-background-deep-light' : 'bg-transparent'}
      `}
      { ...props }
    >
      <img 
        src={img2}
        alt="img"
        className={`
          w-full h-full object-cover object-center
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
      />
    </section>
  )
}
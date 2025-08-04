const img1 = '/assets/img/background(2).avif';
const img2 = '/assets/img/background(16).avif';

type Props = {
  isLoading?: boolean;
} & React.ComponentPropsWithRef<"section">;

export default function Banner ({ isLoading = false, ...props }: Props) {

  return (
    <section
      className={`
        w-full h-[100px] md:h-[150px] 
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
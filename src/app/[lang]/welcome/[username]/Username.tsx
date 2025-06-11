type Props = {
  lang?: string;
  isLoading?: boolean;
} & React.ComponentPropsWithRef<"div">;

export default function Username ({ isLoading = false, lang, ...props }: Props) {
  const isEn = lang === 'en';
  return (
    <div
      className="flex justify-center"
      { ...props }
    >
      <h2
        className={`
          relative inline text-3xl font-base text-center
          before:absolute before:top-1/2
          before:translate-y-[-50%]
          before:text-sm before:font-bold
          ${isLoading 
            ? '--opacity-blink bg-background-deep-light text-background-deep-light rounded-lg before:--opacity-blink before:bg-background-deep-light before:text-background-deep-light before:rounded-lg' 
            : 'text-content before:text-body-light'
          }
          ${isEn 
            ? `before:right-[calc(100%+0.5rem)] before:content-['welcome']` 
            : `before:left-[calc(100%+0.5rem)] before:content-['اهلن']`
          }
        `}
      >
        Ranoura
      </h2>
    </div>
  )
}
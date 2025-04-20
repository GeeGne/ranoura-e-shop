type Props = {
  type?: string;
  className?: string;
}

export default function CatType ({ type, className, ...props }: Props) {
  return (
    <div
      className={`
        ${className} relative py-2
      `}
      { ...props }
    >
      <h3
        className="
          absolute top-1/2 left-4 translate-y-[-50%]
          text-body-extra-light font-bold text-sm bg-background px-1 z-[5]
        "
      >
        {type || 'default'}
      </h3>
      <div 
        className="
          absolute top-1/2 left-1/2 
          translate-x-[-50%] translate-y-[-50%] w-[calc(100%)] 
          h-[2px] bg-body-extra-light z-[1]
        "
      />
    </div>
  )
}
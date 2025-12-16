type Props = {
  className?: string;
  isLoading?: boolean;
  name?: string;
}

export default function CategoryTitle ({ 
  className, 
  isLoading = false,
  name = ''
}: Props) {

  if (isLoading) return (
    <div
      className={`
        --opacity-blink bg-background-light rounded-md text-transparent text-5xl font-light
        ${className}
      `}
    >
      //////////////////
    </div>    
  )

  return (
    <div
      className={`
        text-heading text-5xl font-light
        ${className}
      `}
    >
      {name}
    </div>
  )
}
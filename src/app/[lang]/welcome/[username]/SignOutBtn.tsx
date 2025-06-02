import BtnA from '@/components/BtnA';

type Props = {
  className?: string;
  isLoading?: boolean;
} & React.ComponentPropsWithRef<"div"> ;

export default function SignOutBtn ({ className, isLoading, ...props }: Props) {
  return (
    <div    
      className={`
        ${className}
      `}
      { ...props }
    >
      <BtnA
        className={`
          px-4 py-2 text-md font-bold rounded-md
          ${isLoading 
            ? '--opacity-blink bg-background-deep-light text-background-deep-light' 
            : 'bg-primary text-heading-invert'
          }
        `}
      >
        Signout
      </BtnA>
    </div>
  )
}
import BtnA from '@/components/BtnA';

type Props = {
  className?: string;
} & React.ComponentPropsWithRef<"div"> ;

export default function SignOutBtn ({ className, ...props }: Props) {
  return (
    <div    
      className={`
        ${className}
      `}
      { ...props }
    >
      <BtnA
        className={`
          px-4 py-2 bg-primary text-md text-heading-invert font-bold rounded-md
        `}
      >
        Signout
      </BtnA>
    </div>
  )
}
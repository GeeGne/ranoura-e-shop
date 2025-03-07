type Props = {
  className?: string;
  name?: string;
}

export default function CategoryTitle ({ className, name }: Props) {
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
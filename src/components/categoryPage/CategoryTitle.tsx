type Props = {
  className?: string;
  title?: string;
}

export default function CategoryTitle ({ className, title }: Props) {
  return (
    <div
      className={`
        text-heading text-5xl font-light
        ${className}
      `}
    >
      {title}
    </div>
  )
}
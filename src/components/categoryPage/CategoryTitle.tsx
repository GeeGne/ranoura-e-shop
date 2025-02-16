type Props = {
  className?: string;
}

export default function CategoryTitle ({ className }: Props) {
  return (
    <div
      className={`
        text-heading text-5xl font-light
        ${className}
      `}
    >
      COLLECTION
    </div>
  )
}
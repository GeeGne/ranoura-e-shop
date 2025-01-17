type Props = {
  className?: string;
}

export default function CategoryTitle ({ className }: Props) {
  return (
    <div
      className={`
        text-heading text-2xl font-bold
        ${className}
      `}
    >
      COLLECTION
    </div>
  )
}
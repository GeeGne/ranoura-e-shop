type Props = {
  svgString: string;
};

export default function Icon ({ svgString, ...props }: Props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgString }}
      { ...props }
    />
  )
}
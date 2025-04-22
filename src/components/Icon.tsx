import React from 'react';

type Props = {
  svgString: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Icon ({ svgString, ...props }: Props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgString }}
      { ...props }
    />
  )
}
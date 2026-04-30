import React from "react";
import type { SVGProps } from "react";

type Props = {
  strokeWidth?: number | string;
} & SVGProps<SVGSVGElement>;

export default function MdiLessThanOrEqual({
  strokeWidth = 0.5,
  ...props
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M18.5 2.27L5 10.14L18.5 18l1-1.73l-10.53-6.13L19.5 4zM5 20v2h15v-2z"
        strokeWidth={strokeWidth}
        stroke="currentColor"
      ></path>
    </svg>
  );
}

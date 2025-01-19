import React from "react";
import type { SVGProps } from "react";

export default function LineMdConfirmCircleTwotoneToCircleTwotoneTransition(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          fill="currentColor"
          fillOpacity={0.3}
          d="M3 12c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9Z"
        ></path>
        <path strokeDasharray={14} d="M8 12l3 3l5 -5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.2s"
            values="0;14"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

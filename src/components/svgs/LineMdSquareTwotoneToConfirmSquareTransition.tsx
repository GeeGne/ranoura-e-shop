import React from "react";
import type { SVGProps } from "react";

export default function LineMdSquareTwotoneToConfirmSquareTransition(
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
          d="M4 12v-7c0 -0.55 0.45 -1 1 -1h14c0.55 0 1 0.45 1 1v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1Z"
        >
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            dur="0.15s"
            values="0.3;0"
          ></animate>
        </path>
        <path strokeDasharray={14} strokeDashoffset={14} d="M8 12l3 3l5 -5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.15s"
            dur="0.2s"
            values="14;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

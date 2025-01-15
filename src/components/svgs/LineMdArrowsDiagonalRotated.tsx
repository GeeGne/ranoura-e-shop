import React from "react";
import type { SVGProps } from "react";

export default function LineMdArrowsDiagonalRotated(
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
          strokeDasharray={12}
          strokeDashoffset={12}
          d="M14 14l6.5 6.5M10 10l-6.5 -6.5"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.3s"
            values="12;0"
          ></animate>
        </path>
        <path
          strokeDasharray={8}
          strokeDashoffset={8}
          d="M3 3h6M21 21v-6M3 3v6M21 21h-6"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.3s"
            dur="0.2s"
            values="8;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

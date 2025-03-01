import React from "react";
import type { SVGProps } from "react";

export default function LineMdArrowSmallUp(props: SVGProps<SVGSVGElement>) {
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
        <path strokeDasharray={16} strokeDashoffset={16} d="M12 19l0 -13.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.2s"
            values="16;0"
          ></animate>
        </path>
        <path
          strokeDasharray={10}
          strokeDashoffset={10}
          d="M12 5l5 5M12 5l-5 5"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.2s"
            dur="0.2s"
            values="10;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

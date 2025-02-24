import React from "react";
import type { SVGProps } from "react";

export default function LineMdTextBoxToTextBoxMultipleTransition(
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
        <path d="M8 8h8M8 12h8M8 16h5M20 5v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1v-14c0 -0.55 0.45 -1 1 -1h14c0.55 0 1 0.45 1 1Z">
          <animate
            fill="freeze"
            attributeName="d"
            dur="0.4s"
            values="M8 8h8M8 12h8M8 16h5M20 5v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1v-14c0 -0.55 0.45 -1 1 -1h14c0.55 0 1 0.45 1 1Z;M10 6h8M10 10h8M10 14h5M22 3v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1v-14c0 -0.55 0.45 -1 1 -1h14c0.55 0 1 0.45 1 1Z"
          ></animate>
        </path>
        <path
          strokeDasharray={36}
          strokeDashoffset={36}
          d="M2 6v15c0 0.55 0.45 1 1 1h15"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.4s"
            dur="0.5s"
            values="36;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

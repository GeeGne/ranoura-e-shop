import React from "react";
import type { SVGProps } from "react";

export default function LineMdEdit(props: SVGProps<SVGSVGElement>) {
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
        <path strokeDasharray={20} strokeDashoffset={20} d="M3 21h18">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.2s"
            values="20;0"
          ></animate>
        </path>
        <path
          strokeDasharray={48}
          strokeDashoffset={48}
          d="M7 17v-4l10 -10l4 4l-10 10h-4"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.2s"
            dur="0.6s"
            values="48;0"
          ></animate>
        </path>
        <path strokeDasharray={8} strokeDashoffset={8} d="M14 6l4 4">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            values="8;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

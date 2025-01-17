import React from "react";
import type { SVGProps } from "react";

export default function LineMdFilter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeDasharray={56}
        strokeDashoffset={56}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 4h14l-5 6.5v9.5l-4 -4v-5.5Z"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.6s"
          values="56;0"
        ></animate>
      </path>
    </svg>
  );
}

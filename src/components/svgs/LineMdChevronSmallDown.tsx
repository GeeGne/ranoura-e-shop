import React from "react";
import type { SVGProps } from "react";

export default function LineMdChevronSmallDown(props: SVGProps<SVGSVGElement>) {
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
        strokeDasharray={10}
        strokeDashoffset={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15l-5 -5M12 15l5 -5"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.3s"
          values="10;0"
        ></animate>
      </path>
    </svg>
  );
}

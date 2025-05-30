import React from "react";
import type { SVGProps } from "react";

export default function LineMdPlayFilledToPauseTransition(
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
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 15L8 18L8 6L13 9L13 9M13 9L18 12L18 12L13 15L13 15"
      >
        <animate
          fill="freeze"
          attributeName="d"
          dur="0.6s"
          keyTimes="0;0.33;1"
          values="M13 15L8 18L8 6L13 9L13 9M13 9L18 12L18 12L13 15L13 15;M13 15L8 18L8 6L13 9L13 15M13 9L18 12L18 12L13 15L13 9;M9 18L7 18L7 6L9 6L9 18M15 6L17 6L17 18L15 18L15 6"
        ></animate>
      </path>
    </svg>
  );
}

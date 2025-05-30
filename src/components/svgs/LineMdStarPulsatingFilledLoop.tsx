import React from "react";
import type { SVGProps } from "react";

export default function LineMdStarPulsatingFilledLoop(
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
        fillOpacity={0}
        d="M12 3l2.35 5.76l6.21 0.46l-4.76 4.02l1.49 6.04l-5.29 -3.28l-5.29 3.28l1.49 -6.04l-4.76 -4.02l6.21 -0.46Z"
      >
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="0.5s"
          dur="0.5s"
          values="0;1"
        ></animate>
      </path>
      <path
        fill="none"
        stroke="currentColor"
        strokeDasharray={36}
        strokeDashoffset={36}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3L9.65 8.76L3.44 9.22L8.2 13.24L6.71 19.28L12 16M12 3L14.35 8.76L20.56 9.22L15.8 13.24L17.29 19.28L12 16"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.5s"
          values="36;0"
        ></animate>
        <animate
          attributeName="d"
          dur="1.5s"
          repeatCount="indefinite"
          values="M12 3L9.65 8.76L3.44 9.22L8.2 13.24L6.71 19.28L12 16M12 3L14.35 8.76L20.56 9.22L15.8 13.24L17.29 19.28L12 16;M12 7L10.82 10.38L7.24 10.45L10.1 12.62L9.06 16.05L12 14M12 7L13.18 10.38L16.76 10.45L13.9 12.62L14.94 16.05L12 14;M12 3L9.65 8.76L3.44 9.22L8.2 13.24L6.71 19.28L12 16M12 3L14.35 8.76L20.56 9.22L15.8 13.24L17.29 19.28L12 16"
        ></animate>
      </path>
    </svg>
  );
}

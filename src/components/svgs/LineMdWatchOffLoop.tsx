import React from "react";
import type { SVGProps } from "react";

export default function LineMdWatchOffLoop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <mask id="lineMdWatchOffLoop0">
        <g
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        >
          <circle cx={12} cy={12} r={0} fill="#fff" stroke="none">
            <animate
              attributeName="r"
              dur="6s"
              keyTimes="0;0.03;0.97;1"
              repeatCount="indefinite"
              values="0;3;3;0"
            ></animate>
          </circle>
          <path d="M4 12c1.38 -0.77 4.42 -1.3 8 -1.3c3.58 0 6.62 0.53 8 1.3c-1.38 0.77 -4.42 1.3 -8 1.3c-3.58 0 -6.62 -0.53 -8 -1.3Z">
            <animate
              attributeName="d"
              dur="6s"
              keyTimes="0;0.03;0.97;1"
              repeatCount="indefinite"
              values="M4 12c1.38 -0.77 4.42 -1.3 8 -1.3c3.58 0 6.62 0.53 8 1.3c-1.38 0.77 -4.42 1.3 -8 1.3c-3.58 0 -6.62 -0.53 -8 -1.3Z;M2 12c1.72 -3.83 5.53 -6.5 10 -6.5c4.47 0 8.28 2.67 10 6.5c-1.72 3.83 -5.53 6.5 -10 6.5c-4.47 0 -8.28 -2.67 -10 -6.5Z;M2 12c1.72 -3.83 5.53 -6.5 10 -6.5c4.47 0 8.28 2.67 10 6.5c-1.72 3.83 -5.53 6.5 -10 6.5c-4.47 0 -8.28 -2.67 -10 -6.5Z;M4 12c1.38 -0.77 4.42 -1.3 8 -1.3c3.58 0 6.62 0.53 8 1.3c-1.38 0.77 -4.42 1.3 -8 1.3c-3.58 0 -6.62 -0.53 -8 -1.3Z"
            ></animate>
          </path>
          <path
            stroke="#000"
            strokeDasharray={28}
            strokeDashoffset={28}
            d="M0 11h24"
            transform="rotate(45 12 12)"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.5s"
              dur="0.4s"
              values="28;0"
            ></animate>
          </path>
          <path
            strokeDasharray={28}
            strokeDashoffset={28}
            d="M-1 13h24"
            transform="rotate(45 12 12)"
          >
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              values="M-1 13h24;M1 13h24;M-1 13h24"
            ></animate>
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.5s"
              dur="0.4s"
              values="28;0"
            ></animate>
          </path>
        </g>
      </mask>
      <rect
        width={24}
        height={24}
        fill="currentColor"
        mask="url(#lineMdWatchOffLoop0)"
      ></rect>
    </svg>
  );
}

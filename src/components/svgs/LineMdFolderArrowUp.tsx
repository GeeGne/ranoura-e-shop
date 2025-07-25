import React from "react";
import type { SVGProps } from "react";

export default function LineMdFolderArrowUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <mask id="lineMdFolderArrowUp0">
        <g
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        >
          <path
            strokeDasharray={64}
            strokeDashoffset={64}
            d="M12 7h8c0.55 0 1 0.45 1 1v10c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-11Z"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.6s"
              values="64;0"
            ></animate>
          </path>
          <path d="M12 7h-9v0c0 0 0.45 0 1 0h6z" opacity={0}>
            <animate
              fill="freeze"
              attributeName="d"
              begin="0.6s"
              dur="0.2s"
              values="M12 7h-9v0c0 0 0.45 0 1 0h6z;M12 7h-9v-1c0 -0.55 0.45 -1 1 -1h6z"
            ></animate>
            <set
              fill="freeze"
              attributeName="opacity"
              begin="0.6s"
              to={1}
            ></set>
          </path>
          <path
            fill="#000"
            fillOpacity={0}
            stroke="none"
            d="M19 13c3.31 0 6 2.69 6 6c0 3.31 -2.69 6 -6 6c-3.31 0 -6 -2.69 -6 -6c0 -3.31 2.69 -6 6 -6Z"
          >
            <set
              fill="freeze"
              attributeName="fill-opacity"
              begin="0.8s"
              to={1}
            ></set>
          </path>
          <path strokeDasharray={6} strokeDashoffset={6} d="M19 21v-5">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.8s"
              dur="0.2s"
              values="6;0"
            ></animate>
          </path>
          <path
            strokeDasharray={4}
            strokeDashoffset={4}
            d="M19 16l2 2M19 16l-2 2"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="1s"
              dur="0.2s"
              values="4;0"
            ></animate>
          </path>
        </g>
      </mask>
      <rect
        width={24}
        height={24}
        fill="currentColor"
        mask="url(#lineMdFolderArrowUp0)"
      ></rect>
    </svg>
  );
}

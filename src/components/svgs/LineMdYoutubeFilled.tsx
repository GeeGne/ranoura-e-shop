import React from "react";
import type { SVGProps } from "react";

export default function LineMdYoutubeFilled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <mask id="SVGsyA92bmM">
        <g
          fill="none"
          fillOpacity={0}
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        >
          <path
            fill="#fff"
            strokeDasharray={64}
            strokeDashoffset={64}
            d="M12 5c9 0 9 0 9 7c0 7 0 7 -9 7c-9 0 -9 0 -9 -7c0 -7 0 -7 9 -7Z"
          >
            <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="0.6s"
              dur="0.5s"
              values="0;1"
            ></animate>
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.6s"
              values="64;0"
            ></animate>
          </path>
          <path fill="#000" stroke="none" d="M12 11L12 12L12 13z">
            <animate
              fill="freeze"
              attributeName="d"
              begin="1.1s"
              dur="0.2s"
              values="M12 11L12 12L12 13z;M10 8.5L16 12L10 15.5z"
            ></animate>
            <set
              fill="freeze"
              attributeName="fill-opacity"
              begin="1.1s"
              to={1}
            ></set>
          </path>
        </g>
      </mask>
      <rect
        width={24}
        height={24}
        fill="currentColor"
        mask="url(#SVGsyA92bmM)"
      ></rect>
    </svg>
  );
}

import React from "react";
import type { SVGProps } from "react";

export default function LineMdConfirmCircleFilled(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <mask id="SVGCa0448Wh">
          <g strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
            <path
              fill="#fff"
              fillOpacity={0}
              stroke="#fff"
              strokeDasharray={60}
              d="M3 12c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9Z"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.6s"
                values="60;0"
              ></animate>
              <animate
                fill="freeze"
                attributeName="fill-opacity"
                begin="0.6s"
                dur="0.4s"
                to={1}
              ></animate>
            </path>
            <path
              fill="none"
              stroke="#000"
              strokeDasharray={14}
              strokeDashoffset={14}
              d="M8 12l3 3l5 -5"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="1.1s"
                dur="0.2s"
                to={0}
              ></animate>
            </path>
          </g>
        </mask>
      </defs>
      <path
        fill="currentColor"
        d="M0 0h24v24H0z"
        mask="url(#SVGCa0448Wh)"
      ></path>
    </svg>
  );
}

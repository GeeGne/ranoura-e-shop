import React from "react";
import type { SVGProps } from "react";

export default function LineMdAlertCircleTwotoneLoop(
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
        fill="currentColor"
        fillOpacity={0}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          strokeDasharray={64}
          strokeDashoffset={64}
          d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="64;0"
          ></animate>
        </path>
        <path fill="none" strokeDasharray={8} strokeDashoffset={8} d="M12 7v6">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s"
            dur="0.2s"
            values="8;0"
          ></animate>
          <animate
            attributeName="stroke-width"
            begin="1.95s"
            dur="3s"
            keyTimes="0;0.1;0.2;0.3;1"
            repeatCount="indefinite"
            values="2;3;3;2;2"
          ></animate>
        </path>
        <path
          fill="none"
          strokeDasharray={2}
          strokeDashoffset={2}
          d="M12 17v0.01"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            values="2;0"
          ></animate>
          <animate
            attributeName="stroke-width"
            begin="2.25s"
            dur="3s"
            keyTimes="0;0.1;0.2;0.3;1"
            repeatCount="indefinite"
            values="2;3;3;2;2"
          ></animate>
        </path>
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="1.1s"
          dur="0.15s"
          values="0;0.3"
        ></animate>
      </g>
    </svg>
  );
}

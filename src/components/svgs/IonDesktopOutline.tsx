import React from "react";
import type { SVGProps } from "react";

export default function IonDesktopOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 512 512"
      {...props}
    >
      <rect
        width={448}
        height={320}
        x={32}
        y={64}
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={32}
        ry={32}
      ></rect>
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m304 448l-8-64h-80l-8 64z"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M368 448H144"
      ></path>
      <path
        fill="currentColor"
        d="M32 304v48a32.09 32.09 0 0 0 32 32h384a32.09 32.09 0 0 0 32-32v-48Zm224 64a16 16 0 1 1 16-16a16 16 0 0 1-16 16"
      ></path>
    </svg>
  );
}

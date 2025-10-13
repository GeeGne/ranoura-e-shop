import React from "react";
import type { SVGProps } from "react";

export default function MdiArrowDownDrop(props: SVGProps<SVGSVGElement>) {
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
        d="m7 10l5 5l5-5z"
        strokeWidth={0.5}
        stroke="currentColor"
      ></path>
    </svg>
  );
}

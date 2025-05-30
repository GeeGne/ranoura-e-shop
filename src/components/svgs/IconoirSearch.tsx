import React from "react";
import type { SVGProps } from "react";

export default function IconoirSearch(props: SVGProps<SVGSVGElement>) {
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m17 17l4 4M3 11a8 8 0 1 0 16 0a8 8 0 0 0-16 0"
      ></path>
    </svg>
  );
}

import React from "react";
import type { SVGProps } from "react";

export default function BxFilter(props: SVGProps<SVGSVGElement>) {
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
        d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z"
        strokeWidth={0.5}
        stroke="currentColor"
      ></path>
    </svg>
  );
}

import React from "react";
import type { SVGProps } from "react";

export default function GrommetIconsCheckboxSelected(
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
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        d="M2 2h20v20H2zm3 11l5 4l9-11"
      ></path>
    </svg>
  );
}

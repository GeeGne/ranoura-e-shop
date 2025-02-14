import React from "react";
import type { SVGProps } from "react";

export default function Blob(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="visual"
      viewBox="0 0 900 600"
      width="900"
      height="600"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      { ...props }
    >
      <rect x="0" y="0" width="900" height="600" fill="#f1efef"></rect>
      <g transform="translate(445.43278518993037 285.12069579091366)">
        <path
          d="M138.3 -114.6C187.4 -89.1 241.2 -44.5 243.2 2C245.2 48.6 195.4 97.1 146.3 143.9C97.1 190.8 48.6 235.9 -22.9 258.8C-94.3 281.6 -188.6 282.2 -207.3 235.4C-226.1 188.6 -169.3 94.3 -175.2 -5.9C-181.1 -106.1 -249.6 -212.1 -230.9 -237.6C-212.1 -263.1 -106.1 -208.1 -30.8 -177.3C44.5 -146.5 89.1 -140.1 138.3 -114.6"
          fill="#1E1E1E"
        ></path>
      </g>
    </svg>
  );
}

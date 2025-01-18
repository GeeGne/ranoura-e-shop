import React from "react";
import type { SVGProps } from "react";

export default function PepiconsPencilOpenCircleFilled(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      viewBox="0 0 26 26"
      {...props}
    >
      <g fill="none">
        <defs>
          <mask id="pepiconsPencilOpenCircleFilled0">
            <path fill="#fff" d="M0 0h26v26H0z"></path>
            <g fill="#000">
              <path d="M17.5 17.5v-3.25a.5.5 0 0 1 1 0V18a.5.5 0 0 1-.5.5H8a.5.5 0 0 1-.5-.5V8a.5.5 0 0 1 .5-.5h3.75a.5.5 0 0 1 0 1H8.5v9z"></path>
              <path d="M13.354 13.354a.5.5 0 0 1-.708-.708l5-5a.5.5 0 0 1 .708.708z"></path>
              <path d="M18.5 11.5a.5.5 0 0 1-1 0V8a.5.5 0 0 1 1 0z"></path>
              <path d="M14.5 8.5a.5.5 0 0 1 0-1H18a.5.5 0 0 1 0 1z"></path>
            </g>
          </mask>
        </defs>
        <circle
          cx={13}
          cy={13}
          r={13}
          fill="currentColor"
          mask="url(#pepiconsPencilOpenCircleFilled0)"
        ></circle>
      </g>
    </svg>
  );
}

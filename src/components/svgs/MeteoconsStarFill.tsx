import React from "react";
import type { SVGProps } from "react";

export default function MeteoconsStarFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 512 512"
      {...props}
    >
      <defs>
        <linearGradient
          id="meteoconsStarFill0"
          x1={187.9}
          x2={324.1}
          y1={138.1}
          y2={373.9}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#000"></stop>
          <stop offset={0.5} stopColor="#000"></stop>
          <stop offset={1} stopColor="#000"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#meteoconsStarFill0)"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
        d="m105.7 263.5l107.5 29.9a7.9 7.9 0 0 1 5.4 5.4l29.9 107.5a7.8 7.8 0 0 0 15 0l29.9-107.5a7.9 7.9 0 0 1 5.4-5.4l107.5-29.9a7.8 7.8 0 0 0 0-15l-107.5-29.9a7.9 7.9 0 0 1-5.4-5.4l-29.9-107.5a7.8 7.8 0 0 0-15 0l-29.9 107.5a7.9 7.9 0 0 1-5.4 5.4l-107.5 29.9a7.8 7.8 0 0 0 0 15Z"
      >
        <animateTransform
          additive="sum"
          attributeName="transform"
          calcMode="spline"
          dur="6s"
          keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
          repeatCount="indefinite"
          type="rotate"
          values="-15 256 256; 15 256 256; -15 256 256"
        ></animateTransform>
        <animate
          attributeName="opacity"
          dur="6s"
          values="1; .75; 1; .75; 1; .75; 1"
        ></animate>
      </path>
    </svg>
  );
}

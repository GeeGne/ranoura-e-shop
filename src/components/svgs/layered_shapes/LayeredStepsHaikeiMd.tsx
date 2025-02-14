import React from "react";
import type { SVGProps } from "react";


export default function LayeredStepsHaikeiMd (props: SVGProps<SVGSVGElement>) {
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
      <path
        d="M522 0L569 0L569 86L619 86L619 171L551 171L551 257L702 257L702 343L484 343L484 429L491 429L491 514L647 514L647 600L0 600L0 514L0 514L0 429L0 429L0 343L0 343L0 257L0 257L0 171L0 171L0 86L0 86L0 0L0 0Z"
        fill="#a6a6a6"
      ></path>
      <path
        d="M389 0L429 0L429 86L316 86L316 171L211 171L211 257L413 257L413 343L528 343L528 429L213 429L213 514L294 514L294 600L0 600L0 514L0 514L0 429L0 429L0 343L0 343L0 257L0 257L0 171L0 171L0 86L0 86L0 0L0 0Z"
        fill="#5d5d5d"
      ></path>
      <path
        d="M62 0L64 0L64 86L266 86L266 171L24 171L24 257L264 257L264 343L137 343L137 429L104 429L104 514L336 514L336 600L0 600L0 514L0 514L0 429L0 429L0 343L0 343L0 257L0 257L0 171L0 171L0 86L0 86L0 0L0 0Z"
        fill="#1e1e1e"
      ></path>
    </svg>
  );
}

import type { SVGProps } from 'react';

export default function SquareLines(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 64 64"
      version="1.1"
      { ...props }
    >
      <path
        id="SvgjsPath2458"
        d="M4 15.51a1 1 0 0 0 .71-.29L15.22 4.71a1 1 0 1 0-1.42-1.42L3.29 13.8a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.38a1 1 0 0 0 .71-.29L26.6 4.71a1 1 0 1 0-1.42-1.42L3.29 25.18a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.36a1 1 0 0 0 .71-.25L38 4.71a1 1 0 1 0-1.42-1.42L3.29 36.54a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.38a1 1 0 0 0 .71-.29L49.34 4.71a1 1 0 1 0-1.42-1.42L3.29 47.92a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zM60.71 3.29a1 1 0 0 0-1.42 0l-56 56a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l56-56a1 1 0 0 0 0-1.42zm-1.42 11.37L14.66 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l44.63-44.63a1 1 0 0 0-1.42-1.42zm0 11.34L26 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l33.29-33.25A1 1 0 0 0 59.29 26zm0 11.4L37.4 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l21.89-21.89a1 1 0 0 0-1.42-1.42zm0 11.38L48.78 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L60.71 50.2a1 1 0 0 0-1.42-1.42z"
        data-name="Layer 9"
        fill='url("#SvgjsLinearGradient2459")'
      ></path>
      <defs>
        <linearGradient
          gradientTransform="rotate(45 0.5 0.5)"
          id="SvgjsLinearGradient2459"
        >
          <stop
            stopOpacity=" 1"
            stopColor="rgba(183, 9, 76)"
            offset="0"
          ></stop>
          <stop
            stopOpacity=" 1"
            stopColor="rgba(92, 77, 125)"
            offset="0.498984375"
          ></stop>
          <stop
            stopOpacity=" 1"
            stopColor="rgba(0, 145, 173)"
            offset="0.983984375"
          ></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

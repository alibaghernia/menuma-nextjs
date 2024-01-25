import React, { FC, HTMLAttributes } from 'react';

type IconType = FC<
  {
    width?: number;
    height?: number;
    color?: string;
  } & HTMLAttributes<HTMLOrSVGElement>
>;

export const LinedCloseIcon: IconType = ({
  width = 24,
  height = 24,
  color = 'white',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95044C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M13.7678 10.2322L10.2322 13.7677M13.7678 13.7677L10.2322 10.2322"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

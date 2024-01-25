import React from 'react';

export const ClockIcon = ({ width = 24, height = 24, color = 'white' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_808_81)">
        <path
          d="M8.00004 14.6667C11.682 14.6667 14.6667 11.682 14.6667 8C14.6667 4.318 11.682 1.33333 8.00004 1.33333C4.31804 1.33333 1.33337 4.318 1.33337 8C1.33337 11.682 4.31804 14.6667 8.00004 14.6667Z"
          stroke={color}
          strokeWidth="1.33333"
          strokeLinejoin="round"
        />
        <path
          d="M8.00269 4V8.00333L10.829 10.83"
          stroke="#434343"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_808_81">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

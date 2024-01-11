import React from 'react';

export const ArrowBackIcon = ({ width = 24, height = 24, color = 'white' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M17.5 12.2322L6.5 12.2322M6.5 12.2322L11.0882 16.2322M6.5 12.2322L11.0882 8.23218"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

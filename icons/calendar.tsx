import React from 'react';

export const CalendarIcon = ({ width = 24, height = 24, color = 'white' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <mask
        id="mask0_807_52"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="18"
        height="18"
      >
        <path
          d="M14.1667 2.5V5.83333M5.83337 2.5V5.83333"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M2.5 8.33333C2.5 6.76167 2.5 5.97667 2.98833 5.48833C3.47667 5 4.26167 5 5.83333 5H14.1667C15.7383 5 16.5233 5 17.0117 5.48833C17.5 5.97667 17.5 6.76167 17.5 8.33333V9.16667H2.5V8.33333Z"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M15.8333 5H4.16667C3.24619 5 2.5 5.74619 2.5 6.66667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V6.66667C17.5 5.74619 16.7538 5 15.8333 5Z"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M5 12.5H8.33333M11.6667 12.5H15M5 15H8.33333M11.6667 15H15"
          stroke={color}
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </mask>
      <g mask="url(#mask0_807_52)">
        <path d="M0 0H20V20H0V0Z" fill={color} />
      </g>
    </svg>
  );
};

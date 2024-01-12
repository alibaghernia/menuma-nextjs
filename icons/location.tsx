import React from 'react';

export const Location = ({ width = 24, height = 24, color = 'white' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 15.8915L9.54086 15.282C10.1546 14.5792 10.7066 13.9123 11.1977 13.278L11.6031 12.7432C13.296 10.4623 14.1429 8.65203 14.1429 7.31403C14.1429 4.45803 11.8406 2.14288 9 2.14288C6.15943 2.14288 3.85715 4.45803 3.85715 7.31403C3.85715 8.65203 4.704 10.4623 6.39686 12.7432L6.80229 13.278C7.50295 14.1758 8.23601 15.0469 9 15.8915Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.4286C10.1835 9.4286 11.1429 8.46921 11.1429 7.28574C11.1429 6.10227 10.1835 5.14288 9 5.14288C7.81654 5.14288 6.85715 6.10227 6.85715 7.28574C6.85715 8.46921 7.81654 9.4286 9 9.4286Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

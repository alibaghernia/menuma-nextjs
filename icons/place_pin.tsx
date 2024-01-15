import React from 'react';

export const PlacePinIcon = ({ width = 24, height = 24, color = 'white' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8 8C8.79565 8 9.55871 7.68393 10.1213 7.12132C10.6839 6.55871 11 5.79565 11 5C11 4.20435 10.6839 3.44129 10.1213 2.87868C9.55871 2.31607 8.79565 2 8 2C7.20435 2 6.44129 2.31607 5.87868 2.87868C5.31607 3.44129 5 4.20435 5 5C5 5.79565 5.31607 6.55871 5.87868 7.12132C6.44129 7.68393 7.20435 8 8 8ZM8 9C6.93913 9 5.92172 8.57857 5.17157 7.82843C4.42143 7.07828 4 6.06087 4 5C4 3.93913 4.42143 2.92172 5.17157 2.17157C5.92172 1.42143 6.93913 1 8 1C9.06087 1 10.0783 1.42143 10.8284 2.17157C11.5786 2.92172 12 3.93913 12 5C12 6.06087 11.5786 7.07828 10.8284 7.82843C10.0783 8.57857 9.06087 9 8 9Z"
        fill={color}
      />
      <path
        d="M8 8C8.13261 8 8.25979 8.05268 8.35355 8.14645C8.44732 8.24021 8.5 8.36739 8.5 8.5V12.5C8.5 12.6326 8.44732 12.7598 8.35355 12.8536C8.25979 12.9473 8.13261 13 8 13C7.86739 13 7.74021 12.9473 7.64645 12.8536C7.55268 12.7598 7.5 12.6326 7.5 12.5V8.5C7.5 8.36739 7.55268 8.24021 7.64645 8.14645C7.74021 8.05268 7.86739 8 8 8Z"
        fill={color}
      />
      <path
        d="M6 10.142V11.157C4.215 11.443 3 12.061 3 12.5C3 13.089 5.186 14 8 14C10.814 14 13 13.089 13 12.5C13 12.06 11.785 11.443 10 11.157V10.142C12.33 10.485 14 11.412 14 12.5C14 13.88 11.314 15 8 15C4.686 15 2 13.88 2 12.5C2 11.411 3.67 10.485 6 10.142Z"
        fill={color}
      />
    </svg>
  );
};

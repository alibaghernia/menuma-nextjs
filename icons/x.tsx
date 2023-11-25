import React from 'react'

export const XIcon = ({ width = 24, height = 24, color = "white" }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill="none">
      <g clip-path="url(#clip0_665_7)">
        <path d="M9.9895 6.775L15.8177 0H14.4365L9.376 5.8825L5.334 0H0.671997L6.78425 8.8955L0.671997 16H2.05325L7.3975 9.78788L11.666 16H16.328L9.98912 6.775H9.9895ZM8.09775 8.97375L7.47837 8.088L2.55087 1.03975H4.67237L8.64875 6.728L9.268 7.61375L14.4371 15.0075H12.3159L8.09775 8.97412V8.97375Z" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_665_7">
          <rect width={width} height={height} fill={color} transform="translate(0.5)"/>
        </clipPath>
      </defs>
    </svg>
    )
}

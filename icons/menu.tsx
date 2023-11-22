import React from 'react'

export const MenuIcon = ({ width = 24, height = 24, color = "white" }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path d="M7.28307 19L20 19M19.9996 12L4 12M20 5L12.9719 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    )
}

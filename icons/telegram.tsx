import React from 'react'

export const TelegramIcon = ({ width = 24, height = 24, color = "white" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill="none">
        <path d="M14.9594 3.08125L12.8469 13.0437C12.6875 13.7469 12.2719 13.9219 11.6813 13.5906L8.4625 11.2188L6.90938 12.7125C6.7375 12.8844 6.59375 13.0281 6.2625 13.0281L6.49375 9.75L12.4594 4.35938C12.7188 4.12813 12.4031 4 12.0563 4.23125L4.68125 8.875L1.50625 7.88125C0.815626 7.66563 0.803126 7.19063 1.65 6.85938L14.0688 2.075C14.6438 1.85938 15.1469 2.20313 14.9594 3.08125Z" fill={color} fillOpacity="0.91"/>
      </svg>
    )
}

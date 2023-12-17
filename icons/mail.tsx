import React from 'react'

export const MailIcon = ({ width = 24, height = 24, color = "white" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill="none">
            <path d="M4.66667 6L8.00001 8.33333L11.3333 6" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.33334 11.3333V4.66666C1.33334 4.31304 1.47381 3.9739 1.72386 3.72385C1.97391 3.4738 2.31305 3.33333 2.66667 3.33333H13.3333C13.687 3.33333 14.0261 3.4738 14.2761 3.72385C14.5262 3.9739 14.6667 4.31304 14.6667 4.66666V11.3333C14.6667 11.687 14.5262 12.0261 14.2761 12.2761C14.0261 12.5262 13.687 12.6667 13.3333 12.6667H2.66667C2.31305 12.6667 1.97391 12.5262 1.72386 12.2761C1.47381 12.0261 1.33334 11.687 1.33334 11.3333Z" stroke={color} />
        </svg>
    )
}

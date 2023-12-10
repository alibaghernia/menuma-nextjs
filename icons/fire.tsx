import React from 'react'

export const FireIcon = ({ width = 10, height = 10, color = "#C00404" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 10 10" fill="none">
            <path d="M3.44727 5.88672C3.44727 4.44531 5.5 3.49414 5.5 1.92188C5.5 1.00195 4.83594 0.203125 4.73633 0.15625C4.74414 0.220703 4.74805 0.287109 4.74805 0.351562C4.74805 2.15039 1.875 3.35742 1.875 5.59766C1.875 6.57031 2.50391 7.14453 3.17383 7.71289C4.44531 8.625 4.69922 9.10742 4.69922 9.4043C4.69922 9.60156 4.60547 9.73633 4.60547 9.83984C4.86133 9.51367 4.94531 9.2168 4.94727 8.93359C4.94727 8.35547 4.52344 7.83398 4.08398 7.24414C3.77148 6.80859 3.44727 6.41211 3.44727 5.88672ZM7.45703 5.125C7.2207 3.82031 5.93359 2.69531 5.60742 2.56836L5.68555 2.70898C5.73242 2.80859 5.75195 2.92188 5.75195 3.04297C5.75195 3.91602 4.69336 5.21484 4.64648 5.32227C4.60352 5.42188 4.58398 5.52734 4.58398 5.63086C4.58398 6.02344 4.88086 6.45312 4.93359 6.45312C4.98047 6.45312 6.03906 5.37109 6.06836 4.74023C6.19336 4.96875 6.24609 5.18164 6.24609 5.39258C6.24609 6.19727 5.42969 7.28516 5.42969 7.28516C5.42969 7.51172 6.05273 8.32422 6.12305 8.32422C6.14258 8.32422 6.16602 8.29688 6.18555 8.27734C6.92578 7.50977 7.5 6.61719 7.5 5.60547C7.5 5.44922 7.48633 5.28906 7.45703 5.125Z" fill={color} />
        </svg>
    )
}

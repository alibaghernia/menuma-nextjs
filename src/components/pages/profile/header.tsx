import React from 'react'

export default function ProfileHeader({
    id = "header-image",
    imageHref
}: { id?: string, imageHref: string }) {
    return (
        <svg width="100%" height="250"  viewBox="0 0 320 250" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path width="100%" d="M0 0H320V203C320 222.882 303.882 239 284 239H232.773C216.73 239 213.682 239 211.778 229.394C199.903 169.5 119.684 170 106.216 229.394C104.038 239 101.231 239 85.2336 239H36C16.1177 239 0 222.882 0 203V0Z" fill="url(#pattern0)" shapeRendering="crispEdges" />
                <path width="100%" d="M0 0H320V203C320 222.882 303.882 239 284 239H232.773C216.73 239 213.682 239 211.778 229.394C199.903 169.5 119.684 170 106.216 229.394C104.038 239 101.231 239 85.2336 239H36C16.1177 239 0 222.882 0 203V0Z" fill="black" fillOpacity="0.6" shapeRendering="crispEdges" />
            <defs>
                <filter id="filter0_d_3_6" x="-10" y="-9" width="340" height="259" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_6" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_6" result="shape" />
                </filter>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_3_6" transform="matrix(0.00132275 0 0 0.00177105 0 -0.392608)" />
                </pattern>
                <image id="image0_3_6" width="756" height="1008" xlinkHref={imageHref} />
            </defs>
        </svg>

    )
}

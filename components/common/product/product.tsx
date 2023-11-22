import React from 'react'
import { IProduct } from './types'
import Image from 'next/image'

export const Product: IProduct = (props) => {
    return (
        <div className="flex items-center">
            <div className="replative">
                <Image src={props.image!} alt={props.title} />
            </div>
            <div className="bg-white"></div>
        </div>
    )
}

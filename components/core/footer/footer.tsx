import React from 'react'
import { IFooter } from './types'


export const Footer: IFooter = (props) => {
    return (
        <footer className="rounded-lg dark:bg-gray-900 m-4">
            <div className="w-full min-w-full m mx-auto p-4 md:py-8">
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">{props.description}<a target="_blank" href={props.link} className="hover:text-blue-600"> {props.linkTitle}</a></span>
            </div>
        </footer>


    )
}
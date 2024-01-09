import React from 'react'
import { ISearchBusinessBox } from './types'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import { FlexBox } from '../flex_box/flex_box'
import { FlexItem } from '../flex_item/flex_item'
import { SearchIcon } from '@/icons/search'
import { Button } from '../button'

const SearchBusinessBox: ISearchBusinessBox = (props) => {
    return (
        <div className="flex items-center border p-[.5rem] border-1 gap-[.5rem] rounded-[.63rem]">
            <SearchIcon color="#959595" />
            <input className="bg-none border-none outline-none w-full" placeholder="جستجوی اسم کافه..." value={props.value} onChange={({ target: { value } }) => props.onChange(value)} onKeyDown={({ key }) => {
                if (key == "Enter") props.onSearch(props.value)
            }} />
            <Button onClick={() => props.onSearch(props.value)}>
                جستجو
            </Button>
        </div>
    )
}

export { SearchBusinessBox }
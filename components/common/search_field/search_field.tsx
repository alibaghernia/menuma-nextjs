import { SearchIcon } from '@/icons/search'
import React from 'react'
import { ISearchField } from './types'
import classNames from 'classnames'

export const SearchField: ISearchField = (props) => {
    return (
        <div className={classNames("rounded-full p-[.3rem] flex items-center bg-white overflow-hidden gap-2", props.className)}>
            <div className="p-[.4rem] px-2 bg-black/[15%] rounded-tr-2xl rounded-br-2xl rounded-tl-lg rounded-bl-lg cursor-pointer" onClick={() => props.onSearch(props.value)}>
                <SearchIcon width={18} height={18} />
            </div>
            <input type="text" value={props.value} onChange={({ target: { value } }) => { props.onChange(value) }} className={classNames('outline-none bg-transparent placeholder:text-[.8rem] w-full text-typography', props.inputClassNames)} placeholder='جستجو...' />
        </div>
    )
}

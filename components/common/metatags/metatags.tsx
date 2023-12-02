import React, { useMemo } from 'react'
import { IMetaTags } from './types'
import Head from 'next/head'

export const MetaTags: IMetaTags = ({ metatags }) => {

    const renderMetatags = useMemo(() => metatags.map((metatag, key) => (
        <meta key={key} property={metatag.name} content={metatag.value} />
    )), [metatags])

    return (
        <Head>
            {renderMetatags}
        </Head>
    )
}

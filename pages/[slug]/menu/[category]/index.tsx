import { IProductProps } from '@/components/common/product/types'
import { Navbar } from '@/components/core/navbar'
import sperso from '@/assets/images/sperso.png'
import React, { useMemo, useState } from 'react'
import { Product } from '@/components/common/product/product'
import { SearchField } from '@/components/common/search_field/search_field'

export default function CategoryPage() {

    const [searchInput, setSearchInput] = useState<string>()
    const category = {
        title: "ویژه ها",
    }
    const products = useMemo<IProductProps[]>(() => [
        {
            title: "اسپرسو",
            descriptions: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.",
            image: sperso.src,
            special: true,
            prices: [{
                id: "single",
                amount: 45000,
                title: "تک"
            }, {
                id: "single",
                amount: 50000,
                title: "دبل"
            }
            ],
        },
        {
            title: "اسپرسو",
            descriptions: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.",
            image: sperso.src,
            special: true,
            prices: [{
                id: "single",
                amount: 45000,
                title: "تک"
            }],
        },
        {
            title: "اسپرسو",
            descriptions: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.",
            image: sperso.src,
            special: true,
            prices: [{
                id: "single",
                amount: 45000,
                title: "تک"
            }],
        },
    ], [])

    const renderdProducts = useMemo(() => {
        return products.map((product, key) => (
            <Product key={key}
                title={product.title}
                descriptions={product.descriptions}
                image={product.image}
                prices={product.prices}
                special={product.special}
                fullWidth
            />
        ))
    }, [products])

    return (
        <>
            <Navbar title="کافه شب" note back />
            <div className='bg-secondary min-h-screen pt-[2.5rem] z-10 px-[2.8rem] flex flex-col'>
                <div className="sticky top-0 z-10 bg-secondary pt-[2rem] pb-[1rem]">
                    <div className="flex items-center whitespace-nowrap gap-[1.3rem]">
                        <hr className='border-black/10 w-full' />
                        <div className="text-[1.8rem] text-typography font-bold">
                            {category.title}
                        </div>
                        <hr className='border-black/10 w-full' />
                    </div>
                    <SearchField value={searchInput ?? ""} className='mt-[1.7rem]' onChange={setSearchInput} onSearch={(value) => { }} />
                </div>
                <div className="flex flex-col gap-[1.7rem] overscroll-auto mb-[1.7rem] mt-[1rem] z-0">
                    {renderdProducts}
                </div>
            </div>
        </>
    )
}

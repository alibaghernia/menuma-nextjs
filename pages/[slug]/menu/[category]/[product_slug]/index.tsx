import { IProductProps } from '@/components/common/product/types';
import { Navbar } from '@/components/core/navbar'
import { useParams } from 'next/navigation';
import sperso from '@/assets/images/sperso.png'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import Image from 'next/image';
import { ProviderContext } from '@/store/provider';

export default function ProductPage() {

    const { state, functions } = useContext(ProviderContext)
    const [orderedItems, setOrderedItems] = useState<Record<string, any>>({})

    const product: Omit<IProductProps, "fullWidth" | "className"> & { id: string } = useMemo(() => ({
        id: "product-1",
        title: "قهوه اسپرسو",
        descriptions: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.",
        image: sperso.src,
        prices: [{
            id: "single",
            amount: 45000,
            title: "تک"
        }, {
            id: "double",
            amount: 50000,
            title: "دبل"
        }
        ],
    }), [])


    const orderItem = useCallback((price: any) => {
        const key = `${product.id}-${price.id}`
        functions.cart.addItem({
            id: key,
            title: product.title,
            count: 1,
            price: price.amount,
            type: price.title
        })
    }, [functions, product])

    const increaseOrderItemCount = useCallback((price: any) => {
        const key = `${product.id}-${price.id}`
        functions.cart.increaseCount(key)
    }, [functions, product.id])

    const decreasOrderItemCount = useCallback((price: any) => {
        const key = `${product.id}-${price.id}`
        const item = functions.cart.getItem(key)
        if (item!.count == 1) {
            console.log("delete");
            functions.cart.removeItem(key)
        } else
            functions.cart.decreaseCount(key)
    }, [functions, product.id])

    const prices = useMemo(() => product.prices.map((price, key) => {

        const order = functions.cart.getItem(`${product.id}-${price.id}`);

        return (<div className="flex justify-between p-[.5rem] px-[1.5rem] rounded-[2rem] bg-more/[.1] items-center" key={key}>
            <div className="text-[1.3rem] text-typography">
                {[price.title ? `${price.title}: ` : '', price.amount.toLocaleString("IR-fa")].filter(Boolean).join(" ")}
            </div>
            {!order ? (
                <div className="rounded-[1rem] py-[.2rem] px-[1.5rem] bg-more text-typography cursor-pointer active:scale-[.8] transition duration-[.2s]" onClick={() => orderItem(price)}>
                    سفارش
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 flex items-center justify-center bg-more rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s]" onClick={() => increaseOrderItemCount(price)}>+</div>
                    {order.count}
                    <div className="w-7 h-7 flex items-center justify-center bg-more rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s]" onClick={() => decreasOrderItemCount(price)}>-</div>
                </div>
            )}
        </div>)
    }), [product, functions, increaseOrderItemCount, decreasOrderItemCount, orderItem])


    return (
        <>
            <Navbar title={product.title} note back />
            <div className='bg-secondary h-screen pt-[4.5rem] z-10'>
                <div className="rounded-[2.4rem] overflow-hidden relative w-[22.4rem] h-[22.4rem] mx-auto bg-white shadow">
                    <Image src={product.image!} alt={product.title} className='inset-0 block' fill />
                </div>
                <div className="mt-[2.1rem] mx-[3.1rem]">
                    <div className=" flex items-center gap-3">
                        <hr className="border-black/10 w-full" />
                        <div className="w-fit text-[1.8rem] font-[600] whitespace-nowrap text-typography">{product.title}</div>
                        <hr className="border-black/10 w-full" />
                    </div>
                    <div className="text-[1rem] font-[300] mt-[.8rem] text-typography">
                        {product.descriptions}
                    </div>
                    <div className="mt-[3.2rem] flex flex-col gap-4">
                        {prices}
                    </div>
                </div>
            </div>
        </>
    )
}

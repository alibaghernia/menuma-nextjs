import React, { useContext, useEffect, useMemo, useState } from 'react'
import { INavBar } from './types'
import { MenuIcon } from '@/icons/menu'
import classNames from 'classnames'
import { ArrowBackIcon } from '@/icons/arrow-back'
import { NoteIcon } from '@/icons/note'
import { LinedCloseIcon } from '@/icons/lined_close'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config'
import { HomeIcon } from '@/icons/home'
import { MenuCircleIcon } from '@/icons/menu-circle'
import { SupportIcon } from '@/icons/support'
import { Cart } from '@/components/common/cart/cart'
import { ProviderContext } from '@/providers/main/provider'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider'

export const Navbar: INavBar = ({ background = true, callPager = true, ...props }) => {
    const router = useRouter()
    const { setLoading } = useContext(ProviderContext)
    const { state: coffeShopState } = useContext(CoffeeShopProviderContext)
    const params = useParams()
    const { state } = useContext(ProviderContext)
    const [menuOpen, setMenuOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const [overlay, setOverlay] = useState(false)

    const resolvedTailwindConfig = resolveConfig(tailwindConfig)


    const menuItems = useMemo(() => [
        {
            title: "پروفایل کافه",
            icon: <HomeIcon color={resolvedTailwindConfig.theme?.colors?.['typography'].toString()} />,
            url: `/${state.isNotMenuma ? `` : `${params?.slug}/`}`,
        },
        {
            title: "منوی کافه",
            icon: <MenuCircleIcon color={resolvedTailwindConfig.theme?.colors?.['typography'].toString()} />,
            url: `/${state.isNotMenuma ? `` : `${params?.slug}/`}/menu`
        },
        // {
        //     title: "پشتیبانی",
        //     icon: <SupportIcon color={resolvedTailwindConfig.theme?.colors?.['typography'].toString()} />,
        // }
    ], [resolvedTailwindConfig, params])

    const renderMenuItems = useMemo(() => {
        return menuItems.map((menuItem, key) => (
            <div className="flex gap-5 items-center px-[1.5rem] py-[.8rem] border-black transition-[border] duration-[.1s] hover:border-r-[5px] border-b border-b-black/[.1] last:border-b-0 cursor-pointer" key={key} onClick={() => {
                if (menuItem.url) {
                    setOverlay(false)
                    setMenuOpen(false)
                    setLoading(true)
                    router.push(menuItem.url)
                }
            }}>
                <div className="">
                    {menuItem.icon}
                </div>
                <div className="text-[1rem]">
                    {menuItem.title}
                </div>
            </div>
        ))
    }, [menuItems, router, setLoading])

    function handleBack() {
        if (props.backUrl) {
            router.replace(props.backUrl)
        } else {
            router.back()
        }
    }

    return (
        <div className={classNames('z-50', { "fixed top-0 w-full": !props.fixed, })}>
            <div
                className={classNames("relative flex items-center justify-between px-[1.6rem] z-20 left-0 right-0 py-[1.2rem]", { "bg-secondary": background })}>
                <div className='flex items-center gap-[.5rem]'>
                    <div className="cursor-pointer" onClick={() => { setMenuOpen(!menuOpen); setOverlay(!overlay) }}>
                        <MenuIcon width={32} height={32} color={props.dark ? "white" : "#434343"} />
                    </div>
                    {
                        props.title && (
                            <div className={classNames({
                                "text-typography": !props.dark,
                                "text-white": props.dark,
                            }, "text-[1.3rem] whitespace-nowrap")}>{props.title}</div>
                        )
                    }
                </div>
                <div className='flex items-center gap-[.5rem]'>
                    {callPager && Boolean(parseInt(coffeShopState.profile.has_pager)) && (
                        <div className="px-[1rem] py-[.2rem] text-[.9rem] w-full text-center text-typography bg-more/[.1] active:bg-more/[.2] active:scale-[.99] active:text-more transition-colors duration-[.1s] select-none border border-more rounded-[1rem] font-bold whitespace-nowrap">
                            صدا زدن گارسون
                        </div>
                    )}
                    {props.note && (
                        <div className="cursor-pointer relative" onClick={() => { setCartOpen(true); setOverlay(true) }}>
                            {Boolean(state.cart.length) && (
                                <div className="absolute min-w-[1rem] text-center min-h-[1rem] p-[.1rem] bg-red-800 text-white rounded-[1rem] top-[-.3rem] left-0 text-[.8rem] font-semibold">{state.cart.length}</div>
                            )}
                            <NoteIcon width={32} height={33} color={props.dark ? "white" : "#434343"} />
                        </div>
                    )}
                    {props.back && (
                        <div className="cursor-pointer" onClick={handleBack}>
                            <ArrowBackIcon width={32} height={33} color={props.dark ? "white" : "#434343"} />
                        </div>
                    )}
                </div>
            </div>
            <span className={classNames("fixed inset-0 z-50 transition duration-[.2s]", { "pointer-events-none": !overlay, "bg-black/[.3] pointer-events-auto": overlay })} onClick={() => {
                setOverlay(false)
                setMenuOpen(false)
                setCartOpen(false)
            }} />
            <div className={classNames("fixed top-0 bottom-0 max-w-xs w-full bg-white z-50 transition-all duration-[.3s] flex flex-col justify-between rounded-bl-[2rem] rounded-tl-[2rem]", { "right-0": menuOpen, "right-[-100%]": !menuOpen })}>
                <div>
                    <div className="mt-[2rem] flex items-center justify-between px-[1.5rem]">
                        <div className="text-typography text-[1.5rem]">{coffeShopState.profile?.name}</div>
                        <div className="cursor-pointer" onClick={() => {
                            setOverlay(false)
                            setMenuOpen(!menuOpen)
                        }}>
                            <LinedCloseIcon width={32} height={32} color={resolvedTailwindConfig.theme?.colors?.['typography'].toString()} />
                        </div>
                    </div>
                    <div className="mt-[2rem]">
                        <div className="flex flex-col">
                            {renderMenuItems}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-gray-300 font-bold w-full text-center py-3">قدرت گرفته از منوما</div>
                </div>
            </div>
            <Cart open={cartOpen} onClose={() => {
                setCartOpen(false)
                setOverlay(false)
            }} />
        </div>
    )
}

export default Navbar
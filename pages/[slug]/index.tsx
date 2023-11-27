import { ProfileHeader } from '@/components/profile/header/header'
import coffeeshopImage from '@/assets/images/coffeeshop.jpg'
import coffeeshopLogo from '@/assets/images/coffeeshopLogo.png'
import mapPlaceholder from '@/assets/images/map-placeholder.png'
import React, { useContext, useEffect, useState } from 'react'
import { InstagramIcon } from '@/icons/instagram'
import { TelegramIcon } from '@/icons/telegram'
import { Section } from '@/components/common/section/section'
import Image from 'next/image'
import { Navbar } from '@/components/core/navbar/noSSR'
import { useRouter } from 'next/router'
import { ILocation } from '@/components/common/map/types'
import dynamic from 'next/dynamic'
import { useQuery } from 'react-query'
import { useParams } from 'next/navigation'
import { axios, serverBaseUrl } from '@/utils/axios'
import { NextPage } from 'next'
import { ProviderContext } from '@/providers/main/provider'
import { IProfile } from './types'
import CoffeShopProvider, { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider'
import Head from 'next/head'
import { Button } from '@/components/common/button'
import { XIcon } from '@/icons/x'
import { useSlug } from '@/providers/main/hooks'

const Profile: NextPage = () => {
    const { setLoading, state: mainState } = useContext(ProviderContext)
    const { state } = useContext(CoffeeShopProviderContext)
    const profileData: IProfile = state.profile
    const router = useRouter()
    const slug = useSlug()

    const MapComponent = dynamic(import('@/components/common/map/map'), { ssr: false })

    const locationCoordinates: [number, number] = [parseFloat(profileData.location_lat || "0"), parseFloat(profileData.location_long || "0")]

    useEffect(() => {
        if (profileData) setLoading(false)
    }, [setLoading, state.profile, profileData, router])

    return (
        <>
            <Head>
                <title>
                    {profileData.name} - منوما
                </title>
            </Head>
            <main className='bg-secondary min-h-screen'>
                <Navbar
                    dark
                    background={false}
                    callPager={false}
                />
                <div className="z-0">
                    <ProfileHeader
                        image_url={profileData?.banner_path ? `${serverBaseUrl}/storage/${profileData?.banner_path}` : coffeeshopImage.src}
                        title={profileData?.name || "CafeeShop Name"}
                        address={profileData?.address || "CoffeeShop Address"}
                        //@ts-ignore
                        socials={
                            [
                                (profileData?.instagram ? { icon: <InstagramIcon />, url: profileData.instagram } : undefined),
                                (profileData?.telegram ? { icon: <TelegramIcon />, url: profileData.telegram } : undefined),
                                (profileData?.twitter ? { icon: <XIcon />, url: profileData.twitter } : undefined),
                            ].filter(Boolean)
                        }
                        logo_url={profileData?.logo_path ? `${serverBaseUrl}/storage/${profileData?.logo_path}` : coffeeshopLogo.src}
                        time_shifts={["9:30 تا 13:00", "9:30 تا 13:00"]} />
                    <div className=" text-typography mt-[4.3rem] mx-auto text-[.8rem] font-bold px-10 text-justify leading-6 md:text-center md:text-[1rem]">
                        {profileData?.description}
                    </div>
                    <Button
                        onClick={() => { router.push(`/${slug}menu`); setLoading(true) }} className="py-[.8rem] px-[2.9rem] mt-[1.3rem] mx-auto w-fit font-bold"
                        rounded
                    >
                        مشاهده منوی کافه
                    </Button>
                    <Section title="موقعیت روی نقشه" className="mt-[1.6rem]" append={
                        <Button link={`https://www.google.com/maps/dir//${locationCoordinates[0]},${locationCoordinates[1]}?entry=ttu`} className='text-[.8rem] px-[.8rem] py-[.3rem] text-white bg-[#EEB33F]' linkTarget='_blank' rounded="1rem" >مسیریابی</Button>
                    }>
                        <div className="rounded-[2rem] overflow-hidden mb-10 mx-[2.5rem] h-[20.7rem] relative mt-[1rem] z-0">
                            <MapComponent location={{
                                coordinates: locationCoordinates
                            }} />
                        </div>
                    </Section>
                </div>
            </main>
        </>
    )
}

Profile.provider = CoffeShopProvider

export default Profile

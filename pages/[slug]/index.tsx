import { ProfileHeader } from '@/components/profile/header/header'
import cofeeshopImage from '@/assets/images/cofeeshop.jpg'
import cofeeshopLogo from '@/assets/images/cofeeshopLogo.png'
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
import CoffeShopProvider, { CofeeShopProviderContext } from '@/providers/cofee_shop/provider'

const Profile: NextPage = () => {
    const { state } = useContext(CofeeShopProviderContext)
    const profileData: IProfile = state.profile
    const params = useParams()
    const router = useRouter()
    const location: ILocation = {
        coordinates: [31.875474, 54.397410]
    }

    const MapComponent = dynamic(import('@/components/common/map/map'), { ssr: false })

    const locationCoordinates: [number, number] = [parseFloat(profileData.location_lat || "0"), parseFloat(profileData.location_long || "0" )]

    return (
        <main className='bg-secondary min-h-screen'>
            <Navbar
                dark
                background={false}
                callPager={false}
            />
            <div className="z-0">
                <ProfileHeader
                    image_url={profileData?.banner_path || cofeeshopImage.src}
                    title={profileData?.name || "CafeeShop Name"}
                    address={profileData?.address || "CofeeShop Address"}
                    //@ts-ignore
                    socials={
                        [
                            (profileData?.instagram ? { icon: <InstagramIcon />, url: profileData.instagram } : undefined),
                            (profileData?.telegram ? { icon: <TelegramIcon />, url: profileData.telegram } : undefined),
                        ].filter(Boolean)
                    }
                    logo_url={profileData?.logo_path ? `${serverBaseUrl}/storage/${profileData?.logo_path}` : cofeeshopLogo.src}
                    time_shifts={["9:30 تا 13:00", "9:30 تا 13:00"]} />
                <div className=" text-typography mt-[4.3rem] mx-auto text-[.8rem] font-bold px-10 text-justify leading-6">
                    {profileData?.description}
                </div>
                <div onClick={() => { router.push(`${router.asPath}/menu`) }} className="rounded-full text-typography py-[.8rem] px-[2.9rem] mt-[1.3rem] mx-auto w-fit bg-white text-[1rem] font-bold cursor-pointer shadow whitespace-nowrap">
                    مشاهده منوی کافه
                </div>
                <Section title="موقعیت روی نقشه" className="mt-[1.6rem]" append={<a target='_blank' href={`https://www.google.com/maps/dir//${locationCoordinates[0]},${locationCoordinates[1]}?entry=ttu`} className='text-[.8rem] px-[.8rem] py-[.3rem] text-white bg-[#EEB33F] rounded-[1rem]'>مسیریابی</a>}>
                    <div className="rounded-[2rem] overflow-hidden mb-10 mx-[2.5rem] h-[20.7rem] relative mt-[1rem] z-0">
                        <MapComponent location={{
                            coordinates: locationCoordinates
                        }} />
                    </div>
                </Section>
            </div>
        </main>
    )
}

Profile.provider = CoffeShopProvider

export default Profile

import { ProfileHeader } from '@/components/profile/header/header'
import cofeeshopImage from '@/assets/images/cofeeshop.jpg'
import cofeeshopLogo from '@/assets/images/cofeeshopLogo.png'
import mapPlaceholder from '@/assets/images/map-placeholder.png'
import React from 'react'
import { InstagramIcon } from '@/icons/instagram'
import { TelegramIcon } from '@/icons/telegram'
import { Section } from '@/components/common/section/section'
import Image from 'next/image'
import { Navbar } from '@/components/core/navbar/noSSR'
import { useRouter } from 'next/router'
import { ILocation } from '@/components/common/map/types'
import dynamic from 'next/dynamic'

const Profile = () => {

    const router = useRouter()
    const location: ILocation = {
        coordinates: [31.875474, 54.397410]
    }

    const MapComponent = dynamic(import('@/components/common/map/map'), { ssr: false })


    return (
        <main className='bg-secondary min-h-screen'>
            <Navbar
                dark
                background={false}
            />
            <div className="z-0">
                <ProfileHeader
                    image_url={cofeeshopImage.src}
                    title='کافه شب'
                    address='صفائیه - میدان فرهنگ'
                    socials={[{ icon: <InstagramIcon />, url: "#" }, { icon: <TelegramIcon />, url: "#" }]}
                    logo_url={cofeeshopLogo.src}
                    time_shifts={["9:30 تا 13:00", "9:30 تا 13:00"]} />
                <div onClick={() => { router.push(`${router.asPath}/menu`) }} className="rounded-full text-typography py-[.8rem] px-[2.9rem] mt-[5.3rem] mx-auto w-fit bg-white text-[1rem] font-bold cursor-pointer">
                    مشاهده منوی کافه
                </div>
                <Section title="موقعیت روی نقشه" className="mt-[1.6rem]" append={<div className='text-[.8rem] px-[.8rem] py-[.3rem] text-white bg-[#EEB33F] rounded-[1rem]'>مسیریابی</div>}>
                    <div className="rounded-[2rem] overflow-hidden mb-10 mx-[2.5rem] h-[20.7rem] relative pt-[1rem] z-0">
                        <MapComponent location={location} />
                    </div>
                </Section>
            </div>
        </main>
    )
}


export default Profile

import { ProfileHeader } from '@/components/profile/header/header'
import cofeeshopImage from '@/assets/images/cofeeshop.jpg'
import cofeeshopLogo from '@/assets/images/cofeeshopLogo.png'
import mapPlaceholder from '@/assets/images/map-placeholder.png'
import React from 'react'
import { InstagramIcon } from '@/icons/instagram'
import { TelegramIcon } from '@/icons/telegram'
import { Section } from '@/components/common/section/section'
import Image from 'next/image'

const Profile = () => {
    return (
        <div>
            <ProfileHeader
                image_url={cofeeshopImage.src}
                title='کافه شب'
                address='صفائیه - میدان فرهنگ'
                socials={[{ icon: <InstagramIcon />, url: "#" }, { icon: <TelegramIcon />, url: "#" }]}
                logo_url={cofeeshopLogo.src}
                time_shifts={["9:30 تا 13:00", "9:30 تا 13:00"]} />
                <div className="rounded-full text-typography py-[.8rem] px-[2.9rem] mt-[5.3rem] mx-auto w-fit bg-white text-[1.2rem] font-bold">
                    مشاهده منوی کافه
                </div>
                <Section title="موقعیت روی نقشه" classNames="mt-[1.6rem]" append={<div className='text-[.8rem] px-[.8rem] py-[.3rem] text-white bg-[#EEB33F] rounded-[1rem]'>مسیریابی</div>}>
                    <div className="rounded-[3.6rem] overflow-hidden mb-10 mx-[2.5rem] h-[20.7rem] relative">
                        <Image fill src={mapPlaceholder.src} alt=''/>
                    </div>
                </Section>
        </div>
    )
}


export default Profile

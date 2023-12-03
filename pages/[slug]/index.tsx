import { ProfileHeader } from '@/components/profile/header/header'
import cafeeshopBannelPlaceholder from '@/assets/images/coffeeshop-banner-placeholder.jpg'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Section } from '@/components/common/section/section'
import { Navbar } from '@/components/core/navbar/noSSR'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { GetServerSideProps, NextPage } from 'next'
import { ProviderContext } from '@/providers/main/provider'
import { IProfile } from './types'
import CoffeShopProvider, { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider'
import Head from 'next/head'
import { Button } from '@/components/common/button'
import { useSlug } from '@/providers/main/hooks'
import { FlexBox } from '@/components/common/flex_box/flex_box'
import { FlexItem } from '@/components/common/flex_item/flex_item'
import { PhoneIcon } from '@/icons/phone'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config'
import { MailIcon } from '@/icons/mail'
import Link from 'next/link'
import { axios, serverBaseUrl } from '@/utils/axios'
import { QueryClient } from 'react-query'
import { getSlugFromReq, withCafeeShopProfile } from '@/utils/serverSideUtils'
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider'
import { MetaTags } from '@/components/common/metatags'
import _ from 'lodash'
import moment from 'moment'

const Profile = () => {
    const WorkingHours = dynamic(import('@/components/profile/working_hours/working_hours'), { ssr: false })
    const { setLoading, state: mainState } = useContext(ProviderContext)
    const { state } = useContext(CoffeeShopProviderContext)
    const profileData: IProfile = state.profile
    const router = useRouter()
    const slug = useSlug()
    const resolvedTailwindConfig = resolveConfig(tailwindConfig)
    const MapComponent = dynamic(import('@/components/common/map/map'), { ssr: false })

    const locationCoordinates: [number, number] = [parseFloat(profileData.location_lat || "0"), parseFloat(profileData.location_long || "0")]

    useEffect(() => {
        if (Object.keys(profileData).length) setLoading(false)
    }, [setLoading, state.profile, profileData, router])


    const contactInfo = useMemo(() => [
        {
            icon: <PhoneIcon color={resolvedTailwindConfig.theme?.colors!['white'].toString()} />,
            value: profileData.phone_number,
            link: `tel:${profileData.phone_number}`,
        },
        {
            icon: <MailIcon color={resolvedTailwindConfig.theme?.colors!['white'].toString()} />,
            value: profileData.email,
            link: `mailto:${profileData.email}`,
        },
    ].filter(item => item.value), [profileData, resolvedTailwindConfig])




    return (
        <>
            <Head>
                <title>
                    {`${profileData.name + (slug ? ' - منوما' : '')}`}
                </title>
            </Head>
            <MetaTags metatags={[
                {
                    name: 'og:title',
                    value: `${profileData.name + (slug ? ' - منوما' : '')}`,
                },
                {
                    name: 'og:description',
                    value: profileData.description,
                },
                {
                    name: 'og:image',
                    value: profileData?.logo_path ? `${serverBaseUrl}/storage/${profileData?.logo_path}` : cafeeshopBannelPlaceholder.src,
                }
            ]} />
            <div className='bg-secondary min-h-screen'>
                <Navbar
                    dark
                    background={false}
                    callPager={false}
                />
                <div className="z-0">
                    <ProfileHeader />
                    <div className="mt-[4.3rem]">
                        <Button
                            onClick={
                                () => {
                                    router.push(`/${slug}menu`);
                                    setLoading(true);
                                }
                            }
                            className="py-[.8rem] px-[2.9rem] mx-auto w-fit shadow-[0_0_20px_5px_rgba(0,0,0,0.01)] font-bold"
                            rounded
                        >
                            مشاهده منوی کافه
                        </Button>
                        <div className="mt-[1rem]">
                            <WorkingHours data={profileData.working_hours || []} />
                        </div>
                        <Section
                            title="موقعیت مکانی"
                            className="mt-[1rem]"
                            append={
                                <Button
                                    link={`https://www.google.com/maps/search/?api=1&query=${locationCoordinates[0]},${locationCoordinates[1]}`}
                                    className='text-[.8rem] px-[.8rem] py-[.3rem] text-white bg-[#EEB33F]'
                                    linkTarget='_blank'
                                    rounded="1rem"
                                >
                                    مسیریابی
                                </Button>
                            }>
                            <FlexBox direction='column' gap={2} className='mt-2 px-[2.5rem]'>
                                <FlexItem className='text-typography text-[.9rem] text-justify py-2 rounded-[2rem]'>
                                    {profileData.address}
                                </FlexItem>
                                <FlexItem className='mt-2'>
                                    <div className="rounded-[1rem] overflow-hidden h-[12.7rem] relative z-0">
                                        <MapComponent location={{
                                            coordinates: locationCoordinates
                                        }} />
                                    </div>
                                </FlexItem>
                            </FlexBox>

                        </Section>
                        {(!!contactInfo.length) && (
                            <Section
                                title="تماس با ما"
                                className="py-[1.6rem]"
                                contentClassNames='px-[1.7rem]'
                            >
                                <FlexBox direction='column' className='px-[1rem]' gap={2}>
                                    {contactInfo.map((contact, key) => (
                                        <FlexItem className='text-typography text-[.9rem] text-justify rounded-[2rem]' key={key}>
                                            <FlexBox alignItems='center' gap={0}>
                                                <FlexItem className='bg-typography rounded-tr-[1rem] rounded-br-[1rem]  py-2 px-2'>
                                                    {contact.icon}
                                                </FlexItem>
                                                <FlexItem className='text-typography font-bold bg-white/[.4] py-2 px-4 rounded-tl-[1rem] rounded-bl-[1rem] text-[1rem] text-center' grow>
                                                    <Link target='_blank' href={contact.link || "#"}>
                                                        {contact.value}
                                                    </Link>
                                                </FlexItem>
                                            </FlexBox>
                                        </FlexItem>
                                    ))}
                                </FlexBox>
                            </Section>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withCafeeShopProfile()

export default CoffeeShopPageProvider(Profile)

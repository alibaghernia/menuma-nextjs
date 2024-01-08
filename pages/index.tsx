import { Button } from "@/components/common/button"
import { Container } from "@/components/common/container/container"
import { FlexBox } from "@/components/common/flex_box/flex_box"
import { FlexItem } from "@/components/common/flex_item/flex_item"
import { Logo } from "@/components/common/logo"
import { Section } from "@/components/common/section/section"
import { Location } from "@/icons/location"
import { SearchIcon } from "@/icons/search"
import Head from "next/head"
import Image from "next/image"
import noImage from "@/assets/images/no-image.jpg"
import Link from "next/link"
import { Fragment, useContext, useEffect, useMemo, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import provider, { ProviderContext } from "@/providers/main/provider"
import { axios } from "@/utils/axios"
import { CoffeeShopPageProvider } from "@/providers/coffee_shop/page_provider"


function Home() {
    const { setLoading } = useContext(ProviderContext)
    const [pinBusinesses, setPinBusinesses] = useState<{
        slug: string,
        logo: string,
        title: string
    }[]>([])


    const fetchPinBusinesses = () => {
        setLoading(true)
        axios.get(`/api/cafe-restaurants/search?pin=1`)
            .finally(() => setLoading(false))
            .then(({ data }) => {
                console.log({
                    data
                });
                setPinBusinesses(data?.map((business: any) => ({
                    title: business.name,
                    slug: business.slug,
                    logo: business.logo_path ? '' : noImage.src
                })))
            })
    }

    const searchBox = useMemo(() => {

        return (
            <div className="flex items-center border p-[.5rem] border-1 gap-[.5rem] rounded-[.63rem]">
                <SearchIcon color="#959595" />
                <input className="bg-none border-none outline-none" placeholder="جستجوی اسم کافه..." />
                <Button >
                    جستجو
                </Button>
            </div>
        )

    }, [])


    const businessesSlides = useMemo(() => {
        return pinBusinesses.map((slide, idx) => {
            return (
                <SwiperSlide className='!flex !flex-row !flex-nowrap !items-center !gap-[.5rem] !w-fit !rounded-full !overflow-hidden' key={idx}>
                    <Link href={`/${slide.slug}`} className=" w-[6.25rem] h-[6.25rem]">
                        <Image src={slide.logo} fill alt={slide.title} className="z-0" />
                        <div className="absolute inset-0 bg-black/[.6] flex items-center justify-center z-10 text-white text-[.75rem] font-bold">
                            {slide.title}
                        </div>
                    </Link>
                </SwiperSlide>
            )
        })
    }, [pinBusinesses])

    useEffect(() => {
        fetchPinBusinesses()
    }, [])

    return (
        <>
            <div className="mx-auto md:w-fit mt-[2.38rem] flex flex-col items-center">
                <Logo />
                <div className="text-typography/[.8] text-[.875rem] font-medium">
                    کافه ای که میخوای را پیدا کن
                </div>
                <div className="mt-[2.12rem]">
                    {searchBox}
                </div>
                <div className="mt-[1rem]">
                    <Button color="secondary" className="py-[.5rem] px-[.8rem] flex items-center">
                        <Location />
                        پیدا کردن نزدیکترین کافه
                    </Button>
                </div>
                <div className="mt-[2.12rem] w-full max-w-[65rem]">
                    <Section title="کافه های پیشنهادی" append={(
                        <div className="text-typography/[.8] text-[.625rem] cursor-pointer">
                            مشاهده همه
                        </div>
                    )} contentClassNames="mx-[2.31rem] pt-[1rem]">
                        <Swiper
                            slidesPerView={"auto"}
                            spaceBetween={8}
                            grabCursor={true}
                            scrollbar
                        >
                            {businessesSlides}
                        </Swiper>
                    </Section>
                </div>
            </div>
        </>
    )
}

export default CoffeeShopPageProvider(Home)

import { Button } from "@/components/common/button"
import { Container } from "@/components/common/container/container"
import { FlexBox } from "@/components/common/flex_box/flex_box"
import { FlexItem } from "@/components/common/flex_item/flex_item"
import Head from "next/head"
import Link from "next/link"
import { Fragment, useContext, useEffect } from "react"

function Home() {

    useEffect(() => {
    }, [])

    return (
        <>
            <Head>
                <title>{'منوما'}</title>
            </Head>
            <div className="flex flex-col">
                <div className="mx-auto mt-7 text-[2rem] text-gray-800">
                    <Link href={{ pathname: '/' }}>
                        منوما
                    </Link>
                </div>
                <div className="mx-auto">
                    منو آنلاین <span className="text-[#035dcf]">رایگان</span> برای کافه شما
                </div>

                <Button className="bg-gray-400a border-2 border-[#035dcf] mx-auto mt-5 text-[#035dcf] shadow-2xlx rounded-xl">
                    <Link href={{ pathname: '/demo' }}>
                        مشاهده دمو
                    </Link>
                </Button>
                <Button className="bg-[#035dcf] mx-auto mt-2 text-white shadow-lg rounded-xl">
                    <Link href={{ pathname: '/register_form' }}>
                        دریافت منو رایگان
                    </Link>
                </Button>

            </div>
        </>
    )
}

Home.provider = Fragment

export default Home

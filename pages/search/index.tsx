import { Logo } from "@/components/common/logo"
import { useContext, useEffect, useState } from "react"
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { ProviderContext } from "@/providers/main/provider"
import { CoffeeShopPageProvider } from "@/providers/coffee_shop/page_provider"
import { SearchBusinessBox } from "@/components/common/search_business_box/search_business_box"
import { useRouter } from "next/router";
import { axios } from "@/utils/axios";
import Image from "next/image";


function Search() {
    const { query: params } = useRouter()
    const { setLoading } = useContext(ProviderContext)
    const [searchField, setSearchField] = useState("")
    const [fetchedItems, setFetchedItems] = useState([
        {
            logo: "https://menuma.online/_next/image?url=https%3A%2F%2Fpanel.menuma.online%2Fstorage%2Fv7e4QpvAZhCbDjGa9yagNa9RYrXY8J-metaZTZiZDlmYjA3MzgxZTFlYjE2ZjJhNzIzN2EyM2ZiZjkgKDEpLmpwZw%3D%3D-.jpg&w=640&q=75",
            title: "کافه دایا",
            address: "یزد، بلوار جوادالائمه، جنب دانشگاه امام جواد(ع)"
        },
        {
            logo: "https://menuma.online/_next/image?url=https%3A%2F%2Fpanel.menuma.online%2Fstorage%2Fv7e4QpvAZhCbDjGa9yagNa9RYrXY8J-metaZTZiZDlmYjA3MzgxZTFlYjE2ZjJhNzIzN2EyM2ZiZjkgKDEpLmpwZw%3D%3D-.jpg&w=640&q=75",
            title: "کافه دایا",
            address: "یزد، بلوار جوادالائمه، جنب دانشگاه امام جواد(ع)"
        },
    ])


    const handleFetchBusinesses = (searchPhrase: string) => {
        setLoading(true)
        axios.get(`/api/cafe-restaurants?all_fields=${searchPhrase}`)
            .finally(() => {
                setLoading(false)
            })
            .then(({ data }) => {
                console.log({
                    data
                });
            })
    }

    useEffect(() => {
        if (params.search) {
            handleFetchBusinesses(params.search as string)
        }
    }, [])

    const renderBusinesses = () => {

        return fetchedItems.map((business, idx) => (
            <div className="flex py-[1.13rem] px-[.94rem] gap-[.63rem] shadow-[0_0_20px_0_rgba(0,0,0,0.15)] rounded-[1rem] w-full md:w-full overflow-hidden" key={idx}>
                <div className="relative w-[5.875rem] h-[5.875rem] shrink-0">
                    <Image fill src={business.logo} alt={business.title} />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="text-typography text-[.875rem]">
                        {business.title}
                    </div>
                    <div className="flex flex-col gap-[.25rem]">
                        <div className="text-[.625rem] text-typography">
                            آدرس:
                        </div>
                        <div className="text-[.625rem] text-typography/[.8]">
                            {business.address}
                        </div>
                    </div>
                </div>
            </div>
        ))
    }

    const handleSearchBusiness = (searchPhrase: string) => {
        handleFetchBusinesses(searchPhrase)
    }
    return (
        <>
            <div className="mx-auto md:w-fit mt-[2.38rem] flex flex-col px-[4rem]">
                <div className="mx-auto">
                    <Logo />
                </div>
                <div className="mt-[2.12rem]">
                    <SearchBusinessBox value={searchField} onChange={setSearchField} onSearch={handleSearchBusiness} />
                </div>
                <div className="mt-[1rem]">
                    {fetchedItems.length ? (
                        <div className="flex flex-col gap-[.625rem] items-center">
                            {renderBusinesses()}
                        </div>
                    ) : params.search && (
                        <div className="center">
                            موردی وجود ندارد
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CoffeeShopPageProvider(Search)

import CoffeShopProvider from "@/providers/coffee_shop/provider"
import { ProviderContext } from "@/providers/main/provider"
import { useContext, useEffect } from "react"

function Home() {

  const { setLoading } = useContext(ProviderContext)

  useEffect(() => {
    setLoading(false)
  }, [setLoading])

  return (
    <div className="min-h-screen">
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-3 items-center">
        <div className="text-[5rem] text-gray-400">
          870745
        </div>
        <div className="text-[1.5rem] text-gray-600">
          در حال توسعه هستیم
        </div>
      </div>
    </div>
  )
}

// Home.provider = CoffeShopProvider

export default Home

import { Container } from "@/components/common/container/container"
import { FlexBox } from "@/components/common/flex_box/flex_box"
import { FlexItem } from "@/components/common/flex_item/flex_item"
import CoffeShopProvider from "@/providers/coffee_shop/provider"
import { useSlug } from "@/providers/main/hooks"
import { ProviderContext } from "@/providers/main/provider"
import Head from "next/head"
import { useContext, useEffect } from "react"

function Home() {

  const { setLoading } = useContext(ProviderContext)
  const slug = useSlug()

  useEffect(() => {
    setLoading(false)
  }, [setLoading])

  return (
    <>
      <Head>
        <title>{slug && 'منوما'}</title>
      </Head>
      <div className="min-h-screen">
        <Container center>
          <FlexBox alignItems="center" gap={3} direction="column">
            <FlexItem className="text-[5rem] text-gray-400">
              منوما
            </FlexItem>
            <FlexItem className="text-[1.5rem] text-gray-600">
              در حال توسعه هستیم
            </FlexItem>
          </FlexBox>
        </Container>
      </div>
    </>
  )
}

// Home.provider = CoffeShopProvider

export default Home

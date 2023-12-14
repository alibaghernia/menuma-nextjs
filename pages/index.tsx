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
      <div className="min-h-screen">
        <Container center>
          <FlexBox alignItems="center" gap={3} direction="column">
            <FlexItem className="text-[5rem] text-gray-400">
              منوما
            </FlexItem>
            <FlexItem className="text-[1.5rem] text-gray-600">
              در حال توسعه هستیم
            </FlexItem>
            <FlexItem className="text-[1.5rem] text-gray-600 mt-5">
              <Button rounded className="bg-gray-400 text-white shadow-2xl">
                <Link href={{ pathname: '/demo' }}>
                  مشاهده دمو
                </Link>
              </Button>
            </FlexItem>
          </FlexBox>
        </Container>
      </div>
    </>
  )
}

Home.provider = Fragment

export default Home

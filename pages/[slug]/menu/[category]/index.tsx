import { IProductProps } from '@/components/common/product/types';
import { Navbar } from '@/components/core/navbar/noSSR';
import sperso from '@/assets/images/sperso.png';
import React, { useMemo, useState } from 'react';
import { Product } from '@/components/common/product/product';
import { SearchField } from '@/components/common/search_field/search_field';
import { useParams } from 'next/navigation';
import CoffeShopProvider from '@/providers/coffee_shop/provider';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Container } from '@/components/common/container/container';
import { withCafeeShopProfile } from '@/utils/serverSideUtils';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';

function CategoryPage() {
  const [searchInput, setSearchInput] = useState<string>();
  const category = {
    title: 'ویژه ها',
  };
  const products = useMemo<IProductProps[]>(() => [], []);

  const renderdProducts = useMemo(() => {
    return products.map((product, key) => (
      <FlexItem key={key}>
        <Product
          id={product.id}
          title={product.title}
          descriptions={product.descriptions}
          image={product.image}
          prices={product.prices}
          special={product.special}
          fullWidth
        />
      </FlexItem>
    ));
  }, [products]);

  return (
    <>
      <Navbar title="کافه شب" note back />
      <FlexBox
        direction="column"
        className="bg-background min-h-screen pt-[2.5rem] z-10 px-[2.8rem]"
      >
        <FlexItem>
          <Container
            position="sticky"
            className="top-0 z-10 bg-background pt-[2rem] pb-[1rem]"
          >
            <FlexBox
              alignItems="center"
              gap="1.3rem"
              className="whitespace-nowrap"
            >
              <FlexItem grow>
                <hr className="border-black/10 w-full" />
              </FlexItem>
              <FlexItem
                grow={false}
                className="text-[1.8rem] text-typography font-bold"
              >
                {category.title}
              </FlexItem>
              <FlexItem grow>
                <hr className="border-black/10 w-full" />
              </FlexItem>
            </FlexBox>
            <SearchField
              value={searchInput ?? ''}
              className="mt-[1.7rem]"
              onChange={setSearchInput}
              onSearch={(value) => {}}
            />
          </Container>
        </FlexItem>
        <FlexItem>
          <FlexBox
            direction="column"
            gap="1.7rem"
            className="overscroll-auto mb-[1.7rem] mt-[1rem] z-0"
          >
            {renderdProducts}
          </FlexBox>
        </FlexItem>
      </FlexBox>
    </>
  );
}

export const getServerSideProps = withCafeeShopProfile();

export default CoffeeShopPageProvider(CategoryPage);

import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Section } from '@/components/common/section/section';
import { Footer } from '@/components/core/footer/footer';
import Navbar from '@/components/core/navbar/navbar';
import GalleryImage from '@/components/pages/gallery/image/image';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import { useCurrentBreakpoints } from '@/utils/hooks';
import { withCafeeShopProfile } from '@/utils/serverSideUtils';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React, { useContext, useMemo } from 'react';
import Masonry from 'react-responsive-masonry';

function GalleryPage() {
  const { state } = useContext(CoffeeShopProviderContext);
  const breakpoints = useCurrentBreakpoints();

  const repeatColumns = useMemo(() => {
    switch (breakpoints.last) {
      case 'xs':
        return 2;
      case 'sm':
        return 3;
      default:
        return 4;
    }
  }, [breakpoints.breakpoints]);

  const images = useMemo(() => {
    return [
      'https://i.pinimg.com/564x/6b/61/9b/6b619b18f89bcdceec7e223c28e99f8e.jpg',
      'https://i.pinimg.com/564x/8e/66/92/8e6692a623146d86c16b811cdfa05853.jpg',
      'https://i.pinimg.com/564x/80/e9/27/80e9279d123d9b280146456603b1ebcd.jpg',
      'https://i.pinimg.com/564x/2a/11/2f/2a112f695462f797da807fa7a03b6f39.jpg',
      'https://i.pinimg.com/736x/90/c4/89/90c4895984a1eb57eaecafc18173f5cc.jpg',
    ].map((image, idx) => (
      <div key={idx} className="relative rounded-[.862rem] overflow-hidden">
        <GalleryImage src={image} alt={image} information="تراس" />
      </div>
    ));
  }, []);

  return (
    <>
      <Navbar fixed={false} back title={state.profile.name} />
      <FlexBox direction="column" justify="between">
        <FlexItem>
          <Section title="گالری" contentClassNames="p-[1rem]" centerTitle>
            <Masonry columnsCount={repeatColumns} gutter="1rem">
              {images}
            </Masonry>
          </Section>
        </FlexItem>
        <FlexItem>
          <Footer />
        </FlexItem>
      </FlexBox>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withCafeeShopProfile();
export default CoffeeShopPageProvider(GalleryPage);

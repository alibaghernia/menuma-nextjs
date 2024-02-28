'use client';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Section } from '@/components/common/section/section';
import { Footer } from '@/components/core/footer/footer';
import Navbar from '@/components/core/navbar/navbar';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import { useCurrentBreakpoints } from '@/utils/hooks';
import React, { useContext, useMemo } from 'react';
import Masonry from 'react-responsive-masonry';
import dynamic from 'next/dynamic';
import { GalleryImage } from '@/components/pages/gallery/image/types';

const GalleryImage = dynamic(
  () => import('@/components/pages/gallery/image/image'),
  { ssr: false },
);

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
    const images: GalleryImage[] = [];
    return images.map((image, idx) => (
      <div key={idx} className="relative rounded-[.862rem] overflow-hidden">
        <GalleryImage {...image} zoomable />
      </div>
    ));
  }, []);

  return (
    <>
      <Navbar fixed={false} back title={state.profile.name} />
      <FlexBox direction="column" justify="between" className="min-h-screen">
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

export default GalleryPage;

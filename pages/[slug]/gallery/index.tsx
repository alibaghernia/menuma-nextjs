import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Section } from '@/components/common/section/section';
import { Footer } from '@/components/core/footer/footer';
import Navbar from '@/components/core/navbar/navbar';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import { useCurrentBreakpoints } from '@/utils/hooks';
import { withCafeeShopProfile } from '@/utils/serverSideUtils';
import { GetServerSideProps } from 'next';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import Masonry from 'react-responsive-masonry';
import dynamic from 'next/dynamic';
import { axios, serverBaseUrl } from '@/utils/axios';
import { useRouter } from 'next/router';
import { stat } from 'fs';

const GalleryImage = dynamic(
  () => import('@/components/pages/gallery/image/image'),
  { ssr: false },
);

function GalleryPage() {
  const { state } = useContext(CoffeeShopProviderContext);
  const { query: params } = useRouter();
  const breakpoints = useCurrentBreakpoints();
  const [gallery, setGallery] = useState<any[]>([]);

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

  function fetchGallery() {
    axios
      .get(`/api/cafe-restaurants/${params.slug}/galleries`)
      .then(({ data }) => {
        setGallery(
          data.map((img: any) => ({
            title: state.profile.name,
            alt: state.profile.name,
            src: `${serverBaseUrl}/storage/${img.path}`,
            information: img.description,
            width: img.w,
            height: img.h,
          })),
        );
      });
  }
  useEffect(() => {
    fetchGallery();
  }, []);
  const images = useMemo(() => {
    return gallery.map((image, idx) => (
      <div key={idx} className="relative rounded-[.862rem] overflow-hidden">
        <GalleryImage {...image} zoomable />
      </div>
    ));
  }, [gallery]);

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

export const getServerSideProps: GetServerSideProps = withCafeeShopProfile();
export default CoffeeShopPageProvider(GalleryPage);

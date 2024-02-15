import React, { FC, useEffect, useMemo, useState } from 'react';
import { GalleryImage, GalleryImageProps, IGalleryImage } from './types';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { PanZoomIcon } from '@/icons/pan-zoom';
import { twMerge } from 'tailwind-merge';
import { View360 } from '@/icons/view-360';
import classNames from 'classnames';
import { useCurrentBreakpoints, useTailwindColor } from '@/utils/hooks';
import { LinedCloseIcon } from '@/icons/lined_close';
import { createPortal } from 'react-dom';
import { Button, Spin } from 'antd/lib';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const GalleryImage: IGalleryImage = (props) => {
  const [showZoom, setShowZoom] = useState(false);
  const zoomImage = () => {
    setShowZoom(true);
  };

  return (
    <>
      <div className="relative">
        <img src={props.src} alt={props.alt} />
        {(!!props.information || !!props.zoomable) && (
          <FlexBox
            direction="column"
            className="absolute inset-0 bg-black/[.6] p-6 opacity-0 hover:opacity-[1] transition-opacity duration-[.3s] gap-[2rem]"
            alignItems="center"
            justify="center"
          >
            {!!props.information && (
              <FlexItem className="text-white text-[1.2rem] font-semibold">
                {props.information}
              </FlexItem>
            )}
            {props.zoomable && (
              <FlexItem
                className="p-1 bg-black/[.4] rounded-[.5rem] cursor-pointer hover:scale-[1.1] transition-transform duration-[.3s]"
                onClick={() => zoomImage()}
              >
                <PanZoomIcon width={28} height={28} />
              </FlexItem>
            )}
          </FlexBox>
        )}
        {props.is_panorama && (
          <div className="absolute left-[50%] translate-x-[-50%] bottom-[1rem] pointer-events-none">
            <View360 />
          </div>
        )}
      </div>
      {showZoom && (
        <ZoomModal
          {...props}
          onClose={() => {
            setShowZoom(false);
          }}
        />
      )}
    </>
  );
};

export default GalleryImage;

const ZoomModal: FC<GalleryImageProps & { onClose: () => void }> = (props) => {
  const currentBreakpoints = useCurrentBreakpoints();
  const typographyColor = useTailwindColor('typography');
  const [current, setCurrent] = useState<GalleryImage>(props);
  const [loadingImage, setLoadingImage] = useState(true);
  const [imageContainerWidth, setImageContainerWidth] = useState(0);

  useEffect(() => {
    process.nextTick(() => {
      const width = document.getElementById('image-container')?.clientWidth;
      setImageContainerWidth(width!);
    });
  }, []);

  const image = useMemo(() => {
    const aspect = props.width / props.height;
    const height = (1 * imageContainerWidth) / aspect;
    console.log({
      aspect,
      imageContainerWidth,
      props,
    });
    if (current.is_panorama) {
      return (
        <>
          <ReactPhotoSphereViewer
            height="400px"
            width="100%"
            src={current.src}
            //@ts-ignore
            panoData={{
              isEquirectangular: true,
              croppedHeight: 1980,
              croppedWidth: 4096,
              croppedY: 1000,
            }}
            onReady={() => {
              setLoadingImage(false);
            }}
          />
        </>
      );
    } else
      return (
        <img
          src={current.src}
          onLoad={() => setLoadingImage(false)}
          alt={current.alt}
          className="w-full object-cover rounded-[.865rem]"
          style={{
            width: '100%',
            height: `${height}px`,
          }}
        />
      );
  }, [current, imageContainerWidth]);

  const childSlides = useMemo(() => {
    return props.childs?.map((image, idx) => (
      <SwiperSlide className="!w-fit" key={idx}>
        <FlexBox
          direction="column"
          alignItems="center"
          gap={2}
          className="bg-white cursor-pointer"
          onClick={() => {
            setLoadingImage(true);
            setCurrent(image);
          }}
        >
          <FlexItem className="relative w-[8rem] h-[8rem] rounded-[.5rem] overflow-hidden border">
            <Image
              src={image.thumb_src ? image.thumb_src : image.src}
              fill
              alt={image.title || ''}
              className="object-cover"
            />
            {image.is_panorama && (
              <div className="absolute left-[50%] bottom-[.5rem] translate-x-[-50%]">
                <View360 />
              </div>
            )}
          </FlexItem>
          <FlexItem className="text-typography text-[.865rem] font-semibold">
            {image.title}
          </FlexItem>
        </FlexBox>
      </SwiperSlide>
    ));
  }, []);

  return createPortal(
    <>
      <div
        className={twMerge(
          classNames('z-50 fixed bg-black/[.4] inset-0', {
            'flex justify-center items-center': currentBreakpoints.isMd,
          }),
        )}
        onClick={(e) => {
          e.preventDefault();
          props.onClose();
        }}
      ></div>
      <FlexBox
        direction="column"
        gap={2}
        className={twMerge(
          classNames('z-50 bg-white p-[2rem] max-h-screen', {
            'inset-0 fixed': currentBreakpoints.isXs,
            'w-[40rem] max-h-[calc(100vh - 5rem)] rounded-[1rem] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]':
              currentBreakpoints.isSm,
          }),
        )}
      >
        <FlexItem>
          <FlexBox justify="between">
            <FlexItem className="text-typography font-semibold text-[1rem]">
              {current.title}
            </FlexItem>
            <FlexItem
              onClick={() => props.onClose()}
              className="cursor-pointer"
            >
              <LinedCloseIcon color={typographyColor} width={28} height={28} />
            </FlexItem>
          </FlexBox>
        </FlexItem>
        <FlexItem>
          <hr />
        </FlexItem>
        <FlexItem grow className="relative overflow-y-auto">
          <FlexBox
            id="image-container"
            // direction="column"
            alignItems="center"
            className="h-full"
          >
            {image}
          </FlexBox>
          {loadingImage && (
            <div className="absolute inset-0 bg-white flex justify-center items-center">
              <Spin />
            </div>
          )}
        </FlexItem>
        {Boolean(current.information) && (
          <FlexItem className="text-typography text-center py-2 text-[1rem]">
            {current.information}
          </FlexItem>
        )}
        <FlexItem className="">
          <hr />
        </FlexItem>
        {Boolean(props.childs?.length) && (
          <FlexItem>
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={16}
              centerInsufficientSlides
            >
              {childSlides}
            </Swiper>
          </FlexItem>
        )}
        <FlexItem>
          <Button
            ghost
            type={'primary'}
            block
            onClick={() => props.onClose()}
            size="large"
          >
            بستن
          </Button>
        </FlexItem>
      </FlexBox>
    </>,
    document.body.querySelector('main')!,
  );
};

import React, { FC, useMemo, useState } from 'react';
import { GalleryImageProps, IGalleryImage } from './types';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { PanZoomIcon } from '@/icons/pan-zoom';
import { twMerge } from 'tailwind-merge';
import { View360 } from '@/icons/view-360';
import classNames from 'classnames';
import { useCurrentBreakpoints, useTailwindColor } from '@/utils/hooks';
import { LinedCloseIcon } from '@/icons/lined_close';
import { createPortal } from 'react-dom';
import { Button } from 'antd/lib';

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
        {props.isPanorama && (
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

  const image = useMemo(() => {
    if (props.isPanorama) {
      return <></>;
    } else return <img src={props.src} alt={props.alt} />;
  }, []);

  return createPortal(
    <>
      <FlexBox
        direction="column"
        gap={2}
        className={twMerge(
          classNames('z-50 fixed bg-white p-[1rem]', {
            'inset-0': currentBreakpoints.isXs,
          }),
        )}
      >
        <FlexItem>
          <FlexBox justify="between">
            <FlexItem className="text-typography font-semibold text-[1rem]">
              {props.title}
            </FlexItem>
            <FlexItem onClick={() => props.onClose()}>
              <LinedCloseIcon color={typographyColor} width={28} height={28} />
            </FlexItem>
          </FlexBox>
        </FlexItem>
        <FlexItem>
          <hr />
        </FlexItem>
        <FlexItem grow className="p-[1rem] relative">
          <FlexBox direction="column" justify="center" className="h-full">
            <FlexItem className="rounded-[.865rem] overflow-hidden">
              {image}
            </FlexItem>
          </FlexBox>
        </FlexItem>
        <FlexItem>
          <Button ghost type={'primary'} block onClick={() => props.onClose()}>
            بستن
          </Button>
        </FlexItem>
      </FlexBox>
    </>,
    document.body.querySelector('main')!,
  );
};

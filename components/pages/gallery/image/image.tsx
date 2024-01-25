import React from 'react';
import { IGalleryImage } from './types';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { PanZoomIcon } from '@/icons/pan-zoom';
import { twMerge } from 'tailwind-merge';

const GalleryImage: IGalleryImage = (props) => {
  console.log({
    props,
  });
  return (
    <>
      <div className="relative">
        <img src={props.src} alt={props.alt} />
        {(!!props.information || !!props.zoomable) && (
          <FlexBox
            className="absolute inset-0 bg-black/[.6] opacity-0 hover:opacity-[1] transition-opacity duration-[.3s]"
            alignItems="center"
            justify="center"
          >
            {!!props.information && (
              <FlexItem className="text-white text-[1.2rem] font-semibold">
                {props.information}
              </FlexItem>
            )}
            {props.zoomable && (
              <FlexItem>
                <PanZoomIcon />
              </FlexItem>
            )}
          </FlexBox>
        )}
      </div>
    </>
  );
};

export default GalleryImage;

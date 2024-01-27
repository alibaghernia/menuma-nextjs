import { FC } from 'react';

declare type GalleryImage = {
  src: string;
  thumb_src?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  title: string;
  information?: string;
  childs?: GalleryImageProps[];
  is_panorama?: boolean;
};

declare interface GalleryImageProps extends GalleryImage {
  zoomable?: boolean;
}

declare type IGalleryImage = FC<GalleryImageProps>;

import { FC } from 'react';

declare interface GalleryImageProps {
  title?: string;
  zoomable?: boolean;
  information?: string;
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  isPanorama?: boolean;
}

declare type IGalleryImage = FC<GalleryImageProps>;

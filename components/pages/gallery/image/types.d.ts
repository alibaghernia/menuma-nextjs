import { FC } from 'react';

declare interface GalleryImageProps {
  zoomable?: boolean;
  information?: string;
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

declare type IGalleryImage = FC<GalleryImageProps>;

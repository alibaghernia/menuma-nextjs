import { FC } from 'react';

declare interface IMetaTagsProps {
  metatags: {
    name: string;
    value: string;
  }[];
}

declare type IMetaTags = FC<IMetaTagsProps>;

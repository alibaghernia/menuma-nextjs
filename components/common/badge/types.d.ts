import { FC, PropsWithChildren } from 'react';

declare interface IBadgeProps {
  type?: string;
}
enum TagType {
  new = 'new',
  hot = 'hot',
  sold_out = 'sold_out',
}

declare type IBadge = FC<PropsWithChildren<IBadgeProps>>;

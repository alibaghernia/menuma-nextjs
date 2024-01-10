import { FC, PropsWithChildren } from 'react';

declare interface IBadgeProps {
  type?: 'new' | 'hot' | 'soldout';
}

declare type IBadge = FC<PropsWithChildren<IBadgeProps>>;

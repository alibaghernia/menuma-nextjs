import { FC, HTMLAttributes, PropsWithChildren } from 'react';

declare interface IAbsoluteContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  position?: 'absolute' | 'fixed' | 'sticky' | 'relative';
  center?: boolean;
  centerVertical?: boolean;
  centerHorizontal?: boolean;
  className?: string;
}

declare type IContainer = FC<PropsWithChildren<IAbsoluteContainerProps>>;

import { FC, HTMLAttributes, PropsWithChildren } from 'react';

declare interface IFlexBoxProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'normal' | 'start' | 'center' | 'end' | 'around' | 'between';
  gap?: string | number;
  className?: string;
}

declare type IFlexBox = FC<PropsWithChildren<IFlexBoxProps>>;

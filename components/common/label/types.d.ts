import { FC, PropsWithChildren } from 'react';

declare interface ILabelProps {
  className?: string;
  for: string;
}

declare type ILabel = FC<PropsWithChildren<IButtonProps>>;

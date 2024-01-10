import {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactHTMLElement,
} from 'react';

declare interface IFlexItemProps extends HTMLAttributes<HTMLDivElement> {
  grow?: boolean;
  className?: string;
}

declare type IFlexItem = FC<PropsWithChildren<IFlexItemProps>>;

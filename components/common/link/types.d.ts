import { LinkProps } from 'next/link';
import {
  ElementType,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactPropTypes,
} from 'react';

declare type ILinkProps = LinkProps & HTMLAttributes<HTMLDivElement>;

declare type ILink = FC<PropsWithChildren<ILinkProps>>;

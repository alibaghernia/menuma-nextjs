import { FC } from 'react';

declare interface ICartProps {
  open: boolean;
  onClose: () => void;
}

declare type ICart = FC<ICartProps>;

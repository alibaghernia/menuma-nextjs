import { FC } from 'react';

declare interface ICallGarsonProps {
  onClick: () => void;
  isCancel?: boolean;
  size: 'large' | 'small';
}

declare type ICallGarson = FC<ICallGarsonProps>;

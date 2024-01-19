import { FC, PropsWithChildren } from 'react';

declare interface ISectionProps {
  title: string;
  id?: string;
  className?: string;
  contentClassNames?: string;
  append?: JSX.Element;
  centerTitle?: boolean;
}
declare interface IAppentRegularButtonProps {
  title: sting;
  onClick?: () => void;
}

declare type ISection = FC<PropsWithChildren<ISectionProps>> & {
  AppentRegularButton: FC<IAppentRegularButtonProps>;
};

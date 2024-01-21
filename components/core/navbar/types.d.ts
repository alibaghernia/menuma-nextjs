import { FC } from 'react';

declare interface INavBarProps {
  back?: boolean;
  backUrl?: string;
  note?: boolean;
  title?: string;
  dark?: boolean;
  fixed?: boolean;
  background?: boolean;
  callPager?: boolean;
  menuButtonOverlay?: boolean;
}

declare type INavBar = FC<INavBarProps>;

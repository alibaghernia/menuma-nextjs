import { FC, PropsWithChildren } from "react";

declare interface IAbsoluteContainerProps {
  center?: boolean;
  className?: string;
}

declare type IAbsoluteContainer = FC<
  PropsWithChildren<IAbsoluteContainerProps>
>;

import { FC, PropsWithChildren } from "react";

declare interface IButtonProps {
  className?: string;
  link?: string;
  linkTarget?: string;
  onClick?: () => void;
  rounded?: string | boolean;
  shadow?: string | boolean;
  type?: "primary" | "ghost";
  color?: "primary" | "secondary" | string;
}

declare type IButton = FC<PropsWithChildren<IButtonProps>>;

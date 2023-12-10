import { FC } from "react";

declare interface ICategoryCardProps {
  titleClassName?: string;
  className?: string;
  title: string;
  url?: string;
  image?: string;
  selected?: boolean;
  onClick?: () => void;
}

declare type ICategoryCard = FC<ICategoryCardProps>;

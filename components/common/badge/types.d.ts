import { FC, PropsWithChildren } from "react";

declare interface IBadgeProps {
  type?: any
  // type?: "new" | "hot" | "sold_out";
}

declare type IBadge = FC<PropsWithChildren<IBadgeProps>>;

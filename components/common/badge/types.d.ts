import { FC, PropsWithChildren } from "react";

declare interface IBadgeProps {
  type?: "new" | "hot" | "sold_out";
}

declare type IBadge = FC<PropsWithChildren<IBadgeProps>>;

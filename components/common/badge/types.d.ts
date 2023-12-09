import { FC, PropsWithChildren } from "react";

declare interface IBadgeProps {
    title?: string;
}

declare type IBadge = FC<PropsWithChildren<IBadgeProps>>
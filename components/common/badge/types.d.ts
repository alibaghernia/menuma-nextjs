import { FC, PropsWithChildren } from "react";

declare interface IBadgeProps {
    type?: string
}

declare type IBadge = FC<PropsWithChildren<IBadgeProps>>
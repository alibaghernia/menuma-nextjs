import { FC, PropsWithChildren } from "react";

declare interface IButtonProps {
    className?: string;
    link?: string,
    linkTarget?: string
    onClick?: () => void
    rounded?: string | boolean
    shadow?: string | boolean
}

declare type IButton = FC<PropsWithChildren<IButtonProps>>
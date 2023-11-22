import { FC } from "react";

declare interface INavBarProps {
    back?: boolean;
    note?: boolean;
    title?: string;
    dark?: boolean
    fixed?: boolean
}

declare type INavBar = FC<INavBarProps>
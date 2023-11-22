import { FC } from "react";

declare interface IProfileHeaderProps {
    title: string;
    address: string;
    time_shifts: string[],
    socials: { icon: JSX.Element, url: string; }[],
    image_url: string;
    logo_url: string;
}

declare type IProfileHeader = FC<IProfileHeaderProps>
import { FC } from "react";

declare interface ICategoryCardProps {
    title: string;
    url: string;
    image: string;
    selected?: boolean
    onClick?: () => void
}

declare type ICategoryCard = FC<ICategoryCardProps>
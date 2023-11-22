import { FC } from "react";

declare interface ICategoryCardProps {
    title: string;
    url: string;
    image: string;
}

declare type ICategoryCard = FC<ICategoryCardProps>
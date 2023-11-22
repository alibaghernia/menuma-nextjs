import { FC, PropsWithChildren } from "react";

declare interface ISectionProps {
    title: string;
    classNames?: string;
    append?: JSX.Element
}

declare type ISection = FC<PropsWithChildren<ISectionProps>>
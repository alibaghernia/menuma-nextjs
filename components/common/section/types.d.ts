import { FC, PropsWithChildren } from "react";

declare interface ISectionProps {
    title: string;
    className?: string;
    contentClassNames?: string;
    append?: JSX.Element
}

declare type ISection = FC<PropsWithChildren<ISectionProps>>
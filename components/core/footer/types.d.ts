import { FC } from 'react';

declare interface IFooterProps {
    className?: string;
    description: string;
    link: string;
    linkTitle: string
}

declare type IFooter = FC<IFooterProps>;

import { FC, HTMLAttributes, PropsWithChildren } from 'react';

declare interface IEventCardProps
  extends EventType,
    HTMLAttributes<HTMLDivElement> {
  in_scope?: boolean;
}

declare type IEventCard = FC<PropsWithChildren<IEventCardProps>>;

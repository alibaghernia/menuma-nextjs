import { FC, HTMLAttributes, PropsWithChildren } from 'react';

declare interface IEventCardProps
  extends EventType,
    HTMLAttributes<HTMLDivElement> {}

declare type IEventCard = FC<PropsWithChildren<IEventCardProps>>;

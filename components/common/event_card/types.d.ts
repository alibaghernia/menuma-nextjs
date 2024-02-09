import { EventEntity } from '@/services/main/main';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

declare interface IEventCardProps
  extends EventEntity,
    HTMLAttributes<HTMLDivElement> {
  in_scope?: boolean;
}

declare type IEventCard = FC<PropsWithChildren<IEventCardProps>>;

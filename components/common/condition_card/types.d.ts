import { FC, HTMLAttributes, PropsWithChildren } from 'react';

declare interface IConitionCardProps
  extends ConditionType,
  HTMLAttributes<HTMLDivElement> { }

declare type IConditionCard = FC<PropsWithChildren<IConditionCardProps>>;

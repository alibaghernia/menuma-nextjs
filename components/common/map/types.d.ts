import { Business } from '@/services/business/business';
import { FC } from 'react';

declare type ILocation = {
  coordinates: [number, number];
};

declare interface IMapProps {
  business: Business;
}

declare type IMap = FC<IMapProps>;

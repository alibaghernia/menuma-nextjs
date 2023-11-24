import { FC } from "react";

declare type ILocation = {
    coordinates: [number, number]
}

declare interface IMapProps {
    location: ILocation
}

declare type IMap = FC<IMapProps>
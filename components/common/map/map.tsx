'use client';
import React from 'react';
import { MapContainer, Marker, TileLayer } from './client';
import { IMap } from './types';
import mapMarker from '@/assets/images/map-marker.png';
import { icon } from './client';

const Map: IMap = ({ business }) => {
  const locationCoordinates: [number, number] = [
    parseFloat(business.location_lat || '0'),
    parseFloat(business.location_long || '0'),
  ];
  return (
    <MapContainer
      center={locationCoordinates}
      zoom={15}
      scrollWheelZoom
      style={{ height: '100%' }}
    >
      <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&z={z}&y={y}" />
      <Marker
        position={locationCoordinates}
        icon={icon({
          iconSize: [40, 40],
          iconAnchor: [40 / 2, 40],
          // className: "mymarker",
          iconUrl: mapMarker.src,
        })}
      />
    </MapContainer>
  );
};

export default Map;

import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { IMap } from './types';
import mapMarker from '@/assets/images/map-marker.png';
import L from 'leaflet';

export const Map: IMap = ({ location }) => {
  const apiKey =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNiN2RkZmFjOTAzNDY0NGFkYjNlOTY0MzMwNzRhZmQ3YzRmYWJhOTYyYjhjZGFkOTBhOTE1YWIzZTgyZGI5MGY3MDU4MDQ2YmVkNjZjMGRlIn0.eyJhdWQiOiIyNTA2NyIsImp0aSI6ImNiN2RkZmFjOTAzNDY0NGFkYjNlOTY0MzMwNzRhZmQ3YzRmYWJhOTYyYjhjZGFkOTBhOTE1YWIzZTgyZGI5MGY3MDU4MDQ2YmVkNjZjMGRlIiwiaWF0IjoxNzAwODE2NjQyLCJuYmYiOjE3MDA4MTY2NDIsImV4cCI6MTcwMzMyMjI0Miwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.ZWi3pe3C2U61B9X-xlnbRRtorFTVRAFKKt6En_3Zvtqg2YHOF8l7ADnvVE-XV5bj8v4rlK9O5ORq6Nxse13QM0VDkEEiIu1i0nhSDXKovhuu320b6IxrRWBmqkwKbVblNcCFtLX_3ENUXHdfPIsZmCVxVhZLLwJrBB9eRiYjSuXCvK2pEP8RdevlQh42xXl8rT9KdieLLaa32HJEEQUAwLUYlKz87n9GhcD_zS7hBbS08HVeLF6VSa6M53svOnpTatR1sDEDpTMmXNhY_vpXWkJYROIErQFO7jofLc1kEkC51kv_8YL6aWcLTTlfVHLFyN86xL9FztbZ-rEFZSDPog';

  return (
    <MapContainer
      center={location.coordinates}
      zoom={15}
      scrollWheelZoom
      style={{ height: '100%' }}
    >
      <TileLayer
        url={`https://map.ir/shiveh/xyz/1.0.0/Shiveh:Shiveh@EPSG:3857@png/{z}/{x}/{y}.png?x-api-key=${apiKey}`}
      />
      <Marker
        position={location.coordinates}
        icon={L.icon({
          iconSize: [64, 64],
          iconAnchor: [64 / 2, 64],
          // className: "mymarker",
          iconUrl: mapMarker.src,
        })}
      />
    </MapContainer>
  );
};

export default Map;

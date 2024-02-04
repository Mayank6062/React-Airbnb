'use client';

//npm i leaflet
//npm i -D @types/leaflet
//npm i react-leaflet
//leaflet package not support react its open source project hence must import markeRS
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore //commet write nhi to ._getIconUrl genrate the error mess.
//._getIconUrl is adgit but genrate the typpe script

delete L.Icon.Default.prototype._getIconUrl; 
L.Icon.Default.mergeOptions({ //these defalut option not work correctally hence assign the defalt options
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});


interface MapProps {
  center?: number[] //in center latitude and lagotude
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map: React.FC<MapProps> = ({ center }) => {
  return (
     <MapContainer center={center as L.LatLngExpression || [51, -0.09]} zoom={center ? 4 : 2} scrollWheelZoom={false} className="h-[35vh] rounded-lg">
          <TileLayer url={url} attribution={attribution} />
          {center && (
            <Marker position={center as L.LatLngExpression} />
          )}
        </MapContainer>
    )
}

export default Map;
///////////////////////////////////////////
import React, { useState } from 'react';
import {
  MapContainer, TileLayer, LayersControl, FeatureGroup,
} from 'react-leaflet';
import { CountrySelectionProvider } from './country-selection-context';
import ShapeFile from './ShapeFile';
import Popup from './Popup';
import './Map.css';

const { BaseLayer } = LayersControl;

const Map = () => {
  const [map, setMap] = useState(null);

  return (
    <CountrySelectionProvider>
      <MapContainer
        className="map-container"
        whenCreated={setMap}
        bounds={[
          [-10, -10],
          [50, 10],
        ]}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              noWrap
            />
          </BaseLayer>
          <FeatureGroup>
            <ShapeFile map={map} />
          </FeatureGroup>
        </LayersControl>
        <Popup />
      </MapContainer>
    </CountrySelectionProvider>
  );
};
export default Map;

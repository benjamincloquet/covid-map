import React, { useState } from 'react';
import {
  MapContainer, TileLayer, LayersControl, FeatureGroup,
} from 'react-leaflet';
import { CountrySelectionProvider } from './country-selection-context';
import ShapeFile from './ShapeFile';
import Popup from './Popup';
import './Map.css';

const { BaseLayer, Overlay } = LayersControl;

const Map = () => {
  const [map, setMap] = useState(null);

  return (
    <CountrySelectionProvider>
      <MapContainer
        className="map-container"
        whenCreated={setMap}
        bounds={[
          [-90, -180],
          [90, 180]]}
      >
        <LayersControl position="topright" style={{ zIndex: 1 }}>
          <BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              noWrap
            />
          </BaseLayer>
          <Overlay name="Borders">
            <FeatureGroup color="purple">
              <ShapeFile map={map} />
            </FeatureGroup>
          </Overlay>
        </LayersControl>
        <Popup />
      </MapContainer>
    </CountrySelectionProvider>
  );
};
export default Map;

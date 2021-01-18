import React, { useState } from 'react';
import {
  MapContainer, TileLayer, LayersControl, FeatureGroup,
} from 'react-leaflet';
import ShapeFile from './ShapeFile';
import zipUrl from './shp/ne_110m_admin_0_countries.zip';
import './Map.css';

const { BaseLayer, Overlay } = LayersControl;

const Map = () => {
  const [map, setMap] = useState(null);

  return (
    <MapContainer
      className="map-container"
      whenCreated={setMap}
      bounds={[
        [-90, -180],
        [90, 180]]}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap.Mapnik">
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            noWrap
          />
        </BaseLayer>
        <Overlay name="Borders">
          <FeatureGroup color="purple">
            <ShapeFile map={map} zipUrl={zipUrl} />
          </FeatureGroup>
        </Overlay>
      </LayersControl>
    </MapContainer>
  );
};
export default Map;

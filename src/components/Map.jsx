import React, { useState } from 'react';
import {
  MapContainer, TileLayer, LayersControl, FeatureGroup,
} from 'react-leaflet';
import ShapeFile from './ShapeFile';
import zipUrl from '../shp/ne_110m_admin_0_countries.zip';

const { BaseLayer, Overlay } = LayersControl;

const Map = () => {
  const [map, setMap] = useState(null);

  return (
    <MapContainer
      style={{ height: '100vh' }}
      center={[51.505, -0.09]}
      zoom={13}
      whenCreated={setMap}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap.Mapnik">
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
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

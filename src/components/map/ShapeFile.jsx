import { useEffect } from 'react';
import Leaflet from 'leaflet';
import shp from 'shpjs';
import zipUrl from './shp/ne_110m_admin_0_countries.zip';
import { useCountrySelection } from './country-selection-context';

const ShapeFile = ({ map }) => {
  const { dispatch } = useCountrySelection();

  const onEachFeature = (feature, layer) => {
    layer.on('click', () => {
      dispatch({
        type: 'select',
        payload: {
          name: feature.properties.NAME,
          displayName: feature.properties.ADMIN,
        },
      });
    });
  };

  const style = {
    color: '#ff0000',
    weight: 1,
    opacity: 1,
    fillOpacity: 0,
  };

  useEffect(() => {
    if (map) {
      const geoJSONLayerOptions = { onEachFeature, style };
      const geoJSONLayer = Leaflet.geoJSON({ features: [] }, geoJSONLayerOptions);
      geoJSONLayer.addTo(map);
      shp(zipUrl).then((data) => {
        geoJSONLayer.addData(data);
      });
    }
  }, [map]);

  return null;
};

export default ShapeFile;

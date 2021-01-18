import { useEffect } from 'react';
import Leaflet from 'leaflet';

import shp from 'shpjs';

const ShapeFile = ({ map, zipUrl }) => {
  if (map) {
    const onEachFeature = (feature, layer) => {
      fetch(`https://covid19-api.com/country?name=${feature.properties.NAME}&format=json`)
        .then((res) => res.json())
        .then((result) => {
          const popupContent = [`<h1>${feature.properties.ADMIN}</h1>`];
          if (result[0] === undefined) {
            popupContent.push('<p>No data for this country.</p>');
          } else {
            popupContent.push(`<p>Confirmed cases : ${result[0].confirmed.toLocaleString()}</p>`);
            popupContent.push(`<p>Deaths : ${result[0].deaths.toLocaleString()}</p>`);
            popupContent.push(`<p>Recovered : ${result[0].recovered.toLocaleString()}</p>`);
          }
          layer.bindPopup(popupContent.join(''));
        });
    };

    const style = {
      color: '#ff0000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0,
    };

    useEffect(() => {
      const geoJSONLayerOptions = { onEachFeature, style };
      const geoJSONLayer = Leaflet.geoJSON({ features: [] }, geoJSONLayerOptions);
      geoJSONLayer.addTo(map);
      shp(zipUrl).then((data) => {
        geoJSONLayer.addData(data);
      });
    }, []);
  }

  return null;
};

export default ShapeFile;

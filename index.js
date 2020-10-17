import 'ol/ol.css';
import {Map, View} from 'ol';
import {transform} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

// https://www.latlong.net/place/prime-meridian-greenwich-30835.html 
const center = transform([-0.001545, 51.477928], 'EPSG:4326', 'EPSG:3857');

const map = new Map({
  target: 'map',
  controls: [],
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: center,
    zoom: 14
  })
});

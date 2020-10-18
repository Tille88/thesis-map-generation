import 'ol/ol.css';
import {Map, View} from 'ol';
import {transform} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import cfg from './cfg';
import mapData from '../assets/basemap/greenwhich_src.json';
import baseMapImageURL from '../assets/basemap/greenwhich.png';




export const CreateBaseMap = function({
    mapSource = 'OSM',
} = {}){
    return {
        init: function(){
            if(mapSource==='OSM'){
                renderOSM();
            } else {
                renderCached();
            }
        }
    }
}

// OPEN STREET MAP VERSION
function renderOSM(){
        // https://www.latlong.net/place/prime-meridian-greenwich-30835.html 
        const center = transform([-0.001545, 51.477928], 'EPSG:4326', 'EPSG:3857');

        const map = new Map({
        target: cfg.target,
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
}


// Cached version
function renderCached(){
    var targetDiv = document.getElementById(cfg.target);
    var canvas = document.createElement("canvas");
    canvas.width = targetDiv.clientWidth;
    canvas.height = targetDiv.clientHeight;
    targetDiv.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = mapData.src;
    // img.src = baseMapImageURL;
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    };

    // var ctx = document.getElementById('canvas').getContext('2d');
    // var img = new Image();
    // img.onload = function() {
    //   ctx.drawImage(img, 0, 0);
    // };
    // img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
  
}
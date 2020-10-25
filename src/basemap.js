import 'ol/ol.css';
import {Map, View} from 'ol';
import {transform} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import cfg from './cfg';
import mapData from '../assets/basemap/greenwhich_src.json';
import baseMapImageURL from '../assets/basemap/greenwhich.png';
import {createCanvasContext, getCanvasContext} from './utils';



export const CreateBaseMap = function({
    mapSource = 'OSM',
} = {}){
    return {
        renderProm: null,
        init: function(){
            if(mapSource==='OSM'){
                this.renderProm = renderOSM();
            } else {
                this.renderProm = renderCached();
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
        return Promise.resolve;
}


function renderCached(){
    createCanvasContext();
    // var ctx = getCanvasContext()
    // return loadImage(mapData.src).then(img => ctx.drawImage(img, 0, 0));
    return loadImage(mapData.src);
}

const loadImage = (urlImgData) => new Promise((resolve, reject) => {
    var ctx = getCanvasContext();
    const img = new Image();
    img.src = urlImgData;
    // img.addEventListener('load', () => resolve(img));
    img.addEventListener('load', () => {
        // TBR
        // ctx.drawImage(img, 0, 0);
        resolve(console.log("BACKGROUND"))
        // resolve(console.log("BACKGROUND"));
    });
  });
  
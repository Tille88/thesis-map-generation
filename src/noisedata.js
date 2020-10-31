import p5 from '../lib/noise';
import cfg from './cfg';
import {opColChoiceEnum} from './enums';
import {getCanvasContext, distance} from './utils';
import {extent} from 'd3-array';
import {scaleLinear} from 'd3-scale';

export const CreateNoiseDataLayer = function({
    loc = {
        xMin: 0.2,
        xMax: 0.8,
        yMin: 0.2,
        yMax: 0.8
        } 
    } = {}){
    // PRIV
    let alphaStorage = null;
    p5.noiseSeed(cfg.opacitySeed)
    return {
        loc: loc,

        init: function(){
            alphaStorage = opacityCanvasComposite.apply(this);
        }
    }
}


// TODO: refactor
function opacityCanvasComposite(){
    let ctx = getCanvasContext();
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;
    var imageData = ctx.createImageData(width,height);
    let alphaStorage = new Array(imageData.data.length);
    const xMinPx = this.loc.xMin * width;
    const xMaxPx = this.loc.xMax * width;
    const yMinPx = this.loc.yMin * height;
    const yMaxPx = this.loc.yMax * height;
    const maxDist = distance(xMinPx, yMinPx, xMinPx+(xMaxPx-xMinPx)/2, yMinPx+(yMaxPx-yMinPx)/2)
    // Opacity calculation
    for (let i = 0; i < imageData.data.length; i += 4) {
        let x = (i/4) % width;
        let y = ((i/4) - x) / width;
        if(x>xMinPx && x<xMaxPx && y>yMinPx && y<yMaxPx){
            let normCentroidDist = distance(x, y, xMinPx+(xMaxPx-xMinPx)/2, yMinPx+(yMaxPx-yMinPx)/2) / maxDist;
            let noiseVal = p5.noise(0.005*x, 0.005*y)* (1-normCentroidDist);
            alphaStorage[Math.ceil(i/4)] = noiseVal;
        }
    }
    const alphaExtent = extent(alphaStorage);
    const normAlphaFunc = scaleLinear().domain(alphaExtent).range([0,1]);
    // Colour set image data
    for (let i = 0; i < imageData.data.length; i += 4) {
        let x = (i/4) % width;
        let y = ((i/4) - x) / width;
        if(x>xMinPx && x<xMaxPx && y>yMinPx && y<yMaxPx){
            imageData.data[i + cfg.opacityCol] = 255;
            let noiseVal = normAlphaFunc(alphaStorage[Math.ceil(i/4)]);
            imageData.data[i + 3] = Math.round(noiseVal * 255);
            alphaStorage[Math.ceil(i/4)] = noiseVal;
        }
    }
    // Outline
    ctx.rect(xMinPx, yMinPx, (xMaxPx-xMinPx)+1, (yMaxPx-yMinPx)+1);
    ctx.strokeStyle = getRGBOutlineCSSString();
    ctx.stroke();
    // Draw image data to the canvas
    // TODO make into promise for outside...
    createImageBitmap(imageData)
        .then((imageBitmap) => ctx.drawImage(imageBitmap, 0, 0));
    return alphaStorage;
}


function getRGBOutlineCSSString(){
    switch (cfg.opacityCol) {
        case opColChoiceEnum.r:
            return 'rgb(255,0,0,255)';
        case opColChoiceEnum.g:
            return 'rgb(0,255,0,255)';
        case opColChoiceEnum.b:
            return 'rgb(0,0,255,255)';
        default:
            return 'rgb(0,0,0,0)';
    }
}


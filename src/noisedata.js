import p5 from '../lib/noise';
import cfg from './cfg';
import {opColChoiceEnum} from './enums';
import {getCanvasContext, getCanvasDims, distance} from './utils';
import {extent} from 'd3-array';
import {scaleLinear} from 'd3-scale';

export const CreateNoiseDataLayer = function({
        loc = {
            xMin: 0.2,
            xMax: 0.8,
            yMin: 0.2,
            yMax: 0.8
            },
        fallOff = true,
        opacitySeed = 123,
        opacityCol = opColChoiceEnum.r
    } = {}){
    // PRIV
    let alphaStorage = null;
    p5.noiseSeed(opacitySeed)
    return {
        loc,
        fallOff,
        opacityCol,
        render: function(){
            alphaStorage = opacityCanvasComposite.apply(this);
        },
        getOpacityForCoord: function(x, y) {
            let {width} = getCanvasDims();
            var opIdx = y * (width) + x;
            return alphaStorage[opIdx];
        }
    }
}


// TODO: refactor
function opacityCanvasComposite(){
    let ctx = getCanvasContext();
    let {width, height} = getCanvasDims();    
    var imageData = ctx.createImageData(width,height);
    let alphaStorage = new Array(imageData.data.length);
    const maxDist = distance(
        this.loc.xMinPx, 
        this.loc.yMinPx, 
        this.loc.xMinPx+(this.loc.xMaxPx-this.loc.xMinPx)/2, 
        this.loc.yMinPx+(this.loc.yMaxPx-this.loc.yMinPx)/2
    );
    // Opacity calculation
    for (let i = 0; i < imageData.data.length; i += 4) {
        let x = (i/4) % width;
        let y = ((i/4) - x) / width;
        if(withinDataArea.call(this, x, y)){
            // let noiseVal = p5.noise(0.005*x, 0.005*y)* (1-normCentroidDist);
            let noiseVal = p5.noise(0.005*x, 0.005*y);
            if(this.fallOff){
                let normCentroidDist = distance(x, y, 
                    this.loc.xMinPx+(this.loc.xMaxPx-this.loc.xMinPx)/2, 
                    this.loc.yMinPx+(this.loc.yMaxPx-this.loc.yMinPx)/2) / maxDist;
                noiseVal *= (1-normCentroidDist);
            }
            alphaStorage[Math.ceil(i/4)] = noiseVal;
        }
    }
    const alphaExtent = extent(alphaStorage);
    const normAlphaFunc = scaleLinear().domain(alphaExtent).range([0,1]);
    // Colour set image data
    for (let i = 0; i < imageData.data.length; i += 4) {
        let x = (i/4) % width;
        let y = ((i/4) - x) / width;
        if(withinDataArea.call(this, x, y)){
            imageData.data[i + this.opacityCol] = 255;
            let noiseVal = normAlphaFunc(alphaStorage[Math.ceil(i/4)]);
            imageData.data[i + 3] = Math.round(noiseVal * 255);
            alphaStorage[Math.ceil(i/4)] = noiseVal;
        }
    }
    // Outline
    ctx.strokeStyle = getRGBOutlineCSSString.call(this);
    ctx.strokeRect(this.loc.xMinPx, this.loc.yMinPx, 
        (this.loc.xMaxPx-this.loc.xMinPx)+1, 
        (this.loc.yMaxPx-this.loc.yMinPx)+1);
    // Draw image data to the canvas
    // TODO make into promise for outside...
    createImageBitmap(imageData)
        .then((imageBitmap) => ctx.drawImage(imageBitmap, 0, 0));
    return alphaStorage;
}

function withinDataArea(x, y){
    return (x>this.loc.xMinPx) && 
            (x<this.loc.xMaxPx) && 
            (y>this.loc.yMinPx) && 
            (y<this.loc.yMaxPx);
}

function getRGBOutlineCSSString(){
    switch (this.opacityCol) {
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


import p5 from '../lib/noise';
import cfg from './cfg';
import {opColChoiceEnum} from './cfg';
import {getCanvasContext, distance} from './utils';

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
            // console.log(this);
            // debugger;
            alphaStorage = opacityCanvasComposite.apply(this);
            // alphaStorage = opacityCanvasComposite();
        }
    }
}



function opacityCanvasComposite(){
    // console.log("OPACITY START");
    let ctx = getCanvasContext();
    // console.log(this);
    // debugger;
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;
    var imageData = ctx.createImageData(width,height);
    let alphaStorage = new Array(imageData.data.length);
    const xMinPx = this.loc.xMin * width;
    const xMaxPx = this.loc.xMax * width;
    const yMinPx = this.loc.yMin * height;
    const yMaxPx = this.loc.yMax * height;
    const maxDist = distance(xMinPx, yMinPx, xMinPx+(xMaxPx-xMinPx)/2, yMinPx+(yMaxPx-yMinPx)/2)
    // debugger;
    for (let i = 0; i < imageData.data.length; i += 4) {
        let x = (i/4) % width;
        let y = ((i/4) - x) / width;
        if(x>xMinPx && x<xMaxPx && y>yMinPx && y<yMaxPx){
            imageData.data[i + cfg.opacityCol] = 255;
            let normCentroidDist = distance(x, y, xMinPx+(xMaxPx-xMinPx)/2, yMinPx+(yMaxPx-yMinPx)/2) / maxDist;
            let noiseVal = p5.noise(0.005*x, 0.005*y)* (1-normCentroidDist);
            // let noiseVal = p5.noise(0.005*x, 0.005*y);
            imageData.data[i + 3] = Math.floor(noiseVal * 255);
            alphaStorage[Math.ceil(i/4)] = noiseVal;
        }
    }
    // Outline TODO alter depending on color
    ctx.rect(xMinPx, yMinPx, (xMaxPx-xMinPx)+1, (yMaxPx-yMinPx)+1);
    ctx.strokeStyle = getRGBOutlineCSSString();
    ctx.stroke();
    // Draw image data to the canvas
    // TODO make into promise for outside...
    // TEMP
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

// function opacityCanvasComposite(){
//     let ctx = getCanvasContext();
//     // console.log(this);
//     debugger;
//     let width = ctx.canvas.width;
//     let height = ctx.canvas.height;
//     var imageData = ctx.createImageData(width,height);
//     let alphaStorage = new Array(imageData.data.length);
//     for (let i = 0; i < imageData.data.length; i += 4) {
//         let y = (i/4) % width;
//         let y = ((i/4) - x) / width;
//         imageData.data[i + cfg.opacityCol] = 255;
//         let noiseVal = p5.noise(0.005*x, 0.005*y);
//         imageData.data[i + 3] = Math.floor(noiseVal * 255);
//         alphaStorage[Math.ceil(i/4)] = noiseVal;
//         }
//         // Draw image data to the canvas
//         createImageBitmap(imageData)
//             .then((imageBitmap) => ctx.drawImage(imageBitmap, 0, 0));
//             // .catch(e => console.error(e));
//         debugger;
//         return alphaStorage;
// }



// function opacityManual(){
//     let ctx = getCanvasContext();
//     let width = ctx.canvas.width;
//     let height = ctx.canvas.height;
//     // p5.noiseSeed(123);
//     var imageData = ctx.getImageData(0, 0, width, height);
//     // alphaStorage = new Array(imageData.data.length);
//     for (let i = 0; i < imageData.data.length; i += 4) {
//         let x = (i/4) % width;
//         let y = ((i/4) - x) / width;
//         let noiseVal = p5.noise(0.005*x, 0.005*y);
//         // let noiseVal = p5.noise(0.1*x, 0.1*y);
//         let noiseAlpha = Math.floor(noiseVal * 255);
//         if(x<500&&y<500){ // TEMP TODO=REMOVE AND HAVE NICER SECTION...
//             // https://www.w3.org/TR/compositing-1/#simplealphacompositingexamples
//             // https://ciechanow.ski/alpha-compositing/
//             // https://www.w3.org/TR/compositing-1/#simplealphacompositing (background=dest=opaque)
//             // R value
//             imageData.data[i + 0] = noiseVal*255 + imageData.data[i + 0]*(1-noiseVal);  
//             // G value
//             imageData.data[i + 1] = noiseVal*0 + imageData.data[i + 2]*(1-noiseVal);  
//             // B value  
//             imageData.data[i + 2] = noiseVal*0 + imageData.data[i + 2]*(1-noiseVal);  
//             // Alpha value
//             // 1 - (1 - Ea) * (1 - Ca) - TODO: needs inclusion or simply opaque=255?
//             imageData.data[i + 3] = (1 - (1-noiseVal) * (1 - imageData.data[i + 3]/255))*255;
//         }
//         // alphaStorage[Math.ceil(i/4)] = noiseVal;
//         }
//         // Draw image data to the canvas
//         ctx.putImageData(imageData, 0, 0);
// }



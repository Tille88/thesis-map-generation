import p5 from '../lib/noise';
import cfg from './cfg';
import {getCanvasContext} from './utils';

export const CreateNoiseDataLayer = function({} = {}){
    let alphaStorage = null;
    return {
        init: function(){
            let ctx = getCanvasContext();
            let width = ctx.canvas.width;
            let height = ctx.canvas.height;
            // p5.noiseSeed(123);
            var imageData = ctx.getImageData(0, 0, width, height);
            alphaStorage = new Array(imageData.data.length);
            for (let i = 0; i < imageData.data.length; i += 4) {
                let x = (i/4) % width;
                let y = ((i/4) - x) / width;
                let noiseVal = p5.noise(0.005*x, 0.005*y);
                // let noiseVal = p5.noise(0.1*x, 0.1*y);
                let noiseAlpha = Math.floor(noiseVal * 255);
                if(x<500&&y<500){ // TEMP TODO=REMOVE AND HAVE NICER SECTION...
                    // https://ciechanow.ski/alpha-compositing/
                    // https://www.w3.org/TR/compositing-1/#simplealphacompositing (background=dest=opaque)
                    // R value
                    imageData.data[i + 0] = noiseVal*255 + imageData.data[i + 0]*(1-noiseVal);  
                    // G value
                    imageData.data[i + 1] = noiseVal*0 + imageData.data[i + 2]*(1-noiseVal);  
                    // B value  
                    imageData.data[i + 2] = noiseVal*0 + imageData.data[i + 2]*(1-noiseVal);  
                    // Alpha value
                    // 1 - (1 - Ea) * (1 - Ca) - TODO: needs inclusion or simply opaque=255?
                    imageData.data[i + 3] = (1 - (1-noiseVal) * (1 - imageData.data[i + 3]/255))*255;
                }
                alphaStorage[Math.ceil(i/4)] = noiseVal;
              }
              // Draw image data to the canvas
              ctx.putImageData(imageData, 0, 0);
        }
    }
}



// BACKUP -> NEEDS TO BE EXPORTED SEPARATELY FOR "SEPARETED IMAGE LAYERS FOR START PAGE"
// export const CreateNoiseDataLayer = function({} = {}){
//     let alphaStorage = null;
//     return {
//         init: function(){
//             // console.log(this, this.alphaStorage);
//             // debugger;
//             let ctx = getCanvasContext();
//             let width = ctx.canvas.width;
//             let height = ctx.canvas.height;
//             // p5.noiseSeed(123);
//             // var imageData = ctx.getImageData(0, 0, width, height);
//             // ALT
//             var imageData = ctx.createImageData(width,height);
//             alphaStorage = new Array(imageData.data.length);
//             for (let i = 0; i < imageData.data.length; i += 4) {
//                 let x = (i/4) % width;
//                 let y = ((i/4) - x) / width;
//                 imageData.data[i + 0] = 255;  // R value
//                 imageData.data[i + 1] = 0;    // G value
//                 imageData.data[i + 2] = 0;  // B value
//                 let noiseVal = p5.noise(0.005*x, 0.005*y);
//                 imageData.data[i + 3] = Math.floor(noiseVal * 255);
//                 alphaStorage[Math.ceil(i/4)] = noiseVal;
//               }
//               // Draw image data to the canvas
//               ctx.putImageData(imageData, 0, 0);
//         }
//     }
// }



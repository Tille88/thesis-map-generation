import p5 from '../lib/noise';
import cfg from './cfg';
import {getCanvasContext} from './utils';

export const CreateNoiseDataLayer = function({} = {}){
    return {
        init: function(){
            let ctx = getCanvasContext();
            let width = ctx.canvas.width;
            let height = ctx.canvas.height;
            // p5.noiseSeed(123);
            //   var imageData = ctx.getImageData(0, 0, width, height);
            // ALT
            var imageData = ctx.createImageData(width,height); 
            for (let i = 0; i < imageData.data.length; i += 4) {
                let x = (i/4) % width;
                let y = ((i/4) - x) / width;
                imageData.data[i + 0] = 255;  // R value
                imageData.data[i + 1] = 0;    // G value
                imageData.data[i + 2] = 0;  // B value
                imageData.data[i + 3] = Math.floor(p5.noise(0.005*x, 0.005*y) * 255);
              }
              
              // Draw image data to the canvas
              ctx.putImageData(imageData, 0, 0);
        }
    }
}

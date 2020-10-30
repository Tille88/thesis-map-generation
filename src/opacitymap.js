import {CreateBaseMap} from './basemap';
import {CreateNoiseDataLayer} from './noisedata';
import cfg from './cfg';

export const CreateOpacityMap = function({} = {}){
    return {
        // Initialization function
        init: function(){
            let baseMap = CreateBaseMap({mapSource: "cached"});
            baseMap.init();
            let noiseData = CreateNoiseDataLayer();
            // baseMap.renderProm.then(noiseData.init);
            baseMap.renderProm
                .then(() => noiseData.init.apply(noiseData));
        },
        // Create easy-to-extract save mechs
        save: function(){
            // For right click and manual save
            // var canvas = document.querySelector(`#${cfg.target} canvas`);
            // var img = canvas.toDataURL("image/png");
            // document.write('<img src="'+img+'"/>');

            // Used to extract base64-encoding image-src
            var canvas = document.querySelector(`#${cfg.target} canvas`);
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            // debugger;
            return image;        
        }
    }
}
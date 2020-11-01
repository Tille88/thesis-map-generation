import {CreateBaseMap} from './basemap';
import {CreateNoiseDataLayer} from './noisedata';
import {CreateLegend} from './legend';
import cfg from './cfg';
import {legendTypesEnum} from './enums'
import {getDataAreaPixelDims} from './utils'

// Configs
const dataDimensions = {
    xMin: 0.1,
    xMax: 0.7,
    yMin: 0.2,
    yMax: 0.7
};


export const CreateOpacityMap = function({} = {}){
    return {
        // Initialization function
        init: function(){
            let baseMap = CreateBaseMap({mapSource: "cached"});
            baseMap.init();
            let noiseData = CreateNoiseDataLayer(
                {loc: getDataAreaPixelDims(dataDimensions)} 
            );
            // baseMap.renderProm.then(noiseData.init);
            baseMap.renderProm
                .then(() => noiseData.init.apply(noiseData))
                .then(() => {
                    let legendRef= CreateLegend({
                        dataLoc: getDataAreaPixelDims(dataDimensions),
                        legendType: legendTypesEnum.annotatedOutline
                    });
                    legendRef.init.apply(legendRef);
                });
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
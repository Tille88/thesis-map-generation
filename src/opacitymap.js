import {CreateBaseMap} from './basemap';
import {CreateNoiseDataLayer} from './noisedata';
import {CreateLegend} from './legend';
import {CreateMarker} from './marker';
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
    let noiseData = null;
    return {
        // Initialization function
        init: function(){
            CreateBaseMap({mapSource: "cached"}).render()
                .then(() => {
                    noiseData = CreateNoiseDataLayer(
                            {
                                loc: getDataAreaPixelDims(dataDimensions),
                                fallOff: false
                            }
                    );
                    noiseData.render();
                })
                .then(() => {
                    CreateLegend({
                        dataLoc: getDataAreaPixelDims(dataDimensions),
                        // legendType: legendTypesEnum.headline
                        // legendType: legendTypesEnum.sideCheckered
                        // legendType: legendTypesEnum.sideSampledContext
                        // legendType: legendTypesEnum.clusteredContextCols
                        legendType: legendTypesEnum.annotatedOutline
                    }).render();
                })
                .then(() => {
                    let marker = CreateMarker({
                        range: getDataAreaPixelDims(dataDimensions),
                        mergeCanvas: true
                    });
                    marker.render();
                    let dataVal = 100 * noiseData.getOpacityForCoord(marker.xPx, marker.yPx);
                    console.log(marker, dataVal);
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
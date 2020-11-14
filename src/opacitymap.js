import {CreateBaseMap} from './basemap';
import {CreateNoiseDataLayer} from './noisedata';
import {CreateLegend} from './legend';
import {CreateMarker} from './marker';
import {opColChoiceEnum, legendTypesEnum} from './enums';
import cfg from './cfg';
import {getDataAreaPixelDims} from './utils'


export const CreateOpacityMap = function({
    dataDimensions = {
        xMin: 0.1,
        xMax: 0.7,
        yMin: 0.2,
        yMax: 0.7
    },
    fallOff = true,
    mergeCanvas = true,
    // legendType = legendTypesEnum.headline,
    // legendType = legendTypesEnum.sideCheckered,
    // legendType = legendTypesEnum.sideSampledContext,
    // legendType = legendTypesEnum.clusteredContextCols,
    legendType = legendTypesEnum.annotatedOutline,
    opacityCol = opColChoiceEnum.r,
    opacitySeed = 123
} = {}){
    let noiseData = null;
    return {
        // Initialization function
        init: function(){
            CreateBaseMap({mapSource: "cached"}).render()
                .then(() => {
                    noiseData = CreateNoiseDataLayer(
                            {
                                loc: getDataAreaPixelDims(dataDimensions),
                                fallOff,
                                opacitySeed,
                                opacityCol
                            }
                    );
                    noiseData.render();
                })
                .then(() => {
                    CreateLegend({
                        dataLoc: getDataAreaPixelDims(dataDimensions),
                        legendType,
                        opacityCol
                    }).render();
                })
                .then(() => {
                    let marker = CreateMarker({
                        range: getDataAreaPixelDims(dataDimensions),
                        mergeCanvas
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
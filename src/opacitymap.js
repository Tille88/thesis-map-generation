import {CreateBaseMap} from './basemap';
import {CreateNoiseDataLayer} from './noisedata';
import {CreateLegend} from './legend';
import {CreateMarker} from './marker';
import {opColChoiceEnum, legendTypesEnum, mergeAlternatives} from './enums';
import cfg from './cfg';
import {getDataAreaPixelDims, createCanvasContext} from './utils'


export const CreateOpacityMap = function({
    dataDimensions = {
        xMin: 0.1,
        xMax: 0.7,
        yMin: 0.2,
        yMax: 0.7
    },
    fallOff = true,
    mergeCanvas = mergeAlternatives.merge,
    legendType = legendTypesEnum.annotatedOutline,
    opacityCol = opColChoiceEnum.r,
    opacitySeed = 123
} = {}){
    let noiseData = null;
    return {
        // Initialization function
        init: function(){
            createCanvasContext();
            return new Promise((resolve, reject) => {   
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
                        this.markerInfo = {
                            xPx: marker.xPx,
                            relX: marker.relX,
                            yPx: marker.yPx,
                            relY: marker.relY,
                            dataVal
                        }
                        resolve();
                    });
            });
        },
        // Create easy-to-extract save mechs
        save: function(){
            // Used to extract base64-encoding image-src
            var canvas = document.querySelector(`#${cfg.target} canvas`);
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            // debugger;
            return image;        
        }
    }
}
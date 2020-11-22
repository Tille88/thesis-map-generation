import {CreateOpacityMap} from './src/opacitymap';
import {opColChoiceEnum, legendTypesEnum, mergeAlternatives} from './src/enums';
import {randomFloat} from './src/utils';
import Cairo from './assets/fonts/Cairo-Regular.ttf'
// HACK
var f = new FontFace("Cairo", "url("+Cairo+")");

// TODO:
// Loop over all settings and extract through Node
// Make sure able to keep marker and similar between renderings
// Export all metainfo as well
let configs = {
        dataDimensions: {
            xMin: 0.3,
            xMax: 0.6,
            yMin: 0.3,
            yMax: 0.6
        },
        fallOff: true,
        opacitySeed: 123,

        // // legendType
        // legendType: legendTypesEnum.annotatedOutline,
        legendType: legendTypesEnum.headline,
        // legendType: legendTypesEnum.clusteredContextCols,

        // // MergeAlts
        mergeCanvas: mergeAlternatives.merge,
        // mergeCanvas: mergeAlternatives.merge,

        opacityCol: opColChoiceEnum.r
};

const dataDims = [
    {xMin: 0.14, xMax: 0.63, yMin: 0.24, yMax: 0.83},
    {xMin: 0.25, xMax: 0.62, yMin: 0.2, yMax: 0.79},
    {xMin: 0.28, xMax: 0.61, yMin: 0.23, yMax: 0.81},
    {xMin: 0.28, xMax: 0.62, yMin: 0.19, yMax: 0.87},
    {xMin: 0.2, xMax: 0.72, yMin: 0.22, yMax: 0.75},
    {xMin: 0.28, xMax: 0.74, yMin: 0.28, yMax: 0.87},
    {xMin: 0.24, xMax: 0.65, yMin: 0.29, yMax: 0.6},
    {xMin: 0.14, xMax: 0.62, yMin: 0.27, yMax: 0.83},
    {xMin: 0.21, xMax: 0.65, yMin: 0.19, yMax: 0.84},
    {xMin: 0.26, xMax: 0.74, yMin: 0.11, yMax: 0.75},
    {xMin: 0.26, xMax: 0.65, yMin: 0.23, yMax: 0.87},
    {xMin: 0.1, xMax: 0.67, yMin: 0.19, yMax: 0.84},
    {xMin: 0.22, xMax: 0.61, yMin: 0.12, yMax: 0.78},
    {xMin: 0.17, xMax: 0.71, yMin: 0.1, yMax: 0.83},
    {xMin: 0.17, xMax: 0.62, yMin: 0.11, yMax: 0.63},
    {xMin: 0.12, xMax: 0.61, yMin: 0.21, yMax: 0.66},
    {xMin: 0.21, xMax: 0.7, yMin: 0.18, yMax: 0.84},
    {xMin: 0.22, xMax: 0.66, yMin: 0.28, yMax: 0.63},
    {xMin: 0.28, xMax: 0.71, yMin: 0.29, yMax: 0.88},
    {xMin: 0.11, xMax: 0.66, yMin: 0.21, yMax: 0.69},
    {xMin: 0.13, xMax: 0.72, yMin: 0.17, yMax: 0.74}
]

function resetConfigs(){
    configs.dataDimensions = {
        xMin: randomFloat(0.1, 0.3, 2),
        xMax: randomFloat(0.6, 0.75, 2),
        yMin: randomFloat(0.1, 0.3, 2),
        yMax: randomFloat(0.6, 0.9, 2)
    };
    configs.fallOff != configs.fallOff;
    configs.opacitySeed += 100;
    // console.log(configs);
    // console.log(legendTypesEnum);
}

// let map = CreateOpacityMap(configs);
// map.init();


// BACKUP
f.load().then(() =>{
    resetConfigs();
    Object.values(legendTypesEnum).forEach((legendType, index) => {
        setTimeout(function(){
            configs.legendType = legendType;
            // RED
            let map = CreateOpacityMap(configs);
            map.init().then(() => {
                console.log("map.markerInfo ", map.markerInfo);
            });
            setTimeout(function(){
                let image = map.save();
                const event = new CustomEvent('image-data', { detail: image.src });
                document.dispatchEvent(event);
            }, 500);
            // GREEN
            // configs.opacityCol = opColChoiceEnum.g
            // let map = CreateOpacityMap(configs);
            // map.init().then(() => {
            //     // console.log("map.markerInfo ", map.markerInfo);
            // });
            // configs.opacityCol = opColChoiceEnum.g
    
            // configs.opacityCol = col;
        }, index * 2000);
    });
});




// ONE TIME
// resetConfigs();
// let map = CreateOpacityMap(configs);
// map.init();
// console.log(map.noiseDataProm);




// resetConfigs();

// setTimeout(() => {
//     let image = map.save();
//     const event = new CustomEvent('image-data', { detail: image.src });
//     document.dispatchEvent(event);
// }, 2000);


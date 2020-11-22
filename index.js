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
];


// Generated using: 
// let markerPos = [];
// dataDims.forEach((dataDims) => {
//     let width = 960;
//     let height = 960;
//     let dataArea = {
//         xMinPx: dataDims.xMin * width,
//         xMaxPx: dataDims.xMax * width,
//         yMinPx: dataDims.yMin * height,
//         yMaxPx: dataDims.yMax * height
//     };
//     markerPos.push({
//         xPx: randomInt(dataArea.xMinPx, dataArea.xMaxPx),
//         yPx: randomInt(dataArea.yMinPx, dataArea.yMaxPx),
//     });
// });
let markerPos = [
    {"xPx":216,"yPx":568},
    {"xPx":351,"yPx":399},
    {"xPx":407,"yPx":716},
    {"xPx":531,"yPx":714},
    {"xPx":484,"yPx":233},
    {"xPx":553,"yPx":664},
    // {"xPx":244,"yPx":338},
    {"xPx":483,"yPx":338},
    {"xPx":310,"yPx":741},
    {"xPx":252,"yPx":292},
    {"xPx":436,"yPx":345},
    {"xPx":509,"yPx":742},
    {"xPx":188,"yPx":604},
    {"xPx":511,"yPx":727},
    {"xPx":590,"yPx":179},
    {"xPx":571,"yPx":461},
    // {"xPx":154,"yPx":202},
    {"xPx":400,"yPx":412},
    {"xPx":625,"yPx":422},
    {"xPx":411,"yPx":490},
    {"xPx":322,"yPx":360},
    {"xPx":464,"yPx":317},
    {"xPx":591,"yPx":397}
];


let configList = [];
let opacitySeed = 123;
let fallOff = true;
let version = 1;
dataDims.forEach((dataDims, idx) => {
    let baseConfig = {
        dataDimensions: dataDims,
        markerPos: markerPos[idx],
        // Per round
        fallOff,
        opacitySeed,
        version
        // // All combinations
        // legendType: legendTypesEnum.headline,
        // mergeCanvas: mergeAlternatives.merge,
        // opacityCol: opColChoiceEnum.r,
    };
    // Red
    Object.values(legendTypesEnum).forEach((legendType, index) => {
        let config = Object.assign({}, baseConfig);
        config.opacityCol = opColChoiceEnum.r;
        config.colRead = "red";
        config.legendType = legendType;
        config.mergeCanvas = mergeAlternatives.merge;
        configList.push(config);
        let configNonMerge = Object.assign({}, config);
        configNonMerge.mergeCanvas = mergeAlternatives.noRender;
        configList.push(configNonMerge);
    });

    // Green
    Object.values(legendTypesEnum).forEach((legendType, index) => {
        let config = Object.assign({}, baseConfig);
        config.opacityCol = opColChoiceEnum.g;
        config.colRead = "green";
        config.legendType = legendType;
        config.mergeCanvas = mergeAlternatives.merge;
        configList.push(config);
        let configNonMerge = Object.assign({}, config);
        configNonMerge.mergeCanvas = mergeAlternatives.noRender;
        configList.push(configNonMerge);
    });

    // Blue
    Object.values(legendTypesEnum).forEach((legendType, index) => {
        let config = Object.assign({}, baseConfig);
        config.opacityCol = opColChoiceEnum.b;
        config.colRead = "blue";
        config.legendType = legendType;
        config.mergeCanvas = mergeAlternatives.merge;
        configList.push(config);
        let configNonMerge = Object.assign({}, config);
        configNonMerge.mergeCanvas = mergeAlternatives.noRender;
        configList.push(configNonMerge);
    });
    
    ++opacitySeed;
    ++version;
    fallOff != fallOff;
});

// let map = CreateOpacityMap(configList[450]);
// map.init();
// configList = configList.filter((el) => {
//     return el.version == 7;
// });

f.load().then(() =>{
    configList.forEach((config, idx) => {
        setTimeout(function(){
            let map = CreateOpacityMap(config);
            map.init().then(() => {
                // console.log("map.markerInfo ", map.markerInfo);
            });
            delete config.markerPos;
            setTimeout(function(){
                let image = map.save();
                const event = new CustomEvent('image-data', { 
                    detail: {
                        img: image.src,
                        meta: Object.assign(config, map.markerInfo)
                    } 
                });
                document.dispatchEvent(event);
            }, 500);
        }, idx * 2000);
    });
});





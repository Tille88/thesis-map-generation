import {CreateOpacityMap} from './src/opacitymap';
import {opColChoiceEnum, legendTypesEnum} from './src/enums';

// TODO:
// Initialize data area random within range
// Loop over all settings and extract through Node
// Make sure able to keep marker and similar between renderings
// Export all metainfo as well
let test = [
    {
        dataDimensions: {
            xMin: 0.1,
            xMax: 0.7,
            yMin: 0.2,
            yMax: 0.7
        },
        fallOff: true,
        mergeCanvas: true,
        legendType: legendTypesEnum.annotatedOutline,
        opacityCol: opColChoiceEnum.r,
        opacitySeed: 123
    },
    {
        dataDimensions: {
            xMin: 0.2,
            xMax: 0.8,
            yMin: 0.3,
            yMax: 0.8
        },
        fallOff: false,
        mergeCanvas: false,
        legendType: legendTypesEnum.sideSampledContext,
        opacityCol: opColChoiceEnum.g,
        opacitySeed: 421
    },
];



let map = CreateOpacityMap(test[0]);
map.init();



setTimeout(()=> {
    map = CreateOpacityMap(test[1]); 
    map.init()
}, 2000);
// setTimeout(map.save, 5000);

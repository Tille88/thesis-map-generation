import {CreateOpacityMap} from './src/opacitymap';
import {opColChoiceEnum, legendTypesEnum} from './src/enums';

// TODO:
// Initialize data area random within range
// Loop over all settings and extract through Node
// Make sure able to keep marker and similar between renderings
// Export all metainfo as well
let test = {
        dataDimensions: {
            xMin: 0.1,
            xMax: 0.7,
            yMin: 0.2,
            yMax: 0.7
        },
        fallOff: true,
        mergeCanvas: false,
        legendType: legendTypesEnum.annotatedOutline,
        // legendType: legendTypesEnum.clusteredContextCols,
        opacityCol: opColChoiceEnum.r,
        opacitySeed: 123
};



let map = CreateOpacityMap(test);
map.init();

setTimeout(() => {
    let image = map.save();
    const event = new CustomEvent('image-data', { detail: image.src });
    document.dispatchEvent(event);
}, 2000);


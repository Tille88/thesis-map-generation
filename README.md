# thesis-map-generation

Exportable map examples for GIS thesis on opacity-mapping

## TODO list

- [x] Base layer pull (open street map, leaflet or **OpenLayers**) strategy basics
    - [x] 1:1 ratio
    - [ ] Extract/refactor to BaseMap-class
        - [ ] render method using two strategies: saved canvas context or OpenLayers
        - [ ] save-method (in OpacityMap~=Main)
    - [ ] Save canvas context (on full load event?)
        - https://openlayers.org/en/latest/examples/tile-load-events.html
- [ ] Data layer generation (Perlin noise)
    - https://github.com/josephg/noisejs
    - https://gist.github.com/esimov/586a439f53f62f67083e
    - https://p5js.org/reference/#/p5/noise
    - https://github.com/processing/p5.js/blob/main/src/math/noise.js
    - https://genekogan.com/code/p5js-perlin-noise/
- [ ] Merge with map layer as opacity - feasibility web technology (first Canvas web-API)

**SUNDAY FINISHED MIN CHECKPOINT**

- [ ] Design data layer 
    - [ ] color (pure RBG)
    - [ ] outline (pure matching RBG)
    - [ ] data value pixel mapping storage

**SUNDAY OPTIONAL CHECKPOINT**

- [ ] Marker object generation (incl. range and value extraction)
    - [ ] location of marker storage - Data point as fraction x and y dimension
    - [ ] hard coded version (in canvas)
    - [ ] overlay pulsing CSS version
- [ ] Legend object types generation (using object oriented programming)
- [ ] Seed images (data layers) for replication
- [ ] Able to toggle marker representation
- [ ] Generate test images, and use browser API to save as large image files
    - https://www.tutorialspoint.com/HTML5-Canvas-to-PNG-File
    - https://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf
- [ ] Downsample or generate different sizes programmatically

No automated testing needed

## Generate Examples Instructions
TODO, likely Node-based
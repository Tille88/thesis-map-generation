# thesis-map-generation

Exportable map examples for GIS thesis on opacity-mapping

## TODO list

- [x] Base layer pull (open street map, leaflet or **OpenLayers**) strategy basics
    - [x] 1:1 ratio
    - [x] Extract/refactor to BaseMap-class
        - [x] render method using two strategies: saved canvas context or OpenLayers
        - [x] save-method (in OpacityMap~=Main)
    - [x] Save canvas context (on full load event?)
        - https://openlayers.org/en/latest/examples/tile-load-events.html
- [x] Data layer generation (Perlin noise)
- [x] Merge with map layer as opacity - feasibility web technology (first Canvas web-API)
- [x] TRY EXPORTING TO MAKE SURE OKAY

- [ ] Design data layer = refactoring and addition of outline/smaller opacity data layer
    - [ ] color (pure RBG)
    - [ ] data value pixel mapping storage
    - [ ] outline (pure matching RBG)
    - [ ] Seed images (data layers) for replication
- [ ] Marker object generation (incl. range and value extraction)
    - [ ] location of marker storage - Data point as fraction x and y dimension
    - [ ] hard coded version (in canvas)
    - [ ] overlay pulsing CSS version
**SAT OCT 24th FINISHED MIN CHECKPOINT**

- [ ] Legend object types generation (using object oriented programming)
- [ ] Able to toggle marker representation
**SUN OCT 25th FINISHED MIN CHECKPOINT**

- [ ] Generate test images, and use browser API to save as large image files
    - https://www.tutorialspoint.com/HTML5-Canvas-to-PNG-File
    - https://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf
- [ ] Downsample or generate different sizes programmatically
- [ ] Export all layers separately for one to be shown in intro-page

No automated testing needed

## Generate Examples Instructions
TODO, likely Node-based
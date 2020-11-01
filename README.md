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
- [x] Make use of composite from Canvas-API itself, not manually merging layers
- [x] Design data layer = refactoring and addition of outline/smaller opacity data layer
    - [x] Seed images (data layers) for replication
    - [x] data value pixel mapping storage
    - [x] color (pure RBG)
        - [x] Square and face off towards edges as number between 0 and 1
    - [x] outline (pure matching RBG, fully opaque)
- [x] Ensure drawing order (background then opacity) - silly mistake, executed function early, not wrapped in function TO BE EXECUTED
- [x] Clean up color representation outline from cfg
- [x] Rescale data points between [0,1], [0,255] for opacity to make sure stronger impact
- [x] Legend object types generation (using object oriented programming), expose as API all the way to browser entry-point/main/browser...
    1. [x] Only headline version
    2. [x] ArcGIS version imitation
    3. [x] Sampled context behind legend
        - [x] Have sampled background selected randomly from array
    4. [x] Clustered image colours as background context (after seeing results of 3 above)
        - [x] Why font read-in not working? -> CSS fix
    5. [x] Annotated outline
    <strike>5. [ ] 3 (Sampled context) + 4 (Annotated outline) - simply call two functions</strike> - Not strong enough reasons for this


**SUN NOV 1st FINISHED MIN CHECKPOINT**

- [x] <strike>Able to toggle marker representation</strike> for web version really
- [ ] Marker object generation (incl. range and value extraction and relative position extraction)
    - [ ] location of marker storage - Data point as fraction x and y dimension
    - [ ] hard coded version (in canvas)
    - [x] <strike>overlay pulsing CSS version</strike> for web version really
- [ ] Generate test images, and use browser API to save as large image files
    - [ ] All color combinations
    - [ ] All legend alternatives per color
    - [ ] Version with hard coded marker and without
    - https://github.com/puppeteer/puppeteer/ (get image src to disk)
    - https://attacomsian.com/blog/nodejs-base64-encode-decode
    - https://stackoverflow.com/questions/6926016/nodejs-saving-a-base64-encoded-image-to-disk
- [ ] Refactoring??? Only one full day
**SAT NOV 7th FINISHED MIN CHECKPOINT**
- [ ] Downsample or generate different sizes programmatically
    - https://www.npmjs.com/package/sharp
- [ ] Export all layers separately for one to be shown in intro-page

## Generate Examples Instructions
TODO, likely Node-based
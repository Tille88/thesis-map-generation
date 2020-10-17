# thesis-map-generation

Exportable map examples for GIS thesis on opacity-mapping

## TODO list

- [x] Base layer pull (open street map, leaflet or **OpenLayers**) strategy basics
    - [ ] 1:1 ratio
    - [ ] Save canvas context (on full load event?)
    - [ ] Extract/refactor to BaseMap-class
        - [ ] render method using two strategies: saved canvas context or OpenLayers
- [ ] Data layer generation (Perlin noise)
- [ ] Merge with map layer as opacity - feasibility web technology (first Canvas web-API)

**SUNDAY FINISHED MIN CHECKPOINT**

- [ ] Design data layer 
    - [ ] color (pure RBG)
    - [ ] outline (pure matching RBG)
    - [ ] data value pixel mapping storage

**SUNDAY OPTIONAL CHECKPOINT**

- [ ] Marker object generation (incl. range and value extraction)
    - [ ] location of marker storage - Data point as fraction x and y dimension
- [ ] Legend object types generation (using object oriented programming)
- [ ] Seed images (data layers) for replication
- [ ] Able to toggle marker representation
- [ ] Generate test images, and use browser API to save as large image files
- [ ] Downsample or generate different sizes programmatically

No automated testing needed

## Generate Examples Instructions
TODO, likely Node-based
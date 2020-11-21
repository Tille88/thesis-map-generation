import {getCanvasContext, getCanvasDims, randomInt} from './utils';
import {mergeAlternatives} from './enums';
import cfg from './cfg';
import * as d3 from "d3";

export const CreateMarker = function({
    range = {
        xMin: 0.2,
        xMax: 0.8,
        yMin: 0.2,
        yMax: 0.8
        },
    mergeCanvas = true
} = {}){
    return {
        xPx: null,
        relX: null,
        yPx: null,
        relY: null,
        svgMarkerElement: null,
        render: function(){
            let xPx = this.xPx = randomInt(range.xMinPx, range.xMaxPx);
            let yPx = this.yPx = randomInt(range.yMinPx, range.yMaxPx);
            let {width, height} = getCanvasDims();
            this.relX = xPx/width;
            this.relY = yPx/height;
            // canvasMarker(xPx, yPx);
            if(mergeCanvas == mergeAlternatives.svg){
                    svgMarker.call(this, xPx,yPx);
            } else if(mergeCanvas == mergeAlternatives.merge){
                        svgMarker.call(this, xPx,yPx);
                        combineSvgCanvas.call(this);
            } else if(mergeCanvas == mergeAlternatives.noRender){
                
            }
        }
    }
}

function svgMarker(xPx, yPx){
    let {width, height} = getCanvasDims();
    const div = d3.select(`#${cfg.target}`);
    div.style("position", "relative");
    const svg = div.append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("position", "absolute")
        .style("top", '0px')
        .style("left", '0px');
    this.svgMarkerElement = svg;

    const markerHeight = 25;
    const markerGroup = svg.append("g");
    markerGroup.append("line")
        .attr("x1", xPx)
        .attr("y1", yPx)
        .attr("x2", xPx) 
        .attr("y2", yPx-markerHeight)
        .style("stroke", "rgb(40,40,40)")
        .style("stroke-width", 1.5);
    markerGroup.append("circle")
        .attr("cx", xPx)
        .attr("cy", yPx-markerHeight)
        .attr("r", 10)
        .style("fill", "rgb(40,40,40)");
    markerGroup.append("circle")
        .attr("cx", xPx)
        .attr("cy", yPx-markerHeight)
        .attr("r", 4)
        .style("fill", "rgb(111,197,189)");
}

function combineSvgCanvas(){
    let header = '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="960" style="position: absolute; top: 0px; left: 0px;">';
    let footer = '</svg>';
    let groupingString = header + this.svgMarkerElement.html() + footer;
    let {width, height} = getCanvasDims();
    this.svgMarkerElement.remove();
    var DOMURL = window.URL || window.webkitURL || window;
    var img1 = new Image();
    var svg = new Blob([groupingString], {type: 'image/svg+xml'});
    var url = DOMURL.createObjectURL(svg);
    img1.onload = function() {
        getCanvasContext().drawImage(img1, 0, 0);
        DOMURL.revokeObjectURL(url);
    }
    img1.src = url;
}

function canvasMarker(xPx, yPx){
    let ctx = getCanvasContext();
    var radius = 10;
    ctx.beginPath();
    ctx.arc(xPx, yPx, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
}

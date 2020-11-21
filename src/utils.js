import cfg from './cfg';

export function createCanvasContext(){
    var targetDiv = document.getElementById(cfg.target);
    var canvas = document.createElement("canvas");
    canvas.width = targetDiv.clientWidth;
    canvas.height = targetDiv.clientHeight;
    targetDiv.appendChild(canvas);
}

export function getCanvasContext(){
    var canvas = document.querySelector(`#${cfg.target} canvas`);
    return canvas.getContext('2d');
}

export function getCanvasDims(){
    const ctx = getCanvasContext();
    return {
        width: ctx.canvas.width,
        height: ctx.canvas.height
    };
}

export function getDataAreaPixelDims(normalizedDimensions){
    const {width, height} = getCanvasDims();
    return {
        xMinPx: normalizedDimensions.xMin * width,
        xMaxPx: normalizedDimensions.xMax * width,
        yMinPx: normalizedDimensions.yMin * height,
        yMaxPx: normalizedDimensions.yMax * height
    };
}

export function distance(x1, y1, x2, y2){
    return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
}

// min and max inclusive
export function randomInt(min, max, digits = 0) {
    return Math.floor(Math.random() * (max - min+1)+min);
}

export function randomFloat(min, max, decimalPlaces = 1) {
    var rand = Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);  // could be min or max or anything in between
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
}

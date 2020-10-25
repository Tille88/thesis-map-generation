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

export function distance(x1, y1, x2, y2){
    return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
}

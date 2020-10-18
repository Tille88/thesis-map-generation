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

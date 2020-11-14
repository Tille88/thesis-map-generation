import {getCanvasContext} from './utils';

export const CreateMarker = function({
    range = {
        xMin: 0.2,
        xMax: 0.8,
        yMin: 0.2,
        yMax: 0.8
        }
} = {}){
    return {
        xPx: null,
        yPx: null,
        render: function(){
            let xPx = this.xPx = randomNumber(range.xMinPx, range.xMaxPx);
            let yPx = this.yPx = randomNumber(range.yMinPx, range.yMaxPx);
            
            let ctx = getCanvasContext();
            var radius = 10;
            ctx.beginPath();
            ctx.arc(xPx, yPx, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'green';
            ctx.fill();
        }
    }
}

// min and max inclusive
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min+1)+min);
  }
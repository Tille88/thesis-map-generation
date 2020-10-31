import {legendTypesEnum} from './enums'
import {getCanvasContext} from './utils';
import cfg from './cfg';
import Cairo from '../assets/fonts/Cairo-Regular.ttf'

export const CreateLegend = function({
    legendType = legendTypesEnum.headline,
} = {}){
    // var f = new FontFace("Cairo", "url("+Cairo../assets/fonts/Cairo-Regular.ttf)");
    var f = new FontFace("Cairo", "url("+Cairo+")");
    return {
        init: function(){
            f.load().then(function() {
                if(legendType===legendTypesEnum.headline){
                    renderHeadline();
                } else if(legendType===legendTypesEnum.sideCheckered) {
                    renderSideCheckered();
                }
            });
        }
    }
}


function renderHeadline(){
    const ctx = getCanvasContext();
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, 80);
    ctx.font = '50px Cairo';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(cfg.legendText, width/2, 80/2);
}

// TODO refactor for next version
function renderSideCheckered(){
    const ctx = getCanvasContext();
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;
    // Background
    ctx.fillStyle = 'white';
    let legendWidth = 230
    let legendHeight = 250
    ctx.fillRect(width-legendWidth, height-legendHeight, legendWidth, legendHeight);
    // Headline text
    ctx.font = '25px Cairo';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';
    ctx.fillText(cfg.legendText, width-legendWidth+6, height-legendHeight+15);
    // Background checkered, white = 255, 255, 255, Not midgrey
    let legendBoxX = width-legendWidth+20;
    let legendBoxY = height-legendHeight+60;
    let colorBoxWidth = 50;
    let colorBoxHeight = 170;
    let checkSide=10;
    let checkCols = ["white", "rgb(165,165,165)"]
    let cols = colorBoxWidth/checkSide;
    let rows = colorBoxHeight/checkSide;
    let numChecks = cols * rows;
    for(let i=0; i<numChecks; i++){
        // Alternate fillstyle
        ctx.fillStyle = checkCols[i%2];  
        let x = legendBoxX + (i % cols * checkSide);  
        ctx.fillRect(x, 
            legendBoxY + (Math.floor(i/cols)*checkSide), 
            // legendBoxY, 
            checkSide, 
            checkSide
        );
    }
    // Background opacity

    // Indicator triangles
    drawTriangle(
        ctx, 
        legendBoxX + colorBoxWidth + 5,
        legendBoxY,
        7,10,'rgb(70,70,70)'
        );
    drawTriangle(
        ctx, 
        legendBoxX + colorBoxWidth + 5,
        legendBoxY + colorBoxHeight,
        7,10,'rgb(70,70,70)'
        );
    // Text
    ctx.font = '20px Cairo';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText("100", legendBoxX + colorBoxWidth + 15, legendBoxY + 2);
    ctx.fillText("0", legendBoxX + colorBoxWidth + 15, legendBoxY + colorBoxHeight + 2);
}


function drawTriangle(context, x, y, triangleWidth, triangleHeight, fillStyle){
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + triangleWidth, y + triangleHeight/2);
    context.lineTo(x + triangleWidth, y - triangleHeight/2);
    // context.lineTo(x + triangleWidth / 2, y + triangleHeight);
    // context.lineTo(x - triangleWidth / 2, y + triangleHeight);
    context.closePath();
    context.fillStyle = fillStyle;
    context.fill();
}

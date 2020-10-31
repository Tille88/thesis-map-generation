import {legendTypesEnum} from './enums'
import {getCanvasContext} from './utils';
import cfg from './cfg';
import {scaleLinear} from 'd3-scale';
import Cairo from '../assets/fonts/Cairo-Regular.ttf'
import baseMapSampleData from '../assets/baseMapSample/basemapSample.json'

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
                    renderSide("checkered");
                } else if(legendType===legendTypesEnum.sideSampledContext) {
                    renderSide("sampled");
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
function renderSide(background="checkered"){
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
    // Legendbox
    let legendBoxX = width-legendWidth+20;
    let legendBoxY = height-legendHeight+60;
    let colorBoxWidth = 50;
    let colorBoxHeight = 170;
    // Background checkered, white = 255, 255, 255, Not midgrey
    if(background=="checkered"){
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
    } else{
        // TODO: logic for sample background
        // Imagedata sample from basemap using console.log(ctx.getImageData(960/2, 960/3, 50, 170).data.toString())
        let uIntImgData = new Uint8ClampedArray(baseMapSampleData.uInt8ClampedArrayData[3])
        const imageData = ctx.createImageData(colorBoxWidth, colorBoxHeight)
        for (let i = 0; i < imageData.data.length; i++) {
                imageData.data[i] = uIntImgData[i];
        }
        ctx.putImageData(imageData, legendBoxX, legendBoxY);
    }
    // Background opacity
    var imageData = ctx.createImageData(colorBoxWidth,colorBoxHeight);
    const alphaScale = scaleLinear()
        .domain([colorBoxHeight, 0])
        .range([0,1]);
    for (let i = 0; i < imageData.data.length; i += 4) {
        let x = (i/4) % colorBoxWidth;
        let y = ((i/4) - x) / colorBoxWidth;
        imageData.data[i + cfg.opacityCol] = 255;
        imageData.data[i + 3] = Math.round(alphaScale(y) * 255);
    }
    createImageBitmap(imageData)
    .then((imageBitmap) => ctx.drawImage(imageBitmap, legendBoxX, legendBoxY));

    // Indicator triangles
    drawIndicatorTriangle(
        ctx, 
        legendBoxX + colorBoxWidth + 5,
        legendBoxY,
        7,10,'rgb(70,70,70)'
        );
    drawIndicatorTriangle(
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


function drawIndicatorTriangle(context, x, y, triangleWidth, triangleHeight, fillStyle){
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + triangleWidth, y + triangleHeight/2);
    context.lineTo(x + triangleWidth, y - triangleHeight/2);
    context.closePath();
    context.fillStyle = fillStyle;
    context.fill();
}

import {legendTypesEnum} from './enums'
import {getCanvasContext, getCanvasDims} from './utils';
import cfg from './cfg';
import {scaleLinear} from 'd3-scale';
import Cairo from '../assets/fonts/Cairo-Regular.ttf'
import mapSample from '../assets/baseMapSample/basemapSample.json'

export const CreateLegend = function({
    legendType = legendTypesEnum.headline,
    dataLoc = {
        xMinPx: null,
        xMaxPx: null,
        yMinPx: null,
        yMaxPx: null
    }
} = {}){
    var f = new FontFace("Cairo", "url("+Cairo+")");
    return {
        dataLoc,
        render: function(){
            let that = this;
            f.load().then(function() {
                if(legendType===legendTypesEnum.headline){
                    renderHeadline();
                } else if(legendType===legendTypesEnum.sideCheckered) {
                    renderSideLegend(legendTypesEnum.sideCheckered);
                } else if(legendType===legendTypesEnum.sideSampledContext) {
                    renderSideLegend(legendTypesEnum.sideSampledContext);
                } else if(legendType===legendTypesEnum.clusteredContextCols) {
                    renderSideLegend(legendTypesEnum.clusteredContextCols);
                }  else if(legendType===legendTypesEnum.annotatedOutline) {
                    renderAnnotatedOutline.apply(that);
                }
            });
        }
    }
}


function renderHeadline(){
    const ctx = getCanvasContext();
    let {width} = getCanvasDims();
    ctx.fillStyle = 'white';
    let backgroundHeight = 80;
    ctx.fillRect(0, 0, width, backgroundHeight);
    ctx.font = '50px Cairo';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(cfg.legendText, width/2, backgroundHeight/2);
}

// TODO refactor for next version
function renderSideLegend(background="checkered"){
    const ctx = getCanvasContext();
    let {width, height} = getCanvasDims();
    // Background
    ctx.fillStyle = 'white';
    let legendWidth = 230
    let legendHeight = 250
    ctx.fillRect(width-legendWidth, height-legendHeight, legendWidth, legendHeight);
    // Headline text
    let padLeft = 6;
    let padTop = 15;
    ctx.font = '25px Cairo';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';
    ctx.fillText(cfg.legendText, width-legendWidth+padLeft, height-legendHeight+padTop);
    // Legendbox
    let legendBoxX = width-legendWidth+20;
    let legendBoxY = height-legendHeight+60;
    let colorBoxWidth = 50;
    let colorBoxHeight = 170;
    // Background checkered, white = 255, 255, 255, Not midgrey
    if(background===legendTypesEnum.sideCheckered){
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
                checkSide, 
                checkSide
                );
            }
    } else if(background===legendTypesEnum.sideSampledContext){
        // Imagedata sample from basemap using console.log(ctx.getImageData(960/2, 960/3, 50, 170).data.toString())
        let uIntImgData = new Uint8ClampedArray(
            mapSample.uInt8Data[Math.floor(Math.random() * mapSample.uInt8Data.length)]
            );
        const imageData = ctx.createImageData(colorBoxWidth, colorBoxHeight)
        for (let i = 0; i < imageData.data.length; i++) {
                imageData.data[i] = uIntImgData[i];
        }
        ctx.putImageData(imageData, legendBoxX, legendBoxY);
    } else if(background===legendTypesEnum.clusteredContextCols){
        let clusterCols = [
                        "#DFDCDC", "#D0CBC0", "#EAEDE6", 
                        "#F9F8F6", "#F4E0BA", "#A8B3A5", 
                        "#7D7B7B", "#AAD0DE", "#E4B292", 
                        "#CAF1C2"];
        clusterCols.forEach((fillCol, idx, arr) => {
            ctx.fillStyle = fillCol;
            ctx.fillRect(
                legendBoxX + idx * colorBoxWidth/arr.length, 
                legendBoxY, 
                colorBoxWidth/arr.length, 
                colorBoxHeight
                );
        });
    }

    // Background opacity
    drawLegendOpacity(ctx, colorBoxWidth, colorBoxHeight, legendBoxX, legendBoxY);

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

function renderAnnotatedOutline(){
    // Opacity with stroke outline
    let outlineWidth = 40;
    let outlineHeight = 170;
    let upperX = this.dataLoc.xMinPx-1-outlineWidth;
    let upperY = this.dataLoc.yMinPx-1;
    const ctx = getCanvasContext();
    drawLegendOpacity(
        ctx, outlineWidth, outlineHeight,
        upperX, upperY    
    );
    ctx.strokeStyle = 'black';
    ctx.strokeRect(upperX, upperY, outlineWidth, outlineHeight);
    // Text part
    ctx.fillStyle = 'white';
    ctx.fillRect(upperX-50, upperY-10, 49, 20);
    ctx.fillRect(upperX-50, upperY+outlineHeight-10, 49, 20);
    drawIndicatorTriangle(ctx, upperX - 5, upperY, 7,10,'rgb(70,70,70)', "right");
    drawIndicatorTriangle(ctx, upperX - 5, upperY + outlineHeight, 7,10,'rgb(70,70,70)', "right");
    ctx.font = '20px Cairo';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'right';
    ctx.fillStyle = 'black';
    ctx.fillText("100", upperX-14, upperY+2);
    ctx.fillText("0", upperX-14, upperY + outlineHeight+2);
}

function drawLegendOpacity(ctx, boxWidth, boxHeight, upperX, upperY){
    
    var imageData = ctx.createImageData(boxWidth,boxHeight);
    const alphaScale = scaleLinear()
        .domain([boxHeight, 0])
        .range([0,1]);
    for (let i = 0; i < imageData.data.length; i += 4) {
        let x = (i/4) % boxWidth;
        let y = ((i/4) - x) / boxWidth;
        imageData.data[i + cfg.opacityCol] = 255;
        imageData.data[i + 3] = Math.round(alphaScale(y) * 255);
    }
    createImageBitmap(imageData)
    .then((imageBitmap) => ctx.drawImage(imageBitmap, upperX, upperY));
}

function drawIndicatorTriangle(context, x, y, triangleWidth, triangleHeight, fillStyle, direction = "left"){
    let baseX = x + triangleWidth;
    if(direction=="right"){
        baseX = x - triangleWidth;
    }
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(baseX, y + triangleHeight/2);
    context.lineTo(baseX, y - triangleHeight/2);
    context.closePath();
    context.fillStyle = fillStyle;
    context.fill();
}

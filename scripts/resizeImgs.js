const sharp = require("sharp");
const fs = require("fs");
const path = require('path')

// console.log(__dirname);

// list all files in the directory
// const basePath = `${__dirname}/merge`;
const basePath = `${__dirname}/no-render`;
let files = fs.readdirSync(`${basePath}/960x960`);

// files = [files[0]];
let sizeMid = 640;
let sizeSmall = 480;

files.forEach(file => {
    if(path.extname(file) === ".png"){
        
        let fileBaseName = file.split(".")[0];

        sharp(`${basePath}/960x960/${file}`)
            .resize(sizeMid, sizeMid)
            .toFile(`${basePath}/${sizeMid}x${sizeMid}/${fileBaseName}.png`, function(err) {
            });

        sharp(`${basePath}/960x960/${file}`)
            .resize(sizeSmall, sizeSmall)
            .toFile(`${basePath}/${sizeSmall}x${sizeSmall}/${fileBaseName}.png`, function(err) {
            });
    }
});

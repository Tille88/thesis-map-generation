const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    let fileNum = 0;
    // Define a window.onCustomEvent function on the page.
    await page.exposeFunction('onCustomEvent', (e) => {
        var base64Data = e.detail.img.replace(/^data:image\/png;base64,/, "");
        let meta = e.detail.meta;
        let fileNameBase = `0${meta.version}-${meta.colRead}-${meta.legendType}-${meta.mergeCanvas}`;
        fs.writeFile(__dirname + `/${meta.mergeCanvas}/${fileNameBase}.json`, JSON.stringify(meta, false, 2), function(err) {
            console.log(err);
        });
        fs.writeFile(__dirname + `/${meta.mergeCanvas}/${fileNameBase}.png`, base64Data, 'base64', function(err) {
            console.log(err);
        });
        console.log("Written file", ++fileNum, " out of 600-sth");
    });
    
    //   /**
    //    * Attach an event listener to page to capture a custom event.
    //    * @param {string} type Event name.
    //    * @returns {!Promise}
    //    */
    function listenFor(type) {
        return page.evaluateOnNewDocument((type) => {
            document.addEventListener(type, (e) => {
                window.onCustomEvent({ type, detail: e.detail });
            });
        }, type);
    }
    
    await listenFor('image-data');
    
    await page.goto('http://localhost:8080/', {
        // waitUntil: 'networkidle0',
    });
    
//   await browser.close();
})();
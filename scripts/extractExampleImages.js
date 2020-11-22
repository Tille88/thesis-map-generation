const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    let fileNum = 0;
    // Define a window.onCustomEvent function on the page.
    await page.exposeFunction('onCustomEvent', (e) => {
        // console.log(e.detail.substring(0, 100));
        var base64Data = e.detail.replace(/^data:image\/png;base64,/, "");
        // console.log(base64Data.substring(0, 100));
        fs.writeFile(__dirname + `/out${++fileNum}.png`, base64Data, 'base64', function(err) {
            console.log(err);
        });
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
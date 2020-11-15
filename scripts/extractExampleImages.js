const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();





//   // Define a window.onCustomEvent function on the page.
    await page.exposeFunction('onCustomEvent', (e) => {
        console.log(`${e.type} fired`, e.detail || '');
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
                console.log("LOG: ", e.detail);
            });
        }, type);
    }
    
    await listenFor('image-data');
    
    await page.goto('http://localhost:8080/', {
        // waitUntil: 'networkidle0',
    });
    
//   await browser.close();
})();
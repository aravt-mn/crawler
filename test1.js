// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra')
const fs = require('fs');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cheerio = require('cheerio');

puppeteer.use(StealthPlugin())

let url = 'https://www.alljobs.co.il/SearchResultsGuest.aspx?page=1&position=&type=&freetxt=&city=&region=';
const selector = 'open-board';
const run = (async () => {

    const args = [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
    ];
    const options = {
        args,
        headless: false,
        ignoreHTTPSErrors: true,
        userDataDir: './tmp'
    };

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(url);
    await page.waitFor(10000)

    let data = await page.content();

    // console.dir(data);
    
    fs.writeFile('test1.txt', data, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

    const $ = await cheerio.load(await page.content());
    console.log($.html());
    // console.log(await $(selector).html();
    await browser.close()
})();
const puppeteer = require('puppeteer-extra')
require('dotenv').config();

const puppeteerRequest = (request) => {
    puppeteer.use(require('puppeteer-extra-plugin-stealth')())
    ;(async () => {
    const browser = await puppeteer.launch({
        args: [
        '--no-sandbox',
        `--proxy-server=http://${request.proxies}`,
        ],
        headless: false,
    })
    const page = await browser.newPage();

    let username = process.env.USERNAME;
    if (request.geo !== 'none') {
        username = `${process.env.USERNAME}-country-${request.geo}`;
    }
    await page.authenticate({
        username,
        password: process.env.PASSWORD,
    });

    const url = request.url
    await page.goto(url, { waitUntil: 'networkidle2' })

    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    
    console.log(bodyHTML)

    await browser.close()
    })()
}

module.exports = { puppeteerRequest }
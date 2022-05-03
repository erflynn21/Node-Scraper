const puppeteer = require('puppeteer-extra');
require('dotenv').config();

const puppeteerRequest = async (request) => {
    return new Promise((resolve, reject) => {
        puppeteer.use(require('puppeteer-extra-plugin-stealth')())
        ;(async () => {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                `--proxy-server=http://${request.proxies}`,
            ],
            headless: true,
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

        // let bodyHTML = await page.evaluate(() => document.body.innerHTML);
        const content = await page.content();
        
        response = content

        await browser.close()
        resolve(response);
        })()
    })
}

module.exports = { puppeteerRequest }
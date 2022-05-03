const puppeteer = require('puppeteer-extra')
require('dotenv').config();

const puppeteerRequest = async (request) => {
    // return promise of the launch puppeteer function
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

        let bodyHTML = await page.evaluate(() => document.body.innerHTML);
        
        response = bodyHTML;

        await browser.close()
        resolve(response);
        })()
    })
}

const launchPuppeteer = async (request) => {
    
}

module.exports = { puppeteerRequest }
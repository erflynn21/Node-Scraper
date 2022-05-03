const puppeteer = require('puppeteer-extra');
const cheerio = require("cheerio");
require('dotenv').config();

const googleRequest = async (request) => {
    return new Promise((resolve, reject) => {
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

        // let bodyHTML = await page.evaluate(() => document.body.innerHTML);
        const content = await page.content();
    
        let $ = cheerio.load(content);

        let paidURLs = [];
        let paidTitles = [];
        let paidDescriptions = [];
        let paidShownURLs = [];

        $('.v5yQqb > a').each((i, el) => {
            paidURLs[i] = $(el).attr('href');
        })

        $('.CCgQ5 span').each((i, el) => {
            paidTitles[i] = $(el).text();
        });

        $('.MUxGbd div span').each((i, el) => {
            paidDescriptions[i] = $(el).text();
        });

        $('.v5yQqb a .x2VHCd').each((i, el) => {
            paidShownURLs[i] = $(el).text();
        });

        const paidResults = [];
        for (let i = 0; i < paidURLs.length; i++) {
            paidResults[i] = {
                title: paidTitles[i],
                description: paidDescriptions[i],
                url: paidURLs[i],
                shownURL: paidShownURLs[i],
            }
        }

        console.log(paidResults);

        // await browser.close()
        resolve(content);
        })()
    })
}

module.exports = { googleRequest }
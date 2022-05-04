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
            username = `${process.env.USERNAME}-country-${request.geo}-timeoutSeconds-60`;
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
        let allTitles = [];

        $('.sVXRqc').each((i, el) => {
            paidURLs[i] = $(el).attr('href');
        })

        $('.CCgQ5 span').each((i, el) => {
            paidTitles[i] = $(el).text();
        });

        $('.MUxGbd div').each((i, el) => {
            paidDescriptions[i] = $(el).text();
        });

        $('.v5yQqb a .x2VHCd').each((i, el) => {
            paidShownURLs[i] = $(el).text();
        });

        $('.CCgQ5 span, .NJo7tc > .yuRUbf > a > h3').each((i, el) => {
            allTitles[i] = $(el).text();
        })

        const paidResults = [];
        for (let i = 0; i < paidURLs.length; i++) {
            paidResults[i] = {
                title: paidTitles[i],
                description: paidDescriptions[i],
                url: paidURLs[i],
                shownURL: paidShownURLs[i],
                position: i + 1,
                overllPosition: allTitles.indexOf(paidTitles[i]) + 1,
            }
        }

        console.log(paidResults);

        let organicURLs = [];
        let organicTitles = [];
        let organicDescriptions = [];
        let organicShownURLs = [];

        $('.NJo7tc > .yuRUbf > a > h3').each((i, el) => {
            organicTitles[i] = $(el).text();
        });

        // console.log(organicTitles);

        $('.VwiC3b span').each((i, el) => {
            organicDescriptions[i] = $(el).text();
        });

        $('.NJo7tc > .yuRUbf > a').each((i, el) => {
            organicURLs[i] = $(el).attr('href');
        })

        $('.NJo7tc > .yuRUbf > a > .TbwUpd > .iUh30').each((i, el) => {
            organicShownURLs[i] = $(el).text();
        });

        const organicResults = [];
        for (let i = 0; i < organicURLs.length; i++) {
            organicResults[i] = {
                title: organicTitles[i],
                description: organicDescriptions[i],
                url: organicURLs[i],
                shownURL: organicShownURLs[i],
                position: i + 1,
                overallPosition: allTitles.indexOf(organicTitles[i]) + 1,
            }
        }

        // console.log('organic');
        console.log(organicResults);

        // await browser.close()
        resolve(content);
        })()
    })
}

module.exports = { googleRequest }
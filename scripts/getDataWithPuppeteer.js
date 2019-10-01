const puppeteer = require('puppeteer');
const { Database } = require("../src/db/Database");
const { DateService } = require("../src/services/DateService");

const db = new Database();
const dateService = new DateService(db);

async function createDates(page) {

    const allData = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('#DataTables_Table_0 tr td'));
        return tds.map(td => td.innerHTML);
    });

    let index = 0;
    const dateModels = [];
    while (index < allData.length) {
        dateModels.push({
            date: allData[index++],
            commissions: allData[index++],
            sales: allData[index++],
            leads: allData[index++],
            clicks: allData[index++],
            epc: allData[index++],
            impressions: allData[index++],
            cr: allData[index++]
        });
    }

    await Promise.all([dateModels.forEach((dateModel) => dateService.create(dateModel))]);

    const next = await page.evaluate(async () => {
        const button = Array.from(document.querySelectorAll('.dataTables_paginate ul .next a[title="Next"]'))[0];
        return !button.parentElement.className.split(' ').find(name => name === 'disabled');
    });
    if(next) {
        await Promise.all([
            page.waitForResponse(response => response.ok()),
            page.click('li[class="next"]')
        ]);
        await createDates(page);
    }
}

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://publisher-dev.affluent.io/login');

    await page.type('input[type="email"]', 'developertest@affluent.io');
    await page.type('input[type="password"]', 'H3lloWorld!');

    await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle2'}),
        page.click('button')
    ]);

    await page.goto('https://publisher-dev.affluent.io/list?type=dates&startDate=2019-08-01&endDate=2019-08-31', {waitUntil: 'networkidle2'});

    // Extract the results from the page.
    await createDates(page);

    await browser.close();
})();

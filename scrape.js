const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: true }); // Headless mode
    const page = await browser.newPage();

    // Masuk ke URL target
    await page.goto('https://coinmarketcap.com/currencies/altlayer/');

    // Ambil data harga
    const priceSelector = 'span[data-test="text-cdp-price-display"]';
    const price = await page.textContent(priceSelector);

    // Masukin ke file JSON
    const data = { price: price.trim(), timestamp: new Date().toISOString() };
    fs.writeFileSync('bay.json', JSON.stringify(data, null, 2));

    console.log('Harga AltLayer berhasil disimpan ke bay.json:', data);
    await browser.close();
})();

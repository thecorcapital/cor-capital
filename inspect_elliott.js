import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function inspectElliott() {
    const url = 'https://www.elliottmgmt.com/contact/';
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const html = await res.text();
        const $ = cheerio.load(html);
        
        console.log("Title:", $('title').text());
        
        console.log("\n--- Contact Sections ---");
        $('.contact-section, section, div').each((i, el) => {
            const h2 = $(el).find('h2').text().trim();
            if (h2) console.log(`Section: ${h2}`);
        });

        console.log("\n--- Locations ---");
        $('.location, .address, address').each((i, el) => {
            console.log($(el).text().trim().replace(/\s+/g, ' '));
        });

    } catch(e) {
        console.error(e);
    }
}
inspectElliott();

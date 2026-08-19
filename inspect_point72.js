import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function inspectPoint72() {
    const url = 'https://point72.com/perspectives/';
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const html = await res.text();
        const $ = cheerio.load(html);
        
        console.log("Title:", $('title').text());
        
        console.log("\n--- Articles/Items ---");
        $('.article, article, .post, .item').each((i, el) => {
            const title = $(el).find('h1, h2, h3').first().text().trim();
            const category = $(el).find('.category, .tags').first().text().trim();
            console.log(`- [${category}] ${title}`);
        });

        // More aggressive search if standard selectors fail
        if ($('.article').length === 0) {
            $('h3').each((i, el) => {
                console.log(`Heading: ${$(el).text().trim()}`);
            });
        }

    } catch(e) {
        console.error(e);
    }
}
inspectPoint72();

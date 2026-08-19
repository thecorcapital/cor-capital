import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function extractImages(url) {
    try {
        const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const html = await res.text();
        const $ = cheerio.load(html);
        
        const matches = html.match(/https?:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_.~-]+/g);
        if (matches) {
            const unique = [...new Set(matches)];
            unique.forEach(m => console.log(m));
        }
    } catch(e) {
        console.error(e);
    }
}

async function run() {
    await extractImages('https://mikecorvin94.wixsite.com/cor-capital-1/what-we-do');
}
run();

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function findOG() {
    const urls = [
        'https://mikecorvin94.wixsite.com/cor-capital-1',
        'https://mikecorvin94.wixsite.com/cor-capital-1/what-we-do'
    ];
    for (const url of urls) {
        try {
            const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
            const html = await res.text();
            const $ = cheerio.load(html);
            console.log(`URL: ${url}`);
            console.log(`og:image: ${$('meta[property="og:image"]').attr('content')}`);
            console.log(`twitter:image: ${$('meta[name="twitter:image"]').attr('content')}`);
        } catch(e) {}
    }
}
findOG();

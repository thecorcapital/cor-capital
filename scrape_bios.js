import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function extractBio(url, label) {
    try {
        const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const html = await res.text();
        const $ = cheerio.load(html);
        $('script, style, iframe, noscript').remove();
        
        console.log(`\n--- ${label} ---`);
        let bioText = [];
        $('p').each((i, el) => {
             const text = $(el).text().replace(/\s+/g, ' ').trim();
             if(text.length > 30 && !text.includes('Wix') && !text.includes('bottom of page') && !text.includes('All Rights Reserved')) {
                 bioText.push(text);
             }
        });
        // Try getting spans if p is empty
        if (bioText.length === 0) {
            $('span').each((i, el) => {
                 const text = $(el).text().replace(/\s+/g, ' ').trim();
                 if(text.length > 50 && !text.includes('Wix')) {
                     bioText.push(text);
                 }
            });
        }
        console.log(bioText.join('\n'));
    } catch(e) {
        console.error(e);
    }
}

async function run() {
    await extractBio('https://mikecorvin94.wixsite.com/cor-capital-1/copy-of-michael-moorhouse', 'Michael A. Corvin');
    await extractBio('https://mikecorvin94.wixsite.com/cor-capital-1/michael-moorhouse', 'Michael Moorhouse');
}
run();

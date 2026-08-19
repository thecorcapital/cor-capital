import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function extractOurValues() {
    try {
        const res = await fetch('https://mikecorvin94.wixsite.com/cor-capital-1/our-values', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        const html = await res.text();
        const $ = cheerio.load(html);
        
        $('script, style, iframe, noscript').remove();
        
        console.log("--- SPECIFIC ELEMENTS ---");
        $('h1, h2, h3, h4, h5, h6, p').each((i, el) => {
             const text = $(el).text().replace(/\s+/g, ' ').trim();
             if(text.length > 5 && !text.includes('Wix') && !text.includes('bottom of page')) {
                 console.log(`[${el.tagName}] ${text}`);
             }
        });
    } catch(e) {
        console.error(e);
    }
}
extractOurValues();

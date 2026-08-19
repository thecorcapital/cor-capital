import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function extractWixData() {
    try {
        const res = await fetch('https://mikecorvin94.wixsite.com/cor-capital-1', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        const html = await res.text();
        
        // Find wix-viewer-model script
        const match = html.match(/<script id="wix-viewer-model" type="application\/json">([\s\S]*?)<\/script>/);
        if (match) {
             const data = JSON.parse(match[1]);
             console.log("Found Viewer Model");
        }
        
        // Let's get all text inside <p>, <h1>, <h2>, <h3>, <span> tags since those are usually loaded if SSR is enabled.
        const $ = cheerio.load(html);
        $('h1, h2, h3, h4, p, span').each((i, el) => {
            const text = $(el).text().trim();
            if(text.length > 20 && !text.includes('Wix') && !text.includes('bottom of page')) {
                console.log(text);
            }
        });

    } catch(e) {
        console.error(e);
    }
}
extractWixData();

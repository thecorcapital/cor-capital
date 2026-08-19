import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function extractFullText() {
    try {
        const res = await fetch('https://mikecorvin94.wixsite.com/cor-capital-1', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        const html = await res.text();
        const $ = cheerio.load(html);
        
        $('script, style, iframe, noscript').remove();
        
        console.log("--- TEXT BLOCKS ---");
        $('h1, h2, h3, h4, h5, h6, p, span, a, button').each((i, el) => {
            const text = $(el).text().replace(/\s+/g, ' ').trim();
            if(text.length > 5 && !text.includes('Wix')) { // Ignore tiny strings and Wix ads
                // console.log(`[${el.tagName}] ${text}`);
                // just print text to keep it simple but somewhat structured
            }
        });
        
        // Let's just create a more structural outline of text nodes
        const sections = [];
        $('section, div[id^="comp-"]').each((i, el) => {
            const text = $(el).text().replace(/\s+/g, ' ').trim();
            if (text.length > 20 && !text.includes('Wix')) {
                sections.push(text);
            }
        });
        
        // Deduplicate sections
        const uniqueSections = [...new Set(sections)];
        uniqueSections.forEach(s => console.log(s));
        
    } catch(e) {
        console.error(e);
    }
}
extractFullText();

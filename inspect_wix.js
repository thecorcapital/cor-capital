import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function checkWix() {
    try {
        const res = await fetch('https://mikecorvin94.wixsite.com/cor-capital-1');
        const text = await res.text();
        const $ = cheerio.load(text);
        
        $('a').each((i, el) => {
            const href = $(el).attr('href');
            const text = $(el).text().trim();
            if (href && href.toLowerCase().includes('investor') || text.toLowerCase().includes('invest')) {
                console.log('Found link:', href, 'Text:', text, 'Classes:', $(el).attr('class'));
            }
        });
    } catch(e) {
        console.error(e);
    }
}
checkWix();

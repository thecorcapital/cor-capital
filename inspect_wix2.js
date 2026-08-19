import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function checkWix() {
    try {
        const res = await fetch('https://mikecorvin94.wixsite.com/cor-capital-1');
        const text = await res.text();
        const $ = cheerio.load(text);
        
        $('a').each((i, el) => {
            const textContent = $(el).text().trim();
            if (textContent.toLowerCase().includes('investors')) {
                console.log('Found link:', $(el).attr('href'));
                console.log('Text content:', textContent);
                console.log('Classes:', $(el).attr('class'));
                console.log('Style attr:', $(el).attr('style'));
                console.log('Parent node class:', $(el).parent().attr('class'));
                console.log('---');
            }
        });
    } catch(e) {
        console.error(e);
    }
}
checkWix();

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function findWhatWeDoImage() {
    const url = 'https://mikecorvin94.wixsite.com/cor-capital-1/what-we-do';
    try {
        const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const html = await res.text();
        const $ = cheerio.load(html);
        
        console.log("Looking for hero/background images on 'What We Do' page...");
        
        $('img').each((i, el) => {
            const src = $(el).attr('src');
            const dataSrc = $(el).attr('data-src');
            const srcset = $(el).attr('srcset');
            if (src) console.log(`[IMG SRC] ${src}`);
            if (dataSrc) console.log(`[DATA SRC] ${dataSrc}`);
            if (srcset) console.log(`[SRCSET] ${srcset}`);
        });

        // Wix often uses background images in styles
        $('*').each((i, el) => {
            const style = $(el).attr('style');
            if (style && style.includes('url(')) {
                console.log(`[STYLE BG] ${style}`);
            }
        });

        // Search for all Wix media URLs in the full HTML
        const wixMediaRegex = /https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_.~-]+\/v1\/fill\/[^ "']+/g;
        const matches = html.match(wixMediaRegex);
        if (matches) {
            console.log("\n--- Wix Media Assets Found ---");
            [...new Set(matches)].forEach(m => {
                const clean = m.split('/v1/fill')[0];
                console.log(clean);
            });
        }
        
    } catch(e) {
        console.error(e);
    }
}

findWhatWeDoImage();

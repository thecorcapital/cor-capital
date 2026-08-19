import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function inspectBackground(url) {
    try {
        const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        const html = await res.text();
        const $ = cheerio.load(html);
        
        console.log("Searching for high-res Wix assets...");
        
        // Wix often stores images in JSON inside script tags (wix:image nodes)
        const scripts = $('script').map((i, el) => $(el).html()).get();
        const assetRegex = /https?:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_.~-]+\/v1\/fill\/w_(\d+),h_(\d+)/g;
        
        const assets = [];
        scripts.forEach(s => {
            let match;
            while ((match = assetRegex.exec(s)) !== null) {
                const width = parseInt(match[1]);
                if (width >= 1000) {
                    assets.push(match[0]);
                }
            }
        });

        // Also check direct img tags
        $('img').each((i, el) => {
            const src = $(el).attr('src') || $(el).attr('data-src');
            if (src && src.includes('wixstatic.com')) {
                assets.push(src);
            }
        });

        const uniqueAssets = [...new Set(assets)];
        uniqueAssets.forEach(a => {
            // Clean up Wix fill params to get the high res source if possible
            const cleanUrl = a.split('/v1/fill')[0];
            console.log(cleanUrl);
        });

    } catch(e) {
        console.error(e);
    }
}

inspectBackground('https://mikecorvin94.wixsite.com/cor-capital-1/what-we-do');

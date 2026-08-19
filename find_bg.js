import fetch from 'node-fetch';

async function findBackground() {
    const url = 'https://mikecorvin94.wixsite.com/cor-capital-1/what-we-do';
    try {
        const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        const html = await res.text();
        
        // Search for background-image in styles or data attributes
        const bgRegex = /background-image:url\("?(https:\/\/static\.wixstatic\.com\/media\/[^")\s]+)"?\)/g;
        const matches = html.match(bgRegex);
        if (matches) {
            console.log("Found background results:");
            matches.forEach(m => console.log(m));
        }

        // Search for wix-image data attributes
        const dataBgRegex = /"uri":"([^"]+)"/g;
        const dataMatches = html.match(dataBgRegex);
        if (dataMatches) {
            console.log("Found URI results:");
            dataMatches.forEach(m => {
                const id = m.split('"')[3];
                if (id.includes('.') && !id.includes('v1')) {
                    console.log(`https://static.wixstatic.com/media/${id}`);
                }
            });
        }
    } catch(e) {
        console.error(e);
    }
}

findBackground();

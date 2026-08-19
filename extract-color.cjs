const Jimp = require('jimp');

async function extractColors() {
    try {
        const image = await Jimp.read('https://static.wixstatic.com/media/4d302e_ac5a98bb84b54d0098961a809703cb20~mv2.png/v1/fill/w_285,h_60,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4d302e_ac5a98bb84b54d0098961a809703cb20~mv2.png');
        
        let rTotal = 0, gTotal = 0, bTotal = 0;
        const colors = new Set();
        
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        let count = 0;
        
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const hex = image.getPixelColor(x, y);
                const rgb = Jimp.intToRGBA(hex);
                // ignore pure transparent or almost transparent
                if (rgb.a > 50) {
                    rTotal += rgb.r;
                    gTotal += rgb.g;
                    bTotal += rgb.b;
                    count++;
                    colors.add(`${rgb.r},${rgb.g},${rgb.b}`);
                }
            }
        }
        
        const avgR = Math.round(rTotal / count);
        const avgG = Math.round(gTotal / count);
        const avgB = Math.round(bTotal / count);
        
        console.log(`Average Color: rgb(${avgR}, ${avgG}, ${avgB}) | hex: #${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`);
        
        // Find most common colors
        const colorCounts = {};
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const hex = image.getPixelColor(x, y);
                const rgb = Jimp.intToRGBA(hex);
                if (rgb.a > 50) {
                    const key = `${rgb.r},${rgb.g},${rgb.b}`;
                    colorCounts[key] = (colorCounts[key] || 0) + 1;
                }
            }
        }
        
        const sortedColors = Object.entries(colorCounts).sort((a,b) => b[1] - a[1]).slice(0, 5);
        console.log("Top colors:", sortedColors);
    } catch(err) {
        console.error(err);
    }
}
extractColors();

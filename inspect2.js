import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function lookFurther() {
    const res = await fetch('https://point72.com/leadership/');
    const html = await res.text();
    const $ = cheerio.load(html);
    console.log("Body classes:", $('body').attr('class'));
    console.log("Header text:", $('h1').text());
    console.log("First few headers:", $('h2, h3').slice(0, 5).map((i, el) => $(el).text()).get().join('|'));
    
    // just looking for elements with 'leadership' or similar in class
    console.log("Found profile elements:", $('.profile-card').length, $('.leader').length, $('.team-grid').length);
}
lookFurther();

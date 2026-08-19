import fetch from 'node-fetch';

async function checkAsset(id) {
    const url = `https://static.wixstatic.com/media/${id}`;
    try {
        const res = await fetch(url, { method: 'HEAD' });
        console.log(`${id}: ${res.status} - Content-Length: ${res.headers.get('content-length')} - Content-Type: ${res.headers.get('content-type')}`);
    } catch(e) {
        console.error(e);
    }
}

async function run() {
    await checkAsset('4d302e_8070725d51014da5968319b8eb03af31~mv2.png');
}
run();

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
    await checkAsset('4d302e_c1cd21b9a0ec417fb7a4f4cffc028c46~mv2.png');
    await checkAsset('4d302e_cebf9a7d9fb74e69a36174527ebb711c~mv2.png');
}
run();

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
    await checkAsset('4d302e_a72bd49bd82d450fbc649977b6a8ba4f~mv2.png');
}
run();

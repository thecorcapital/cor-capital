const doFetch = async () => {
    const html = await (await fetch('https://mikecorvin94.wixsite.com/cor-capital-1')).text();
    const matches = html.match(/https:\/\/[^\"]*(?:logo|png|jpg|svg|webp|jpeg)[^\"]*/gi);
    if(matches){
        console.log(matches.filter(m => m.toLowerCase().includes('logo') || m.toLowerCase().includes('brand') || m.toLowerCase().includes('cor')).join('\n'));
    } else {
        console.log("No logo matches found.");
    }
}
doFetch();

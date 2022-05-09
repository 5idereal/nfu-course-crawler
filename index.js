const playwright = require('playwright');
async function main() {
    const browser = await playwright.chromium.launch()
    const page = await browser.newPage();
    await page.goto('https://qry.nfu.edu.tw/classname.php');
    await page.fill('#coursename', '%');
    await page.click('#bt_qry');
    await page.waitForLoadState('networkidle');
    const rows = page.locator('table tr');
    /*const texts = await rows.evaluateAll(list => list.map(element => {
        if (element.querySelector(':nth-child(3)'))
            return element.querySelector(':nth-child(3)').innerText;
    }));*/

    const count = await rows.count()
    for (let i = 3; i < count; ++i)
        //console.log("類型：",await rows.nth(i).locator(':nth-child(3)').innerText(), " 名稱：", await rows.nth(i).locator(':nth-child(2)').innerText(), " 教師：", await rows.nth(i).locator(':nth-child(7)').innerText(), " 學分：", await rows.nth(i).locator(':nth-child(4)').innerText() ," 地點：", await rows.nth(i).locator(':nth-child(15)').innerText());
        console.log(" 地點：",/([A-Z])\w+([A-Z])\w+/.exec(await rows.nth(i).locator(':nth-child(15)').innerText())[0]);
    await browser.close();

}

main();
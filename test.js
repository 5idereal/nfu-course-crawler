const playwright = require('playwright');
const cliProgress = require('cli-progress');
const jsonfile = require('jsonfile');
const { json } = require('stream/consumers');
async function main() {
    let arr = [];
    console.log("正在取得 107 學年度第 2 學期課程資料...");
    const browser = await playwright.chromium.launch()
    const page = await browser.newPage();
    await page.goto('https://qry.nfu.edu.tw/classname.php');
    await page.selectOption('select#selyr', '1072');
    await page.fill('#coursename', '%');
    await page.click('#bt_qry');
    await page.waitForLoadState('networkidle');
    const rows = page.locator('table tr');
    /*const texts = await rows.evaluateAll(list => list.map(element => {
        if (element.querySelector(':nth-child(3)'))
            return element.querySelector(':nth-child(3)').innerText;
    }));*/
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
   // const count = await rows.count();
const count = 100;
    bar1.start(count-3, 0);
    for (let i = 3; i < count; ++i)
    {
        arr.push({
            "id": await rows.nth(i).locator(':nth-child(1) > a').innerText(),
            "name": await rows.nth(i).locator(':nth-child(2)').innerText(),
            "teacher": await rows.nth(i).locator(':nth-child(7)').innerText(),
            "type": await rows.nth(i).locator(':nth-child(3)').innerText() == "必修" ? 1 : await rows.nth(i).locator(':nth-child(3)').innerText() == "選修" ? 2 : 3,
            "credit": await rows.nth(i).locator(':nth-child(4)').innerText(),
            "class": await rows.nth(i).locator(':nth-child(5)').innerText(),
            "location": /[A-Z0-9]{3,}/.exec(await rows.nth(i).locator(':nth-child(15)').innerText())[0]
        });
        bar1.increment();
        
    };
    bar1.stop();
    jsonfile.writeFileSync('data.json', arr);
    console.log("完成！");
    await browser.close();

}

main();
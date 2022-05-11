//TODO: provide parameter for semester
const playwright = require('playwright');
const cliProgress = require('cli-progress');
const jsonfile = require('jsonfile');

function convert(str){
    var arr = str.split("-");
    var start = arr[0] >= 'A' && arr[0] <= 'Z' ? arr[0].charCodeAt(0) - 64 : arr[0];
    var end = arr[1] >= 'A' && arr[1] <= 'Z' ? arr[1].charCodeAt(0) - 64 : arr[1];
    var result = "";
    for(var i = start; i <= end; i++){
        result += i + ",";
    }
    return result.substring(0, result.length - 1);
}

async function main() {
    console.log("🕓 網頁載入中...");
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://qry.nfu.edu.tw/classname.php');
    await page.fill('#coursename', '%');
    const options = page.locator('select > option');
    const options_count = await options.count();
    for (let i = 1; i < options_count; ++i) {
        let arr = [];
        page.selectOption('select#selyr', await options.nth(i).getAttribute("value"));
        await page.click('#bt_qry');
        await page.waitForLoadState('networkidle');
        console.log(`(${i}/${options_count}) 🏫 正在取得${await options.nth(i).innerText()}的課程資料...`);
        const rows = page.locator('table tr');
        //TODO: retry x times if failed
        const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        const count = /*await rows.count()*/ 5;
        bar1.start(count - 3, 0);
        for (let i = 3; i < count; ++i) {
            arr.push({
                "id": await rows.nth(i).locator(':nth-child(1) > a').innerText(),
                "name": await rows.nth(i).locator(':nth-child(2)').innerText(),
                "teacher": await rows.nth(i).locator(':nth-child(7)').innerText(),
                "type": await rows.nth(i).locator(':nth-child(3)').innerText() == "必修" ? 1 : await rows.nth(i).locator(':nth-child(3)').innerText() == "選修" ? 2 : 3,
                "credit": await rows.nth(i).locator(':nth-child(4)').innerText(),
                "hours": await rows.nth(i).locator(':nth-child(5)').innerText(),
                "class": await rows.nth(i).locator(':nth-child(6)').innerText(),
                "M": convert(await rows.nth(i).locator(':nth-child(8)').innerText()),
                "T": convert(await rows.nth(i).locator(':nth-child(9)').innerText()),
                "W": convert(await rows.nth(i).locator(':nth-child(10)').innerText()),
                "R": convert(await rows.nth(i).locator(':nth-child(11)').innerText()),
                "F": convert(await rows.nth(i).locator(':nth-child(12)').innerText()),
                "S": convert(await rows.nth(i).locator(':nth-child(13)').innerText()),
                "U": convert(await rows.nth(i).locator(':nth-child(14)').innerText()),
                "location": /[A-Z0-9]{3,}/.exec(await rows.nth(i).locator(':nth-child(15)').innerText())[0],
                "students": ["a"]
            });
            bar1.increment();
        };
        bar1.stop();
        jsonfile.writeFileSync(`./data/${await options.nth(i).getAttribute("value")}.json`, arr);
    }
    console.log("👌 完成！");
    await browser.close();

}

main();
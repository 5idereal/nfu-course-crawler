//TODO: provide parameter for semester
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cliProgress = require('cli-progress');
const jsonfile = require('jsonfile');
const myArgs = process.argv.slice(2);

function convert(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        result += str[i] >= 'A' && str[i] <= 'Z' ? str[i].charCodeAt(0) - 64 : str[i];
    }
    str = result;
    if (str.includes("-")) {
        var arr = str.split("-");
        var start = arr[0];
        var end = arr[1];
        var result = "";
        for (var i = start; i <= end; i++) {
            result += i + ",";
        }
        return result.substring(0, result.length - 1);
    } else {
        return str;
    }
}

async function main(a) {
    console.log("🕓 網頁載入中...");
    const res = await fetch("https://qry.nfu.edu.tw/classname_ajax.php", {
        "headers": {
            "accept": "text/html",
            "content-type": "application/x-www-form-urlencoded",
            "x-requested-with": "XMLHttpRequest",
            "Referer": "https://qry.nfu.edu.tw/classname.php"
        },
        "body": `pselyr=${a}&pcoursename=%25`,
        "method": "POST"
    });
    console.log(`(${i}/${options_count}) 🏫 正在取得${await options.nth(i).innerText()}的課程資料...`);
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    const count = await rows.count();
    bar1.start(count - 3, 0);
    for (let j = 3; j < count; ++j) {
        const list = await fetch(`https://qry.nfu.edu.tw/studlist.php?selyr=${a}&seqno=${await rows.nth(j).locator(':nth-child(1) > a').innerText()}`);

        arr.push({
            "id": await rows.nth(j).locator(':nth-child(1) > a').innerText(),
            "name": await rows.nth(j).locator(':nth-child(2)').innerText(),
            "teacher": await rows.nth(j).locator(':nth-child(7)').innerText(),
            "type": await rows.nth(j).locator(':nth-child(3)').innerText() == "必修" ? 1 : await rows.nth(j).locator(':nth-child(3)').innerText() == "選修" ? 2 : 3,
            "credit": await rows.nth(j).locator(':nth-child(4)').innerText(),
            "hours": await rows.nth(j).locator(':nth-child(5)').innerText(),
            "class": await rows.nth(j).locator(':nth-child(6)').innerText(),
            "M": convert(await rows.nth(j).locator(':nth-child(8)').innerText()),
            "T": convert(await rows.nth(j).locator(':nth-child(9)').innerText()),
            "W": convert(await rows.nth(j).locator(':nth-child(10)').innerText()),
            "R": convert(await rows.nth(j).locator(':nth-child(11)').innerText()),
            "F": convert(await rows.nth(j).locator(':nth-child(12)').innerText()),
            "S": convert(await rows.nth(j).locator(':nth-child(13)').innerText()),
            "U": convert(await rows.nth(j).locator(':nth-child(14)').innerText()),
            "location": /[A-Z0-9]{3,}/.exec(await rows.nth(j).locator(':nth-child(15)').innerText())[0],
            "students": await student_list.$$eval('table tr td', tds => tds.map((td) => {
                return td.innerText;
            }))
        });
        bar1.increment();
    };
    bar1.stop();
    jsonfile.writeFileSync(`./data/${await options.nth(i).getAttribute("value")}.json`, arr);
}
console.log("👌 完成！");

main(myArgs[0]);
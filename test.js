//TODO: provide parameter for semester
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
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

async function main(a = "1102") {
    let arr = [];
    const res = await fetch("https://qry.nfu.edu.tw/classname_ajax.php", {
        "headers": {
            "accept": "text/html",
            "content-type": "application/x-www-form-urlencoded",
            "x-requested-with": "XMLHttpRequest",
            "Referer": "https://qry.nfu.edu.tw/classname.php"
        },
        "body": `pselyr=${a}&pcoursename=%25`,
        "method": "POST"
    }).catch(err => {
        console.log(err);
    });
    const dom = new JSDOM(await res.text());
    const row = dom.window.document.querySelectorAll("tr");
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    const count = row.length;
    // const count = 5; for testing
    bar1.start(count - 3, 0);
    for (let j = 3; j < count; ++j) {
        let studlist = [];
        let courseUnitList = [];
        const studlist_page = await fetch("https://qry.nfu.edu.tw/studlist_ajax.php", {
            "headers": {
                "accept": "text/html",
                "content-type": "application/x-www-form-urlencoded",
                "x-requested-with": "XMLHttpRequest",
                "Referer": "https://qry.nfu.edu.tw/studlist.php"
            },
            "body": `pselyr=${a}&pseqno=${row[j].cells[0].textContent}`,
            "method": "POST"
        }).catch(err => {
            console.log(err);
        });

        const courseDetails_page = await fetch("https://ieet.nfu.edu.tw/coursequery/api/Course", {
            "headers": {
                "content-type": "application/json",
                "Accept-Encoding": "zlib",
            },
            "body": "{'ClassID':'-1','CollegeID':'-1','CourseID':'" + row[j].cells[0].textContent + "','CourseName':'-1','getUnit': 0,'DepartmentID':'-1','TeacherName':'-1','semesterID':'" + a + "'}",
            "method": "POST"
        }).catch(err => {
            console.log(err);
        });

        const courseOutline_page = await fetch("https://ieet.nfu.edu.tw/coursequery/api/Course", {
            "headers": {
                "content-type": "application/json",
                "Accept-Encoding": "zlib",
            },
            "body": "{'ClassID':'-1','CollegeID':'-1','CourseID':'" + row[j].cells[0].textContent + "','CourseName':'-1','getUnit': 1,'DepartmentID':'-1','TeacherName':'-1','semesterID':'" + a + "'}",
            "method": "POST"
        }).catch(err => {
            console.log(err);
        });

        const studom = new JSDOM(await studlist_page.text());
        const sturow = studom.window.document.querySelectorAll("td");
        for (let i = 0; i < sturow.length; ++i) {
            studlist.push(sturow[i].textContent);
        }

        const courseDetails = await courseDetails_page.json();

        const courseOutline = await courseOutline_page.json();

        for (let i = 0; i < courseOutline["content"].length; i++) {
            courseUnitList.push({
                "unitName": courseOutline["content"][i]["Course_unit_name"],
                "unitSubject": courseOutline["content"][i]["subject"]
            });
        }
        console.log(row[j].cells[0].textContent);
        arr.push({
            "id": row[j].cells[0].textContent,
            "chName": row[j].cells[1].textContent,
            "enName": courseDetails["content"][0]["Eng_name"],
            "teacher": row[j].cells[6].textContent,
            "type": row[j].cells[2].textContent == "必修" ? 1 : row[j].cells[2].textContent == "選修" ? 2 : 3,
            "credit": row[j].cells[3].textContent,
            "hour": row[j].cells[4].textContent,
            "class": row[j].cells[5].textContent,
            "M": convert(row[j].cells[7].textContent),
            "T": convert(row[j].cells[8].textContent),
            "W": convert(row[j].cells[9].textContent),
            "R": convert(row[j].cells[10].textContent),
            "F": convert(row[j].cells[11].textContent),
            "S": convert(row[j].cells[12].textContent),
            "U": convert(row[j].cells[13].textContent),
            "location": /[A-Z0-9]{3,}/.exec(row[j].cells[14].textContent)[0],
            "textbook": {
                "title": courseDetails["content"][0]["BookName"],
                "author": courseDetails["content"][0]["Author"],
                "publisher": courseDetails["content"][0]["publish"],
                "date": courseDetails["content"][0]["PubDate"],
                "isbn": courseDetails["content"][0]["isbn"].replace(/-/g, ""),
                "edition": courseDetails["content"][0]["version"]
            },
            "prerequisiteCourse": courseDetails["content"][0]["pre_course"],
            "objective": courseDetails["content"][0]["course_subject"],
            "prerequisiteAbility": courseDetails["content"][0]["pre_ability"],
            "mainPoint": courseDetails["content"][0]["teach_point"],
            "condition": courseDetails["content"][0]["E3_condition"],
            "grading": courseDetails["content"][0]["E3_assessment"],
            "method": courseDetails["content"][0]["E3_teach_type"],
            "remark": courseDetails["content"][0]["Remark"],
            "departmentId": courseDetails["content"][0]["Department_id"],
            "collegeId": courseDetails["content"][0]["College_ID"],
            "courseUnits": courseUnitList,
            "students": studlist
        });
        bar1.increment();
    };
    bar1.stop();
    jsonfile.writeFileSync(`./data/${a}.json`, arr);
}

main(myArgs[0]);
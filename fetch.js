const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
async function nfu() {
    /*const res = await fetch("https://ieet.nfu.edu.tw/coursequery/api/Course", {
        "headers": {
            "content-type": "application/json"
        },
        "body": "{'ClassID':'-1','CollegeID':'-1','CourseID':'0121','CourseName':'-1','DepartmentID':'-1','TeacherName':'-1','semesterID':'1102'}",
        "method": "POST"
    });*/

    /* const res = await fetch("https://qry.nfu.edu.tw/classname_ajax.php", {
          "headers": {
              "accept": "text/html",
              "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
              "x-requested-with": "XMLHttpRequest",
              "Referer": "https://qry.nfu.edu.tw/classname.php"
          },
          "body": "pselyr=1102&pcoursename=%25",
          "method": "POST"
      });*/

    const res = await fetch("https://qry.nfu.edu.tw/studlist_ajax.php", {
        "headers": {
            "accept": "text/html, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest",
            "Referer": "https://qry.nfu.edu.tw/studlist.php?selyr=1102&seqno=0001",
        },
        "body": "pselyr=1102&pseqno=0001",
        "method": "POST"
    });
    console.log(await res.text());
}

nfu();
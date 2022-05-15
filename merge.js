//TODO: merge course with same code
const json = [{ "id": "0011", "name": "高等高分子加工", "teacher": "林忠志", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "", "T": "5,6", "W": "", "R": "", "F": "", "S": "", "U": "", "location": "AME0209", "students": ["a"] },
{ "id": "0011", "name": "高等高分子加工", "teacher": "林忠志", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "", "T": "7", "W": "", "R": "", "F": "", "S": "", "U": "", "location": "AME0209", "students": ["a"] },
{ "id": "0012", "name": "數值熱傳", "teacher": "吳瑋特", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "", "T": "2,3,4", "W": "", "R": "", "F": "", "S": "", "U": "", "location": "AME0209", "students": ["a"] },
{ "id": "0013", "name": "實驗計畫法", "teacher": "施孟鎧", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "2,3,4", "T": "", "W": "", "R": "", "F": "", "S": "", "U": "", "location": "AME0209", "students": ["a"] },
{ "id": "0014", "name": "機械零件選用與設計", "teacher": "孫傳家", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "", "T": "", "W": "7,8,9", "R": "", "F": "", "S": "", "U": "", "location": "AME0217", "students": ["a"] },
{ "id": "0015", "name": "高等機構設計與分析", "teacher": "謝秋帆", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "5,6,7", "T": "", "W": "", "R": "", "F": "", "S": "", "U": "", "location": "AME0217", "students": ["a"] },
{ "id": "0016", "name": "表面工程", "teacher": "張銀祐", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "", "T": "", "W": "", "R": "2,3,4", "F": "", "S": "", "U": "", "location": "AME0209", "students": ["a"] },
{ "id": "0017", "name": "尺寸鏈設計", "teacher": "林維新", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "", "T": "", "W": "", "R": "5,6,7", "F": "", "S": "", "U": "", "location": "ATB0203", "students": ["a"] },
{ "id": "0018", "name": "刀具設計分析", "teacher": "陳麒翔", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "", "T": "", "W": "", "R": "", "F": "10,11,12", "S": "", "U": "", "location": "AME0209", "students": ["a"] },
{ "id": "0019", "name": "智慧製造", "teacher": "詹子奇", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "", "T": "", "W": "", "R": "5,6,7", "F": "", "S": "", "U": "", "location": "AME0209", "students": ["a"] },
{ "id": "0020", "name": "主軸設計", "teacher": "王政榮", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "", "T": "", "W": "2,3,4", "R": "", "F": "", "S": "", "U": "", "location": "AME0217", "students": ["a"] },
{ "id": "0021", "name": "模態實驗與分析", "teacher": "張禎元", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "5,6,7", "T": "", "W": "", "R": "", "F": "", "S": "", "U": "", "location": "AME0209", "students": ["a"] },
{ "id": "0022", "name": "工具機機電系統", "teacher": "陳進益", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "", "T": "", "W": "", "R": "", "F": "", "S": "7", "U": "", "location": "AME0311", "students": ["a"] },
{ "id": "0022", "name": "工具機機電系統", "teacher": "陳進益", "type": 2, "credit": "3", "hours": "3", "class": "碩機電輔一甲", "M": "", "T": "", "W": "", "R": "", "F": "", "S": "8,9", "U": "", "location": "AME0311", "students": ["a"] },
]
var arr = JSON.parse(json);

var result = [];

for (var i = 0; i < arr.length; i++) {
    var found = false;
    for (var j = 0; j < result.length; j++) {
        if (result[j].id == arr[i].id && result[j].name == arr[i].name) {
            found = true;
            result[j].nodes = result[j].nodes.concat(arr[i].nodes);
            break;
        }
    }
    if (!found) {
        result.push(arr[i]);
    }
}

json = JSON.stringify(result);

console.log(json);
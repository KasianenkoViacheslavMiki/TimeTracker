//Сохранения данных в локальное место
function saveData() {

}
//Обновления данных
function update() {
  let d;
  let tempData = data, temp = {};
  temp["data"] = JSON.stringify(tempData);
  chrome.storage.local.set(temp, (a) => { })
  chrome.idle.queryState(30, (o) => {

  })

}
// Загрузка данных с локального места
function loadData(a) {
  let temp;
  chrome.storage.local.get(temp, t => { a = JSON.parse(t["data"]) }),
    console.log("loadData"),
    console.log(temp);
    if (a!=undefined) createCliclAndTime();
}
//Дата текующого дня
function getDateString() { let e, t, n, r, o, l; return n = e ? new Date(e) : new Date, r = n.getFullYear(), o = n.getMonth() + 1, o = o < 10 ? "0" + o : o, l = n.getDate(), l = l < 10 ? "0" + l : l, t = r + "-" + o + "-" + l, t };
//Создания обьекта
function createCliclAndTime() {
  if (!(data.hasOwnProperty(url))) {
    data[url] = {
      allday: {
        click: 0,
        time: 0,
      }
    }
  }
  let temp = data[url];
  let timeData = getDateString();
  if (!(temp.hasOwnProperty(timeData))) {
    data[url][timeData] =
    {
      click: 0,
      time: 0,
    }
  }
}

//Функция для считания времени
function timeCount(a) {
  let e, t, s;
  let IDLE = 30;
  let tempData = getDateString();
  chrome.windows.getLastFocused({ populate: !0 }, d => {
    for (let a in d.tabs)
      if (d.tabs.hasOwnProperty(a) && !0 === d.tabs[a].active) {
        s = d.tabs[a]; break
      }
    chrome.idle.queryState(IDLE, o => {
      d.id, d.focused; let n = s.id; s.url;
      if (d.focused) { a.allday.time += 1; a[tempData].time += 1; }

    })
  })
}
//Функция для считания кликов
function clickCount(a) {
  let tempData = getDateString();
  a.allday.click += 1; a[tempData].click += 1;
}
//с URL взять домен
function parseURL(URL) {
  var parser = document.createElement('a'),
    searchObject = {},
    queries, split, i;
  parser.href = URL;
  queries = parser.search.replace(/^\?/, '').split('&');
  for (i = 0; i < queries.length; i++) {
    split = queries[i].split('=');
    searchObject[split[0]] = split[1];
  }
  return parser.hostname;
}
//Помещения js кода в страницу
function executeScript(a,url) {
  if ((blacklist.indexOf(url))) {
    console.log((blacklist.indexOf(url))!=-1);
    console.log("ex");
    chrome.tabs.executeScript(a, { file: 'clickScript.js' }, a => { })
  }
}
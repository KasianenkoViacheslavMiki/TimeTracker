//Сохранения данных в локальное место
function saveData() {

}
//Обновления данных
function update() {
    let tempData=data,temp={};
    temp["data"]=JSON.stringify(tempData);
    chrome.storage.local.set(temp, (a) => {  })
}
//Создания обьекта
function loadCliclAndTime() {
    if (!(data.hasOwnProperty(url))) {
        return {
            time: { allDay: 0 },
            click: { allDay: 0 }
        }
    }
}
//Загрузка данных с локального места
function loadData(a) {

}
//Функция для считания времени
function timeCount() {

}
//Функция для считания кликов
function timeCount(a) {
    a++;
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
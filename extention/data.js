//Сохранения данных в локальное место
function saveData(saveData) { 

}
//Загрузка данных с локального места
function loadData(a) { 

}
//Функция для считания времени
function timeCount(){
    
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
//Сохранения данных в локальное место
function saveData() {

}
//Обновления данных
function update() {
    let d; 
    let tempData=data,temp={};
    temp["data"]=JSON.stringify(tempData);
    chrome.storage.local.set(temp, (a) => {  })
    chrome.idle.queryState(30, (o)=> {
      
    })
  
}
//Создания обьекта
//function loadCliclAndTime() {
 //   console.log("LoadClickTime")
   // if (!(data.hasOwnProperty(url))) {
     //    data[url]={
       //     time: { allDay: 0 },
        //    click: { allDay: 0 }
        //}
    //}
  //}
  //Загрузка данных с локального места
 // function loadData(a) {
   // let temp={};
   // temp["data"]={},
   // chrome.storage.local.get(temp,t=>{let a={};a["data"]=JSON.parse(t["data"])}),
   // console.log("loadData"),
   // console.log(temp);
 // }
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
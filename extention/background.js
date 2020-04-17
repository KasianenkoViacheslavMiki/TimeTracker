//Обьект данных
var data = {};  
//
//Сохранения данных в локальное место
function saveData(a) {} 
//Загрузка данных с локального места
function loadData(a) {} 
chrome.tabs.onActivated.addListener(
  tabactiveInfo => {
    chrome.tabs.get(tabactiveInfo.tabId,infoTab=>{
      console.log(infoTab.url);
    })
  }
)
//Обьект данных
var data = {};  
let countTime;
var time={
  today:0,
  allDay:0
}

chrome.tabs.onActivated.addListener(
  
  tabActiveInfo => {
    chrome.tabs.get(tabActiveInfo.tabId,infoTab=>{

    });
    chrome.windows.getLastFocused({populate:!0},info=>{
      console.log(info);
    });

    chrome.tabs.executeScript(tabActiveInfo.tabId,{file: 'clickScript.js'},a=>{console.log("load")})
  }
  

)
chrome.runtime.onMessage.addListener(
  message=>{
    console.log(message);
  }
);
countTime = window.setInterval(()=> {},1000);

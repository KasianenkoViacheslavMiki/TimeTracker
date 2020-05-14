//Обьект данных
var data = {};
let countTime, updateData;
var time = {
  allDay: 0,
}
var click = {
  allDay: 0,
}
var url;
function loadCliclAndTime() {
  console.log("LoadClickTime")
  if (!(data.hasOwnProperty(url))) {
       data[url]={
          time: { allDay: 0 },
          click: { allDay: 0 }
      }
  }
}
//Загрузка данных с локального места
function loadData(a) {
  let temp={};
  chrome.storage.local.get("data",t=>{data=t;}),
  console.log("loadData"),
  console.log(data);
}
chrome.tabs.onActivated.addListener(
  tabActiveInfo => {
    chrome.tabs.get(tabActiveInfo.tabId, infoTab => {
      url = parseURL(infoTab.url),
      loadCliclAndTime(),
        console.log(url);
    }),
     chrome.windows.getLastFocused({ populate: !0 }, info => {

      })
      if (url != extensions) {
    chrome.tabs.executeScript(tabActiveInfo.tabId, { file: 'clickScript.js' }, a => { })}
  }
),
  chrome.runtime.onMessage.addListener(
    message => {
      if (message = "click") {
        data[url].click.allDay += 1
      }
    }
  ),
  loadData(data),
  countTime = window.setInterval(() => { data[url].time.allDay += 1 }, 1000),
  updateData = window.setInterval(() => { update() }, 1e2);

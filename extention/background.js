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
chrome.tabs.onActivated.addListener(
  tabActiveInfo => {
    chrome.tabs.get(tabActiveInfo.tabId, infoTab => {
      url = parseURL(infoTab.url);
      console.log(url);
      data[url] = loadCliclAndTime();
    });
    chrome.windows.getLastFocused({ populate: !0 }, info => {

    });
    chrome.tabs.executeScript(tabActiveInfo.tabId, { file: 'clickScript.js' }, a => { })
  }
)
chrome.runtime.onMessage.addListener(
  message=>{
    if (message="click"){
    data[url].click.allDay += 1
    }
  }
);

countTime = window.setInterval(() => { data[url].time.allDay += 1 }, 1000);
updateData = window.setInterval(() => { update() }, 1e2);

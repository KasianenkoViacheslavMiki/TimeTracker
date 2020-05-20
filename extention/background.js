//Обьект данных
var data={};
var blacklist = ["extensions","newtab"]
let countTime, updateData;
var url;
loadData();
chrome.tabs.onActivated.addListener(
  tabActiveInfo => {
    chrome.tabs.get(tabActiveInfo.tabId, infoTab => {
      url = parseURL(infoTab.url),
        createCliclAndTime(),
        console.log(url);
        executeScript(tabActiveInfo.tabId,url);
    })     
  }),
  chrome.runtime.onMessage.addListener(
    message => {
      if (message = "click") {
        clickCount(data[url]);
      }
    }
  ),
  countTime = window.setInterval(() => {timeCount(data[url]); }, 1e3),
  updateData = window.setInterval(() => { update() }, 1e2);

//Обьект данных
var data = {
  
};
var blacklist = ["extensions"]
let countTime, updateData;
var url;
chrome.tabs.onActivated.addListener(
  tabActiveInfo => {
    chrome.tabs.get(tabActiveInfo.tabId, infoTab => {
      url = parseURL(infoTab.url),
        createCliclAndTime(),
        console.log(url);
    }),
      chrome.windows.getLastFocused({ populate: !0 }, info => {

      })
     executeScript(tabActiveInfo.tabId,url);
  
  }),
  chrome.runtime.onMessage.addListener(
    message => {
      if (message = "click") {
        clickCount(data);
      }
    }
  ),
  loadData(data),
  countTime = window.setInterval(() => { timeCount(data[url]); }, 1000),
  updateData = window.setInterval(() => { update() }, 1e2);

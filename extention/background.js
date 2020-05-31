//Обьект данных
var data = {};
var firstDate = "";
firstSaveDateGet();
var blacklist = ["extensions", "newtab", "hadlplbgodpefnacciopfaijpjfblpjf"]
let countTime, updateData;
var url;
loadData();
chrome.tabs.onActivated.addListener(
  tabActiveInfo => {
    chrome.tabs.get(tabActiveInfo.tabId, infoTab => {
      url = parseURL(infoTab.url),
        createCliclAndTime();
      if ('hadlplbgodpefnacciopfaijpjfblpjf' == url) {
        chrome.windows.getLastFocused({ populate: !0 }, d => {
          for (let a in d.tabs)
            if (d.tabs.hasOwnProperty(a) && !0 === d.tabs[a].active) {
              url = parseURL(d.tabs[a].favIconUrl);
              break;
            }
        })
      }
      executeScript(tabActiveInfo.tabId, url);
      if ('s.ytimg.com' == url) url = 'www.youtube.com';

    })
  }),
  chrome.runtime.onMessage.addListener(
    message => {
      if (message = "click") {
        clickCount(data[url]);
      }
    }
  ),
  countTime = window.setInterval(() => { timeCount(data[url]); }, 1e3),
  updateData = window.setInterval(() => { update() }, 1e2);
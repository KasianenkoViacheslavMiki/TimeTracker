console.log("load");
document.onclick = chrome.runtime.sendMessage("click"); // отправка сообщения на background.js
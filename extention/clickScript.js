const backgroundJS = chrome.extension.getBackgroundPage();

document.addEventListener("mouseup", ()=>{
    console.log("click");
    chrome.runtime.sendMessage("click" + backgroundJS.coutnExet); // отправка сообщения на background.js
}); 


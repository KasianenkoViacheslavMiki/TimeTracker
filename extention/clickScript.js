document.addEventListener("mouseup", ()=>{
    console.log("click");
    chrome.runtime.sendMessage("click"); // отправка сообщения на background.js
}); 


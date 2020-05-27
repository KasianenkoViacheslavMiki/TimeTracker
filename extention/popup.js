const backgroundJS = chrome.extension.getBackgroundPage();
var data,
time= {
    "sec":0,
    "min":0,
    "hou":0,
    "day":0
}
dataDomein= backgroundJS.data,
urlPopup=backgroundJS.url,
date=backgroundJS.getDateString();
function secinTime(){

}
function showInfo(){
    let dataPopup = document.getElementById("url-web");
    dataPopup.innerHTML = "URL: " +urlPopup;
    dataPopup = document.getElementById("time-web");
    dataPopup.innerHTML ="Час за сьогодні: "+ dataDomein[urlPopup][date].time;
    dataPopup = document.getElementById("time-allday-web");
    dataPopup.innerHTML ="Час за всі дні: " + dataDomein[urlPopup]["allday"].time;
    dataPopup = document.getElementById("click-web");
    dataPopup.innerHTML = "Кількість дій за сьогодні: "+dataDomein[urlPopup][date].click;
    dataPopup = document.getElementById("click-allday-web");
    dataPopup.innerHTML = "Кількість дій за всі дні: "+dataDomein[urlPopup]["allday"].click;
}

showInfo();
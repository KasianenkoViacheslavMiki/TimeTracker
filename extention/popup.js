const backgroundJS = chrome.extension.getBackgroundPage();
var data,
    time = {
        "sec": 0,
        "min": 0,
        "hou": 0,
        "day": 0
    }
dataDomein = backgroundJS.data,
    urlPopup = backgroundJS.url,
    date = backgroundJS.getDateString();

function secinTime() {

}
function showInfo() {
    let dataPopup = document.getElementById("url-web");
    dataPopup.innerHTML = "URL: " + urlPopup;
    dataPopup = document.getElementById("time-web");
    dataPopup.innerHTML = "Час за сьогодні: " + dataDomein[urlPopup][date].time;    
    dataPopup = document.getElementById("time-allday-web");
    dataPopup.innerHTML = "Час за всі дні: " + dataDomein[urlPopup]["allday"].time;
    dataPopup = document.getElementById("click-web");
    dataPopup.innerHTML = "Кількість дій за сьогодні: " + dataDomein[urlPopup][date].click;
    dataPopup = document.getElementById("click-allday-web");
    dataPopup.innerHTML = "Кількість дій за всі дні: " + dataDomein[urlPopup]["allday"].click;
}
showInfo();
moment.locale('uk');
function generateData() {
    var unit = "day";

    function datainArray(date) {
        var time = dataDomein[urlPopup][date.format("YYYY-MM-DD")].time;
        return {
            t: date.valueOf(),
            y: time
        };
    }

    var date = moment(backgroundJS.firstDate, 'YYYY-MM-DD');
    var now = moment(backgroundJS.getDateString(), 'YYYY-MM-DD');
    var data = [];
    for (; data.length < 1000 && date.isBefore(now); date = date.clone().add(1, unit).startOf(unit)) {
        if (dataDomein[urlPopup].hasOwnProperty(date.format("YYYY-MM-DD"))) {
            data.push(datainArray(date));
        }
    }

    return data;
}

var ctx = document.getElementById('myChart').getContext('2d');
ctx.canvas.width = 1100;
ctx.canvas.height = 700;

var color = Chart.helpers.color;
var cfg = {
    data: {
        datasets: [{
            label: urlPopup,
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            data: generateData(),
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
        }]
    },
    options: {
        animation: {
            duration: 0
        },
        scales: {
            xAxes: [{
                type: 'time',
                distribution: 'series',
                offset: true,
                ticks: {
                    major: {
                        enabled: true,
                        fontStyle: 'bold'
                    },
                    source: 'data',
                    autoSkip: true,
                    autoSkipPadding: 75,
                    maxRotation: 0,
                    sampleSize: 100
                },
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Години'
                }
            }]
        },
        tooltips: {
            intersect: false,
            mode: 'index',
        }
    }
};

var chart = new Chart(ctx, cfg);




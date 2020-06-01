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


var typeData = "time",
    typeDate = "sec";
function getDataForm() {
    typeData = document.getElementById('typeData').value;
    typeDate = document.getElementById('typeDate').value;
}
function secinTime(time) {
    return (typeDate == "min" ? time / 60 : typeDate == "hou" ? time / 60 / 60 : typeDate == "day" ? time / 60 / 60 / 24 : time).toFixed(2);
}
function stringTime(time) {
    return '' + Math.floor(time / 60 / 60) + ' ч ' + Math.floor(time / 60 % 60) + ' м ' + Math.floor(time % 60) + ' c ';
}
function showInfo() {
    let dataPopup = document.getElementById("url-web");
    dataPopup.innerHTML = "URL: " + urlPopup;
    dataPopup = document.getElementById("time-web");
    dataPopup.innerHTML = "Час за сьогодні: " + stringTime(dataDomein[urlPopup][date].time);
    dataPopup = document.getElementById("time-allday-web");
    dataPopup.innerHTML = "Час за всі дні: " + stringTime(dataDomein[urlPopup]["allday"].time);
    dataPopup = document.getElementById("click-web");
    dataPopup.innerHTML = "Кількість дій за сьогодні: " + dataDomein[urlPopup][date].click;
    dataPopup = document.getElementById("click-allday-web");
    dataPopup.innerHTML = "Кількість дій за всі дні: " + dataDomein[urlPopup]["allday"].click;
}
showInfo();
moment.locale('uk');
function generateData() {
    let unit = "day";

    function datainArray(date) {
        let time = dataDomein[urlPopup][date.format("YYYY-MM-DD")][typeData];
        return {
            t: date.valueOf(),
            y: typeData == "time" ? secinTime(time) : time
        };
    }

    let date = moment(backgroundJS.firstDate, 'YYYY-MM-DD');
    let now = moment(backgroundJS.getDateString(), 'YYYY-MM-DD');
    let data = [];
    for (; data.length < 1000 && date.isBefore(now); date = date.clone().add(1, unit).startOf(unit)) {
        if (dataDomein[urlPopup].hasOwnProperty(date.format("YYYY-MM-DD"))) {
            data.push(datainArray(date));
        }
    }
    console.log(data);
    return data;
}
var per = document.getElementById('description');
var ctx = document.getElementById('myChart').getContext('2d');
ctx.canvas.width = 1100;
ctx.canvas.height = 700;

var color = Chart.helpers.color;
function generateCfg(data) {
    return {
        data: {
            datasets: [{
                label: urlPopup,
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.red,
                data: data,
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
                        labelString: typeData == 'time' ? "Години" : "Дії"
                    }
                }]
            },
            tooltips: {
                intersect: false,
                mode: 'index',
            }
        }
    }
};
var chart = new Chart(ctx, generateCfg(generateData()));

$(".rolss").change(function () {
    getDataForm();
    chart.data.datasets[0].data = generateData();
    chart.options.scales.yAxes[0].scaleLabel = {
        display: true,
        labelString: typeData == 'time' ? "Години" : "Дії"
    }
    chart.update();
});
//_______________________________________________________________________________________________________________________
var timeFormat = 'MM/DD/YYYY HH:mm';
function generateCfgAll(data) {
    return {
        data: {
            datasets: data,
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        parser: timeFormat,
                        // round: 'day'
                        tooltipFormat: 'll HH:mm'
                    },
                    distribution: 'series',
                    offset: true,
                }],
                yAxes: [{
                    gridLines: {
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: typeDatas == 'time' ? "Години" : "Дії"
                    }
                }]
            },

        }
    }
};
function generateDataAll() {
    let unit = "day";
    let datasets = [];
    function datainArray(date, urlPopup) {

        let time = dataDomein[urlPopup][date.format("YYYY-MM-DD")][typeDatas];
        return {
            t: date.valueOf(),
            y: typeDatas == "time" ? secinTimeAll(time) : time
        };
    }
    for (let element in dataDomein) {
        let date = moment(backgroundJS.firstDate, 'YYYY-MM-DD');
        let now = moment(backgroundJS.getDateString(), 'YYYY-MM-DD');

        let dataset = {};
        let data = [];
        for (; data.length < 1000 && date.isBefore(now); date = date.clone().add(1, unit).startOf(unit)) {
            if (dataDomein[element].hasOwnProperty(date.format("YYYY-MM-DD"))) {
                data.push(datainArray(date, element));
            }
        }
        dataset = {
            label: element,
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            data: data,
            type: 'line',
            pointRadius: 3,
            fill: false,
            lineTension: 0,
            borderWidth: 2,
            pointHitRadius: 4
        }
        datasets.push(dataset);
    }
    return datasets;
}
var chartAll;
function showInfos() {
    let dataPopup = document.getElementById("firstDate-all");
    dataPopup.innerHTML = "День встановлення додатка: " + backgroundJS.firstDate;
    dataPopup = document.getElementById("now-all");
    dataPopup.innerHTML = "Сьогоднішній день: " + backgroundJS.getDateString();
    dataPopup = document.getElementById("time-web-all");
    dataPopup.innerHTML = "Час за сьогоднішній день на всіх сайтах: " + stringTime();
    dataPopup = document.getElementById("time-allday-web-all");
    dataPopup.innerHTML = "Час за всі дні на всіх сайтах: " + stringTime();
    dataPopup = document.getElementById("click-web-all");
    dataPopup.innerHTML = "Дії за сьогоднішній день на всіх сайтах: " + dataDomein[urlPopup]["allday"].click;
    dataPopup = document.getElementById("click-allday-web-all");
    dataPopup.innerHTML = "Дії за всі дні на всіх сайтах: " + dataDomein[urlPopup][date].click;
}
$(".click").click(function () {
    var ctx = document.getElementById('myCharts').getContext('2d');
    ctx.canvas.width = 1100;
    ctx.canvas.height = 700;
    chartAll = new Chart(ctx, generateCfgAll(generateDataAll()));
    chartAll.update();
});
var typeDatas = "time",
    typeDates = "sec";
function getDataFormAll() {
    typeDatas = document.getElementById('typeDatas').value;
    typeDates = document.getElementById('typeDates').value;
}
function secinTimeAll(time) {
    return (typeDates == "min" ? time / 60 : typeDates == "hou" ? time / 60 / 60 : typeDates == "day" ? time / 60 / 60 / 24 : time).toFixed(2);
}
$(".form-controls").change(function () {
    getDataFormAll();
    console.log(typeDates);
    chartAll.data.datasets = generateDataAll();
    chartAll.options.scales.yAxes[0].scaleLabel = {
        display: true,
        labelString: typeDatas == 'time' ? "Години" : "Дії"
    }
    chartAll.update();
});
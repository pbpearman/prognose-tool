$(function () {
    var myChart = Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Wo 44'
        },
        xAxis: {
            categories: ['Heute, <br/>Fr, 27.10.17', 'Sa, 28.10.17', 'So, 28.10.17', 'Mo, 29.10.17', 'Di, 30.10.17', 'Mi, 31.10.17', 'Do, 01.11.17']
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: [
            {
                name: 'Generelle Auslastung',
                data: [5, 7, 3, 4, 3, 5, 7]
            },
            {
                name: 'Auslastung Bergbahnen',
                data: [2, 5, 4, 3, 1, 2, 1]
            },
            {
                name: 'Auslastung Skischule',
                data: [1, 3, 3, 2, 0, 1, 1]
            }
        ]
    });
});


var chart1; // globally available
$(function() {
    chart1 = Highcharts.stockChart('container', {
        rangeSelector: {
            selected: 1
        },
        series: [{
            name: 'USD to EUR',
            data: usdtoeur // predefined JavaScript array
        }]
    });
});
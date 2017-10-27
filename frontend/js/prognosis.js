$(function () {

    // API Url
    var endPoint = 'http://localhost:8888/prognose-tool/frontend/mock.json';

    // chart options
    var options = {
        chart: {
            type: 'column',
            renderTo: 'char-container'
        },
        title: {
            text: 'W. 44'
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: '% Auslastung'
            }
        },
        series: [
            {
                name: 'Generelle Auslastung',
                data: []
            },
            {
                name: 'Auslastung Bergbahnen',
                data: []
            },
            {
                name: 'Auslastung Skischule',
                data: []
            }
        ]
    };

    $.getJSON(endPoint, function (data) {
        // normalize data
        var maxLoad = data.maxLoad;

        // process the days to use with the chart
        for (var i = 0, len = data.days.length; i < len; i++) {
            var day = data.days[i];

            // preprocess categories
            options.xAxis.categories.push(day.day + ", " + day.date + "<br/>" + "");

            // preprocess series
            options.series[0].data.push(day.totalLoad);
            options.series[1].data.push(day.requiredLoad);
            //options.series[2].data.push(day.requiredLoad);
        }

        var chart = new Highcharts.Chart(options);
    });
});
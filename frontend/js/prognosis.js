var breakPoint = 769,
    smallChart = 'bar',
    bigChart = 'column',
    container = 'chart-container',
    endPoint = 'http://prognose-tool.waleed.ch/mock.json'
;


// high charts
$(function () {

    var theWindowSize = $(this).width();
    var chartType = bigChart;

    if (theWindowSize <= breakPoint) {
        chartType = smallChart;
    }

    var chart = null;

    // chart options
    var options = {
        chart: {
            type: chartType,
            renderTo: container
        },
        title: {
            text: 'Prognose',
            useHtml: true

        },
        xAxis: {
            labels: {
                useHTML: true
            },
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

    var getJson = function (period) {
        var days = 7 * period;
        var requestUrl = endPoint + '?days=' + days;

        options.series[0].data = [];
        options.series[1].data = [];

        $.getJSON(requestUrl, function (data) {
            // normalize data
            var maxLoad = data.maxLoad;

            // process the days to use with the chart
            for (var i = 0, len = data.days.length; i < len && i < days; i++) {
                var day = data.days[i];

                // preprocess categories
                options.xAxis.categories.push(
                    '<div class="series-legend"><div class="day">' + day.day + '</div>'
                    + '<div class="date">' + day.date + '</div>'
                    + '<div class="weather-icon">' + '<img src="img/icons/' + day.weatherIcon + '.png" ' +
                    ' alt=""/></div></div>'
                );

                // preprocess series
                options.series[0].data.push(Math.round(day.totalLoad / maxLoad * 100));
                options.series[1].data.push(Math.round(day.requiredLoad / maxLoad * 100));
                //options.series[2].data.push(day.requiredLoad);
            }

            drawChart();
        });
    }

    var getChart = function () {
        var chart = $('#chart-container').highcharts();
        return chart;
    }

    var drawChart = function () {
        var chart = getChart();
        if(chart){
            chart.destroy();
        }
        chart = new Highcharts.Chart(options);
    }

    getJson(1);

    $(window).on('resize', (function () {
        var theWindowSize = $(this).width();
        var chartType = bigChart;

        if (theWindowSize <= breakPoint) {
            chartType = smallChart;
        }

        var chart = getChart();

        if(chartType != chart.options.chart.type) {
            var options = chart.options;
            options.chart.type = chartType  ;
            chart.destroy();
            chart = new Highcharts.Chart(options);
        }
    }));

    $('.period button').on('click', function () {
        var period = $(this).attr('data-value');

        getJson(period);
    });
});
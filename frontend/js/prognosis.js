var breakPoint = 769,
    smallChart = 'bar',
    bigChart = 'column',
    container = 'chart-container',
    endPoint = 'https://prognose-tool.4eyes.ch/mockedData.json'
    //endPoint = 'http://localhost:8888/prognose-tool/frontend/mockedData.json'
;


// high charts
$(function () {
    var chart = null;

    // chart options
    var options = {
        chart: {
            type: bigChart,
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
                name: 'Auslastung Skischule',
                data: []
            },
            {
                name: 'Auslastung Bergbahnen',
                data: []
            },
            {
                name: 'Auslastung Destination',
                data: []
            }
        ]
    };

    var getJson = function (period) {
        var days = 7 * period;
        var requestUrl = endPoint + '?days=' + days;

        for (var g = 0; g < 3; g++){
            options.series[g].data = [];
        }
        options.xAxis.categories = [];

        var theWindowSize = $(this).width();
        var chartType = bigChart;
        if (theWindowSize <= breakPoint) {
            chartType = smallChart;
        }
        options.chart.type = chartType;

        $.getJSON(requestUrl, function (data) {
            // normalize data
            var max = [];
            for (var h = 0; h < 3; h++) {
                max.push(data.maxCounts[h].count);
            }

            // process the days to use with the chart
            for (var i = 0, len = data.days.length; i < days; i++) {

                var day = data.days[i];

                // preprocess categories
                options.xAxis.categories.push(
                    '<div class="series-legend"><div class="day">' + day.dayOfWeek + '</div>'
                    + '<div class="date">' + day.date + '</div>'
                    + '<div class="weather-icon">' + '<img src="img/icons/' + day.weatherIcon + '.png" ' +
                    ' alt=""/></div></div>'
                );

                // preprocess series
                for (var j = 0; j < 3; j++){
                    options.series[j].data.push(Math.round(day.categories[j].count / max[j] * 100));
                }
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

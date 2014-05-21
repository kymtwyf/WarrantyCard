(function($){
  var chartData = [{
          "country": "USA",
          "visits": 4252
        }, {
          "country": "China",
          "visits": 1882
        }, {
          "country": "Japan",
          "visits": 1809
        }, {
          "country": "Germany",
          "visits": 1322
        }, {
          "country": "UK",
          "visits": 1122
        }, {
          "country": "France",
          "visits": 1114
        }, {
          "country": "India",
          "visits": 984
        }, {
          "country": "Spain",
          "visits": 711
        }, {
          "country": "Netherlands",
          "visits": 665
        }, {
          "country": "Russia",
          "visits": 580
        }, {
          "country": "South Korea",
          "visits": 443
        }, {
          "country": "Canada",
          "visits": 441
        }, {
          "country": "Brazil",
          "visits": 395
        }, {
          "country": "Italy",
          "visits": 386
        }, {
          "country": "Australia",
          "visits": 384
        }, {
          "country": "Taiwan",
          "visits": 338
        }, {
          "country": "Poland",
          "visits": 328
        }];

  $(document).on('ready',function(){
    console.log('document ready');
    // var chart = new AmCharts.AmSerialChart();
    //   chart.dataProvider = chartData;
    //   chart.categoryField = "country";

    //   var graph = new AmCharts.AmGraph();
    //   graph.valueField = "visits";
    //   graph.type = "column";
    //   chart.addGraph(graph);
    //   chart.write('content');
    $('a[href="#table"]').on('show.bs.tab',function(){
      console.log('table on show');
    })
   
  })


  AmCharts.ready(function(){
    console.log('amcharts ready');
    var chart = new AmCharts.AmSerialChart();
    chart.dataProvider = chartData;
    chart.categoryField = "country";

    var graph = new AmCharts.AmGraph();
    graph.valueField = "visits";
    graph.type = "column";
    chart.addGraph(graph);
    chart.write('content');
  })

})(jQuery)


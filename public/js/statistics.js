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
    var dateFrom = moment(),dateTo= moment();
    var countType;
    console.log('document ready');
    $('input[name="daterange"]').daterangepicker({
      format:"YYYY-MM-DD",
      startDate: moment().subtract('days', 7),
      endDate: moment()
    },function(start,end){
      dateFrom = start;
      dateTo = end;
      console.log('dateFrom '+dateFrom);
      console.log('dateTo '+dateTo);
    });

    function validateInputs(){

      countType = $('input[name="countType"]:checked').val();
      var dateRange = $('input[name="daterange"]').val();

      console.log('countType '+countType);
      if(!countType||dateRange.trim() ==''){
        return false;
      }else{    
        return true;
      }
      
    }
    function groupByDay(arr,idTag){
      var target = [];
      for(var i = 0 ;i < arr.length; i ++){
        var day = moment({
          year:arr[i][idTag].year,
          month:arr[i][idTag].month-1,
          day:arr[i][idTag].day
        })
        target.push({
          day:day,
          figure:arr[i].figure
        })
      };

      target = _.sortBy(target,function(obj){
        // console.log(obj.valueOf())
        // console.log(obj.valueOf())
        return obj.day.valueOf();
      });

      var transformed = [];
      _.each(target,function(item){
        transformed.push({
          day:item.day.format("YYYY-MM-DD"),
          figure:item.figure
        })
      })
      return transformed;
    }

    function showGraph(){
      var tagSelection = $('ul#show-type li.active').attr('value');
      console.log('tagSelection '+tagSelection);
      var dataObject = WarrantyOnline.statistics;
      if(!dataObject){
        console.log('empty value !!!of chart');
        return;
      }
      if(tagSelection == "showchart"){
        //show chart
        console.log('drawing chart');
        console.log(dataObject);
         var chart = new AmCharts.AmSerialChart();
          chart.dataProvider = dataObject.value;
          chart.categoryField = dataObject.X;

          var graph = new AmCharts.AmGraph();
          graph.valueField = dataObject.Y;
          graph.type = "column";
          chart.addGraph(graph);
          chart.write('chart-content');
      }else{
        //show table

      }
    }
    $('#button-count').on('click',function(){
  
      if(validateInputs()){
        // console.log()
        var url = '/api/statistics/count';
        var _countType = countType;
        var _dateFrom = dateFrom.format();
        var _dateTo = dateTo.format();
        console.log("_countType "+_countType);
        $.post(url,{
          countType:_countType,
          dateFrom:_dateFrom,
          dateTo:_dateTo

        },function(data){
          console.log('返回结果');
          console.log(data);
          if(data.status =='error'){
            // alert('内部错误');
            console.log('error when requesting datga');
          }else{
            //处理图表数据并展示。
            console.log("computing "+countType);
            var dataObject = {
              type:countType
            };
            switch (countType){
              case 'soldnumber':
              case 'soldmoney':
              case 'closedservicenumber':
              case 'servicecount':{
                var resulta = groupByDay(data.result,"_id");
                console.log(resulta);
                dataObject.value = resulta;
                dataObject.X = "day",
                dataObject.Y = "figure";
                break;
              }
            }


            WarrantyOnline.statistics = dataObject;
            showGraph();

          }
        })
      }else{
        alert('请输入参数');
      }
    })
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


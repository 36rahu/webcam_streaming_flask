var d=0;
$(document).ready(function() {
    $("#bisconl").click(function(event){
      $.post(
        "getData2.php",
        $("#testform").serialize(),
        function(data) {
            d=data;
          var k=d.split(" ");

          var abc=[];

          var count = 0;
          for (var i = 0 ; i < k.length; i++) {
            if (i%7==1) {
                abc[count]=k[i];
              count++;
            }
          }
$(function () {
    $('#canvas').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Monthly Average Temperature'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Tokyo',
            data: abc
            },
            {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
});

 }
      );
    });
  });
//exicute this function when load this webpage
        $(document).ready(function(){

			//status flag used for start and stop button actions
            var status = true;
            var TableStatus = 0;
            var b1 = document.getElementById('stop');
            var b2 = document.getElementById('start');
            var value = document.getElementById('values');
      			var abc = document.getElementById('Tables');

			//initialize socket declarations
            namespace = '/test';
            var socket = io.connect('http://' + document.domain + ':' + location.port + namespace);

			//this function call used for initialisation of the function
			looping();

			//start and stop button button declaration


      //stop button action
			b1.onclick = function() {
                status = false; };

			//start butto action
			b2.onclick = function() {
				//which helps solve to double click error of start button
				if (status !== true) {
					status = true;
					looping();
				}};

			//request for server to send data
			function looping(){
				if (status == true) {
                socket.emit('my event', {data:'None'});}}


            socket.on('my response1', function(msg) {

                if (msg !== undefined)
                {
				 if (msg.imageOgrinal !== undefined) {
						var dataURL="data:image/jpeg;base64,"+msg.imageOgrinal;
						document.getElementById("image").src = dataURL;
						$('#Image1Msg').hide();
				 }
				 else{
					$('#Image1').hide();
				 }

				 if (msg.imageProccessed !== undefined) {
						var dataURL="data:image/jpeg;base64,"+msg.imageProccessed;
						document.getElementById("image2").src = dataURL;
						$('#Image2Msg').hide();
					}
				else{
					$('#Image2').hide();
				 }

       if (msg.status == 'OK') {
         var dataURL="static/images/ok.png";
         document.getElementById("image_status").src = dataURL;
                 }
       else if (msg.status == "NotOK"){
         var dataURL="static/images/not_ok.png";
         document.getElementById("image_status").src = dataURL;
          }
      else if (msg.status == "Wait") {
        var dataURL="static/images/wait.png";
        document.getElementById("image_status").src = dataURL;
      }
      else {
        var dataURL="static/images/logo.png";
        document.getElementById("image_status").src = dataURL;
      }

          value.innerHTML=msg.value;

				 if (msg.table !== undefined) {
           if (TableStatus == 1) {
			          $("Table").find("tr:gt(0)").remove();}
           for (var i = 1; i<=msg.table.length; i++){
     			        var row = abc.insertRow(i);
                   for(j=0 ; j<msg.table[0].length; j++){
                     var cell = row.insertCell(j);
                     cell.innerHTML = msg.table[i-1][j];
               }
     			}
           TableStatus = 1;
           $('#tableMsg').hide();
				 }
				 else{
					$('#table').hide();
				 }

				if (msg.graph !== undefined) {
							var chartdata = {
								chart: {
								type: 'spline',
								renderTo: 'abc'
								},
								title: {
									text: 'Sample Graph'
								},
								xAxis: {
									title: {
									text: 'Duplicate'
									}
								},
								yAxis: {
									title: {
										text: 'Duplicate'
									}
								},
								plotOptions: {
									spline: {
										marker: {
										enabled: true
										},
									animation: false
									}
								},
								series: [{
									name: 'Duplicate',
									data: msg.graph
								  }]
								}
				window.myLine = new Highcharts.Chart(chartdata)
							$('#graphMsg').hide();
				}
				 else{
					$('#graph').hide();
				 }
				looping();
                }
                else{
                    window.alert("No data got from Server")
                }

            });

        });

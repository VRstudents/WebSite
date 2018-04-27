function displayLessonStatistics(){
	lessonNum = document.getElementById("lessons-list").value;
	classId = document.URL.substring(document.URL.indexOf("?") + 10);
	
	document.getElementById('lesson-tab-div').style.display = 'inline';
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});
			console.log(arr2);
			
			if(arr2[2] == 0){
				percentage = 0
			} else {
				percentage = arr2[2]/arr2[1]*100;
			};
			
			document.getElementById("students-tried").innerHTML = 'Students attempted the lesson: ' + arr2[1];
			document.getElementById("students-finished").innerHTML = 'Students finished the lesson: ' + arr2[2] + " (" + percentage + "%)";
			document.getElementById("avg-res").innerHTML = 'Average lesson result: ' + arr2[3];
			document.getElementById("avg-best-res").innerHTML = 'Average best lesson result: ' + arr2[4];
			
			if(arr2[0].length != 0) {	
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);
				
				console.log(arr2[0][0].RightCount/(arr2[0][0].RightCount+arr2[0][0].WrongCount));
				console.log(arr2[0][0].WrongCount/(arr2[0][0].RightCount+arr2[0][0].WrongCount));

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Question', 'Correct', 'Incorrect'],
						[' ', null, null],
						[arr2[0][0].QNum, arr2[0][0].RightCount/(arr2[0][0].RightCount+arr2[0][0].WrongCount)*100, arr2[0][0].WrongCount/(arr2[0][0].RightCount+arr2[0][0].WrongCount)*100],
						[arr2[0][1].QNum, arr2[0][1].RightCount/(arr2[0][1].RightCount+arr2[0][1].WrongCount)*100, arr2[0][1].WrongCount/(arr2[0][1].RightCount+arr2[0][1].WrongCount)*100],
						[arr2[0][2].QNum, arr2[0][2].RightCount/(arr2[0][2].RightCount+arr2[0][2].WrongCount)*100, arr2[0][2].WrongCount/(arr2[0][2].RightCount+arr2[0][2].WrongCount)*100],
						[arr2[0][3].QNum, arr2[0][3].RightCount/(arr2[0][3].RightCount+arr2[0][3].WrongCount)*100, arr2[0][3].WrongCount/(arr2[0][3].RightCount+arr2[0][3].WrongCount)*100],
						[arr2[0][4].QNum, arr2[0][4].RightCount/(arr2[0][4].RightCount+arr2[0][4].WrongCount)*100, arr2[0][4].WrongCount/(arr2[0][4].RightCount+arr2[0][4].WrongCount)*100],
						[arr2[0][5].QNum, arr2[0][5].RightCount/(arr2[0][5].RightCount+arr2[0][5].WrongCount)*100, arr2[0][5].WrongCount/(arr2[0][5].RightCount+arr2[0][5].WrongCount)*100],
						[arr2[0][6].QNum, arr2[0][6].RightCount/(arr2[0][6].RightCount+arr2[0][6].WrongCount)*100, arr2[0][6].WrongCount/(arr2[0][6].RightCount+arr2[0][6].WrongCount)*100],
						[arr2[0][7].QNum, arr2[0][7].RightCount/(arr2[0][7].RightCount+arr2[0][7].WrongCount)*100, arr2[0][7].WrongCount/(arr2[0][7].RightCount+arr2[0][7].WrongCount)*100],
						[arr2[0][8].QNum, arr2[0][8].RightCount/(arr2[0][8].RightCount+arr2[0][8].WrongCount)*100, arr2[0][8].WrongCount/(arr2[0][8].RightCount+arr2[0][9].WrongCount)*100],
						[arr2[0][9].QNum, arr2[0][9].RightCount/(arr2[0][9].RightCount+arr2[0][9].WrongCount)*100, arr2[0][9].WrongCount/(arr2[0][9].RightCount+arr2[0][9].WrongCount)*100]
					]);

					var options = {
						chart: {
							title: 'Questions answers results distribution (in percents)'
						}, 
						hAxis: {
							viewWindow: {
								min: 1,
								max: 10
							},
							ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
						},
						vAxis: {
							viewWindow: {
								min: 0,
								max: 100
							},
							ticks: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] 
						}
					};

					var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
					chart.draw(data, google.charts.Bar.convertOptions(options));
				}
			};
		};					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Statistics/LessonStats/" + classId + "/" + lessonNum, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function displayStudentStatistics(){
	document.getElementById('students-output').innerHTML = document.getElementById("students-list").value;
}
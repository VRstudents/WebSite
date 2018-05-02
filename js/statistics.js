var options = {
	hAxis: {
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

function displayLessonStatistics(){
	lessonNum = document.getElementById("lessons-list").value;
	classId = document.URL.substring(document.URL.indexOf("?") + 10);
	
	document.getElementById('lesson-tab-div').style.display = 'inline';
	document.getElementById('students-in-lesson_label').style.display = 'inline';
	document.getElementById('students-in-lesson').style.display = 'inline';
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});

			document.getElementById("students-tried").innerHTML = 'Students attempted the lesson: ' + arr2[1];
			document.getElementById("students-finished").innerHTML = 'Students finished the lesson: ' + arr2[2] + " (" + arr2[3] + "%)";
			document.getElementById("avg-res").innerHTML = 'Average lesson result: ' + arr2[4];
			document.getElementById("avg-best-res").innerHTML = 'Average best lesson result: ' + arr2[5];
			
			if(arr2[0].length != 0) {	
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);
				
				options = {
					chart: {
						title: 'Questions answers results distribution by lesson(in percents)'
					},
					vAxis: {
						title: 'Number of answers',
					}
				};

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Question', 'Correct', 'Incorrect'],
						[arr2[0][0].QNum, arr2[0][0].RightCount/(arr2[0][0].RightCount+arr2[0][0].WrongCount)*100, arr2[0][0].WrongCount/(arr2[0][0].RightCount+arr2[0][0].WrongCount)*100],
						[arr2[0][1].QNum, arr2[0][1].RightCount/(arr2[0][1].RightCount+arr2[0][1].WrongCount)*100, arr2[0][1].WrongCount/(arr2[0][1].RightCount+arr2[0][1].WrongCount)*100],
						[arr2[0][2].QNum, arr2[0][2].RightCount/(arr2[0][2].RightCount+arr2[0][2].WrongCount)*100, arr2[0][2].WrongCount/(arr2[0][2].RightCount+arr2[0][2].WrongCount)*100],
						[arr2[0][3].QNum, arr2[0][3].RightCount/(arr2[0][3].RightCount+arr2[0][3].WrongCount)*100, arr2[0][3].WrongCount/(arr2[0][3].RightCount+arr2[0][3].WrongCount)*100],
						[arr2[0][4].QNum, arr2[0][4].RightCount/(arr2[0][4].RightCount+arr2[0][4].WrongCount)*100, arr2[0][4].WrongCount/(arr2[0][4].RightCount+arr2[0][4].WrongCount)*100],
						[arr2[0][5].QNum, arr2[0][5].RightCount/(arr2[0][5].RightCount+arr2[0][5].WrongCount)*100, arr2[0][5].WrongCount/(arr2[0][5].RightCount+arr2[0][5].WrongCount)*100],
						[arr2[0][6].QNum, arr2[0][6].RightCount/(arr2[0][6].RightCount+arr2[0][6].WrongCount)*100, arr2[0][6].WrongCount/(arr2[0][6].RightCount+arr2[0][6].WrongCount)*100],
						[arr2[0][7].QNum, arr2[0][7].RightCount/(arr2[0][7].RightCount+arr2[0][7].WrongCount)*100, arr2[0][7].WrongCount/(arr2[0][7].RightCount+arr2[0][7].WrongCount)*100],
						[arr2[0][8].QNum, arr2[0][8].RightCount/(arr2[0][8].RightCount+arr2[0][8].WrongCount)*100, arr2[0][8].WrongCount/(arr2[0][8].RightCount+arr2[0][8].WrongCount)*100],
						[arr2[0][9].QNum, arr2[0][9].RightCount/(arr2[0][9].RightCount+arr2[0][9].WrongCount)*100, arr2[0][9].WrongCount/(arr2[0][9].RightCount+arr2[0][9].WrongCount)*100]
					]);

					var chart = new google.charts.Bar(document.getElementById('columnchart_lesson_all'));
					chart.draw(data, google.charts.Bar.convertOptions(options));
				}
			} else { 
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Question', 'Correct', 'Incorrect']
					]);

					var chart = new google.charts.Bar(document.getElementById('columnchart_lesson_all'));
					chart.draw(data, google.charts.Bar.convertOptions(options));
				}
			};
			
			if(document.getElementById('students-in-lesson').length == 1){	
				for (i = 0; i < arr2[6].length; i++) {
					mySelect = document.getElementById('students-in-lesson');
					var option = document.createElement('option');
					option.text = arr2[6][i].Name;
					option.value = arr2[6][i].Id;
					mySelect.appendChild(option);
				};
			};
			
			if(document.getElementById('students-in-lesson').value != ''){
				displayStudentInLessonStats();
			};
		};					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Statistics/LessonStats/" + classId + "/" + lessonNum, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function displayStudentInLessonStats(){
	lessonNum = document.getElementById("lessons-list").value;
	classId = document.URL.substring(document.URL.indexOf("?") + 10);
	studentId = document.getElementById("students-in-lesson").value;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			
			var arr3 = Object.keys(response);
			var arr4 = arr3.map(function (k) {
				return response[k];
			});
			
			if(arr4.length != 0) {	
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);
				
				options = {
					chart: {
						title: 'Student answers results distribution by lesson(in percents)'
					},
					vAxis: {
						title: 'Number of answers',
					}
				};

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Question', 'Correct', 'Incorrect'],
						[arr4[0].QNum, arr4[0].RightCount/(arr4[0].RightCount+arr4[0].WrongCount)*100, arr4[0].WrongCount/(arr4[0].RightCount+arr4[0].WrongCount)*100],
						[arr4[1].QNum, arr4[1].RightCount/(arr4[1].RightCount+arr4[1].WrongCount)*100, arr4[1].WrongCount/(arr4[1].RightCount+arr4[1].WrongCount)*100],
						[arr4[2].QNum, arr4[2].RightCount/(arr4[2].RightCount+arr4[2].WrongCount)*100, arr4[2].WrongCount/(arr4[2].RightCount+arr4[2].WrongCount)*100],
						[arr4[3].QNum, arr4[3].RightCount/(arr4[3].RightCount+arr4[3].WrongCount)*100, arr4[3].WrongCount/(arr4[3].RightCount+arr4[3].WrongCount)*100],
						[arr4[4].QNum, arr4[4].RightCount/(arr4[4].RightCount+arr4[4].WrongCount)*100, arr4[4].WrongCount/(arr4[4].RightCount+arr4[4].WrongCount)*100],
						[arr4[5].QNum, arr4[5].RightCount/(arr4[5].RightCount+arr4[5].WrongCount)*100, arr4[5].WrongCount/(arr4[5].RightCount+arr4[5].WrongCount)*100],
						[arr4[6].QNum, arr4[6].RightCount/(arr4[6].RightCount+arr4[6].WrongCount)*100, arr4[6].WrongCount/(arr4[6].RightCount+arr4[6].WrongCount)*100],
						[arr4[7].QNum, arr4[7].RightCount/(arr4[7].RightCount+arr4[7].WrongCount)*100, arr4[7].WrongCount/(arr4[7].RightCount+arr4[7].WrongCount)*100],
						[arr4[8].QNum, arr4[8].RightCount/(arr4[8].RightCount+arr4[8].WrongCount)*100, arr4[8].WrongCount/(arr4[8].RightCount+arr4[8].WrongCount)*100],
						[arr4[9].QNum, arr4[9].RightCount/(arr4[9].RightCount+arr4[9].WrongCount)*100, arr4[9].WrongCount/(arr4[9].RightCount+arr4[9].WrongCount)*100]
					]);

					var chart = new google.charts.Bar(document.getElementById('columnchart_lesson_student'));
					chart.draw(data, google.charts.Bar.convertOptions(options));
				}
			} else { 
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Question', 'Correct', 'Incorrect']
					]);

					var chart = new google.charts.Bar(document.getElementById('columnchart_lesson_student'));
					chart.draw(data, google.charts.Bar.convertOptions(options));
				}
			};
		};					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Statistics/LessonInStudentStats/" + classId + "/" + studentId + "/" + lessonNum, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function displayClassStatistics(){
	classId = document.URL.substring(document.URL.indexOf("?") + 10);
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});

			document.getElementById("avg-result").innerHTML += arr2[2];
			
			//Results distribution graph
			google.charts.load('current', {'packages':['bar']});
			google.charts.setOnLoadCallback(drawChart);
			
			options = {
				chart: {
					title: 'Results distribution by lesson'
				},
				vAxis: {
					title: 'Result',
				}
			};

			function drawChart() {
				var data = google.visualization.arrayToDataTable([
					['Lesson', 'Average', 'Average best'],
					[arr2[0][0].LNum, arr2[0][0].AvgRes, arr2[0][0].AvgBestRes],
					[arr2[0][1].LNum, arr2[0][1].AvgRes, arr2[0][1].AvgBestRes],
					[arr2[0][2].LNum, arr2[0][2].AvgRes, arr2[0][2].AvgBestRes],
					[arr2[0][3].LNum, arr2[0][3].AvgRes, arr2[0][3].AvgBestRes],
					[arr2[0][4].LNum, arr2[0][4].AvgRes, arr2[0][4].AvgBestRes],
					[arr2[0][5].LNum, arr2[0][5].AvgRes, arr2[0][5].AvgBestRes],
					[arr2[0][6].LNum, arr2[0][6].AvgRes, arr2[0][6].AvgBestRes],
					[arr2[0][7].LNum, arr2[0][7].AvgRes, arr2[0][7].AvgBestRes],
					[arr2[0][8].LNum, arr2[0][8].AvgRes, arr2[0][8].AvgBestRes],
					[arr2[0][9].LNum, arr2[0][9].AvgRes, arr2[0][9].AvgBestRes]
				]);

				var chart = new google.charts.Bar(document.getElementById('columnchart_class_results'));
				chart.draw(data, google.charts.Bar.convertOptions(options));
			}
			
			//Lessons attempts distribution graph
			google.charts.load('current', {'packages':['bar']});
			google.charts.setOnLoadCallback(drawChart2);
			
			options = {
				chart: {
					title: 'Attempts and complition distribution by lesson'
				},
				vAxis: {
					title: 'Number of students',
				}
			};

			function drawChart2() {
				var data = google.visualization.arrayToDataTable([
					['Lesson', 'Attempted', 'Finished'],
					[arr2[1][0].LNum, arr2[1][0].StTried, arr2[1][0].StFinished],
					[arr2[1][1].LNum, arr2[1][1].StTried, arr2[1][1].StFinished],
					[arr2[1][2].LNum, arr2[1][2].StTried, arr2[1][2].StFinished],
					[arr2[1][3].LNum, arr2[1][3].StTried, arr2[1][3].StFinished],
					[arr2[1][4].LNum, arr2[1][4].StTried, arr2[1][4].StFinished],
					[arr2[1][5].LNum, arr2[1][5].StTried, arr2[1][5].StFinished],
					[arr2[1][6].LNum, arr2[1][6].StTried, arr2[1][6].StFinished],
					[arr2[1][7].LNum, arr2[1][7].StTried, arr2[1][7].StFinished],
					[arr2[1][8].LNum, arr2[1][8].StTried, arr2[1][8].StFinished],
					[arr2[1][9].LNum, arr2[1][9].StTried, arr2[1][9].StFinished]
				]);

				var chart = new google.charts.Bar(document.getElementById('columnchart_class_attempts'));
				chart.draw(data, google.charts.Bar.convertOptions(options));
				
				document.getElementById('Overall-finish').style.display = "none";
			}
		};					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Statistics/ClassStats/" + classId, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function buildStudentsList(){
	classId = document.URL.substring(document.URL.indexOf("?") + 10);
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});

			for (i = 0; i < arr2.length; i++) {
				mySelect = document.getElementById('students-list');
				var option = document.createElement('option');
				option.text = arr2[i].Name;
				option.value = arr2[i].Id;
				mySelect.appendChild(option);
			};
		};					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Statistics/GetStudentsList/" + classId, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function displayStudentStatistics(){
	classId = document.URL.substring(document.URL.indexOf("?") + 10);
	studentId = document.getElementById("students-list").value;
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);

			var arr3 = Object.keys(response);
			var arr4 = arr3.map(function (k) {
				return response[k];
			});
			console.log(arr4);
			if(arr4[0].length != 0) {	
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);

				options = {
					chart: {
						title: 'Results distribution by lesson'
					},
					vAxis: {
						title: 'Result',
					}
				};

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
					['Lesson', 'Average', 'Best'],
					[arr4[0][0].LNum, arr4[0][0].AvgRes, arr4[0][0].BestRes],
					[arr4[0][1].LNum, arr4[0][1].AvgRes, arr4[0][1].BestRes],
					[arr4[0][2].LNum, arr4[0][2].AvgRes, arr4[0][2].BestRes],
					[arr4[0][3].LNum, arr4[0][3].AvgRes, arr4[0][3].BestRes],
					[arr4[0][4].LNum, arr4[0][4].AvgRes, arr4[0][4].BestRes],
					[arr4[0][5].LNum, arr4[0][5].AvgRes, arr4[0][5].BestRes],
					[arr4[0][6].LNum, arr4[0][6].AvgRes, arr4[0][6].BestRes],
					[arr4[0][7].LNum, arr4[0][7].AvgRes, arr4[0][7].BestRes],
					[arr4[0][8].LNum, arr4[0][8].AvgRes, arr4[0][8].BestRes],
					[arr4[0][9].LNum, arr4[0][9].AvgRes, arr4[0][9].BestRes]
					]);

					var chart = new google.charts.Bar(document.getElementById('students-output-result'));
					chart.draw(data, google.charts.Bar.convertOptions(options));
				}
			} else { 
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Lesson', 'Average', 'Best']
					]);

					var chart = new google.charts.Bar(document.getElementById('students-output-result'));
					chart.draw(data, google.charts.Bar.convertOptions(options));
				}
			};
		};					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Statistics/StudentStats/" + classId + "/" + studentId, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}
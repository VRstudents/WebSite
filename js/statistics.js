var optionsQ = {
	hAxis: {
		ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
	}
};

var optionsL= {
	hAxis: {
		ticks: [1, 2, 3, 4] 
	}
};

function displayLessonStatistics(){
	lessonNum = document.getElementById("lessons-list").value;
	classId = document.URL.substring(document.URL.indexOf("?") + 10);
	
	document.getElementById('lesson-tab-div').style.display = 'inline';
	
	if (sessionStorage.getItem('classCategory') == 'Science') {
		document.getElementById('students-in-lesson_label').style.display = 'none';
		document.getElementById('students-in-lesson').style.display = 'none';
	} else {
		document.getElementById('students-in-lesson_label').style.display = 'inline';
		document.getElementById('students-in-lesson').style.display = 'inline';
	};
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});
			console.log(arr2);
			document.getElementById("students-tried").innerHTML = 'Students attempted the lesson: ' + arr2[1];
			document.getElementById("students-finished").innerHTML = 'Students finished the lesson: ' + arr2[2] + " (" + arr2[3] + "%)";
			document.getElementById("avg-res").innerHTML = 'Average lesson result: ' + arr2[4].toFixed(2);
			document.getElementById("avg-best-res").innerHTML = 'Average best lesson result: ' + arr2[5].toFixed(2);
			
			if (sessionStorage.getItem('classCategory') == 'Science') {
				document.getElementById("columnchart_lesson_all").innerHTML = "<br><br>Questions results distribution is not available for science classes";
				document.getElementById("columnchart_lesson_all").style.fontSize = "30px";
				return;
			};
			
			optionsQ = {
				chart: {
					title: 'Answers results distribution by question(in percents)'
				},
				vAxis: {
					title: 'Number of answers',
					viewWindow: {
						min: 0,
						max: 100
					},
					ticks: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] 
				}
			};
			
			if(arr2[0].length != 0) {	
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);
			
				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Question', 'Correct', 'Incorrect'],
						[1, arr2[0][0].RightCount/(arr2[0][0].RightCount+arr2[0][0].WrongCount)*100, arr2[0][0].WrongCount/(arr2[0][0].RightCount+arr2[0][0].WrongCount)*100],
						[2, arr2[0][1].RightCount/(arr2[0][1].RightCount+arr2[0][1].WrongCount)*100, arr2[0][1].WrongCount/(arr2[0][1].RightCount+arr2[0][1].WrongCount)*100],
						[3, arr2[0][2].RightCount/(arr2[0][2].RightCount+arr2[0][2].WrongCount)*100, arr2[0][2].WrongCount/(arr2[0][2].RightCount+arr2[0][2].WrongCount)*100],
						[4, arr2[0][3].RightCount/(arr2[0][3].RightCount+arr2[0][3].WrongCount)*100, arr2[0][3].WrongCount/(arr2[0][3].RightCount+arr2[0][3].WrongCount)*100],
						[5, arr2[0][4].RightCount/(arr2[0][4].RightCount+arr2[0][4].WrongCount)*100, arr2[0][4].WrongCount/(arr2[0][4].RightCount+arr2[0][4].WrongCount)*100],
						[6, arr2[0][5].RightCount/(arr2[0][5].RightCount+arr2[0][5].WrongCount)*100, arr2[0][5].WrongCount/(arr2[0][5].RightCount+arr2[0][5].WrongCount)*100],
						[7, arr2[0][6].RightCount/(arr2[0][6].RightCount+arr2[0][6].WrongCount)*100, arr2[0][6].WrongCount/(arr2[0][6].RightCount+arr2[0][6].WrongCount)*100],
						[8, arr2[0][7].RightCount/(arr2[0][7].RightCount+arr2[0][7].WrongCount)*100, arr2[0][7].WrongCount/(arr2[0][7].RightCount+arr2[0][7].WrongCount)*100],
						[9, arr2[0][8].RightCount/(arr2[0][8].RightCount+arr2[0][8].WrongCount)*100, arr2[0][8].WrongCount/(arr2[0][8].RightCount+arr2[0][8].WrongCount)*100],
						[10, arr2[0][9].RightCount/(arr2[0][9].RightCount+arr2[0][9].WrongCount)*100, arr2[0][9].WrongCount/(arr2[0][9].RightCount+arr2[0][9].WrongCount)*100]
					]);

					var chart = new google.charts.Bar(document.getElementById('columnchart_lesson_all'));
					chart.draw(data, google.charts.Bar.convertOptions(optionsQ));
				}
			} else { 
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Question', 'Correct', 'Incorrect'],
						[1, 0, 0],
						[2, 0, 0],
						[3, 0, 0],
						[4, 0, 0],
						[5, 0, 0],
						[6, 0, 0],
						[7, 0, 0],
						[8, 0, 0],
						[9, 0, 0],
						[10, 0, 0]
					]);

					var chart = new google.charts.Bar(document.getElementById('columnchart_lesson_all'));
					chart.draw(data, google.charts.Bar.convertOptions(optionsQ));
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
				displayStudentInLessonStats(1);
			};
		};					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Statistics/LessonStats/" + classId + "/" + lessonNum, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function displayStudentInLessonStats(src){ 	//src=1 - lessons tab; src=2 - students tab
	classId = document.URL.substring(document.URL.indexOf("?") + 10);
	if(src == 1){
		lessonNum = document.getElementById("lessons-list").value;
		studentId = document.getElementById("students-in-lesson").value;
	} else {
		lessonNum = document.getElementById("lessons-list-for-student").value;
		studentId = document.getElementById("students-list").value;
	};
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			
			var arr3 = Object.keys(response);
			var arr4 = arr3.map(function (k) {
				return response[k];
			});
			
			optionsQ = {
				chart: {
					title: 'Student answers results distribution by question(in percents)'
				},
				vAxis: {
					title: 'Number of answers',
					viewWindow: {
						min: 0,
						max: 100
					},
					ticks: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] 
				}
			};
			
			if(arr4.length != 0) {	
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);
				
				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Question', 'Correct', 'Incorrect'],
						[1, arr4[0].RightCount/(arr4[0].RightCount+arr4[0].WrongCount)*100, arr4[0].WrongCount/(arr4[0].RightCount+arr4[0].WrongCount)*100],
						[2, arr4[1].RightCount/(arr4[1].RightCount+arr4[1].WrongCount)*100, arr4[1].WrongCount/(arr4[1].RightCount+arr4[1].WrongCount)*100],
						[3, arr4[2].RightCount/(arr4[2].RightCount+arr4[2].WrongCount)*100, arr4[2].WrongCount/(arr4[2].RightCount+arr4[2].WrongCount)*100],
						[4, arr4[3].RightCount/(arr4[3].RightCount+arr4[3].WrongCount)*100, arr4[3].WrongCount/(arr4[3].RightCount+arr4[3].WrongCount)*100],
						[5, arr4[4].RightCount/(arr4[4].RightCount+arr4[4].WrongCount)*100, arr4[4].WrongCount/(arr4[4].RightCount+arr4[4].WrongCount)*100],
						[6, arr4[5].RightCount/(arr4[5].RightCount+arr4[5].WrongCount)*100, arr4[5].WrongCount/(arr4[5].RightCount+arr4[5].WrongCount)*100],
						[7, arr4[6].RightCount/(arr4[6].RightCount+arr4[6].WrongCount)*100, arr4[6].WrongCount/(arr4[6].RightCount+arr4[6].WrongCount)*100],
						[8, arr4[7].RightCount/(arr4[7].RightCount+arr4[7].WrongCount)*100, arr4[7].WrongCount/(arr4[7].RightCount+arr4[7].WrongCount)*100],
						[9, arr4[8].RightCount/(arr4[8].RightCount+arr4[8].WrongCount)*100, arr4[8].WrongCount/(arr4[8].RightCount+arr4[8].WrongCount)*100],
						[10, arr4[9].RightCount/(arr4[9].RightCount+arr4[9].WrongCount)*100, arr4[9].WrongCount/(arr4[9].RightCount+arr4[9].WrongCount)*100]
					]);

					if(src == 1) {
						var chart = new google.charts.Bar(document.getElementById('columnchart_lesson_student'));
					} else {
						var chart = new google.charts.Bar(document.getElementById('columnchart_student_question'));
					};
					chart.draw(data, google.charts.Bar.convertOptions(optionsQ));
				}
			} else { 
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Question', 'Correct', 'Incorrect'],
						[1, 0, 0],
						[2, 0, 0],
						[3, 0, 0],
						[4, 0, 0],
						[5, 0, 0],
						[6, 0, 0],
						[7, 0, 0],
						[8, 0, 0],
						[9, 0, 0],
						[10, 0, 0]
					]);

					if(src == 1) {
						var chart = new google.charts.Bar(document.getElementById('columnchart_lesson_student'));
					} else {
						var chart = new google.charts.Bar(document.getElementById('columnchart_student_question'));
					};
					chart.draw(data, google.charts.Bar.convertOptions(optionsQ));
				}
			};
		};					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Statistics/LessonInStudentStats/" + classId + "/" + studentId + "/" + lessonNum, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function displayClassStatisticsResults(){
	classId = document.URL.substring(document.URL.indexOf("?") + 10);
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});

			document.getElementById("avg-result").innerHTML = "<b>Average course result: " + arr2[2].toFixed(2) + "</b>";
			
			optionsL = {
				chart: {
					title: 'Results distribution by lesson'
				},
				vAxis: {
					title: 'Result',
					viewWindow: {
						min: 0,
						max: 10
					},
					ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
				}
			};

			if(arr2[0].length != 0) {
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);
				
				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Lesson', 'Average', 'Average best'],
						[arr2[0][0].LNum, arr2[0][0].AvgRes, arr2[0][0].AvgBestRes],
						[arr2[0][1].LNum, arr2[0][1].AvgRes, arr2[0][1].AvgBestRes],
						[arr2[0][2].LNum, arr2[0][2].AvgRes, arr2[0][2].AvgBestRes],
						[arr2[0][3].LNum, arr2[0][3].AvgRes, arr2[0][3].AvgBestRes]
					]);
					
					var view = new google.visualization.DataView(data);
					view.setColumns([{
						calc: function (dt, row) {
							return dt.getValue(row, 0).toFixed(0);
						},
						label: data.getColumnLabel(0),
						type: 'string'
					}, 1, 2]);

					var chart = new google.charts.Bar(document.getElementById('columnchart_class_results'));
					chart.draw(view, google.charts.Bar.convertOptions(optionsL));
				}
			} else { 
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);	
			
				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Lesson', 'Average', 'Average best'],
						[1, 0, 0],
						[2, 0, 0],
						[3, 0, 0],
						[4, 0, 0]
					]);
					
					var view = new google.visualization.DataView(data);
					view.setColumns([{
						calc: function (dt, row) {
							return dt.getValue(row, 0).toFixed(0);
						},
						label: data.getColumnLabel(0),
						type: 'string'
					}, 1, 2]);
					
					var chart = new google.charts.Bar(document.getElementById('columnchart_class_results'));
					chart.draw(view, google.charts.Bar.convertOptions(optionsL));
				}
			};
		};					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Statistics/ClassStats/" + classId, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function displayClassStatisticsAttempts(){
	classId = document.URL.substring(document.URL.indexOf("?") + 10);
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});

			document.getElementById("avg-result").innerHTML = "<b>Average course result: " + arr2[2].toFixed(2) + "</b>";
			
			optionsL = {
				chart: {
					title: 'Attempts and complition distribution by lesson'
				},
				vAxis: {
					title: 'Number of students',
					viewWindow: {
						min: 0,
						max: 10
					}
				}
			};

			if(arr2[1].length != 0) {
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart2);					
					
				function drawChart2() {

					var data = google.visualization.arrayToDataTable([
						['Lesson', 'Attempted', 'Finished'],
						[arr2[1][0].LNum, arr2[1][0].StTried, arr2[1][0].StFinished],
						[arr2[1][1].LNum, arr2[1][1].StTried, arr2[1][1].StFinished],
						[arr2[1][2].LNum, arr2[1][2].StTried, arr2[1][2].StFinished],
						[arr2[1][3].LNum, arr2[1][3].StTried, arr2[1][3].StFinished]
					]);
					
					var view = new google.visualization.DataView(data);
					view.setColumns([{
						calc: function (dt, row) {
							return dt.getValue(row, 0).toFixed(0);
						},
						label: data.getColumnLabel(0),
						type: 'string'
					}, 1, 2]);

					var chart = new google.charts.Bar(document.getElementById('columnchart_class_attempts'));
					chart.draw(view, google.charts.Bar.convertOptions(optionsL));
				}
			} else { 
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart2);
			
				function drawChart2() {
					var data = google.visualization.arrayToDataTable([
						['Lesson', 'Attempted', 'Finished'],
						[1, 0, 0],
						[2, 0, 0],
						[3, 0, 0],
						[4, 0, 0]
					]);
					
					var view = new google.visualization.DataView(data);
					view.setColumns([{
						calc: function (dt, row) {
							return dt.getValue(row, 0).toFixed(0);
						},
						label: data.getColumnLabel(0),
						type: 'string'
					}, 1, 2]);
					
					var chart = new google.charts.Bar(document.getElementById('columnchart_class_attempts'));
					chart.draw(view, google.charts.Bar.convertOptions(optionsL));
				}
			};
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
			
			document.getElementById("avg-result-student").innerHTML = "<b>Average course result: " + arr4[1].toFixed(2) + "</b>";
			
			optionsL = {
				chart: {
					title: 'Results distribution by lesson'
				},
				vAxis: {
					title: 'Result',
					viewWindow: {
						min: 0,
						max: 10
					},
					ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10] 
				}
			};
		
			if(arr4[0].length != 0) {	
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Lesson', 'Average', 'Best'],
						[arr4[0][0].LNum, arr4[0][0].AvgRes, arr4[0][0].BestRes],
						[arr4[0][1].LNum, arr4[0][1].AvgRes, arr4[0][1].BestRes],
						[arr4[0][2].LNum, arr4[0][2].AvgRes, arr4[0][2].BestRes],
						[arr4[0][3].LNum, arr4[0][3].AvgRes, arr4[0][3].BestRes]
					]);
					
					var view = new google.visualization.DataView(data);
					view.setColumns([{
						calc: function (dt, row) {
							return dt.getValue(row, 0).toFixed(0);
						},
						label: data.getColumnLabel(0),
						type: 'string'
					}, 1, 2]);

					var chart = new google.charts.Bar(document.getElementById('students-output-result'));
					chart.draw(view, google.charts.Bar.convertOptions(optionsL));
				}
			} else { 
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Lesson', 'Average', 'Best'],
						[1, 0, 0],
						[2, 0, 0],
						[3, 0, 0],
						[4, 0, 0]
					]);
					
					var view = new google.visualization.DataView(data);
					view.setColumns([{
						calc: function (dt, row) {
							return dt.getValue(row, 0).toFixed(0);
						},
						label: data.getColumnLabel(0),
						type: 'string'
					}, 1, 2]);

					var chart = new google.charts.Bar(document.getElementById('students-output-result'));
					chart.draw(view, google.charts.Bar.convertOptions(optionsL));
				}
			};
			
			if (sessionStorage.getItem('classCategory') == 'Science') {
				document.getElementById('lesson-in-student_label').style.display = 'none';
				document.getElementById('lessons-list-for-student').style.display = 'none';
				document.getElementById("columnchart_student_question").innerHTML = "<br><br>Questions results distribution is not available for science classes";
				document.getElementById("columnchart_student_question").style.fontSize = "30px";
				return;
			} else {
				document.getElementById('lesson-in-student_label').style.display = 'inline';
				document.getElementById('lessons-list-for-student').style.display = 'inline';
			};
			
			if(document.getElementById('lessons-list-for-student').value != ''){
				displayStudentInLessonStats(2);
			};
		};					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Statistics/StudentStats/" + classId + "/" + studentId, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function loadPersonalGraph() {
	classId = document.getElementById("course-list").value;
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			
			var arr1 = Object.keys(response);
			var arr4 = arr1.map(function (k) {
				return response[k];
			});

			optionsL = {
				chart: {
					title: 'Results distribution by lesson'
				},
				vAxis: {
					title: 'Result',
					viewWindow: {
						min: 0,
						max: 10
					},
					ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
				}
			};

			if(arr4.length != 0) {	
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Lesson', 'Average', 'Best'],
						[arr4[0].LNum, arr4[0].AvgRes, arr4[0].BestRes],
						[arr4[1].LNum, arr4[1].AvgRes, arr4[1].BestRes],
						[arr4[2].LNum, arr4[2].AvgRes, arr4[2].BestRes],
						[arr4[3].LNum, arr4[3].AvgRes, arr4[3].BestRes]
					]);
					
					var view = new google.visualization.DataView(data);
					view.setColumns([{
						calc: function (dt, row) {
							return dt.getValue(row, 0).toFixed(0);
						},
						label: data.getColumnLabel(0),
						type: 'string'
					}, 1, 2]);

					var chart = new google.charts.Bar(document.getElementById('res_chart'));
					chart.draw(view, google.charts.Bar.convertOptions(optionsL));
				}
			} else { 
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Lesson', 'Average', 'Best'],
						[1, 0, 0],
						[2, 0, 0],
						[3, 0, 0],
						[4, 0, 0]
					]);

					var view = new google.visualization.DataView(data);
					view.setColumns([{
						calc: function (dt, row) {
							return dt.getValue(row, 0).toFixed(0);
						},
						label: data.getColumnLabel(0),
						type: 'string'
					}, 1, 2]);
					
					var chart = new google.charts.Bar(document.getElementById('res_chart'));
					chart.draw(view, google.charts.Bar.convertOptions(optionsL));
				}
			};
		};					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Statistics/LoadPersonalGraph/" + classId + "/" + sessionStorage.getItem('userName') + "/", true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}
const MIN_NUM_OF_QUESTIONS = 8;

function getStudents() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});
						
			for (i = 0; i < arr1.length; i++) {
				document.getElementById("pupils").innerHTML += arr2[i].Name + " " + arr2[i].Grade + " " + arr2[i].SchoolId + "<br>";
			};
		};
	};
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/GetStudents", true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));	
	xhttp.send();
}

function getSchools(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});
			
			for (i = 0; i < arr1.length; i++) {
				mySelect = document.getElementById('schools-list');
				var option = document.createElement('option');
				option.text = arr2[i].Name;
				option.value = arr2[i].Id;
				mySelect.appendChild(option);
			};			
		};					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Login/GetSchools", true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function getCourses() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});
			
			for (i = 0; i < arr1.length; i++) {
				document.getElementById("courses").innerHTML += arr2[i].Category + " " + arr2[i].Grade + "<br>";
			};

		};
	};
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Study/GetClassGroups", true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));	
	xhttp.send();
}

function getStudentsNamesByClassGroup(id) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.forms[0].reset();
			var response = JSON.parse(this.responseText);
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});
			
			document.getElementById("studentsByCourses").innerHTML = "<u>" + arr2[0] + " (" + "grade " + arr2[1] + ")</u><br>";
			for (i = 0; i < arr2[2].length; i++) {
				document.getElementById("studentsByCourses").innerHTML += arr2[2][i] + "<br>";
			};
		};
	};
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/GetStudentsNamesByClassGroup/" + id, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function joinClass() {
	var modal = document.getElementById('myModal');
	if (document.querySelector('input[name="class-opt"]:checked') != null) {
		var data = {
			"classId":document.querySelector('input[name="class-opt"]:checked').id,
			"userName":sessionStorage.getItem('userName')
		};
		var dataJ = JSON.stringify(data);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById('Courses-table').innerHTML += "<tr><td>" + document.querySelector('input[name="class-opt"]:checked').value +
																	  "</td><td>" + sessionStorage.getItem('grade') + "</td><td>0</td></tr>";
				
				modal.style.display = "none"; //close the modal
				document.querySelector('input[name="class-opt"]:checked').parentElement.style.display = "none"; //remove the added class from the list
				$('input[name=class-opt]').attr('checked',false); //deselect the radio button so the alert will work right on the next join button click
			} else if (this.readyState == 4 && this.status != 200) {
				alert("An error accured.\nJoining class failed.");
			};
		};
		xhttp.open("POST", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/JoinClass", true);
		xhttp.setRequestHeader("Content-Type", "application/json");	
		xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
		xhttp.send(dataJ);
	};
}

function loadClassPage(src) {
	classId = document.URL.substring(document.URL.indexOf("?") + 10);
	
	if(sessionStorage.getItem('role') == 'student') {
		user = sessionStorage.getItem('userName');
	} else {
		user = 'none';
	};

	if(src == 1) {	
		document.getElementById('lesson-tab-div').style.display = 'none';
		document.getElementById('students-in-lesson_label').style.display = 'none';
		document.getElementById('students-in-lesson').style.display = 'none';
		document.getElementById('lessons-list-for-student').style.display = 'none';
		document.getElementById('lesson-in-student_label').style.display = 'none';
	};
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});
			
			document.getElementById('class-cat-grade').innerHTML = arr2[1] + " - Grade " + arr2[2];
			document.getElementById('class-teacher').innerHTML = arr2[3];
			document.getElementById('class-students').innerHTML = arr2[4] + " students";
			if(arr2[5] != null) {
				temp = arr2[5].Date.split('T');
				dateParts = temp[0].split('-');
				document.getElementById('curMessage').innerHTML += arr2[5].Text + "<br>";
				document.getElementById('curMessage').innerHTML += dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
			} else {
				document.getElementById('curMessage').style.display = "none";
			};
			
			var status;
			var opacity;		
			var check;
			var color;

			for(i = 0; i < arr2[6].length; i++){
				
				//Student view class
				if(src == 2) {
					if(arr2[6][i].IsActive){
						opacity = 1;
						
						if(arr2[6][i].IsPassed){
							status = "&#10004;";
							color = 'green';
						} else {
							status = "&nbsp;&nbsp;&nbsp;";
							color = 'red'
						};
						
						if (arr2[6][i].Result) {
							result = arr2[6][i].Result;
						} else {
							result ="&nbsp;&nbsp;";
						};
					} else {
						opacity = 0.2;
						result ="&nbsp;&nbsp;";
						status = "&nbsp;&nbsp;&nbsp;";
					};
					
					document.getElementById('classLessons').innerHTML += "<li><div class=\"tooltip1\">" + arr2[6][i].Name + "<br>"
																	   + "<span class=\"lesson-status\"><span class=\"lesson-status\">" + status + "</span> "
																	   + "<img src=\"images\\classes\\" + arr2[1] + "\\lesson" + arr2[6][i].SeqNum + ".png\""
																	   + "\" style=\"opacity:" + opacity + ";\" width=\"50\" height=\"50\"> "
																	   + "<span class=\"tooltiptext1\">" + arr2[6][i].Description + "</span>"
																	   + "<span class=\"lesson-result\" style=\"color:" + color + ";\">" + result + "</span></div></li>";
				//Teacher view class													   
				} else if (src == 1) {
					if(arr2[6][i].IsActive){opacity = 1} else {opacity = 0.2};
				
					document.getElementById('classLessons').innerHTML += "<li><div class=\"tooltip1\">" + arr2[6][i].Name + " " + "<br><span class=\"lesson-status\">" 
																	   + "<img src=\"images\\classes\\" + arr2[1] + "\\lesson" + arr2[6][i].SeqNum + ".png\""
																	   + "\" style=\"opacity:" + opacity + ";\" width=\"50\" height=\"50\">"
																	   + "<span class=\"tooltiptext1\">" + arr2[6][i].Description + "</span></div></li>";
				//Teacher manage class														
				} else {
					if(arr2[6][i].IsActive){
						opacity = 0.2;
						check = "disabled=\"disabled\" checked";
					} else {
						opacity = 1;
						check = "";
					};
					
					document.getElementById('classLessons').innerHTML += "<li><div class=\"tooltip1\">" + arr2[6][i].Name
																	   + " <input type=\"checkbox\" class=\"lesson-select\" id=\"" + arr2[6][i].Id + "\"" + check + "><br>"
																	   + "<img src=\"images\\classes\\" + arr2[1] + "\\lesson" + arr2[6][i].SeqNum + ".png\""
																	   + "\" style=\"opacity:" + opacity + ";\" width=\"50\" height=\"50\">"
																	   + "<span class=\"tooltiptext1\">" + arr2[6][i].Description + "</span></div></li>";
				}; 
				
				if((src == 1 || src == 2) && arr2[9]) {
					document.getElementById('exam-exists').innerHTML = "<b>There is an exam assigned to this class.</b>";
					if(src == 1) {
						document.getElementById('exam-exists').innerHTML += "<br>Creating new exam will override the existing one.";
					} else {
						document.getElementById('exam-exists').innerHTML += "<br>Exam is available in the game, in \"Challenge Yourself\" section.";
					};
				} else if((src == 1 || src == 2) && !arr2[9]) {
					document.getElementById('exam-exists').innerHTML = "<b>There is no exam assigned to this class</b>";
				};
				
				if (src == 1 && arr2[1] == 'Science') {
					document.getElementById('exam-exists').innerHTML = "<b>Creating exams for science classes is not available yet.</b>";
					document.getElementById('creat-exam-btn').style.display = 'none';
				};
			};
		};
	};
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/LoadClassPage/" + classId + "/" + user + "/", true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
	
	if(src == 1){
		displayClassStatisticsResults()	
	};
}

function addLessons(){		
	var checkBoxes = document.getElementsByClassName('lesson-select');	
	var isChecked = false;
	var lessonsToAdd = [];
	for (var i = 0; i < checkBoxes.length; i++) {
		if (checkBoxes[i].checked && !checkBoxes[i].disabled) {
			isChecked = true;
			lessonsToAdd.push(checkBoxes[i].id);
		};
	};

	if(isChecked == true){
		var data = {
			"Id":param,
			"lessonIDs":lessonsToAdd
		};
		var dataJ = JSON.stringify(data);

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var response = JSON.parse(this.responseText);
				if(!response) {
					alert("An error occurred.\nAdding lessons to class failed.");
				} else if(this.readyState == 4 && this.status != 200) {
					alert("An error occurred.\nAdding lessons to class failed.");
				};
				
				window.open('viewClassTeacher.html?courseId='+param, '_self');
			};
		};
		xhttp.open("POST", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/AddLessons", true);
		xhttp.setRequestHeader("Content-Type", "application/json");	
		xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
		xhttp.send(dataJ);
	};	
}

function loadCreateClassPage(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});
			
			for (i = 0; i < arr1.length; i++) {
				mySelect = document.getElementById('school');
				var option = document.createElement('option');
				option.text = arr2[i];
				option.value = arr2[i];
				mySelect.appendChild(option);
			};			
		};					
	};
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/LoadCreateClassPage/" + sessionStorage.getItem('userName') + "/", true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function toAddLessonsPage() {
	grade = document.getElementById('gradeSelector').value;
	category = document.getElementById('school').value;
	window.open('addLessons.html?category='+category+'&grade='+grade, '_self');
}

function loadAddLessonsPage() {
	param = document.URL.substring(document.URL.indexOf("?") + 1);
	params = param.split('&');
	category = params[0].substring(params[0].indexOf('=') + 1);
	grade = params[1].substring(params[1].indexOf('=') + 1);
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});
			
			document.getElementById('class-cat-grade').innerHTML = category + " - Grade " + grade;

			for(i = 0; i < arr2[6].length; i++){
				document.getElementById('classLessons').innerHTML += "<li><div class=\"tooltip1\">" + arr2[6][i].Name
																   + " <input type=\"checkbox\" class=\"lesson-select\" id=\"" + arr2[6][i].Id + "\"><br>"
																   + "<img src=\"images\\classes\\" + category + "\\lesson" + arr2[6][i].SeqNum + ".png\" width=\"50\" height=\"50\">"
																   + "<span class=\"tooltiptext1\">" + arr2[6][i].Description + "</span></div></li>";
			}; 
		};
	};
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/LoadAddLessonsPage/" + category + "/" + grade + "/", true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function createClass(){
	param = document.URL.substring(document.URL.indexOf("?") + 1);
	params = param.split('&');
	category = params[0].substring(params[0].indexOf('=') + 1);
	grade = params[1].substring(params[1].indexOf('=') + 1);
	
	var checkBoxes = document.getElementsByClassName('lesson-select');	
	var isChecked = false;
	var lessonsToAdd = [];
	for (var i = 0; i < checkBoxes.length; i++) {
		if (checkBoxes[i].checked) {
			isChecked = true;
			lessonsToAdd.push(checkBoxes[i].id);
		};
	};
	
	if(isChecked){
		var data = {
			"Category":category,
			"Grade":grade,
			"TeacherUserName":sessionStorage.getItem('userName'),
			"lessonIDs":lessonsToAdd
		};
		var dataJ = JSON.stringify(data);
				
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var response = JSON.parse(this.responseText);
				if(!response) {
					alert("An error occurred.\nAdding lessons to class failed.");
				};
				
				window.open('profileTeacher.html', '_self');
			} else if (this.readyState == 4 && this.status != 200) {
				alert("An error occurred.\nAdding lessons to class failed.");
			};
		};
		xhttp.open("POST", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/CreateClass", true);
		xhttp.setRequestHeader("Content-Type", "application/json");	
		xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
		xhttp.send(dataJ);
	} else {
		alert("Please select at least one lesson.");
	};
}

function postMessage(){
	if(document.getElementById('message').value != ""){
		var data = {
			"ClassId":document.URL.substring(document.URL.indexOf("?") + 10),
			"Text":document.getElementById('message').value
		};
		var dataJ = JSON.stringify(data);
	
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var response = JSON.parse(this.responseText);
				if(!response) {
					alert("An error occurred.\nPosting message failed.");
				};
				document.getElementById('curMessage').innerHTML = document.querySelector('textarea[id="message"]').value + "<br>";
				document.getElementById('curMessage').style.display = "inline";
				document.querySelector('textarea[id="message"]').value = '';
				document.getElementById('myModal').style.display = "none";
			} else if (this.readyState == 4 && this.status != 200) {
				alert("An error occurred.\nPosting message failed.");
			};
		};
		xhttp.open("POST", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/PostMessage", true);
		xhttp.setRequestHeader("Content-Type", "application/json");	
		xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
		xhttp.send(dataJ);
	};
}

function loadExamPage() {
	classId = document.URL.substring(document.URL.indexOf("?") + 10);	
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});
			
			if(arr2.length != 0) {
				document.getElementById('class-cat-grade').innerHTML = arr2[0].Category + " - Grade " + arr2[0].Grade;
			
				for(i = 0; i < arr2.length; i++){
					qNum = i + 1;
					
					document.getElementById('questions').innerHTML += "<li><div class=\"qHeader\">Question " + qNum
																	+ " <input type=\"checkbox\" class=\"question-select\" id=\"" + arr2[i].Id + "\"></div>"
																	+ "<div class=\"question\">" + arr2[i].Question + "</div>"
																	+ "<div class=\"answer\">A. " + arr2[i].AnswerA + "</div>"
																	+ "<div class=\"answer\">B. " + arr2[i].AnswerB + "</div>"
																	+ "<div class=\"answer\">C. " + arr2[i].AnswerC + "</div>"
																	+ "<div class=\"answer\">D. " + arr2[i].AnswerD + "</div></li>";
				};
			};
			
		};
	};
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/GetExamQuestions/" + classId, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function createExam(){
	classId = document.URL.substring(document.URL.indexOf("?") + 10);
	
	var checkBoxes = document.getElementsByClassName('question-select');	
	var questionsToAdd = [];
	for (var i = 0; i < checkBoxes.length; i++) {
		if (checkBoxes[i].checked) {
			questionsToAdd.push(checkBoxes[i].id);
		};
	};
	
	if(questionsToAdd.length >= MIN_NUM_OF_QUESTIONS){
		var data = {
			"ClassId":classId,
			"QuestionIDs":questionsToAdd
		};
		var dataJ = JSON.stringify(data);
		console.log(dataJ);		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var response = JSON.parse(this.responseText);
				if(!response) {
					alert("An error occurred.\nCreating exam failed.");
				};
				
				window.open('viewClassTeacher.html?courseId='+param, '_self');
			} else if (this.readyState == 4 && this.status != 200) {
				alert("An error occurred.\nCreating exam failed.");
			};
		};
		xhttp.open("POST", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/CreateExam", true);
		xhttp.setRequestHeader("Content-Type", "application/json");	
		xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
		xhttp.send(dataJ);
	} else {
		alert("Please select at least " + MIN_NUM_OF_QUESTIONS + " questions.");
	};
}
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
			document.getElementById('curMessage').innerHTML += arr2[5];
			
			console.log(arr2);
			
			//Lesson list builder---------------------------------------------------
			var status = "&#10004;";//--X
			var is = true;//--X
			var opacity;			
			
			for(i = 0; i < arr2[6].length; i++){
				if(arr2[6][i].IsActive){
					opacity = 1
				} else {opacity = 0.2};
				
				//---X----Student view class
				if(src == 2) {
					document.getElementById('classLessons').innerHTML += "<li><div class=\"tooltip1\">" + name + " " + i + "<br><span class=\"lesson-status\">" 
																	   + "<span class=\"lesson-status\">" + status + "</span>"
																	   + "<img  src=\"images\\classes\\" + category + "\\lesson" + 10 + ".png\""
																	   + "\" style=\"opacity:" + opacity + ";\" width=\"50\" height=\"50\">"
																	   + "<span class=\"tooltiptext1\">" + "bla blalalalalal" + "</span>"
																	   + "<span class=\"lesson-result\">" + result + "</span>";
				//Teacher view class													   
				} else if (src == 1) {
					document.getElementById('classLessons').innerHTML += "<li><div class=\"tooltip1\">" + arr2[6][i].Name + " " + "<br><span class=\"lesson-status\">" 
																	   + "<img  src=\"images\\classes\\" + arr2[1] + "\\lesson" + 10 + ".png\""
																	   + "\" style=\"opacity:" + opacity + ";\" width=\"50\" height=\"50\">"
																	   + "<span class=\"tooltiptext1\">" + arr2[6][i].Description + "</span>";
				//---X----Teacher manage class														
				} else {
					document.getElementById('classLessons').innerHTML += "<li><div class=\"tooltip1\">" + name + " " + i
																	   + " <input type=\"checkbox\" class=\"lesson-select\" id=\"" + i + "\"" + check + "><br>"
																	   + "<img  src=\"images\\classes\\" + category + "\\lesson" + 10 + ".png\""
																	   + "\" style=\"opacity:" + opacity + ";\" width=\"50\" height=\"50\">"
																	   + "<span class=\"tooltiptext1\">" + "bla blalalalalal" + "</span>";
				}; 
				
				if(is){ 					
					var check = "";
					var status = "&nbsp;&nbsp;&nbsp;";
					opacity = 0.2;
					result = "&nbsp;&nbsp;";
					is = false;
				} else {					
					var check = "disabled=\"disabled\" checked";
					var status = "&#10004;";
					opacity = 1;
					result = 9;
					is = true;
				};
			};
		};
	};
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/LoadClassPage/" + classId, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
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
		//Only if new lessons were selected call to server will be initiated here
		if(isChecked){console.log(lessonsToAdd);};
		
		window.open('viewClassTeacher.html?courseId='+param, '_self')
}
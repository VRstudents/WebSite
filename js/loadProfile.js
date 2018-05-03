function loadProfileStudent() {
	document.getElementById('header1').innerHTML = sessionStorage.getItem('displayName');
	document.getElementById('user-name').innerHTML = sessionStorage.getItem('displayName');
	document.getElementById('school-name').innerHTML = sessionStorage.getItem('school');
	document.getElementById('grade').innerHTML = "Grade: " + sessionStorage.getItem('grade');
	document.getElementById('code').innerHTML = sessionStorage.getItem('code');
	
	if(sessionStorage.getItem('profilePic') != 'null'){
		document.getElementById("profile-pic").src = sessionStorage.getItem('profilePic');
	} else {
		document.getElementById("profile-pic").src = "images/anonym.png";
	};
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);

			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});
			
			//Achievments tab
			document.getElementById("stud-stats-lc").innerHTML += arr2[2];
			document.getElementById("stud-stats-qca").innerHTML += arr2[3];
			document.getElementById("stud-stats-acr").innerHTML += arr2[4].toFixed(2);
			document.getElementById("stud-stats-bcr").innerHTML += arr2[5].toFixed(2);
			for (i = 0; i < arr2[0].length; i++) {
				mySelect = document.getElementById('course-list');
				var option = document.createElement('option');
				option.text = arr2[0][i].Category;
				option.value = arr2[0][i].CourseId;
				mySelect.appendChild(option);
			};	
			
			//Classes tab
			for (i = 0; i < arr2[1].length; i++) {
				document.getElementById("Classes-table").innerHTML += "<tr><td><a href=\"viewClassStudent.html?courseId=" + arr2[1][i].CourseId + "\">" + arr2[1][i].Category + "</a></td>" + 
																	  "<td><div class=\"tooltip1\">" + arr2[1][i].LessonNum + 
																	  "<span class=\"tooltiptext1\" style=\"top:-45px; left:-20px;\">" + arr2[1][i].Description + "</span></div></td>" +
																	  "<td>" + arr2[1][i].Attempts + "</td>" + 
																	  "<td>" + arr2[1][i].BestRes + "</td></tr>";
			};
			
			//Courses tab
			for (i = 0; i < arr2[0].length; i++) {
				document.getElementById("Courses-table").innerHTML += "<tr><td>" + arr2[0][i].Category + "</td><td>" + arr2[0][i].Grade + "</td><td>" + arr2[0][i].Result.toFixed(2) + "</td><tr>";
			};			
		};
	};
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/profile/StudentProfilePage/" + sessionStorage.getItem('userName') + "/", true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));	
	xhttp.send();
	
	//Join class modal
	var xhttp2 = new XMLHttpRequest();
	xhttp2.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);

			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});

			for (i = 0; i < arr2.length; i++) {
				document.getElementById("classes-to-join").innerHTML += "<div><input type=\"radio\" name=\"class-opt\" id=\"" + arr2[i].Id + "\" value=\"" + arr2[i].Category +
																		"\" required>" + arr2[i].Category + " - " + arr2[i].Teacher + "</div>";
			};		
		};
	};
	xhttp2.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/ClassesToJoin/" + sessionStorage.getItem('userName') + "/", true);
	xhttp2.setRequestHeader("Token", sessionStorage.getItem('tokenK'));	
	xhttp2.send();
}

function loadProfileTeacher() {
	document.getElementById('header1').innerHTML = sessionStorage.getItem('displayName');
	document.getElementById('user-name').innerHTML = sessionStorage.getItem('displayName');
	document.getElementById('school-name').innerHTML = sessionStorage.getItem('school');
	document.getElementById('code').innerHTML = sessionStorage.getItem('code');
	
	if(sessionStorage.getItem('profilePic') != 'null'){
		document.getElementById("profile-pic").src = sessionStorage.getItem('profilePic');
	} else {
		document.getElementById("profile-pic").src = "images/anonym.png";
	};
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);

			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});
			
			//Subjects list
			for (i = 0; i < arr2[0].length; i++) {
				document.getElementById("subjects-list").innerHTML += "<li>" + arr2[0][i] + "</li>";
			};

			//Classes tab
			for (i = 0; i < arr2[1].length; i++) {
				document.getElementById("classList").innerHTML += "<li><a href=\"viewClassTeacher.html?courseId=" + arr2[1][i].CourseId + "\">" + arr2[1][i].Category + " " + arr2[1][i].Grade + "</a></li>";
			};			
		};
	};
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/profile/TeacherProfilePage/" + sessionStorage.getItem('userName') + "/", true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));	
	xhttp.send();
}
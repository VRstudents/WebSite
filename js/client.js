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
			}
		}
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
				
				mySelect = document.getElementById('schoolOpt');
				var option = document.createElement('option');
				option.text = arr2[i].Name;
				option.value = arr2[i].Id;
				mySelect.appendChild(option);
			};			
		}					
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
			}

		}
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
			}
		}
	};
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/GetStudentsNamesByClassGroup/" + id, true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function updateStudentGrade(id, grade) {
	var data = {
		"id":id,
		"grade":grade
	};
	var dataJ = JSON.stringify(data);

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			
			if(response){
				document.forms[1].reset();
				document.getElementById("updateRes").innerHTML = "Student " + id + " promoted to grade " + grade;
			} else {
				document.getElementById("updateRes").innerHTML = "Update failed";
			} 
		} else {
				document.getElementById("updateRes").innerHTML = "Update failed";
		}
	};
	xhttp.open("POST", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/study/UpdateStudentGrade", true);
	xhttp.setRequestHeader("Content-Type", "application/json");	
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));	
	xhttp.send(dataJ);
}
//This script performs Google authentication against Firebase service and verifies if the user is authenticated when accessing restricted pages
function auth() {	
	// Initialize Firebase;
	firebase.initializeApp(settings);
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.setCustomParameters({
		prompt: 'select_account'
	});
	
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		sessionStorage.setItem('tokenK', token);
		// The signed-in user info.
		var user = result.user;
		var tempName = user.displayName.split(" ");
		var fullName = tempName[0].charAt(0).toUpperCase() + tempName[0].toLowerCase().substring(1, tempName[0].length) + 
		" " + tempName[1].charAt(0).toUpperCase() +tempName[1].toLowerCase().substring(1, tempName[1].length);
		sessionStorage.setItem('displayName', fullName);
		sessionStorage.setItem('userName', user.email);

		var data = {
			"token":token,
			"userName":user.email,
			"name":fullName
		};
		var dataJ = JSON.stringify(data);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var response = JSON.parse(this.responseText);
				if(response) {
					GetProfileDetails();
					if(sessionStorage.getItem('role') == "student") {
						window.open('profileStudent.html', '_self');
					} else {
						window.open('profileTeacher.html', '_self');
					};
				} else {
					window.open('signup.html', '_self');	
				};					
			};
		};
		xhttp.open("POST", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/login/AddUser", true);
		xhttp.setRequestHeader("Content-Type", "application/json");	
		xhttp.send(dataJ);
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		console.log(error);
	});
}

function checkAuth(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if(!response) {
				window.open('index.html', '_self');
			};
		};				
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Login/CheckAuth/" + sessionStorage.getItem('userName') + "/", true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}

function checkIfAlreadyRegistered(src){
	var xhttp = new XMLHttpRequest();
	var role = sessionStorage.getItem('role');
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if(response && src == 1) {
				if(!role.localeCompare("student")) {
					window.open('profileStudent.html', '_self');
				} else if (!role.localeCompare("teacher")) {
					window.open('profileTeacher.html', '_self');
				};
			} else if (!response && src != 1) {
				window.open('signup.html', '_self');
			};
		};					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Login/CheckIfAlreadyRegistered/" + sessionStorage.getItem('userName') + "/", true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}			

function selectRole(){
	var role = document.querySelector('input[name="role"]:checked').value;
	sessionStorage.setItem('role', role);
	if(!role.localeCompare("student")){
		window.open('signupStudent.html', '_self');
	} else {
		window.open('signupTeacher.html', '_self');
	};
}

function checkRole(src){
	role = sessionStorage.getItem('role');
	if (role == 'student' && src == 1) { //student trying to access teacher only page
		window.open('profileStudent.html', '_self');
	} else if (role == 'teacher' && src == 2) { //teacher trying to access student only page
		window.open('profileTeacher.html', '_self');
	};	
}

function goToProfile(){
	role = sessionStorage.getItem('role');
	if (role == 'student') {
		window.open('profileStudent.html', '_self');
	} else if (role == 'teacher') {
		window.open('profileTeacher.html', '_self');
	};	
}
	
function GetProfileDetails(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			var arr1 = Object.keys(response);
			var arr2 = arr1.map(function (k) {
				return response[k];
			});
			sessionStorage.setItem('role', arr2[2]);
			sessionStorage.setItem('school', arr2[3]);
			sessionStorage.setItem('code', arr2[5]);

			if (sessionStorage.getItem('role') == 'student'){
				sessionStorage.setItem('grade', arr2[4]);
			};
		};				
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Login/GetProfileDetails/" + sessionStorage.getItem('userName') + "/", false);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}
	
function signUp(){
	var grade = 0;
	var role = sessionStorage.getItem('role');
	if(!role.localeCompare("student")){
		grade = document.getElementById("gradeSelector").value;
	} else {
		var checkBoxes = document.getElementsByClassName('lesson-select');
		var isChecked = false;
		var categories = [];
		for (var i = 0; i < checkBoxes.length; i++) {
			if ( checkBoxes[i].checked ) {
				isChecked = true;
				categories.push(checkBoxes[i].value);
			};
		};
		if (!isChecked) {
			alert("Please, check at least one subject.");
			return;
		}; 
	};

	sessionStorage.setItem('grade', grade);
	sessionStorage.setItem('school', $("#schools-list").children("option").filter(":selected").text());
	
	var data = {
		"userName":sessionStorage.getItem('userName'),
		"role":role,
		"schoolId":document.getElementById("schools-list").value,
		"grade":grade,
		"categories":categories
	};
	var dataJ = JSON.stringify(data);
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if(response) {
				GetProfileDetails();
				
				if(sessionStorage.getItem('role') == "student") {
					window.open('profileStudent.html', '_self');
				} else {
					window.open('profileTeacher.html', '_self');
				};				
			} else {
				alert("Failed to sign up");
			};					
		} else if(this.readyState == 4 && this.status == 500) {
			alert("Failed to sign up. Server error.");
		};		
	};
	xhttp.open("POST", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Login/AddNewStudentTeacher", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));	
	xhttp.send(dataJ);
}

function loadPersonalDetails(){
	document.getElementById('user-name').innerHTML = sessionStorage.getItem('displayName');
	document.getElementById('school-name').innerHTML = sessionStorage.getItem('school');
	if(sessionStorage.getItem('role') == 'student'){
		document.getElementById('grade').innerHTML = "Grade: " + sessionStorage.getItem('grade');
	};
}

function logOut(){	
	firebase.initializeApp(settings);
	var dataJ = JSON.stringify(sessionStorage.getItem('userName'));
	var xhttp = new XMLHttpRequest();
	
	firebase.auth().signOut().then(function() {
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 204) {
				sessionStorage.clear();
				document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + settings.protocol + "://" + settings.host + ":" + settings.clientPort;				
			};					
		};
		xhttp.open("POST", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Login/SignOut", true);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));	
		xhttp.send(dataJ);
	}).catch(function(error) {
		console.log(error);
	});	
}
//This script performs Google authentication against Firebase service and verifies if the user is authenticated when accessing restricted pages
function auth() {	
	// Initialize Firebase;
	firebase.initializeApp(settings);
	var provider = new firebase.auth.GoogleAuthProvider();
	
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		sessionStorage.setItem('tokenK', token);
		// The signed-in user info.
		var user = result.user;
		sessionStorage.setItem('displayName', user.displayName);
		sessionStorage.setItem('userName', user.email);

		var data = {
			"token":token,
			"userName":user.email,
			"name":user.displayName
		};
		var dataJ = JSON.stringify(data);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var response = JSON.parse(this.responseText);
				if(response) {
					getRole();
					if(sessionStorage.getItem('role') == "student") {
						window.open('profileStudent.html', '_self');
					} else {
						window.open('profileTeacher.html', '_self');
					}
				} else {
					window.open('signup.html', '_self');	
				}					
			}
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
			}
		}					
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
				}
			} else if (!response && src != 1) {
				window.open('signup.html', '_self');
			}
		}					
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
	}
}

function checkRole(src){
	role = sessionStorage.getItem('role');
	if (role == 'student' && src == 1) { //student trying to access teacher only page
		window.open('profileStudent.html', '_self');
	} else if (role == 'teacher' && src == 2) { //teacher trying to access student only page
		window.open('profileTeacher.html', '_self');
	}	
}

function goToProfile(){
	role = sessionStorage.getItem('role');
	if (role == 'student') {
		window.open('profileStudent.html', '_self');
	} else if (role == 'teacher') {
		window.open('profileTeacher.html', '_self');
	}	
}
	
function getRole(){
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			sessionStorage.setItem('role', response);
		}					
	}; 
	xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Login/getRole/" + sessionStorage.getItem('userName') + "/", true);
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send();
}
	
function signUp(){
	var grade = 0;
	var role = sessionStorage.getItem('role');
	if(!role.localeCompare("student")){
		grade = document.getElementById("gradeSelector").value;
	};

	var data = {
		"userName":sessionStorage.getItem('userName'),
		"role":role,
		"schoolId":document.getElementById("school").value,
		"grade":grade
	};
	var dataJ = JSON.stringify(data);
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if(response) {
				if(sessionStorage.getItem('role') == "student") {
					window.open('profileStudent.html', '_self');
				} else {
					window.open('profileTeacher.html', '_self');
				}				
			} else {
				document.getElementById('regError').innerHTML = "Failed to sign up";
			}					
		} else if(this.readyState == 4 && this.status == 500) {
			document.getElementById('regError').innerHTML = "Failed to sign up. Server error.";
		}		
	};
	xhttp.open("POST", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Login/AddNewStudentTeacher", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));	
	xhttp.send(dataJ);
}

function logOut(){	
	firebase.initializeApp(settings);
	var dataJ = JSON.stringify(sessionStorage.getItem('userName'));
	var xhttp = new XMLHttpRequest();
	
	firebase.auth().signOut().then(function() {
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 204) {
				sessionStorage.setItem('tokenK', '');
				sessionStorage.setItem('displayName', '');
				sessionStorage.setItem('userName', '');
				sessionStorage.setItem('role', '');
				window.open('index.html', '_self');					
			}					
		};
		xhttp.open("POST", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Login/SignOut", true);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));	
		xhttp.send(dataJ);
	}).catch(function(error) {
		console.log(error);
	});	
}

function toggleLoginMenu(){
		if(sessionStorage.getItem('tokenK')) {
				document.getElementById('header1').innerHTML = sessionStorage.getItem('displayName');
				document.getElementById('header1').setAttribute('onclick','goToProfile()')
				document.getElementById('header2').innerHTML = 'Logout';
				document.getElementById('header2').setAttribute('onclick','logOut()')
		} else {
			document.getElementById('header1').innerHTML = 'Sign Up';
			document.getElementById('header1').setAttribute('onclick','auth()')
			document.getElementById('header2').innerHTML = 'Login';
			document.getElementById('header2').setAttribute('onclick','auth()')
		}
}

// function getUserID(){
	// var xhttp = new XMLHttpRequest();
	// xhttp.onreadystatechange = function() {
		// if (this.readyState == 4 && this.status == 200) {
			// var response = JSON.parse(this.responseText);		
			// return response;					
		// }
	// };
	// xhttp.open("GET", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Login/GetUserID/", true);
	// xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));	
	// xhttp.send();
// }
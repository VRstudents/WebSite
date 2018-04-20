function toggleLoginMenu(){
		if(sessionStorage.getItem('tokenK')) {
				document.getElementById('header1').innerHTML = sessionStorage.getItem('displayName');
				document.getElementById('header1').setAttribute('onclick','goToProfile()')
				document.getElementById('header2').innerHTML = 'Logout';
				document.getElementById('header2').setAttribute('onclick','logOut()')
				
				var pathArray = window.location.pathname.split('/');
				if(pathArray[1] == "index.html"){
					document.getElementById('startTop').innerHTML = "";
				}
		} else {
			document.getElementById('header1').innerHTML = 'Sign Up';
			document.getElementById('header1').setAttribute('onclick','auth()')
			document.getElementById('header2').innerHTML = 'Login';
			document.getElementById('header2').setAttribute('onclick','auth()')
		}
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

//Used to open default tab (Classes) on student profile page
function openFirstTab() {
	var tablinks;
    document.getElementById('Classes').style.display = "block";
	tablinks = document.getElementsByClassName("tablinks");
	tablinks[1].className += " active";
}

// function manageGradeField(){
	// var radios = document.forms["signUpForm"].elements["role"];
	// for (i = 0; i < radios.length; i++) {
		// radios[i].onclick = function() {
			// if(document.getElementById("role_student").checked) {
				// document.getElementById("grade-selector").style.display = "block";
			// } else if (document.getElementById("role_teacher").checked) {
				// document.getElementById("grade-selector").style.display = "none";
			// }
		// }
	// }
// }

function popup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function modal(){
	var modal = document.getElementById('myModal');
	var joinButton = document.getElementById('joinButton');
	var postBtn = document.getElementById('postBtn');
	var cancelButton = document.getElementById('cancelButton');

	// Get the button that opens the modal
	var btn = document.getElementById("openModal");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
		modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
		$('input[name=class-opt]').attr('checked',false); //deselect the radio button so tje alert will work right on the next join button click
	}

	// When the user clicks somewhere in the modal, close it
	window.onclick = function(event) {
		if (event.target == cancelButton) {
			modal.style.display = "none";
			$('input[name=class-opt]').attr('checked',false); //deselect the radio button so tje alert will work right on the next join button click
		} else if (event.target == joinButton) {
			if (document.querySelector('input[name="class-opt"]:checked') == null) {
				alert("Please select a class to join.");
				return;
			}; 
		} else if (event.target == postBtn) {
			modal.style.display = "none";
			//here will come the posting to server call
			document.getElementById('curMessage').innerHTML = document.querySelector('textarea[id="message"]').value;
			document.querySelector('textarea[id="message"]').value = '';
		}
	}
}
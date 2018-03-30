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
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}
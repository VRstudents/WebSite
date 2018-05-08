function toggleLoginMenu(){
		if(sessionStorage.getItem('tokenK')) {
				document.getElementById('header1').innerHTML = sessionStorage.getItem('displayName');
				document.getElementById('header1').setAttribute('onclick','goToProfile()')
				document.getElementById('header2').innerHTML = 'Logout';
				document.getElementById('header2').setAttribute('onclick','logOut()')
				
				var pathArray = window.location.pathname.split('/');
				if(pathArray[1] == "index.html"){
					document.getElementById('startTop').innerHTML = "";
				};
		} else {
			document.getElementById('header1').innerHTML = 'Sign Up';
			document.getElementById('header1').setAttribute('onclick','auth()')
			document.getElementById('header2').innerHTML = 'Login';
			document.getElementById('header2').setAttribute('onclick','auth()')
		};
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    };

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    };

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openSubTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Get all elements with class="subtabcontent" and hide them
    tabcontent = document.getElementsByClassName("subtabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    };

    // Get all elements with class="subtablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("subtablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    };

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

//Used to open default tab (Classes) on student profile page
function openFirstTab(src) {
	var tablinks;
	if(src == 1){
		document.getElementById('Classes').style.display = "block";
	} else {
		document.getElementById('Overall').style.display = "block";
	};
	tablinks = document.getElementsByClassName("tablinks");
	tablinks[1].className += " active";
}

//Used to open default sub tab in class stats tab on class page
function openFirstSubTab() {
	var tablinks;
	document.getElementById('Overall-result').style.display = "block";
	document.getElementById('Overall-finish').style.display = "block";
	tablinks = document.getElementsByClassName("subtablinks");
	tablinks[1].className += " active";
}

function popup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

//Join class, post message
function modal(){
	var modal = document.getElementById('myModal');
	var joinButton = document.getElementById('joinButton');
	var postBtn = document.getElementById('postBtn');
	var cancelButton = document.getElementById('cancelButton');

	// Get the button that opens the modal
	var btn = document.getElementById("openModal");

	// Get the <span> element that closes the modal
	if(sessionStorage.getItem('role') == 'student'){
		var span = document.getElementsByClassName("close")[1];
	} else {
		var span = document.getElementsByClassName("close")[0];
	};

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
		modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
		$('input[name=class-opt]').attr('checked',false); //deselect the radio button so the alert will work right on the next join button click
	}

	// When the user clicks somewhere in the modal, close it
	window.onclick = function(event) {
		if (event.target == cancelButton) {
			modal.style.display = "none";
			$('input[name=class-opt]').attr('checked',false); //deselect the radio button so the alert will work right on the next join button click
		} else if (event.target == joinButton) {
			if (document.querySelector('input[name="class-opt"]:checked') == null) {
				alert("Please select a class to join.");
				return;
			}; 
		} else if (event.target == postBtn) {
			if(document.getElementById('message').value == ""){
				alert("Please type in a message content.");
				return;
			};
		};
	}
}

//Change avatar
function modal2(){
	var modal = document.getElementById('myModal2');
	var cancelButton = document.getElementById('cancelButton2');

	// Get the button that opens the modal
	var btn = document.getElementById("openModal2");

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

	// When the user clicks somewhere in the modal, close it
	window.onclick = function(event) {
		if (event.target == cancelButton) {
			modal.style.display = "none";
		};
	}
}

function toggleCode(){
	if(document.getElementById('code').style.display == "inline"){
		document.getElementById('code').style.display = "none";
		document.getElementById('toggleCode').innerHTML = "Show code";
	} else {
		document.getElementById('code').style.display = "inline";
		document.getElementById('toggleCode').innerHTML = "Hide code";
	};
}
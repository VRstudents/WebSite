
// Copyright 2011 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//This section menages the change of style of selected avatr components when they are selected
$('#maleOpts input:radio').addClass('input_hidden');
$('#femaleOpts input:radio').addClass('input_hidden');
$('#maleOpts label').click(function(){
	$(this).addClass('selected').siblings().removeClass('selected');
});
$('#femaleOpts label').click(function(){
	$(this).addClass('selected').siblings().removeClass('selected');
});

function download(){
	var can = document.getElementById("canvas");
	var src = can.toDataURL("image/png");
	var temp = src.split(",");
	var base = temp[1];

	var data = {
		"picData": base,
		//"userName": sessionStorage.getItem('userName')
		"userName": 'igorl3009@gmail.com'
	};
	var dataJ = JSON.stringify(data);

    // Sending the image data to Server
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			alert("Avatar has been saved!");
		} else if (this.readyState == 4 && this.status != 200) {
			alert("An error accured.\nSaving avatar failed.");
		};
	};
	xhttp.open("POST", settings.protocol + "://" + settings.host + ":" + settings.port + "/api/Login/SaveAvatar", true);
	xhttp.setRequestHeader("Content-Type", "application/json");	
	xhttp.setRequestHeader("Token", sessionStorage.getItem('tokenK'));
	xhttp.send(dataJ);
}

$("#gender input[type=radio]").on('change',function(){
	if(document.querySelector('input[name="gender"]:checked').value == 'male'){
		$('#femaleOpts').css('display','none');
		$('#maleOpts').css('display','inline');
	} else {
		$('#maleOpts').css('display','none');
		$('#femaleOpts').css('display','inline');
	};
});

var canvas;
var context;
var images = {};
var totalResources = 6;
var numResourcesLoaded = 0;
var x = 150;
var y = 150;
var maxEyeHeight = 14;
var curEyeHeight = maxEyeHeight;
		
function prepareCanvas()
{	
	gender = document.querySelector('input[name="gender"]:checked').value;
	var arr = [];
	arr.push(document.querySelector('input[name="skinColor"]:checked').value);
	arr.push(document.querySelector('input[name="shirtColor"]:checked').value);
	arr.push(document.querySelector('input[name="hairColor"]:checked').value);
	arr.push(document.querySelector('input[name="pantsColor"]:checked').value);
	
	numResourcesLoaded = 0;
	
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', 190);
	canvas.setAttribute('height', 190);
	canvas.setAttribute('id', 'canvas');
	canvas.setAttribute('crossorigin', 'anonymous');
	document.getElementById("canvasDiv").appendChild(canvas);
	
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	};
	//context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8and lower. Otherwise we could have used:
	context = document.getElementById('canvas').getContext("2d");
	context.clearRect(0, 0, 190, 190);
	
	if(gender == 'male') {
		if(arr[0] == 1){
			loadImage("headB1", arr, gender);
			loadImage("rightArmB1", arr, gender);
			loadImage("leftArmB1", arr, gender);
		} else {
			loadImage("headB2", arr, gender);
			loadImage("rightArmB2", arr, gender);
			loadImage("leftArmB2", arr, gender);
		};
		
		if (arr[1] == 1){
			loadImage("torsoB1", arr, gender);

		} else {
			loadImage("torsoB2", arr, gender);
		};
		
		if (arr[2] == 1){
			loadImage("hairB1", arr, gender);
		} else {
			loadImage("hairB2", arr, gender);
		};
		
		if (arr[3] == 1){
			loadImage("legsB1", arr, gender);
		} else {
			loadImage("legsB2", arr, gender);
		};
	} else {
		if(arr[0] == 1){
			loadImage("headG1", arr, gender);
			loadImage("rightArmG1", arr, gender);
			loadImage("leftArmG1", arr, gender);
		} else {
			loadImage("headG2", arr, gender);
			loadImage("rightArmG2", arr, gender);
			loadImage("leftArmG2", arr, gender);
		};
		
		if (arr[1] == 1){
			loadImage("torsoG1", arr, gender);
		} else {
			loadImage("torsoG2", arr, gender);
		};
		
		if (arr[2] == 1){
			loadImage("hairG1", arr, gender);
		} else {
			loadImage("hairG2", arr, gender);
		};
		
		if (arr[3] == 1){
			loadImage("legsG1", arr, gender);
		} else {
			loadImage("legsG2", arr, gender);
		};
	};
}

function loadImage(name, arr, gender) {
	images[name] = new Image();
	images[name].onload = function() { 
		resourceLoaded(arr, gender);
	}
	images[name].src = "images/" + name + ".png";
}

function resourceLoaded(arr, gender) {
	numResourcesLoaded += 1;
	if(numResourcesLoaded === totalResources) {	
		setInterval(redraw(arr, gender), 1000 );
	};	
}

function redraw(arr, gender) {
	canvas.width = canvas.width; // clears the canvas 

	if(gender == 'male'){	
		if(arr[0] == 1){
			context.drawImage(images["leftArmB1"], x - 45, y - 42);
		} else {
			context.drawImage(images["leftArmB2"], x - 45, y - 42);
		};
		
		if (arr[1] == 1){
			context.drawImage(images["torsoB1"], x - 85, y - 50);
		} else {
			context.drawImage(images["torsoB2"], x - 85, y - 50);
		};
		
		if (arr[3] == 1){
			context.drawImage(images["legsB1"], x - 85, y);
		} else {
			context.drawImage(images["legsB2"], x - 85, y);
		};
		
		if(arr[0] == 1){
			context.drawImage(images["headB1"], x - 95, y - 125);
			context.drawImage(images["rightArmB1"], x - 100, y - 42);
		} else {
			context.drawImage(images["headB2"], x - 95, y - 125);
			context.drawImage(images["rightArmB2"], x - 100, y - 42);
		};
		
		if (arr[2] == 1){
			context.drawImage(images["hairB1"], x - 122, y - 138);
		} else {
			context.drawImage(images["hairB2"], x - 122, y - 138);
		};
		
		drawEllipse(x - 38, y - 68 , 8, curEyeHeight); // Left Eye
		drawEllipse(x - 27, y - 68 , 8, curEyeHeight); // Right Eye
	} else {
		if(arr[0] == 1){
			context.drawImage(images["leftArmG1"], x - 57, y - 39);
		} else {
			context.drawImage(images["leftArmG2"], x - 57, y - 39);
		};
		
		if (arr[3] == 1){
			context.drawImage(images["legsG1"], x - 97, y + 10);
		} else {
			context.drawImage(images["legsG2"], x - 97, y + 10);
		};
		
		if (arr[1] == 1){
			context.drawImage(images["torsoG1"], x - 105, y - 45);
		} else {
			context.drawImage(images["torsoG2"], x - 105, y - 45);
		};
		
		if(arr[0] == 1){
			context.drawImage(images["headG1"], x - 115, y - 125);
			context.drawImage(images["rightArmG1"], x - 114, y - 39);
		} else {
			context.drawImage(images["headG2"], x - 115, y - 125);
			context.drawImage(images["rightArmG2"], x - 114, y - 39);
		};
		
		if (arr[2] == 1){
			context.drawImage(images["hairG1"], x - 122, y - 138);
		} else {
			context.drawImage(images["hairG2"], x - 122, y - 138);
		};
		
		drawEllipse(x - 75, y - 77 , 8, curEyeHeight); // Left Eye
		drawEllipse(x - 62, y - 77 , 8, curEyeHeight); // Right Eye
	};
}

function drawEllipse(centerX, centerY, width, height) {
  context.beginPath();
  context.moveTo(centerX, centerY - height/2);
  
  context.bezierCurveTo(
	centerX + width/2, centerY - height/2,
	centerX + width/2, centerY + height/2,
	centerX, centerY + height/2);

  context.bezierCurveTo(
	centerX - width/2, centerY + height/2,
	centerX - width/2, centerY - height/2,
	centerX, centerY - height/2);
 
  context.fillStyle = "black";
  context.fill();
  context.closePath();	
}
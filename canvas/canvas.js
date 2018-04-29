
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

var canvas;
var context;
var images = {};
var totalResources = 6;
var numResourcesLoaded = 0;
var x = 150;
var y = 150;
var maxEyeHeight = 14;
var curEyeHeight = maxEyeHeight;
		
function prepareCanvas(canvasDiv, canvasWidth, canvasHeight, arr, gender)
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvas.setAttribute('crossorigin', 'anonymous');
	canvasDiv.appendChild(canvas);
	
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	};
	//context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8and lower. Otherwise we could have used:
	context = document.getElementById('canvas').getContext("2d");
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	
	if(gender == 'male') {
		if(arr[0] == 1){
			loadImage("head1", arr, gender);
			loadImage("rightArm1", arr, gender);
			loadImage("leftArm1", arr, gender);
		} else {
			loadImage("head2", arr, gender);
			loadImage("rightArm2", arr, gender);
			loadImage("leftArm2", arr, gender);
		};
		
		if (arr[1] == 1){
			loadImage("torso1", arr, gender);

		} else {
			loadImage("torso2", arr, gender);
		};
		
		if (arr[2] == 1){
			loadImage("hair1", arr, gender);
		} else {
			loadImage("hair2", arr, gender);
		};
		
		if (arr[3] == 1){
			loadImage("legs1", arr, gender);
		} else {
			loadImage("legs2", arr, gender);
		};
	} else {
		if(arr[0] == 1){
			loadImage("head3", arr, gender);
			loadImage("rightArm3", arr, gender);
			loadImage("leftArm3", arr, gender);
		} else {
			loadImage("head4", arr, gender);
			loadImage("rightArm4", arr, gender);
			loadImage("leftArm4", arr, gender);
		};
		
		if (arr[1] == 1){
			loadImage("torso3", arr, gender);

		} else {
			loadImage("torso4", arr, gender);
		};
		
		if (arr[2] == 1){
			loadImage("hair3", arr, gender);
		} else {
			loadImage("hair4", arr, gender);
		};
		
		if (arr[3] == 1){
			loadImage("legs3", arr, gender);
		} else {
			loadImage("legs4", arr, gender);
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
			context.drawImage(images["leftArm1"], x - 45, y - 42);
		} else {
			context.drawImage(images["leftArm2"], x - 45, y - 42);
		};
		
		if (arr[1] == 1){
			context.drawImage(images["torso1"], x - 85, y - 50);
		} else {
			context.drawImage(images["torso2"], x - 85, y - 50);
		};
		
		if (arr[3] == 1){
			context.drawImage(images["legs1"], x - 85, y);
		} else {
			context.drawImage(images["legs2"], x - 85, y);
		};
		
		if(arr[0] == 1){
			context.drawImage(images["head1"], x - 95, y - 125);
			context.drawImage(images["rightArm1"], x - 100, y - 42);
		} else {
			context.drawImage(images["head2"], x - 95, y - 125);
			context.drawImage(images["rightArm2"], x - 100, y - 42);
		};
		
		if (arr[2] == 1){
			context.drawImage(images["hair1"], x - 122, y - 138);
		} else {
			context.drawImage(images["hair2"], x - 122, y - 138);
		};
	} else {
		if(arr[0] == 1){
			context.drawImage(images["leftArm3"], x - 45, y - 42);
		} else {
			context.drawImage(images["leftArm4"], x - 45, y - 42);
		};
		
		if (arr[1] == 1){
			context.drawImage(images["torso3"], x - 85, y - 50);
		} else {
			context.drawImage(images["torso4"], x - 85, y - 50);
		};
		
		if (arr[3] == 1){
			context.drawImage(images["legs3"], x - 85, y);
		} else {
			context.drawImage(images["legs4"], x - 85, y);
		};
		
		if(arr[0] == 1){
			context.drawImage(images["head3"], x - 95, y - 125);
			context.drawImage(images["rightArm3"], x - 100, y - 42);
		} else {
			context.drawImage(images["head4"], x - 95, y - 125);
			context.drawImage(images["rightArm4"], x - 100, y - 42);
		};
		
		if (arr[2] == 1){
			context.drawImage(images["hair3"], x - 122, y - 138);
		} else {
			context.drawImage(images["hair4"], x - 122, y - 138);
		};
	};
	
  drawEllipse(x - 38, y - 68 , 8, curEyeHeight); // Left Eye
  drawEllipse(x - 27, y - 68 , 8, curEyeHeight); // Right Eye
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
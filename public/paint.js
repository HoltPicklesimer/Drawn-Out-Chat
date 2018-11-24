// Create the Canvas
canvasDiv = document.getElementById('canvas');
var canvas = document.createElement('canvas');
canvas.setAttribute('width', '1000');
canvas.setAttribute('height', '500');
canvas.style.backgroundColor = "#ffffff";
canvas.style.border = "1px solid black";
canvasDiv.appendChild(canvas);
if (typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");
// The click Arrays that store the info of the drawing
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickColor = new Array();
var clickSize = new Array();
var paint;
var curColor = "ffffff";
var curSize = 5;

// Set Paint to true if the mouse is down
$('#canvas').mousedown(function(e){
	var mouseX = e.pageX-this.offsetLeft;
	var mouseY = e.pageY-this.offsetTop;

	paint = true;
	addClick(e.pageX-this.offsetLeft,e.pageY-this.offsetTop);
	redraw();
});

// Add Clicks/Marks to the Canvas if paint is true
$("#canvas").mousemove(function(e){
	if (paint){
		addClick(e.pageX-this.offsetLeft,e.pageY-this.offsetTop,true);
		redraw();
	}
});

// If the mouse is up or is not on the Canvas, paint is set to false
$("#canvas").mouseup(function(e){
	paint = false;
});

$("#canvas").mouseleave(function(e){
	paint = false;
});

// Add mouse position to the end of the click arrays
// so redraw can easily add them back in each time
// redraw is called
function addClick(x,y,dragging){
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
	clickColor.push(curColor);
	clickSize.push(curSize);
}

// Redraw clears everything and draws everything back again,
// but also adds changes
function redraw(){
	context.clearRect(0,0,context.canvas.width,context.canvas.height);
	context.lineJoin = "round";

	for (var i = 0; i < clickX.length; i++){
		context.beginPath();
		if (clickDrag[i] && i){
			context.moveTo(clickX[i-1],clickY[i-1]);
		}else{
			context.moveTo(clickX[i]-1,clickY[i]);
		}
		context.lineTo(clickX[i],clickY[i]);
		context.closePath();
		context.strokeStyle = clickColor[i];
		context.lineWidth = clickSize[i];
		context.stroke();
	}
}

// Clear everything on the Canvas
function clearCanvas () {
	context.clearRect(0,0,context.canvas.width,context.canvas.height);
	clickX = [];
  clickY = [];
  clickDrag = [];
  clickColor = [];
  clickSize = [];
}

// Change the RGB Color
function changeRange () {
	var red = document.getElementById("red").value * 1;
	var green = document.getElementById("green").value * 1;
	var blue = document.getElementById("blue").value * 1;

	var color = "#" + hex(red) + hex(green) + hex(blue);

	document.getElementById("hex-label").style.color = color;
	document.getElementById("hex-label").innerText = color;
	document.getElementById("red-label").innerText = red;
	document.getElementById("green-label").innerText = green;
	document.getElementById("blue-label").innerText = blue;

	curColor = color;
}

// Convert from RGB to hex
function hex(v) {
	var hex = v.toString(16);
	if (v < 16) {
		hex = "0" + hex;
	}
	return hex;
}

// Change the size of the Brush with the following functions:
function changeToSmall (){
	curSize = 2;
}

function changeToMedium (){
	curSize = 5;
}

function changeToLarge (){
	curSize = 10;
}

function changeToHuge (){
	curSize = 20;
}

// Switch to Eraser is essentially switching to white
function changeToEraser() {
	document.getElementById("red").value = 255;
	document.getElementById("green").value = 255;
	document.getElementById("blue").value = 255;

	changeRange();
}
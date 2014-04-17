// Utility function to grab style properties when unset
function getStyleProp(elem, prop){
    if(window.getComputedStyle)
        return window.getComputedStyle(elem, null).getPropertyValue(prop);
    else if(elem.currentStyle) return elem.currentStyle[prop]; //IE
}

// 20ms event loop to update a global mouseX, mouseY position and handle scroll detection
var mouseX = null;
var mouseY = null;
var scrollTimeline = null;
var updateInterval = 15;
var scrolling = false;
var parentLi = document.getElementById('timeline');

// sets the mouseX and mouseY variables
window.onmousemove = function(event) {
	mouseX = event.clientX;
	mouseY = event.clientY;
/*	if (!scrollTimeline) {
		scrollTimeline = window.setInterval(scroll, updateInterval);
	}*/
};


// Global access to all the project li's
var projects = document.querySelectorAll('#timeline li.project');
projects = Array.prototype.slice.call(projects);
for (i = 0; i < projects.length; i++) {
	//projects[i].onmouseover = slide; // Slide via highlight
	//projects[i].onmouseout = timelineHover;
}

var descriptions = document.querySelectorAll('#timeline description');
descriptions = Array.prototype.slice.call(descriptions);
console.log(descriptions);

// Global access to the timeline container
var timeline = document.querySelector("#timeline");
timeline.onmouseout = unslide; // Undo slides when out of timeline

// variable for requestAnimationFrame
var scrollFrame = null;

// function that scrolls with requestAnimationFrame
function scroll() {
	scrollFrame = requestAnimationFrame(scroll);

	var buffer = window.innerWidth/4;

	var distanceToCenter = Math.abs(window.innerWidth/2-mouseX);
	var speed = distanceToCenter/(window.innerWidth/2);
	if (mouseX < buffer) {
		scrolling = true;
		scrollLeft(speed);
	}
	else if ((window.innerWidth - mouseX) < buffer) {
		scrolling = true;
		scrollRight(speed);
	}

	var hoveredTimeline = document.elementFromPoint(mouseX, mouseY);

	for (i = 0; i < projects.length; i++) {
		var test = isDecendent(parentLi, hoveredTimeline);
		console.log(hoveredTimeline);
		console.log(test);
		if (test == true){
			
		}
	}

	/*if (lowerTimeline.id == "zero"){
				projects[0].classList.add("onHover");
				projects[1].classList.remove("onHover");

	}
	else if (lowerTimeline.id == "one"){
				projects[1].classList.add("onHover");
				projects[0].classList.remove("onHover");
				projects[2].classList.remove("onHover");
	}
	else if (lowerTimeline.id == "two"){
				projects[2].classList.add("onHover");
				projects[1].classList.remove("onHover");
				projects[3].classList.remove("onHover");
	}
	else if (lowerTimeline.id == "three"){
				projects[3].classList.add("onHover");
				projects[2].classList.remove("onHover");
				projects[4].classList.remove("onHover");
	}	
	else if (lowerTimeline.id == "four"){
				projects[4].classList.add("onHover");
				projects[3].classList.remove("onHover");
				projects[5].classList.remove("onHover");
	}
	else if (lowerTimeline.id == "five"){
				projects[5].classList.add("onHover");
				projects[4].classList.remove("onHover");
				projects[6].classList.remove("onHover");
	}
	else if (lowerTimeline.id == "six"){
				projects[6].classList.add("onHover");
				projects[5].classList.remove("onHover");
	}*/

	/*var upperTimeline = document.elementFromPoint(mouseX, mouseY);
	if (upperTimeline.id == "d-zero"){
				descriptions[0].classList.add("onHover");
				descriptions[1].classList.remove("onHover");

	}
	else if (upperTimeline.id == "d-one"){
				descriptions[1].classList.add("onHover");
				descriptions[0].classList.remove("onHover");
				descriptions[2].classList.remove("onHover");
	}
	else if (upperTimeline.id == "d-two"){
				descriptions[2].classList.add("onHover");
				descriptions[1].classList.remove("onHover");
				descriptions[3].classList.remove("onHover");
	}
	else if (upperTimeline.id == "d-three"){
				descriptions[3].classList.add("onHover");
				descriptions[2].classList.remove("onHover");
				descriptions[4].classList.remove("onHover");
	}	
	else if (upperTimeline.id == "d-four"){
				descriptions[4].classList.add("onHover");
				descriptions[3].classList.remove("onHover");
				descriptions[5].classList.remove("onHover");
	}
	else if (upperTimeline.id == "d-five"){
				descriptions[5].classList.add("onHover");
				descriptions[4].classList.remove("onHover");
				descriptions[6].classList.remove("onHover");
	}
	else if (upperTimeline.id == "d-six"){
				descriptions[6].classList.add("onHover");
				descriptions[5].classList.remove("onHover");
	}*/
}

function isDecendent(parent, child){
	var node = child.parentNode; 
	while (node != null) { 
		if (node == parent){ 
			return true;
		} 
		node = node.parentNode;
	} 
	return false;
}

// function to stop the scrolling
function stopAnimation(){
		for (i = 0; i < projects.length; i++) {
			projects[i].classList.remove("onHover");
		}
	scrolling = false;
	cancelAnimationFrame(scrollFrame);
}

// calls scrolling functions on timeline mouseover
timeline.onmouseover = scroll;
timeline.onmouseout = stopAnimation;

function scrollLeft(speed) {
	scrollRight(speed*-1);
}

function scrollRight(speed) {
	var leftPixels = parseInt(getStyleProp(timeline, 'left'), 10);
	var toShift = Math.pow(speed,3)*updateInterval;
	var newLeft = leftPixels - toShift;

	if (newLeft >= -1400 && newLeft  <= 0) {
		timeline.style.left = newLeft + 'px';
	}
}

function slide(event)
{
	for (i = 0; i < projects.length; i++) {
		if (i <= projects.indexOf(this)) {
			projects[i].classList.add("slideLeft");
			projects[i].classList.remove("slideRight");
		}
		else {
			projects[i].classList.add("slideRight");
			projects[i].classList.remove("slideLeft");
		}
	}
}

function unslide(event) {
	for (i = 0; i < projects.length; i++) {
		projects[i].classList.remove("slideRight");
		projects[i].classList.remove("slideLeft");
	}
}

/*function timelineHover(event){
	for (i = 0; i < project.length; i++){
		projects[i].classList.remove("onHover");
	}
}*/


function Edge(from, to, label) {
	this.from = from;
	this.to = to;
	this.label = label;
	this.hover = false;
	this.centerOffsetX = 0;
	this.centerOffsetY = 0;

	this.draw = function() {
		drawEdge(from, to, this.centerOffsetX, this.centerOffsetY, this);
		drawLabel(from, to, label);
	};
}

function drawLabel(from, to, label) {
	let x = (from.x+to.x)/2;
	let y = (from.x+to.y)/2;
	strokeWeight(2);
	textSize(24);
	fill(255);
	textAlign('center', 'bottom');
	text(label, x, y);
}

function drawEdge(from, to, centerOffsetX, centerOffsetY, localPointer) {
	// The detection color is used to find a collision with the mouse, duck hunt style
	let x = (from.x+to.x)/2 + centerOffsetX;
	let y = (from.y+to.y)/2 + centerOffsetY;
	hitDetection(localPointer, from, to, x, y);
	strokeWeight(3);
	bezier(from.x, from.y, x, y, x, y, to.x, to.y);
}

function hitDetection(localPointer, from, to, x, y) {
	let defaultColor = color(0, 0, 0, 255);
	let detectionColor = color(1, 255, 1, 255);
	hitDetectionBuffer.stroke(detectionColor);
	noFill();
	hitDetectionBuffer.strokeWeight(30);
	hitDetectionBuffer.bezier(from.x, from.y, x, y, x, y, to.x, to.y);
	let hoverCol = hitDetectionBuffer.get(mouseX, mouseY);
	// Marked saves whether or not a curve was already found, gets set in render.js
	if (!marked && compareColorArrays(hoverCol, detectionColor.levels)) {
		marked = true;
		localPointer.hover = true;
		stroke(color(255, 0, 0));
	} else {
		localPointer.hover = false;
		stroke(defaultColor);
	}
}

function compareColorArrays(first, second) {
	for (index in first) {
		if (first[index] != second[index]) {
			return false;
		}
	}
	return true;
}

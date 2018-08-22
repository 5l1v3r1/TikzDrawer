let pmouseIsPressed = false;
let lastMouseClickOnCanvas = false;

function mouseStuff() {
	handleLinking();
	handleMoving();
	pmouseIsPressed = mouseIsPressed;
}

function mouseClicked() {
	lastMouseClickOnCanvas = mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

function handleLinking() {
	if(mouseIsPressed && mouseButton == 'right') {
		nodeFound = searchNodes(mouseX, mouseY);
		if (nodeFound[0] < 0) {
			if (!pmouseIsPressed) { //If the user clicks on empty space, unselect
				selectedNode = null;
				nodeSettingsDiv.hide();
			}
		}else if(nodeFound[0] != selectedNode) { //Second check makes sure the next frame doesn't link the node to itself.
			if(!selectedNode) {
				selectedNode = nodeFound[0];
				setNodeInfo();
			}else {
				toggleLink(selectedNode, nodeFound[0]);
				selectedNode = null;
			}
		}
	
	}

}

function handleMoving() {
	if(mouseIsPressed && mouseButton == 'left') {
		if(mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
			return;	
		}
		if(movingNode) {
			nodeArray[movingNode].x = mouseX + movingOffset[0];
			nodeArray[movingNode].y = mouseY + movingOffset[1];
			if (mouseX >= width-deletionAreaWidth) {
				deleteNode(movingNode);
				movingNode = null;
			}
		}else {
			nodeFound = searchNodes(mouseX, mouseY);
			if(nodeFound[0] === -2) {
				if(mouseX >= width-deletionAreaWidth) {return;} //Nodes in this area get deleted, no use in making new ones here.
				addNode(mouseX, mouseY, '', '', nodeSize, nodeShape);
			}else if (nodeFound[0] != -1) {
				movingNode = nodeFound[0];
				movingOffset = nodeFound.slice(1,3);
			}
		}
	}else {
		movingNode = null;
	}
}
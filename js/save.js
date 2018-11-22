function setItem(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
};

function getItem(key) {
	return JSON.parse(localStorage.getItem(key));
};

function removeItem(key) {
	localStorage.removeItem(key);
};

function saveData(notify) {
    for (var i = 0; i < allVars.length; i++) {
        setItem(key + allVars[i], window[allVars[i]]);
    };
	
	if(notify == 1) {
		$.notify(
			"Progress Saved!",
			{ position: 'top right', className: 'warn', showDuration: 400, autoHideDelay: 5000 }
		);
	}
	
    console.log("Game Saved");
};
function loadData() {
	
	//Remove all vars that are no longer needed
	if (getItem(key + "treeLevelAchieved") != null) {
		localStorage.removeItem(key + "treeLevelAchieved");
		console.log(key + "treeLevelAchieved Removed Successfully");
	}
	
    for (var i = 0; i < allVars.length; i++) {
        if (getItem(key + allVars[i]) != null && getItem(key + allVars[i]) != undefined) {
            window[allVars[i]] = getItem(key + allVars[i]);
        };
    };
	
	eventInProgress = false;
	if(eventTimeout){ clearTimeout(eventTimeout)};
	updateScreen();
	$.notify(
		"Progress Loaded!",
		{ position: 'top right', className: 'warn', showDuration: 400, autoHideDelay: 5000 }
	);
    console.log("Game Loaded");
};

function deleteData() {
    for (var i = 0; i < allVars.length; i++) {
        removeItem(key + allVars[i]);
    };
	
	$.notify(
		"Progress Deleted!",
		{ position: 'top right', className: 'error', showDuration: 400, autoHideDelay: 5000 }
	);
    console.log("Game Deleted");
};

function autosaveToggle() {
	
	if (autoSave) {
		autoSave = false;
		$("#autosave").attr("class", "btn btn-danger btn-sm");
		$("#save").attr("style", "");
		$("#autosave").text("Autosave: Off");
	}
	else {
		autoSave = true;
		$("#autosave").attr("class", "btn btn-success btn-sm");
		$("#save").attr("style", "display:none");
		$("#autosave").text("Autosave: On");
	}
	
}
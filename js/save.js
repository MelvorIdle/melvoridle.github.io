var autoSave = true;

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
	
};
function loadData() {
	
	//Remove all vars that are no longer needed from previous versions of the game
	if (getItem(key + "treeLevelAchieved") != null) {
		localStorage.removeItem(key + "treeLevelAchieved");
		console.log(key + "treeLevelAchieved Removed Successfully");
	}
	if (getItem(key + "bankUpgradePurchased") != null) {
		localStorage.removeItem(key + "bankUpgradePurchased");
		console.log(key + "bankUpgradePurchased Removed Successfully");
	}
	
    for (var i = 0; i < allVars.length; i++) {
        if (getItem(key + allVars[i]) != null && getItem(key + allVars[i]) != undefined) {
            window[allVars[i]] = getItem(key + allVars[i]);
        };
    };
	
	//UPDATES FOR OLD SAVES
	//Update bank upgrade values
	bankMax = bankUpgrades[currentBankUpgrade];
	
	//Update fish costs
	for (i=0; i<12; i++) {
		$("#b-"+fish[i]+"-cost").text(fishCost[i]);
	}
	eventInProgress = false;
	if(eventTimeout){ clearTimeout(eventTimeout)};
	interval = 2000;
	resetInterval();
	updateBankUpgrades();
	fishingUpdateScreen();
	fmSetLogs(selectedLog);
	setLocation(fishingCurrentLocation);
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

function exportSave() {
	
	var toSave = {
        gp: gp,
		xp: xp,
		nextLevelProgress: nextLevelProgress,
		currentLevel: currentLevel,
		currentLevelXP: currentLevelXP,
		nextLevelXP: nextLevelXP,
		currentAxe: currentAxe,
		currentBank: currentBank,
		bankMax: bankMax,
		axePurchased: axePurchased,
		milestoneAchieved: milestoneAchieved,
		logsInBank: logsInBank,
		currentBankUpgrade: currentBankUpgrade,
		endGameActivated: endGameActivated,
		wcStatTreesCut: wcStatTreesCut,
		wcStatLogsSold: wcStatLogsSold,
		wcStatGPEarned: wcStatGPEarned,
		wcStatBirdNestsFound: wcStatBirdNestsFound,
		wcStatRandomEvents: wcStatRandomEvents,
		fishingXP: fishingXP,
		fishingNextLevelProgress: fishingNextLevelProgress, 
		fishingCurrentLevel: fishingCurrentLevel, 
		fishingCurrentLevelXP: fishingCurrentLevelXP,
		fishInBank: fishInBank,
		currentFishingRod: currentFishingRod,
		fishingRodPurchased: fishingRodPurchased,
		fishingRodImage: fishingRodImage, 
		fishingNextLevelXP: fishingNextLevelXP,
		statFishCaught: statFishCaught,
		statFishSold: statFishSold,
		statFishGPEarned: statFishGPEarned,
		fishingMilestoneAchieved: fishingMilestoneAchieved,
		fmXP: fmXP,
		fmNextLevelProgress: fmNextLevelProgress,
		fmCurrentLevel: fmCurrentLevel,
		fmCurrentLevelXP: fmCurrentLevelXP,
		fmNextLevelXP: fmNextLevelXP,
		bonfireLevel: bonfireLevel,
		fmStatGPBurnt: fmStatGPBurnt,
		fmStatLogsBurnt: fmStatLogsBurnt,
		fmMilestoneAchieved: fmMilestoneAchieved,
		fishingCurrentLocation: fishingCurrentLocation,
		selectedLog: selectedLog
		
    };

    var saved = JSON.stringify(toSave);
    var exportSaved = btoa(saved);
    var exportField = document.getElementById("exportSaveField");
    exportField.value = exportSaved;
	
}

function importSave() {
    var importField = document.getElementById("importSaveField");
    // var importSave = prompt("You need to import the code from the export-save button.", "Put your save here!");
    var cleanSave = atob(importField.value);
    var savegame = JSON.parse(cleanSave);
    save = JSON.parse(cleanSave);

	gp = savegame.gp;
	xp = savegame.xp;
	nextLevelProgress = savegame.nextLevelProgress;
	currentLevel = savegame.currentLevel;
	currentLevelXP = savegame.currentLevelXP;
	nextLevelXP = savegame.nextLevelXP;
	currentAxe = savegame.currentAxe;
	currentBank = savegame.currentBank;
	bankMax = savegame.bankMax;
	axePurchased = savegame.axePurchased;
	milestoneAchieved = savegame.milestoneAchieved;
	logsInBank = savegame.logsInBank;
	currentBankUpgrade = savegame.currentBankUpgrade;
	endGameActivated = savegame.endGameActivated;
	wcStatTreesCut = savegame.wcStatTreesCut;
	wcStatLogsSold = savegame.wcStatLogsSold;
	wcStatGPEarned = savegame.wcStatGPEarned;
	wcStatBirdNestsFound = savegame.wcStatBirdNestsFound;
	wcStatRandomEvents = savegame.wcStatRandomEvents;
	fishingXP = savegame.fishingXP;
	fishingNextLevelProgress = savegame.fishingNextLevelProgress; 
	fishingCurrentLevel = savegame.fishingCurrentLevel; 
	fishingCurrentLevelXP = savegame.fishingCurrentLevelXP;
	fishInBank = savegame.fishInBank;
	currentFishingRod = savegame.currentFishingRod;
	fishingRodPurchased = savegame.fishingRodPurchased;
	fishingRodImage = savegame.fishingRodImage; 
	fishingNextLevelXP = savegame.fishingNextLevelXP;
	statFishCaught = savegame.statFishCaught;
	statFishSold = savegame.statFishSold;
	statFishGPEarned = savegame.statFishGPEarned;
	fishingMilestoneAchieved = savegame.fishingMilestoneAchieved;
	fmXP = savegame.fmXP;
	fmNextLevelProgress = savegame.fmNextLevelProgress;
	fmCurrentLevel = savegame.fmCurrentLevel;
	fmCurrentLevelXP = savegame.fmCurrentLevelXP;
	fmNextLevelXP = savegame.fmNextLevelXP;
	bonfireLevel = savegame.bonfireLevel;
	fmStatGPBurnt = savegame.fmStatGPBurnt;
	fmStatLogsBurnt = savegame.fmStatLogsBurnt;
	fmMilestoneAchieved = savegame.fmMilestoneAchieved;
	fishingCurrentLocation = savegame.fishingCurrentLocation;
	selectedLog = savegame.selectedLog;

    saveData(0);
	loadData();
};

window.onload = function() {
	loadData();
}
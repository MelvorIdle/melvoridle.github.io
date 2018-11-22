//Initialise vars
var key = "WcIdle-"
var exp = new exp();

var automate = null;
var eventTimeout = null;
var autoSave = true;

var treeID = ["tree","oak","willow","teak","maple","mahogany","yew","magic","redwood"];	

var gp = 0;
var xp = 0;
var nextLevelProgress = 0;
var currentLevel = 1;
var currentLevelXP = 0;
var nextLevelXP;
var interval = 2000;
var currentAxe = 1;
var currentBank = 0;
var currentBankUpgrade = 0;
var bankMax = 83;
var treeLevelAchieved = [0,0,0,0,0,0,0,0];
var axePurchased = [0,0,0,0,0,0,0,0];
var bankUpgradePurchased = [0,0,0,0,0,0,0,0,0];
var milestoneAchieved = [0,0,0,0,0,0,0,0,0,0];
var isAutomating = [0,0,0,0,0,0,0,0,0];
var isCutting = false;
var keepButtonDisabled = false;
var eventInProgress = false;
var treeXP = [10,20,30,50,80,120,200,320,500];
var axeBonusInterval = [0,0,5,10,15,20,25,30,35,40];
var axeBonusXP = [0,0,5,10,15,20,25,30,35,40];
var logsInBank = [0,0,0,0,0,0,0,0,0];
var logsCost = [1,5,10,20,40,100,250,500,1000];
var axeCost = [0,0,50,750,2500,10000,50000,200000,750000,2000000];
var bankCost = [1000,10000,25000,75000,125000,250000,500000,1000000,2000000];
var bankUpgradeValues = [100,150,200,250,300,350,400,450,500];

var eventTreeID;
var randomEventID = 0;
var randomEventChance;
var xpMultiplier = 1;
var logsMultiplier = 1;

var allVars = [
	"gp", "xp", "nextLevelProgress", "currentLevel", "currentLevelXP", "nextLevelXP",
	"currentAxe", "currentBank", "bankMax", "axePurchased", "milestoneAchieved",
	"logsInBank", "bankUpgradePurchased", "currentBankUpgrade"
];

function cutTree(tree) {
	
	//Set var to correspond with array values
	treeArray = tree - 1;

	//Check how many logs are in the bank
	currentBank = logsInBank.reduce(function(logsInBank, b) { return logsInBank + b; }, 0);
	
	updateScreen();
	
	
	//Disable the all cut buttons, so you can't click them all and powerfarm. Also add a check for auto cutting so it doesn't ruin everything like always
	if (isAutomating[treeArray] == 0) {
		
		isCutting = true;
		updateScreen();
		
	}
	else {
		$("#cut-"+treeID[treeArray]).attr("class", "btn btn-success disabled");
	}

	if(eventInProgress && eventTreeID == treeArray && randomEventID == 4) {
		interval = 500;
	}
	
	
		
	//Initiate function after set time as defined by interval
	window.setTimeout(function(treeIdToKeep) { return function() {
		
		if(eventInProgress && eventTreeID == treeIdToKeep) {
			
			if(randomEventID == 2) {
				xpMultiplier = 2;
			}
			
			if(randomEventID == 3) {
				logsMultiplier = 2;
			}
			
			
			
		}
		
		//Check if there is space in the bank, if yes check which axe is being used and apply additional xp, then check how many spaces are left in bank so double logs doesn't go over the limit.
		if (currentBank < bankMax) {
			
			if (axeBonusXP[currentAxe] == 0) {
				xp = xp + (xpMultiplier * treeXP[treeIdToKeep]);
			}
			else {
				xp = Math.floor(xp + (xpMultiplier * (treeXP[treeIdToKeep] + (axeBonusXP[currentAxe] / 100 * treeXP[treeIdToKeep]))));
			}
			
			var spaceLeftInBank = bankMax - currentBank;
			
			if (spaceLeftInBank > 1) {
				logsInBank[treeIdToKeep] = logsInBank[treeIdToKeep] + logsMultiplier;
				console.log(logsMultiplier + " Logs Received");
			}
			else {
				logsInBank[treeIdToKeep]++;
				console.log(logsMultiplier + " Logs Received");
			}
			
		}
		else {
			if(automate) {
				automation(treeIdToKeep+1);
			}
		}
		
	
		//Get XP required for next level
		nextLevelXP = exp.level_to_xp(currentLevel+1);
		
		//If current XP is greater than the required xp for next level, perform the level up function
		if (xp >= nextLevelXP) {
			levelUp(xp);
		}
		else {				
			updateLevelProgress();
		}
		
		/*if(isAutomating[treeIdToKeep] == 0) {
			for (i=0; i<=8; ++i) {
				if (isAutomating[i] == 0) {
					$("#cut-"+treeID[i]).attr("class", "btn btn-success");
				}
			}
		}*/
		
		if(isAutomating[treeIdToKeep] == 1 && !isCutting && !keepButtonDisabled) {
			$("#cut-"+treeID[treeIdToKeep]+"-auto").attr("class", "btn btn-info");
		}
	
		if (isAutomating[treeIdToKeep] == 0) {
			isCutting = false;
		}
		
		//Apply screen updates
		updateScreen();
		
		//Random event? 1 in 100 chance
		if (!eventInProgress) {
			randomEventChance = Math.floor(Math.random()*(100)) + 1;
			randomEventCheck(randomEventChance);
		}
		
		interval = 2000;
		resetInterval();
		
		
			
	}} (treeArray), interval);
		
	//Animate the progress bar for cutting trees
	if (currentBank < bankMax) {
		$("#cut-"+treeID[treeArray]+"-progress").animate({width: "100%"}, interval, "linear");
		$("#cut-"+treeID[treeArray]+"-progress").animate({width: "0%"}, 0, "linear");
	}
	else {
		$("#cut-"+treeID[treeArray]+"-progress").stop().animate({width: "0%"}, 0, "linear");
		notify("bankFull");
	}
	
	
};

function automation(treeToAuto) {
	
	treeToAutoArray = treeToAuto - 1;
	
	//If this tree is already being automated, disable the automation and update the buttons
	if (isAutomating[treeToAutoArray] == 1) {
		
		$("#cut-"+treeID[treeToAutoArray]+"-auto").attr("class", "btn btn-outline-info disabled");
		$("#cut-"+treeID[treeToAutoArray]+"-auto").text("Disabling Auto Cut");
		
		keepButtonDisabled = true;
		//updateScreen();
		
		//Clear the current automation variable
		clearTimeout(automate);
		
		//Update the buttons, re-enabling the cut button and changing the text on the auto button after set time, but make sure there isn't an event in progress
		if (!eventInProgress) {
			setTimeout(function(treeToAutoArrayKeep) { return function() {
				$("#cut-"+treeID[treeToAutoArrayKeep]).attr("class", "btn btn-success");
				$("#cut-"+treeID[treeToAutoArrayKeep]+"-auto").attr("class", "btn btn-outline-info");
				$("#cut-"+treeID[treeToAutoArrayKeep]+"-auto").text("Enable Auto Cut");
				isAutomating[treeToAutoArrayKeep] = 0;
				keepButtonDisabled = false;
				updateScreen();
			}} (treeToAutoArray), interval);
		}
		else {
			isAutomating[treeToAutoArray] = 0;
			$("#cut-"+treeID[treeToAutoArray]+"-auto").text("Enable Auto Cut");
			keepButtonDisabled = false;
		}
		
		//Reset automate variable
		automate = null;
						
	}
	else {
		

		//Clear the current automation variable so there is no double ups
		if(automate) { clearTimeout(automate); };
		
		//Check for current automations, stop respective automation for other trees and update its button
		for (i = 0; i <= 8; ++i) {
			if (isAutomating[i] == 1) {
				isAutomating[i] = 0;
				$("#cut-"+treeID[i]+"-auto").attr("class", "btn btn-outline-info");
				$("#cut-"+treeID[i]+"-auto").text("Enable Auto Cut");
			}
		}
		
		keepButtonDisabled = true;
		
		//Tell the system it is currently in automation
		isAutomating[treeToAutoArray] = 1;
		
		//Update auto button text and disable the cut button
		$("#cut-"+treeID[treeToAutoArray]).attr("class", "btn btn-success disabled");
		$("#cut-"+treeID[treeToAutoArray]+"-auto").attr("class", "btn btn-info disabled");
		$("#cut-"+treeID[treeToAutoArray]+"-auto").text("Disable Auto Cut");
		
		updateScreen();
		
		setTimeout(function() { keepButtonDisabled = false; updateScreen(); }, interval);
		
		//Disabled all other auto buttons to remove possibility of power farming through auto cutting. Then, re-enable them after set interval
		/*for (i = 0; i <= 8; ++i) {
			if (isAutomating[i] == 0 && treeLevelAchieved[i] == 1 && milestoneAchieved[i+1] == 1) {
				$("#cut-"+treeID[i]+"-auto").attr("class", "btn btn-outline-info disabled");
				$("#cut-"+treeID[i]).attr("class", "btn btn-success disabled");
				setTimeout(function(ii) { return function() {
					$("#cut-"+treeID[ii]+"-auto").attr("class", "btn btn-outline-info");
					$("#cut-"+treeID[ii]).attr("class", "btn btn-success");
					keepButtonDisabled = false;
				}} (i), interval);
			}
			if (isAutomating[i] == 1 && treeLevelAchieved[i] == 1) {
				setTimeout(function(iii) { return function() {
					$("#cut-"+treeID[iii]+"-auto").attr("class", "btn btn-info");
					keepButtonDisabled = false;
				}} (i), interval);
			}
		}*/
		
		//Set new automation to selected tree, but start it straight away
		automateCutTree(treeToAuto);
			
	}
	
	return automate;
	
}

function automateCutTree(test) {
	
	cutTree(test);
	automate = setTimeout(function() { automateCutTree(test); }, interval);
	
}

function updateLevelProgress() {
	
	//Check amount of XP required for current level
	currentLevelXP = exp.level_to_xp(currentLevel);
	
	//Figure out next level progress percentage
	nextLevelProgress = (xp - currentLevelXP) / (nextLevelXP - currentLevelXP) * 100;
	nextLevelProgress = Math.floor(nextLevelProgress);
	
}

function levelUp(xp) {
	
	//Add one to current level
	currentLevel++;
	
	//Check amount of XP required for current level
	currentLevelXP = exp.level_to_xp(currentLevel);
	
	//Check amount of XP for next level
	nextLevelXP = exp.level_to_xp(currentLevel + 1);
	
	//Update next level progress, and convert to a percentage
	nextLevelProgress = (xp - currentLevelXP) / (nextLevelXP - currentLevelXP) * 100;
	nextLevelProgress = Math.floor(nextLevelProgress);
	
	//Notify the player of a level up
	$("#current-level").notify(
		"Level Up!",
		{ position:"bottom", className: 'success', showDuration: 100, autoHideDelay: 3000, arrowShow: true}
	);
	
};

function resetInterval() {
	
	interval = Math.floor(interval - (axeBonusInterval[currentAxe] / 100 * interval));
	
}

//Function to handle the upgrading of axes
function upgradeAxe(axe) {
		
	if (axe > currentAxe && gp >= axeCost[axe]) {
		
		switch (axe) {
			
			//Iron
			case 2:			
				axePurchased[0] = 1;
				$("#gp").text(gp);
				gp = gp - axeCost[axe];
				currentAxe = 2;
				resetInterval();
				updateAxe();
				notify("axe");
				break;
		
			//Steel
			case 3:
				for (i = 0; i <= 1; i++) {
					axePurchased[i] = 1;
				}
				
				gp = gp - axeCost[axe];
				$("#gp").text(gp);
				currentAxe = 3;
				resetInterval();
				updateAxe();
				notify("axe");
				break;
		
			//Black
			case 4:
				for (i = 0; i <= 2; i++) {
					axePurchased[i] = 1;
				}
				
				gp = gp - axeCost[axe];
				$("#gp").text(gp);
				currentAxe = 4;
				resetInterval();
				updateAxe();
				notify("axe");
				break;
		
			//Mithril
			case 5:
				for (i = 0; i <= 3; i++) {
					axePurchased[i] = 1;
				}
				
				gp = gp - axeCost[axe];
				$("#gp").text(gp);
				currentAxe = 5;
				resetInterval();
				updateAxe();
				notify("axe");
				break;
		
			//Adamant
			case 6:
				for (i = 0; i <= 4; i++) {
					axePurchased[i] = 1;
				}
				
				gp = gp - axeCost[axe];
				$("#gp").text(gp);
				currentAxe = 6;
				resetInterval();
				updateAxe();
				notify("axe");
				break;
		
			//Rune
			case 7:
				for (i = 0; i <= 5; i++) {
					axePurchased[i] = 1;
				}
				
				gp = gp - axeCost[axe];
				$("#gp").text(gp);
				currentAxe = 7;
				resetInterval();
				updateAxe();
				notify("axe");
				break;
		
			//Dragon
			case 8:
				for (i = 0; i <= 6; i++) {
					axePurchased[i] = 1;
				}
				
				gp = gp - axeCost[axe];
				$("#gp").text(gp);
				currentAxe = 8;
				resetInterval();
				updateAxe();
				notify("axe");
				break;
		
			//3rd Age
			case 9:
				for (i = 0; i <= 7; i++) {
					axePurchased[i] = 1;
				}
				
				gp = gp - axeCost[axe];
				$("#gp").text(gp);
				currentAxe = 9;
				resetInterval();
				updateAxe();
				notify("axe");
				break;
		}
	
	}
	
}

//Function to handle the upgrading of bank
function upgradeBank(bank) {
		
	if (bank > currentBankUpgrade && gp >= bankCost[bank-1]) {
		
		switch (bank) {
			
			case 1:
				
				bankUpgradePurchased[0] = 1;
				gp = gp - bankCost[bank-1];
				currentBankUpgrade = 1;
				bankMax = bankUpgradeValues[currentBankUpgrade-1];
				updateScreen();
				notify("bank");
				
				break;
			
			case 2:
				
				for (i = 0; i <= 1; i++) {
					bankUpgradePurchased[i] = 1;
				}
				
				gp = gp - bankCost[bank-1];
				currentBankUpgrade = 2;
				bankMax = bankUpgradeValues[currentBankUpgrade-1];
				updateScreen();
				notify("bank");
				
				break;
		
			case 3:
				
				for (i = 0; i <= 2; i++) {
					bankUpgradePurchased[i] = 1;
				}
				
				gp = gp - bankCost[bank-1];
				currentBankUpgrade = 3;
				bankMax = bankUpgradeValues[currentBankUpgrade-1];
				updateScreen();
				notify("bank");
				
				break;
		
			case 4:
				
				for (i = 0; i <= 3; i++) {
					bankUpgradePurchased[i] = 1;
				}
				
				gp = gp - bankCost[bank-1];
				currentBankUpgrade = 4;
				bankMax = bankUpgradeValues[currentBankUpgrade-1];
				updateScreen();
				notify("bank");
				
				break;
		
			case 5:
				
				for (i = 0; i <= 4; i++) {
					bankUpgradePurchased[i] = 1;
				}
				
				gp = gp - bankCost[bank-1];
				currentBankUpgrade = 5;
				bankMax = bankUpgradeValues[currentBankUpgrade-1];
				updateScreen();
				notify("bank");
				
				break;
		
			case 6:
				
				for (i = 0; i <= 5; i++) {
					bankUpgradePurchased[i] = 1;
				}
				
				gp = gp - bankCost[bank-1];
				currentBankUpgrade = 6;
				bankMax = bankUpgradeValues[currentBankUpgrade-1];
				updateScreen();
				notify("bank");
				
				break;
		
			case 7:
				
				for (i = 0; i <= 6; i++) {
					bankUpgradePurchased[i] = 1;
				}
				
				gp = gp - bankCost[bank-1];
				currentBankUpgrade = 7;
				bankMax = bankUpgradeValues[currentBankUpgrade-1];
				updateScreen();
				notify("bank");
				
				break;
		
			case 8:
				
				for (i = 0; i <= 7; i++) {
					bankUpgradePurchased[i] = 1;
				}
				
				gp = gp - bankCost[bank-1];
				currentBankUpgrade = 8;
				bankMax = bankUpgradeValues[currentBankUpgrade-1];
				updateScreen();
				notify("bank");
				
				break;
		
			case 9:
				
				for (i = 0; i <= 8; i++) {
					bankUpgradePurchased[i] = 1;
				}
				
				gp = gp - bankCost[bank-1];
				currentBankUpgrade = 9;
				bankMax = bankUpgradeValues[currentBankUpgrade-1];
				updateScreen();
				notify("bank");
				
				break;
		}
	
	}
	
}

//So I don't have to keep typing it
function notify(type) {
	
	switch (type) {
		
		case "axe":
			$("#current-axe").notify(
				"Upgraded!",
				{ position:"bottom", className: 'success', showDuration: 400, autoHideDelay: 3000, showAnimation: 'slideDown', hideAnimation: 'slideUp', }
			);
			break;
			
		case "level":
			$("#current-level").notify(
				"Level Up!",
				{ position: 'bottom', className: 'success', showDuration: 400, autoHideDelay: 3000, showAnimation: 'slideDown', hideAnimation: 'slideUp', }
			);
			break;
			
		case "bank":
			$("#current-bank").notify(
				"Upgraded!",
				{ position:"bottom", className: 'success', showDuration: 400, autoHideDelay: 3000, showAnimation: 'slideDown', hideAnimation: 'slideUp', }
			);
			break;
			
		case "bankFull":
			$("#current-bank").notify(
				"Full!",
				{ position:"bottom", className: 'error', showDuration: 400, autoHideDelay: 3000, showAnimation: 'slideDown', hideAnimation: 'slideUp', }
			);
			break;
			
	}
	
}

//Exerience equation
function exp(){
 
    this.equate = function(xp){
        return Math.floor(xp + 300 * Math.pow(2, xp / 7));
    };
 
    this.level_to_xp = function(level){
        var xp = 0;
 
        for (var i = 1; i < level; i++)
            xp += this.equate(i);
 
        return Math.floor(xp / 4);
    };
	
	this.xp_to_level = function(xp){
        var level = 1;
 
        while (this.level_to_xp(level) < xp)
            level++;
 
        return level;
    };
 
}

function updateScreen() {
	
	//This function updates the data on the screen
	$("#gp").text(gp);
	$("#current-xp").text(xp);
	$("#xp-required").text(nextLevelXP);
	$("#current-level-text").text(currentLevel);
	$("#next-level-progress").text(nextLevelProgress + "%");
	$("#bank-limit-text").text(bankUpgradeValues[currentBankUpgrade-1]);
	
	//Update level progress bar size
	$("#next-level-progress").css("width", nextLevelProgress + "%");
	
	updateTrees();
	updateAxe();
	updateMilestone();
	updateBankUpgrades()
	
	//Calculate how many logs are in the bank
	currentBank = logsInBank.reduce(function(logsInBank, b) { return logsInBank + b; }, 0);
	$("#current-bank-text").text(currentBank);
		
	updateBank();
	
	//Auto save	
	if (autoSave) {
		saveData(0);
		$("#autosave").attr("class", "btn btn-success btn-sm");
		$("#save").attr("style", "display:none");
		$("#autosave").text("Autosave: On");
	}
	else {
		$("#autosave").attr("class", "btn btn-danger btn-sm");
		$("#save").attr("style", "");
		$("#autosave").text("Autosave: Off");
	}
	
}

function updateTrees() {
	
	//Handle level requirements for trees
	if (currentLevel > 0) {
		
		//Check if any variables are true that can alter the buttons
		if (isCutting || keepButtonDisabled || isAutomating[0] || eventInProgress) {
			
			//Check if an event is in progress, and if the tree ID is this tree
			if (eventInProgress && eventTreeID == 0) {
				$("#cut-tree-card").attr("class", "card text-center tempting-azure-gradient");
				$("#cut-tree-desc").attr("class", "card-text text-warning");
				
				//Check which random event is active, update text to suit
				if (randomEventID == 2) {
					$("#cut-tree-desc").text("DOUBLE XP");
				}
				else if (randomEventID == 3) {
					$("#cut-tree-desc").text("DOUBLE LOGS");
				}
				else if (randomEventID == 4) {
					$("#cut-tree-desc").text("FAST CUT");
				}
				
				//Check if the player is cutting during the event, disable button accordingly
				if (isCutting) {
					$("#cut-tree").attr("class", "btn btn-warning disabled");
				}
				else {
					$("#cut-tree").attr("class", "btn btn-warning");
				}
				
			} else {
				$("#cut-tree").attr("class", "btn btn-success disabled");
				$("#cut-tree-desc").text("A commonly found tree.");
				$("#cut-tree-desc").attr("class", "card-text");
				$("#cut-tree-card").attr("class", "card text-center");
			}
		}
		else {
			$("#cut-tree").attr("class", "btn btn-success");
			$("#cut-tree-desc").text("A commonly found tree.");
			$("#cut-tree-desc").attr("class", "card-text");
			$("#cut-tree-card").attr("class", "card text-center");
		}
		
	}
	
	//Oak Tree - Level 15
	if (currentLevel < 15) {
		$("#cut-oak").attr("class", "btn btn-success disabled");
	}
	else {
		
		//Check if the tree level value has been updated. This is for loading a save or leveling up
		if (treeLevelAchieved[0] == 0) {
			treeLevelAchieved[0] = 1;
			$("#oak-level").attr("style", "");
			
			//check if there is an event running (To make sure when leveling up, the correct button colour is set)
			if(!eventInProgress && eventTreeID != 1) {
				$("#cut-oak").attr("class", "btn btn-success");
			}
			else {
				$("#cut-oak").attr("class", "btn btn-warning");
			}
		}
		
		//Check if any variables are true that can alter the buttons
		if (isCutting || keepButtonDisabled || isAutomating[1] || eventInProgress) {
			
			//Check if an event is in progress, and if the tree ID is this tree
			if (eventInProgress && eventTreeID == 1) {
				$("#cut-oak-card").attr("class", "card text-center tempting-azure-gradient");
				$("#cut-oak-desc").attr("class", "card-text text-warning");
				
				//Check which random event is active, update text to suit
				if (randomEventID == 2) {
					$("#cut-oak-desc").text("DOUBLE XP");
				}
				else if (randomEventID == 3) {
					$("#cut-oak-desc").text("DOUBLE LOGS");
				}
				else if (randomEventID == 4) {
					$("#cut-oak-desc").text("FAST CUT");
				}
				
				//Check if the player is cutting during the event, disable button accordingly
				if (isCutting) {
					$("#cut-oak").attr("class", "btn btn-warning disabled");
				}
				else {
					$("#cut-oak").attr("class", "btn btn-warning");
				}
				
			} else {
				$("#cut-oak").attr("class", "btn btn-success disabled");
			$("#cut-oak-desc").text("A commonly found tree.");
			$("#cut-oak-desc").attr("class", "card-text");
			$("#cut-oak-card").attr("class", "card text-center");
			}
		}
		else {
			$("#cut-oak").attr("class", "btn btn-success");
			$("#cut-oak-desc").text("A commonly found tree.");
			$("#cut-oak-desc").attr("class", "card-text");
			$("#cut-oak-card").attr("class", "card text-center");
		}
		
	}
	
	//Willow Tree - Level 30
	if (currentLevel < 30) {
		$("#cut-willow").attr("class", "btn btn-success disabled");
	}
	else {
		
		//Check if the tree level value has been updated. This is for loading a save or leveling up
		if (treeLevelAchieved[1] == 0) {
			treeLevelAchieved[1] = 1;
			$("#willow-level").attr("style", "");
			
			//check if there is an event running (To make sure when leveling up, the correct button colour is set)
			if(!eventInProgress && eventTreeID != 2) {
				$("#cut-willow").attr("class", "btn btn-success");
			}
			else {
				$("#cut-willow").attr("class", "btn btn-warning");
			}
		}
		
		//Check if any variables are true that can alter the buttons
		if (isCutting || keepButtonDisabled || isAutomating[2] || eventInProgress) {
			
			//Check if an event is in progress, and if the tree ID is this tree
			if (eventInProgress && eventTreeID == 2) {
				$("#cut-willow-card").attr("class", "card text-center tempting-azure-gradient");
				$("#cut-willow-desc").attr("class", "card-text text-warning");
				
				//Check which random event is active, update text to suit
				if (randomEventID == 2) {
					$("#cut-willow-desc").text("DOUBLE XP");
				}
				else if (randomEventID == 3) {
					$("#cut-willow-desc").text("DOUBLE LOGS");
				}
				else if (randomEventID == 4) {
					$("#cut-willow-desc").text("FAST CUT");
				}
				
				//Check if the player is cutting during the event, disable button accordingly
				if (isCutting) {
					$("#cut-willow").attr("class", "btn btn-warning disabled");
				}
				else {
					$("#cut-willow").attr("class", "btn btn-warning");
				}
				
			} else {
				$("#cut-willow").attr("class", "btn btn-success disabled");
			$("#cut-willow-desc").text("A commonly found tree.");
			$("#cut-willow-desc").attr("class", "card-text");
			$("#cut-willow-card").attr("class", "card text-center");
			}
		}
		else {
			$("#cut-willow").attr("class", "btn btn-success");
			$("#cut-willow-desc").text("A commonly found tree.");
			$("#cut-willow-desc").attr("class", "card-text");
			$("#cut-willow-card").attr("class", "card text-center");
		}
		
	}
	
	//Teak Tree - Level 35
	if (currentLevel < 35) {
		$("#cut-teak").attr("class", "btn btn-success disabled");
	}
	else {
		
		//Check if the tree level value has been updated. This is for loading a save or leveling up
		if (treeLevelAchieved[2] == 0) {
			treeLevelAchieved[2] = 1;
			$("#teak-level").attr("style", "");
			
			//check if there is an event running (To make sure when leveling up, the correct button colour is set)
			if(!eventInProgress && eventTreeID != 3) {
				$("#cut-teak").attr("class", "btn btn-success");
			}
			else {
				$("#cut-teak").attr("class", "btn btn-warning");
			}
		}
		
		//Check if any variables are true that can alter the buttons
		if (isCutting || keepButtonDisabled || isAutomating[3] || eventInProgress) {
			
			//Check if an event is in progress, and if the tree ID is this tree
			if (eventInProgress && eventTreeID == 3) {
				$("#cut-teak-card").attr("class", "card text-center tempting-azure-gradient");
				$("#cut-teak-desc").attr("class", "card-text text-warning");
				
				//Check which random event is active, update text to suit
				if (randomEventID == 2) {
					$("#cut-teak-desc").text("DOUBLE XP");
				}
				else if (randomEventID == 3) {
					$("#cut-teak-desc").text("DOUBLE LOGS");
				}
				else if (randomEventID == 4) {
					$("#cut-teak-desc").text("FAST CUT");
				}
				
				//Check if the player is cutting during the event, disable button accordingly
				if (isCutting) {
					$("#cut-teak").attr("class", "btn btn-warning disabled");
				}
				else {
					$("#cut-teak").attr("class", "btn btn-warning");
				}
				
			} else {
				$("#cut-teak").attr("class", "btn btn-success disabled");
			$("#cut-teak-desc").text("A commonly found tree.");
			$("#cut-teak-desc").attr("class", "card-text");
			$("#cut-teak-card").attr("class", "card text-center");
			}
		}
		else {
			$("#cut-teak").attr("class", "btn btn-success");
			$("#cut-teak-desc").text("A commonly found tree.");
			$("#cut-teak-desc").attr("class", "card-text");
			$("#cut-teak-card").attr("class", "card text-center");
		}
		
	}
	
	//Maple Tree - Level 45
	if (currentLevel < 45) {
		$("#cut-maple").attr("class", "btn btn-success disabled");
	}
	else {
		
		//Check if the tree level value has been updated. This is for loading a save or leveling up
		if (treeLevelAchieved[3] == 0) {
			treeLevelAchieved[3] = 1;
			$("#maple-level").attr("style", "");
			
			//check if there is an event running (To make sure when leveling up, the correct button colour is set)
			if(!eventInProgress && eventTreeID != 4) {
				$("#cut-maple").attr("class", "btn btn-success");
			}
			else {
				$("#cut-maple").attr("class", "btn btn-warning");
			}
		}
		
		//Check if any variables are true that can alter the buttons
		if (isCutting || keepButtonDisabled || isAutomating[4] || eventInProgress) {
			
			//Check if an event is in progress, and if the tree ID is this tree
			if (eventInProgress && eventTreeID == 4) {
				$("#cut-maple-card").attr("class", "card text-center tempting-azure-gradient");
				$("#cut-maple-desc").attr("class", "card-text text-warning");
				
				//Check which random event is active, update text to suit
				if (randomEventID == 2) {
					$("#cut-maple-desc").text("DOUBLE XP");
				}
				else if (randomEventID == 3) {
					$("#cut-maple-desc").text("DOUBLE LOGS");
				}
				else if (randomEventID == 4) {
					$("#cut-maple-desc").text("FAST CUT");
				}
				
				//Check if the player is cutting during the event, disable button accordingly
				if (isCutting) {
					$("#cut-maple").attr("class", "btn btn-warning disabled");
				}
				else {
					$("#cut-maple").attr("class", "btn btn-warning");
				}
				
			} else {
				$("#cut-maple").attr("class", "btn btn-success disabled");
			$("#cut-maple-desc").text("A commonly found tree.");
			$("#cut-maple-desc").attr("class", "card-text");
			$("#cut-maple-card").attr("class", "card text-center");
			}
		}
		else {
			$("#cut-maple").attr("class", "btn btn-success");
			$("#cut-maple-desc").text("A commonly found tree.");
			$("#cut-maple-desc").attr("class", "card-text");
			$("#cut-maple-card").attr("class", "card text-center");
		}
		
	}
	
	//Mahogany Tree - Level 50
	if (currentLevel < 50) {
		$("#cut-mahogany").attr("class", "btn btn-success disabled");
	}
	else {
		
		//Check if the tree level value has been updated. This is for loading a save or leveling up
		if (treeLevelAchieved[4] == 0) {
			treeLevelAchieved[4] = 1;
			$("#mahogany-level").attr("style", "");
			
			//check if there is an event running (To make sure when leveling up, the correct button colour is set)
			if(!eventInProgress && eventTreeID != 5) {
				$("#cut-mahogany").attr("class", "btn btn-success");
			}
			else {
				$("#cut-mahogany").attr("class", "btn btn-warning");
			}
		}
		
		//Check if any variables are true that can alter the buttons
		if (isCutting || keepButtonDisabled || isAutomating[5] || eventInProgress) {
			
			//Check if an event is in progress, and if the tree ID is this tree
			if (eventInProgress && eventTreeID == 5) {
				$("#cut-mahogany-card").attr("class", "card text-center tempting-azure-gradient");
				$("#cut-mahogany-desc").attr("class", "card-text text-warning");
				
				//Check which random event is active, update text to suit
				if (randomEventID == 2) {
					$("#cut-mahogany-desc").text("DOUBLE XP");
				}
				else if (randomEventID == 3) {
					$("#cut-mahogany-desc").text("DOUBLE LOGS");
				}
				else if (randomEventID == 4) {
					$("#cut-mahogany-desc").text("FAST CUT");
				}
				
				//Check if the player is cutting during the event, disable button accordingly
				if (isCutting) {
					$("#cut-mahogany").attr("class", "btn btn-warning disabled");
				}
				else {
					$("#cut-mahogany").attr("class", "btn btn-warning");
				}
				
			} else {
				$("#cut-mahogany").attr("class", "btn btn-success disabled");
			$("#cut-mahogany-desc").text("A commonly found tree.");
			$("#cut-mahogany-desc").attr("class", "card-text");
			$("#cut-mahogany-card").attr("class", "card text-center");
			}
		}
		else {
			$("#cut-mahogany").attr("class", "btn btn-success");
			$("#cut-mahogany-desc").text("A commonly found tree.");
			$("#cut-mahogany-desc").attr("class", "card-text");
			$("#cut-mahogany-card").attr("class", "card text-center");
		}
		
	}
	
	//Yew Tree - Level 60
	if (currentLevel < 60) {
		$("#cut-yew").attr("class", "btn btn-success disabled");
	}
	else {
		
		//Check if the tree level value has been updated. This is for loading a save or leveling up
		if (treeLevelAchieved[5] == 0) {
			treeLevelAchieved[5] = 1;
			$("#yew-level").attr("style", "");
			
			//check if there is an event running (To make sure when leveling up, the correct button colour is set)
			if(!eventInProgress && eventTreeID != 6) {
				$("#cut-yew").attr("class", "btn btn-success");
			}
			else {
				$("#cut-yew").attr("class", "btn btn-warning");
			}
		}
		
		//Check if any variables are true that can alter the buttons
		if (isCutting || keepButtonDisabled || isAutomating[6] || eventInProgress) {
			
			//Check if an event is in progress, and if the tree ID is this tree
			if (eventInProgress && eventTreeID == 6) {
				$("#cut-yew-card").attr("class", "card text-center tempting-azure-gradient");
				$("#cut-yew-desc").attr("class", "card-text text-warning");
				
				//Check which random event is active, update text to suit
				if (randomEventID == 2) {
					$("#cut-yew-desc").text("DOUBLE XP");
				}
				else if (randomEventID == 3) {
					$("#cut-yew-desc").text("DOUBLE LOGS");
				}
				else if (randomEventID == 4) {
					$("#cut-yew-desc").text("FAST CUT");
				}
				
				//Check if the player is cutting during the event, disable button accordingly
				if (isCutting) {
					$("#cut-yew").attr("class", "btn btn-warning disabled");
				}
				else {
					$("#cut-yew").attr("class", "btn btn-warning");
				}
				
			} else {
				$("#cut-yew").attr("class", "btn btn-success disabled");
			$("#cut-yew-desc").text("A commonly found tree.");
			$("#cut-yew-desc").attr("class", "card-text");
			$("#cut-yew-card").attr("class", "card text-center");
			}
		}
		else {
			$("#cut-yew").attr("class", "btn btn-success");
			$("#cut-yew-desc").text("A commonly found tree.");
			$("#cut-yew-desc").attr("class", "card-text");
			$("#cut-yew-card").attr("class", "card text-center");
		}
		
	}
	
	//Magic Tree - Level 75
	if (currentLevel < 75) {
		$("#cut-magic").attr("class", "btn btn-success disabled");
	}
	else {
		
		//Check if the tree level value has been updated. This is for loading a save or leveling up
		if (treeLevelAchieved[6] == 0) {
			treeLevelAchieved[6] = 1;
			$("#magic-level").attr("style", "");
			
			//check if there is an event running (To make sure when leveling up, the correct button colour is set)
			if(!eventInProgress && eventTreeID != 7) {
				$("#cut-magic").attr("class", "btn btn-success");
			}
			else {
				$("#cut-magic").attr("class", "btn btn-warning");
			}
		}
		
		//Check if any variables are true that can alter the buttons
		if (isCutting || keepButtonDisabled || isAutomating[7] || eventInProgress) {
			
			//Check if an event is in progress, and if the tree ID is this tree
			if (eventInProgress && eventTreeID == 7) {
				$("#cut-magic-card").attr("class", "card text-center tempting-azure-gradient");
				$("#cut-magic-desc").attr("class", "card-text text-warning");
				
				//Check which random event is active, update text to suit
				if (randomEventID == 2) {
					$("#cut-magic-desc").text("DOUBLE XP");
				}
				else if (randomEventID == 3) {
					$("#cut-magic-desc").text("DOUBLE LOGS");
				}
				else if (randomEventID == 4) {
					$("#cut-magic-desc").text("FAST CUT");
				}
				
				//Check if the player is cutting during the event, disable button accordingly
				if (isCutting) {
					$("#cut-magic").attr("class", "btn btn-warning disabled");
				}
				else {
					$("#cut-magic").attr("class", "btn btn-warning");
				}
				
			} else {
				$("#cut-magic").attr("class", "btn btn-success disabled");
			$("#cut-magic-desc").text("A commonly found tree.");
			$("#cut-magic-desc").attr("class", "card-text");
			$("#cut-magic-card").attr("class", "card text-center");
			}
		}
		else {
			$("#cut-magic").attr("class", "btn btn-success");
			$("#cut-magic-desc").text("A commonly found tree.");
			$("#cut-magic-desc").attr("class", "card-text");
			$("#cut-magic-card").attr("class", "card text-center");
		}
		
	}
	
	//Redwood Tree - Level 90
	if (currentLevel < 90) {
		$("#cut-redwood").attr("class", "btn btn-success disabled");
	}
	else {
		
		//Check if the tree level value has been updated. This is for loading a save or leveling up
		if (treeLevelAchieved[7] == 0) {
			treeLevelAchieved[7] = 1;
			$("#redwood-level").attr("style", "");
			
			//check if there is an event running (To make sure when leveling up, the correct button colour is set)
			if(!eventInProgress && eventTreeID != 8) {
				$("#cut-redwood").attr("class", "btn btn-success");
			}
			else {
				$("#cut-redwood").attr("class", "btn btn-warning");
			}
		}
		
		//Check if any variables are true that can alter the buttons
		if (isCutting || keepButtonDisabled || isAutomating[8] || eventInProgress) {
			
			//Check if an event is in progress, and if the tree ID is this tree
			if (eventInProgress && eventTreeID == 8) {
				$("#cut-redwood-card").attr("class", "card text-center tempting-azure-gradient");
				$("#cut-redwood-desc").attr("class", "card-text text-warning");
				
				//Check which random event is active, update text to suit
				if (randomEventID == 2) {
					$("#cut-redwood-desc").text("DOUBLE XP");
				}
				else if (randomEventID == 3) {
					$("#cut-redwood-desc").text("DOUBLE LOGS");
				}
				else if (randomEventID == 4) {
					$("#cut-redwood-desc").text("FAST CUT");
				}
				
				//Check if the player is cutting during the event, disable button accordingly
				if (isCutting) {
					$("#cut-redwood").attr("class", "btn btn-warning disabled");
				}
				else {
					$("#cut-redwood").attr("class", "btn btn-warning");
				}
				
			} else {
				$("#cut-redwood").attr("class", "btn btn-success disabled");
			$("#cut-redwood-desc").text("A commonly found tree.");
			$("#cut-redwood-desc").attr("class", "card-text");
			$("#cut-redwood-card").attr("class", "card text-center");
			}
		}
		else {
			$("#cut-redwood").attr("class", "btn btn-success");
			$("#cut-redwood-desc").text("A commonly found tree.");
			$("#cut-redwood-desc").attr("class", "card-text");
			$("#cut-redwood-card").attr("class", "card text-center");
		}
		
	}
	
}

function updateMilestone() {
	
	//Handle milestones
	if (currentLevel >= 2) {
		$("#m-auto-cut-tree").attr("class", "badge badge-success");
		$("#m-auto-cut-tree").text("Unlocked");
		
		if (isAutomating[0] != 1 && !keepButtonDisabled && !isCutting) {
			$("#cut-tree-auto").attr("class", "btn btn-outline-info");
		}
		
		if (isAutomating[0] != 1 && keepButtonDisabled || isCutting || eventInProgress) {
			$("#cut-tree-auto").attr("class", "btn btn-outline-info disabled");
		}
		
		if (milestoneAchieved[0] == 0) {
			milestoneAchieved[0] = 1;
			milestoneNotify();
		}
		
	}
	if (currentLevel >= 20) {
		$("#m-auto-cut-oak").attr("class", "badge badge-success");
		$("#m-auto-cut-oak").text("Unlocked");
		
		if (isAutomating[1] != 1 && !keepButtonDisabled && !isCutting) {
			$("#cut-oak-auto").attr("class", "btn btn-outline-info");
		}
		
		if (isAutomating[1] != 1 && (keepButtonDisabled || isCutting || eventInProgress)) {
			$("#cut-oak-auto").attr("class", "btn btn-outline-info disabled");
		}
		
		if (milestoneAchieved[1] == 0) {
			milestoneAchieved[1] = 1;
			milestoneNotify();
		}
	}
	if (currentLevel >= 35) {
		$("#m-auto-cut-willow").attr("class", "badge badge-success");
		$("#m-auto-cut-willow").text("Unlocked");
		
		if (isAutomating[2] != 1 && !keepButtonDisabled && !isCutting) {
			$("#cut-willow-auto").attr("class", "btn btn-outline-info");
		}
		
		if (isAutomating[2] != 1 && (keepButtonDisabled || isCutting || eventInProgress)) {
			$("#cut-willow-auto").attr("class", "btn btn-outline-info disabled");
		}
		
		if (milestoneAchieved[2] == 0) {
			milestoneAchieved[2] = 1;
			milestoneNotify();
		}
	}
	if (currentLevel >= 40) {
		$("#m-auto-cut-teak").attr("class", "badge badge-success");
		$("#m-auto-cut-teak").text("Unlocked");
		
		if (isAutomating[3] != 1 && !keepButtonDisabled && !isCutting) {
			$("#cut-teak-auto").attr("class", "btn btn-outline-info");
		}
		
		if (isAutomating[3] != 1 && (keepButtonDisabled || isCutting || eventInProgress)) {
			$("#cut-teak-auto").attr("class", "btn btn-outline-info disabled");
		}
		
		if (milestoneAchieved[3] == 0) {
			milestoneAchieved[3] = 1;
			milestoneNotify();
		}
	}
	if (currentLevel >= 50) {
		$("#m-auto-cut-maple").attr("class", "badge badge-success");
		$("#m-auto-cut-maple").text("Unlocked");
		
		if (isAutomating[4] != 1 && !keepButtonDisabled && !isCutting) {
			$("#cut-maple-auto").attr("class", "btn btn-outline-info");
		}
		
		if (isAutomating[4] != 1 && (keepButtonDisabled || isCutting || eventInProgress)) {
			$("#cut-maple-auto").attr("class", "btn btn-outline-info disabled");
		}
		
		if (milestoneAchieved[4] == 0) {
			milestoneAchieved[4] = 1;
			milestoneNotify();
		}
	}
	if (currentLevel >= 55) {
		$("#m-auto-cut-mahogany").attr("class", "badge badge-success");
		$("#m-auto-cut-mahogany").text("Unlocked");
		
		if (isAutomating[5] != 1 && !keepButtonDisabled && !isCutting) {
			$("#cut-mahogany-auto").attr("class", "btn btn-outline-info");
		}
		
		if (isAutomating[5] != 1 && (keepButtonDisabled || isCutting || eventInProgress)) {
			$("#cut-mahogany-auto").attr("class", "btn btn-outline-info disabled");
		}
		
		if (milestoneAchieved[5] == 0) {
			milestoneAchieved[5] = 1;
			milestoneNotify();
		}
	}
	if (currentLevel >= 65) {
		$("#m-auto-cut-yew").attr("class", "badge badge-success");
		$("#m-auto-cut-yew").text("Unlocked");
		
		if (isAutomating[6] != 1 && !keepButtonDisabled && !isCutting) {
			$("#cut-yew-auto").attr("class", "btn btn-outline-info");
		}
		
		if (isAutomating[6] != 1 && (keepButtonDisabled || isCutting || eventInProgress)) {
			$("#cut-yew-auto").attr("class", "btn btn-outline-info disabled");
		}
		
		if (milestoneAchieved[6] == 0) {
			milestoneAchieved[6] = 1;
			milestoneNotify();
		}
	}
	if (currentLevel >= 80) {
		$("#m-auto-cut-magic").attr("class", "badge badge-success");
		$("#m-auto-cut-magic").text("Unlocked");
		
		if (isAutomating[7] != 1 && !keepButtonDisabled && !isCutting) {
			$("#cut-magic-auto").attr("class", "btn btn-outline-info");
		}
		
		if (isAutomating[7] != 1 && (keepButtonDisabled || isCutting || eventInProgress)) {
			$("#cut-magic-auto").attr("class", "btn btn-outline-info disabled");
		}
		
		if (milestoneAchieved[7] == 0) {
			milestoneAchieved[7] = 1;
			milestoneNotify();
		}
	}
	if (currentLevel >= 95) {
		$("#m-auto-cut-redwood").attr("class", "badge badge-success");
		$("#m-auto-cut-redwood").text("Unlocked");
		
		if (isAutomating[8] != 1 && !keepButtonDisabled && !isCutting) {
			$("#cut-redwood-auto").attr("class", "btn btn-outline-info");
		}
		
		if (isAutomating[8] != 1 && (keepButtonDisabled || isCutting || eventInProgress)) {
			$("#cut-redwood-auto").attr("class", "btn btn-outline-info disabled");
		}
		
		if (milestoneAchieved[8] == 0) {
			milestoneAchieved[8] = 1;
			milestoneNotify();
		}
	}
	
}

function milestoneNotify() {
	
	$.notify(
		"Milestone Unlocked!",
		{ position: 'top right', className: 'success', showDuration: 400, autoHideDelay: 5000 }
	);
		
}

//Handle screen display for buying axes
function updateAxe() {
	
	if (currentLevel < 1) {
		$("#iron-axe-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#iron-axe-level-text").attr("class", "badge badge-danger");
		$("#iron-axe-level-text").text("Insufficient Level");
	}
	else {
		if (axePurchased[0] == 0) {
			$("#iron-axe-button").attr("class", "btn btn-primary btn-sm");
			$("#iron-axe-level-text").attr("class", "badge badge-primary");
			$("#iron-axe-level-text").text("Available");
		}
		else {
			$("#iron-axe-button").attr("class", "btn btn-success btn-sm disabled");
			$("#iron-axe-button").text("Upgraded");
			$("#iron-axe-level-text").attr("class", "badge badge-success");
			$("#iron-axe-level-text").text("Upgraded");
			$("#current-axe-image").attr("src", "img/axe_iron.png");
			$("#current-axe-text").text("Iron Axe");
		}
	}
	
	if (currentLevel < 10) {
		$("#steel-axe-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#steel-axe-level-text").attr("class", "badge badge-danger");
		$("#steel-axe-level-text").text("Insufficient Level");
	}
	else {
		if (axePurchased[1] == 0) {
			$("#steel-axe-button").attr("class", "btn btn-primary btn-sm");
			$("#steel-axe-level-text").attr("class", "badge badge-primary");
			$("#steel-axe-level-text").text("Available");
		}
		else {
			$("#steel-axe-button").attr("class", "btn btn-success btn-sm disabled");
			$("#steel-axe-button").text("Upgraded");
			$("#steel-axe-level-text").attr("class", "badge badge-success");
			$("#steel-axe-level-text").text("Upgraded");
			$("#current-axe-image").attr("src", "img/axe_steel.png");
			$("#current-axe-text").text("Steel Axe");
		}
	}
	
	if (currentLevel < 20) {
		$("#black-axe-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#black-axe-level-text").attr("class", "badge badge-danger");
		$("#black-axe-level-text").text("Insufficient Level");
	}
	else {
		if (axePurchased[2] == 0) {
			$("#black-axe-button").attr("class", "btn btn-primary btn-sm");
			$("#black-axe-level-text").attr("class", "badge badge-primary");
			$("#black-axe-level-text").text("Available");
		}
		else {
			$("#black-axe-button").attr("class", "btn btn-success btn-sm disabled");
			$("#black-axe-button").text("Upgraded");
			$("#black-axe-level-text").attr("class", "badge badge-success");
			$("#black-axe-level-text").text("Upgraded");
			$("#current-axe-image").attr("src", "img/axe_black.png");
			$("#current-axe-text").text("Black Axe");
		}
	}
	
	if (currentLevel < 35) {
		$("#mithril-axe-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#mithril-axe-level-text").attr("class", "badge badge-danger");
		$("#mithril-axe-level-text").text("Insufficient Level");
	}
	else {
		if (axePurchased[3] == 0) {
			$("#mithril-axe-button").attr("class", "btn btn-primary btn-sm");
			$("#mithril-axe-level-text").attr("class", "badge badge-primary");
			$("#mithril-axe-level-text").text("Available");
		}
		else {
			$("#mithril-axe-button").attr("class", "btn btn-success btn-sm disabled");
			$("#mithril-axe-button").text("Upgraded");
			$("#mithril-axe-level-text").attr("class", "badge badge-success");
			$("#mithril-axe-level-text").text("Upgraded");
			$("#current-axe-image").attr("src", "img/axe_mithril.png");
			$("#current-axe-text").text("Mithril Axe");
		}
	}
	
	if (currentLevel < 50) {
		$("#adamant-axe-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#adamant-axe-level-text").attr("class", "badge badge-danger");
		$("#adamant-axe-level-text").text("Insufficient Level");
	}
	else {
		if (axePurchased[4] == 0) {
			$("#adamant-axe-button").attr("class", "btn btn-primary btn-sm");
			$("#adamant-axe-level-text").attr("class", "badge badge-primary");
			$("#adamant-axe-level-text").text("Available");
		}
		else {
			$("#adamant-axe-button").attr("class", "btn btn-success btn-sm disabled");
			$("#adamant-axe-button").text("Upgraded");
			$("#adamant-axe-level-text").attr("class", "badge badge-success");
			$("#adamant-axe-level-text").text("Upgraded");
			$("#current-axe-image").attr("src", "img/axe_adamant.png");
			$("#current-axe-text").text("Adamant Axe");
		}
	}
	
	if (currentLevel < 60) {
		$("#rune-axe-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#rune-axe-level-text").attr("class", "badge badge-danger");
		$("#rune-axe-level-text").text("Insufficient Level");
	}
	else {
		if (axePurchased[5] == 0) {
			$("#rune-axe-button").attr("class", "btn btn-primary btn-sm");
			$("#rune-axe-level-text").attr("class", "badge badge-primary");
			$("#rune-axe-level-text").text("Available");
		}
		else {
			$("#rune-axe-button").attr("class", "btn btn-success btn-sm disabled");
			$("#rune-axe-button").text("Upgraded");
			$("#rune-axe-level-text").attr("class", "badge badge-success");
			$("#rune-axe-level-text").text("Upgraded");
			$("#current-axe-image").attr("src", "img/axe_rune.png");
			$("#current-axe-text").text("Rune Axe");
		}
	}
	
	if (currentLevel < 80) {
		$("#dragon-axe-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#dragon-axe-level-text").attr("class", "badge badge-danger");
		$("#dragon-axe-level-text").text("Insufficient Level");
	}
	else {
		if (axePurchased[6] == 0) {
			$("#dragon-axe-button").attr("class", "btn btn-primary btn-sm");
			$("#dragon-axe-level-text").attr("class", "badge badge-primary");
			$("#dragon-axe-level-text").text("Available");
		}
		else {
			$("#dragon-axe-button").attr("class", "btn btn-success btn-sm disabled");
			$("#dragon-axe-button").text("Upgraded");
			$("#dragon-axe-level-text").attr("class", "badge badge-success");
			$("#dragon-axe-level-text").text("Upgraded");
			$("#current-axe-image").attr("src", "img/axe_dragon.png");
			$("#current-axe-text").text("Dragon Axe");
		}
	}
	
	if (currentLevel < 95) {
		$("#3rdage-axe-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#3rdage-axe-level-text").attr("class", "badge badge-danger");
		$("#3rdage-axe-level-text").text("Insufficient Level");
	}
	else {
		if (axePurchased[7] == 0) {
			$("#3rdage-axe-button").attr("class", "btn btn-primary btn-sm");
			$("#3rdage-axe-level-text").attr("class", "badge badge-primary");
			$("#3rdage-axe-level-text").text("Available");
		}
		else {
			$("#3rdage-axe-button").attr("class", "btn btn-success btn-sm disabled");
			$("#3rdage-axe-button").text("Upgraded");
			$("#3rdage-axe-level-text").attr("class", "badge badge-success");
			$("#3rdage-axe-level-text").text("Upgraded");
			$("#current-axe-image").attr("src", "img/axe_3rdage.png");
			$("#current-axe-text").text("3rd Age Axe");
		}
	}
	
}

//Handle screen display for buying bank upgrades
function updateBankUpgrades() {
	
	if (currentLevel < 10) {
		$("#bank-1-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#bank-1-level-text").attr("class", "badge badge-danger");
		$("#bank-1-level-text").text("Insufficient Level");
	}
	else {
		if (bankUpgradePurchased[0] == 0) {
			$("#bank-1-button").attr("class", "btn btn-primary btn-sm");
			$("#bank-1-level-text").attr("class", "badge badge-primary");
			$("#bank-1-level-text").text("Available");
		}
		else {
			$("#bank-1-button").attr("class", "btn btn-success btn-sm disabled");
			$("#bank-1-button").text("Upgraded");
			$("#bank-1-level-text").attr("class", "badge badge-success");
			$("#bank-1-level-text").text("Upgraded");
		}
	}
	
	if (currentLevel < 20) {
		$("#bank-2-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#bank-2-level-text").attr("class", "badge badge-danger");
		$("#bank-2-level-text").text("Insufficient Level");
	}
	else {
		if (bankUpgradePurchased[1] == 0) {
			$("#bank-2-button").attr("class", "btn btn-primary btn-sm");
			$("#bank-2-level-text").attr("class", "badge badge-primary");
			$("#bank-2-level-text").text("Available");
		}
		else {
			$("#bank-2-button").attr("class", "btn btn-success btn-sm disabled");
			$("#bank-2-button").text("Upgraded");
			$("#bank-2-level-text").attr("class", "badge badge-success");
			$("#bank-2-level-text").text("Upgraded");
		}
	}
	
	if (currentLevel < 30) {
		$("#bank-3-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#bank-3-level-text").attr("class", "badge badge-danger");
		$("#bank-3-level-text").text("Insufficient Level");
	}
	else {
		if (bankUpgradePurchased[2] == 0) {
			$("#bank-3-button").attr("class", "btn btn-primary btn-sm");
			$("#bank-3-level-text").attr("class", "badge badge-primary");
			$("#bank-3-level-text").text("Available");
		}
		else {
			$("#bank-3-button").attr("class", "btn btn-success btn-sm disabled");
			$("#bank-3-button").text("Upgraded");
			$("#bank-3-level-text").attr("class", "badge badge-success");
			$("#bank-3-level-text").text("Upgraded");
		}
	}
	
	if (currentLevel < 40) {
		$("#bank-4-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#bank-4-level-text").attr("class", "badge badge-danger");
		$("#bank-4-level-text").text("Insufficient Level");
	}
	else {
		if (bankUpgradePurchased[3] == 0) {
			$("#bank-4-button").attr("class", "btn btn-primary btn-sm");
			$("#bank-4-level-text").attr("class", "badge badge-primary");
			$("#bank-4-level-text").text("Available");
		}
		else {
			$("#bank-4-button").attr("class", "btn btn-success btn-sm disabled");
			$("#bank-4-button").text("Upgraded");
			$("#bank-4-level-text").attr("class", "badge badge-success");
			$("#bank-4-level-text").text("Upgraded");
		}
	}
	
	if (currentLevel < 50) {
		$("#bank-5-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#bank-5-level-text").attr("class", "badge badge-danger");
		$("#bank-5-level-text").text("Insufficient Level");
	}
	else {
		if (bankUpgradePurchased[4] == 0) {
			$("#bank-5-button").attr("class", "btn btn-primary btn-sm");
			$("#bank-5-level-text").attr("class", "badge badge-primary");
			$("#bank-5-level-text").text("Available");
		}
		else {
			$("#bank-5-button").attr("class", "btn btn-success btn-sm disabled");
			$("#bank-5-button").text("Upgraded");
			$("#bank-5-level-text").attr("class", "badge badge-success");
			$("#bank-5-level-text").text("Upgraded");
		}
	}
	
	if (currentLevel < 60) {
		$("#bank-6-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#bank-6-level-text").attr("class", "badge badge-danger");
		$("#bank-6-level-text").text("Insufficient Level");
	}
	else {
		if (bankUpgradePurchased[5] == 0) {
			$("#bank-6-button").attr("class", "btn btn-primary btn-sm");
			$("#bank-6-level-text").attr("class", "badge badge-primary");
			$("#bank-6-level-text").text("Available");
		}
		else {
			$("#bank-6-button").attr("class", "btn btn-success btn-sm disabled");
			$("#bank-6-button").text("Upgraded");
			$("#bank-6-level-text").attr("class", "badge badge-success");
			$("#bank-6-level-text").text("Upgraded");
		}
	}
	
	if (currentLevel < 70) {
		$("#bank-7-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#bank-7-level-text").attr("class", "badge badge-danger");
		$("#bank-7-level-text").text("Insufficient Level");
	}
	else {
		if (bankUpgradePurchased[6] == 0) {
			$("#bank-7-button").attr("class", "btn btn-primary btn-sm");
			$("#bank-7-level-text").attr("class", "badge badge-primary");
			$("#bank-7-level-text").text("Available");
		}
		else {
			$("#bank-7-button").attr("class", "btn btn-success btn-sm disabled");
			$("#bank-7-button").text("Upgraded");
			$("#bank-7-level-text").attr("class", "badge badge-success");
			$("#bank-7-level-text").text("Upgraded");
		}
	}
	
	if (currentLevel < 80) {
		$("#bank-8-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#bank-8-level-text").attr("class", "badge badge-danger");
		$("#bank-8-level-text").text("Insufficient Level");
	}
	else {
		if (bankUpgradePurchased[7] == 0) {
			$("#bank-8-button").attr("class", "btn btn-primary btn-sm");
			$("#bank-8-level-text").attr("class", "badge badge-primary");
			$("#bank-8-level-text").text("Available");
		}
		else {
			$("#bank-8-button").attr("class", "btn btn-success btn-sm disabled");
			$("#bank-8-button").text("Upgraded");
			$("#bank-8-level-text").attr("class", "badge badge-success");
			$("#bank-8-level-text").text("Upgraded");
		}
	}
	
	if (currentLevel < 90) {
		$("#bank-9-button").attr("class", "btn btn-primary btn-sm disabled");
		$("#bank-9-level-text").attr("class", "badge badge-danger");
		$("#bank-9-level-text").text("Insufficient Level");
	}
	else {
		if (bankUpgradePurchased[8] == 0) {
			$("#bank-9-button").attr("class", "btn btn-primary btn-sm");
			$("#bank-9-level-text").attr("class", "badge badge-primary");
			$("#bank-9-level-text").text("Available");
		}
		else {
			$("#bank-9-button").attr("class", "btn btn-success btn-sm disabled");
			$("#bank-9-button").text("Upgraded");
			$("#bank-9-level-text").attr("class", "badge badge-success");
			$("#bank-9-level-text").text("Upgraded");
		}
	}
	
}

function updateBank() {
	
	if (logsInBank[0] > 0) {
		$("#b-normal-logs").attr("class", "");
		$("#b-normal-qty").text(logsInBank[0]);
	}
	else {
		$("#b-normal-logs").attr("class", "d-none");
	}
	
	if (logsInBank[1] > 0) {
		$("#b-oak-logs").attr("class", "");
		$("#b-oak-qty").text(logsInBank[1]);
	}
	else {
		$("#b-oak-logs").attr("class", "d-none");
	}
	
	if (logsInBank[2] > 0) {
		$("#b-willow-logs").attr("class", "");
		$("#b-willow-qty").text(logsInBank[2]);
	}
	else {
		$("#b-willow-logs").attr("class", "d-none");
	}
	
	if (logsInBank[3] > 0) {
		$("#b-teak-logs").attr("class", "");
		$("#b-teak-qty").text(logsInBank[3]);
	}
	else {
		$("#b-teak-logs").attr("class", "d-none");
	}
	
	if (logsInBank[4] > 0) {
		$("#b-maple-logs").attr("class", "");
		$("#b-maple-qty").text(logsInBank[4]);
	}
	else {
		$("#b-maple-logs").attr("class", "d-none");
	}
	
	if (logsInBank[5] > 0) {
		$("#b-mahogany-logs").attr("class", "");
		$("#b-mahogany-qty").text(logsInBank[5]);
	}
	else {
		$("#b-mahogany-logs").attr("class", "d-none");
	}
	
	if (logsInBank[6] > 0) {
		$("#b-yew-logs").attr("class", "");
		$("#b-yew-qty").text(logsInBank[6]);
	}
	else {
		$("#b-yew-logs").attr("class", "d-none");
	}
	
	if (logsInBank[7] > 0) {
		$("#b-magic-logs").attr("class", "");
		$("#b-magic-qty").text(logsInBank[7]);
	}
	else {
		$("#b-magic-logs").attr("class", "d-none");
	}
	
	if (logsInBank[8] > 0) {
		$("#b-redwood-logs").attr("class", "");
		$("#b-redwood-qty").text(logsInBank[8]);
	}
	else {
		$("#b-redwood-logs").attr("class", "d-none");
	}
	
}

function sellLogs(tree) {
	
	gp = gp + (logsCost[tree] * logsInBank[tree]);
	currentBank = currentBank - logsInBank[tree];
	logsInBank[tree] = 0;
	$("#current-bank-text").text(currentBank);
	$("#gp").text(gp);
	updateBank();
	
}

function stopAutomation() {
	
	if(automate) {
		for (i=0; i<=8; ++i) {
			if(isAutomating[i] == 1) {
				automation(i+1);
			}
		}
	}
	
}


//RANDOM EVENT STUFF

function randomEvent(eventID) {
	
	if (!eventInProgress) {
		//Figure out what trees can be cut
		var treesCanCut = 0;
			
		for (i=0; i<=8; ++i) {
			if (treeLevelAchieved[i] == 1) {
				treesCanCut++;
			}
		}
			
		//Tell the system an event is in progress
		eventInProgress = true;
		//Stop current automation
		//stopAutomation();
			
		//Update Event variables, while defining a random tree for event
		randomEventID = eventID;
		eventTreeID = Math.floor(Math.random()*(treesCanCut+1));
			
		//Update the screen
		updateScreen();
			
		//Set timeout for event to finish (20 seconds)
		eventTimeout = setTimeout(function() {
			eventInProgress = false;
			if(randomEventID == 2) {
				xpMultiplier = 1;
			}
			if(randomEventID == 3) {
				logsMultiplier = 1;
			}
			if(randomEventID == 4) {
				interval = 2000;
				resetInterval();
			}
			updateScreen();
			$.notify(
				"The event had ended!",
				{ position:"top right", className: 'success', showDuration: 400, autoHideDelay: 3000, showAnimation: 'slideDown', hideAnimation: 'slideUp', }
			);
			
		}, 20000);
		
		//Notify about the event
		$.notify(
			"An event has started!",
			{ position:"top right", className: 'success', showDuration: 400, autoHideDelay: 3000, showAnimation: 'slideDown', hideAnimation: 'slideUp', }
		);
	}
	else {
		
		console.log("A random event tried to start, but there's already one running.");
		
	}
	
	return eventTimeout;
	
}

function randomEventCheck(chance) {
	
	if (chance == 1) {
		var randomEventToRun = Math.floor(Math.random()*(3))+2;
		randomEvent(randomEventToRun);
	}
	
	
}
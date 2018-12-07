var fmXP = 0;
var fmNextLevelProgress = 0;
var fmCurrentLevel = 1;
var fmCurrentLevelXP = 0;
var fmNextLevelXP = exp.level_to_xp(fmCurrentLevel+1);
var fmInterval = 4000;
var fmBonfireInterval = [0,15000,30000,60000,120000,300000,600000,900000,1200000];
var bonfireLevel = 0;
var selectedLog = 0;
var autoBurnLog = 0;

var fmBonfireActive = false;
var isBurning = false;
var isAutoBurning = false;
var autoBurningLog = null;
var fmAutomate = null;

var fmLogs = ["normal","oak","willow","teak","maple","mahogany","yew","magic","redwood"];
var fmLogsXP = [15,25,40,60,95,120,160,205,300];
var fmLogsLevel = [1,15,30,35,45,50,60,75,90];
var bonfireUpgradeCost = [100,100,200,250,325,400,500,500,500];
var bonfireUpgradeLogs = [0,1,2,3,4,5,6,7,8];
var bonfireXPBonus = [0,5,10,15,20,25,30,35,40,45];
var bonfireDuration = [15,30,60,120,180,300,600,900,1200];

var fmMilestoneAchieved = [0,0,0,0,0,0,0,0,0,0];

var fmStatGPBurnt = 0;
var fmStatLogsBurnt = 0;

function burnLogs(log) {
	
	if (logsInBank[log] > 0) {
		
		$("#fm-burn-logs").attr("class", "btn btn-warning disabled");
		$("#fm-add-to-bonfire").attr("class", "btn btn-primary btn-sm disabled");
		logsInBank[log]--;
		isBurning = true;
		fmUpdateScreen();
		
		window.setTimeout(function (keepLog) { return function() {
			
			if (fmBonfireActive) {
				fmXP = Math.floor(fmXP + (fmLogsXP[keepLog] + (bonfireXPBonus[bonfireLevel-1] / 100 * fmLogsXP[keepLog])));
			}
			else {
				fmXP+=fmLogsXP[keepLog];
			}
			
			//Get XP required for next level
			fmNextLevelXP = exp.level_to_xp(fmCurrentLevel+1);
		
			//If current XP is greater than the required xp for next level, perform the level up function
			if (fmXP >= fmNextLevelXP) {
				fmLevelUp(fmXP);
			}
			else {				
				fmUpdateLevelProgress();
			}
			
			fmStatLogsBurnt++;
			fmStatGPBurnt+=logsCost[keepLog];
			
			isBurning = false;
			$("#fm-burn-progress").stop(true,false).animate({width: "0%"}, 0, "linear");
			
			fmUpdateScreen();

			
		}} (log), fmInterval);
		
		$("#fm-burn-progress").animate({width: "100%"}, fmInterval, "linear");
		
		
	}
	else {
		if (isAutoBurning) { automateBurn(log); }
	}
	
}

function startAutoBurn() {
	
	//If this tree is already being automated, disable the automation and update the buttons
	if (isAutoBurning) {
		
		$("#fm-autoburn").attr("class", "btn btn-outline-warning btn-sm disabled");
		$("#fm-autoburn-log").text("");
		
		//Clear the current automation variable
		if (fmAutomate) { clearTimeout(fmAutomate); }
	
		setTimeout(function() { 
			fmUpdateScreen();
		}, fmInterval);
		
		isAutoBurning = false;
		fmAutomate = null;
		autoBurnLog = null;
						
	}
	else {
		
		//Clear the current automation variable so there is no double ups
		if(fmAutomate) { clearTimeout(fmAutomate); };
		
		//Update auto button text and disable the burn button
		$("#fm-autoburn").attr("class", "btn btn-warning btn-sm");
		isAutoBurning = true;
		fmUpdateScreen();
		autoBurningLog = selectedLog;
		
		//Set new automation to selected tree, but start it straight away
		automateBurn(autoBurningLog);
			
	}
	
	return fmAutomate;
	
}

function automateBurn() {
	
	if (logsInBank[autoBurningLog] > 0) {
		$("#fm-autoburn-log").text(fmLogs[autoBurningLog].charAt(0).toUpperCase() + fmLogs[autoBurningLog].slice(1) + " Logs");
		burnLogs(autoBurningLog);
		fmAutomate = setTimeout(function() { automateBurn(autoBurningLog); }, fmInterval);	
	}
	else {
		$("#fm-autoburn-log").text("Waiting for Logs");
		fmAutomate = setTimeout(function() { automateBurn(autoBurningLog); }, fmInterval);	
	}
	return fmAutomate;
}

function lightBonfire() {
	
	if (logsInBank[bonfireLevel-1] >= 10) {
		
		logsInBank[bonfireLevel-1]-=10;
		$("#fm-bonfire-progress").attr("style", "width:100%");
		$("#fm-bonfire-progress").animate({width: "0%"}, fmBonfireInterval[bonfireLevel-1], "linear");
		$("#fm-bonfire-status-image").attr("src", "img/bonfire_active.png");
		$("#fm-bonfire-status-text").text("Active");
		$("#fm-bonfire-status-text").attr("style", "color:green");
		fmBonfireActive = true;
		fmUpdateScreen();
		
		window.setTimeout(function () { 

			$("#fm-bonfire-progress").stop(true,false).animate({width: "0%"}, 0, "linear");
			$("#fm-bonfire-status-image").attr("src", "img/bonfire_inactive.png");
			$("#fm-bonfire-status-text").text("Inactive");
			$("#fm-bonfire-status-text").attr("style", "color:red");
			fmBonfireActive = false;
			fmUpdateScreen();
			
		}, fmBonfireInterval[bonfireLevel-1]);
		
	}
	
}

function fmUpdateLevelProgress() {
	
	//Check amount of XP required for current level
	fmCurrentLevelXP = exp.level_to_xp(fmCurrentLevel);
	
	//Figure out next level progress percentage
	fmNextLevelProgress = (fmXP - fmCurrentLevelXP) / (fmNextLevelXP - fmCurrentLevelXP) * 100;
	fmNextLevelProgress = Math.floor(fmNextLevelProgress);
	
}

function fmLevelUp(xp) {
	
	//Add one to current level
	fmCurrentLevel++;
	
	//Check amount of XP required for current level
	fmCurrentLevelXP = exp.level_to_xp(fmCurrentLevel);
	
	//Check amount of XP for next level
	fmNextLevelXP = exp.level_to_xp(fmCurrentLevel + 1);
	
	//Update next level progress, and convert to a percentage
	fmNextLevelProgress = (fmXP - fmCurrentLevelXP) / (fmNextLevelXP - fmCurrentLevelXP) * 100;
	fmNextLevelProgress = Math.floor(fmNextLevelProgress);
	
	//Notify the player of a level up
	$("#current-fm-level").notify(
		"Level Up!",
		{ position:"bottom", className: 'success', showDuration: 100, autoHideDelay: 3000, arrowShow: true}
	);
	
};


function fmSetLogs(logs) {
	
	$("#fm-setlogs-img").attr("src", "img/"+fmLogs[logs]+"_logs.png");
	$("#fm-setlogs-qty").text(logsInBank[logs]);
	$("#fm-setlogs-selected").text(fmLogs[logs].charAt(0).toUpperCase() + fmLogs[logs].slice(1) + " Logs");
	
	$("#fm-burn-logs").attr("onclick", "burnLogs("+logs+"); return false;");
	$("#fm-setlogs-level").text("Level: "+fmLogsLevel[logs]);
	
	if (fmCurrentLevel < fmLogsLevel[logs]) {
		$("#fm-setlogs-level").attr("style", "color:red");
	}
	else {
		$("#fm-setlogs-level").attr("style", "");
	}
	
	selectedLog = logs;
	fmUpdateScreen();
	
}

function fmUpdateScreen() {
	
	$("#fm-setlogs-qty").text(logsInBank[selectedLog]);
	
	//This function updates the data on the screen
	$("#gp").text(convertGP(gp));
	$("#fm-current-xp").text(fmXP);
	$("#fm-xp-required").text(fmNextLevelXP);
	$("#fm-current-level-text").text(fmCurrentLevel);
	$("#fm-next-level-progress").text(fmNextLevelProgress + "%");
	
	$("#fm-next-level-progress").css("width", fmNextLevelProgress + "%");
	
	fmUpdateLogs();
	fmUpdateStats();
	updateCurrentBank();
	updateBonfireShop();
	fmUpdateMilestones();
	
	if (fmCurrentLevel < fmLogsLevel[selectedLog]) {
		$("#fm-setlogs-level").attr("style", "color:red");
	}
	else {
		$("#fm-setlogs-level").attr("style", "");
	}
	
	if (bonfireLevel == 0) {
		$("#fm-bonfire-cost").text("");	
	}
	else {
		$("#fm-bonfire-cost").text("10 " + fmLogs[bonfireLevel-1].charAt(0).toUpperCase() + fmLogs[bonfireLevel-1].slice(1) + " Logs");	
	}
	
	$("#fm-bonfire-bonus").text(bonfireXPBonus[bonfireLevel]+"%");
	$("#fm-bonfire-bonus").attr("style", "color:green");
	$("#fm-bonfire-level-text").text(bonfireLevel);
	
	//Auto save	
	saveData(0);
	

}

function fmUpdateLogs() {
	
	if (logsInBank[selectedLog] == 0 || fmCurrentLevel < fmLogsLevel[selectedLog] || isBurning || isAutoBurning) {
		$("#fm-burn-logs").attr("class", "btn btn-warning disabled");		
	}
	else {
		$("#fm-burn-logs").attr("class", "btn btn-warning");	
	}
	
	if (isAutoBurning) {
		$("#fm-autoburn").attr("class", "btn btn-warning btn-sm");
	}
	else if ((isBurning && !isAutoBurning) || fmMilestoneAchieved[selectedLog] != 1 || logsInBank[selectedLog] == 0) {
		$("#fm-autoburn").attr("class", "btn btn-outline-warning btn-sm disabled");
	}
	else if (!isBurning && !isAutoBurning && fmMilestoneAchieved[selectedLog] == 1 && logsInBank[selectedLog] > 0) {
		$("#fm-autoburn").attr("class", "btn btn-outline-warning btn-sm");
	}
	
	if (bonfireLevel > 0 && !fmBonfireActive && logsInBank[bonfireLevel-1] > 10) {
		$("#fm-light-bonfire").attr("class", "btn btn-primary btn-sm");
	}
	else {
		$("#fm-light-bonfire").attr("class", "btn btn-primary btn-sm disabled");
	}
	
}

function fmUpdateMilestones() {
	
	if (fmCurrentLevel >= 5) {
		if (fmMilestoneAchieved[0] != 1) { fmMilestoneAchieved[0] = 1; milestoneNotify("firemaking"); }
		$("#m-auto-burn-tree").attr("class", "badge badge-success");
		$("#m-auto-burn-tree").text("Unlocked");
	}
	
	if (fmCurrentLevel >= 20) {
		if (fmMilestoneAchieved[1] != 1) { fmMilestoneAchieved[1] = 1; milestoneNotify("firemaking"); }
		$("#m-auto-burn-oak").attr("class", "badge badge-success");
		$("#m-auto-burn-oak").text("Unlocked");
	}
	
	if (fmCurrentLevel >= 35) {
		if (fmMilestoneAchieved[2] != 1) { fmMilestoneAchieved[2] = 1; milestoneNotify("firemaking"); }
		$("#m-auto-burn-willow").attr("class", "badge badge-success");
		$("#m-auto-burn-willow").text("Unlocked");
	}
	
	if (fmCurrentLevel >= 40) {
		if (fmMilestoneAchieved[3] != 1) { fmMilestoneAchieved[3] = 1; milestoneNotify("firemaking"); }
		$("#m-auto-burn-teak").attr("class", "badge badge-success");
		$("#m-auto-burn-teak").text("Unlocked");
	}
	
	if (fmCurrentLevel >= 50) {
		if (fmMilestoneAchieved[4] != 1) { fmMilestoneAchieved[4] = 1; milestoneNotify("firemaking"); }
		$("#m-auto-burn-maple").attr("class", "badge badge-success");
		$("#m-auto-burn-maple").text("Unlocked");
	}
	
	if (fmCurrentLevel >= 55) {
		if (fmMilestoneAchieved[5] != 1) { fmMilestoneAchieved[5] = 1; milestoneNotify("firemaking"); }
		$("#m-auto-burn-mahogany").attr("class", "badge badge-success");
		$("#m-auto-burn-mahogany").text("Unlocked");
	}
	
	if (fmCurrentLevel >= 65) {
		if (fmMilestoneAchieved[6] != 1) { fmMilestoneAchieved[6] = 1; milestoneNotify("firemaking"); }
		$("#m-auto-burn-yew").attr("class", "badge badge-success");
		$("#m-auto-burn-yew").text("Unlocked");
	}
	
	if (fmCurrentLevel >= 80) {
		if (fmMilestoneAchieved[7] != 1) { fmMilestoneAchieved[7] = 1; milestoneNotify("firemaking"); }
		$("#m-auto-burn-magic").attr("class", "badge badge-success");
		$("#m-auto-burn-magic").text("Unlocked");
	}
	
	if (fmCurrentLevel >= 95) {
		if (fmMilestoneAchieved[8] != 1) { fmMilestoneAchieved[8] = 1; milestoneNotify("firemaking"); }
		$("#m-auto-burn-redwood").attr("class", "badge badge-success");
		$("#m-auto-burn-redwood").text("Unlocked");
	}
	
	if (fmCurrentLevel >= 99) {
		if (fmMilestoneAchieved[9] != 1) { fmMilestoneAchieved[9] = 1; milestoneNotify("firemaking"); }
		$("#m-fm-skill-mastery").attr("class", "badge badge-success");
		$("#m-fm-skill-mastery").text("Unlocked");
	}
	
}

function fmUpgradeBonfire() {
	
	if (logsInBank[bonfireUpgradeLogs[bonfireLevel]] >= bonfireUpgradeCost[bonfireLevel]) {
		
		logsInBank[bonfireUpgradeLogs[bonfireLevel]] -= bonfireUpgradeCost[bonfireLevel];
		bonfireLevel++;
		
		updateBonfireShop();
		updateScreen();
		
	}
	
}

function updateBonfireShop() {
	
	if(bonfireLevel < 9) {
			
		$("#bonfire-level-upgrade").text("Upgrade to Level " + (bonfireLevel+1));
		$("#bonfire-upgrade-cost-image").attr("src", "img/"+fmLogs[bonfireLevel]+"_logs.png");
		$("#bonfire-upgrade-cost").text(bonfireUpgradeCost[bonfireLevel]);
		$("#bonfire-upgrade-bonus-text").text("XP Bonus: " + bonfireXPBonus[bonfireLevel] + "%");
		$("#bonfire-upgrade-logs").text(fmLogs[bonfireLevel].charAt(0).toUpperCase() + fmLogs[bonfireLevel].slice(1) + " Logs");
		$("#bonfire-upgrade-logs-2").text("Requires 10 " + fmLogs[bonfireLevel].charAt(0).toUpperCase() + fmLogs[bonfireLevel].slice(1) + " Logs to light");
		$("#bonfire-upgrade-duration-text").text("Duration: " + bonfireDuration[bonfireLevel] + " seconds");

			
	}
	else {
			
		$("#bonfire-level-upgrade").text("Maxed");
		$("#bonfire-upgrade-cost-image").attr("src", "");
		$("#bonfire-upgrade-cost").text("");
		$("#bonfire-upgrade-bonus-text").text("");
		$("#bonfire-upgrade-logs").text("");
		$("#bonfire-upgrade-logs-2").text("");
		$("#bonfire-upgrade-duration-text").text("");
			
		$("#bonfire-upgrade-button").attr("class", "btn btn-warning btn-sm disabled");

		}
	
}

function fmUpdateStats() {
	
	$("#s-logs-burnt").text(fmStatLogsBurnt);
	$("#s-gp-burnt").text(fmStatGPBurnt);
	
}

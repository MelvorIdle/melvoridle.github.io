var fishingAutomate = null;
var isAutoFishing = false;
var fishingKeepButtonDisabled = false;
var fishingXP = 0;
var fishingNextLevelProgress = 0;
var fishingCurrentLevel = 1;
var fishingCurrentLevelXP = 0;
var fishingNextLevelXP = exp.level_to_xp(fishingCurrentLevel+1);
var fishingInterval = 4000;
var fishingLocations = ["lumbridge","draynor","karamja","barbarian","seers","fishingguild","taverley","deepseas"];
var fish = ["shrimp","sardine","herring","trout","salmon","lobster","swordfish","crab","shark","cavefish","mantaray","whale"];
var fishLevels = [1,5,10,20,35,40,50,60,70,75,85,95];
var fishXP = [5,10,15,20,40,50,80,120,150,225,1000,2500];
var fishCost = [1,5,10,20,40,25,50,30,100,200,1000,2500];
var fishInBank = [0,0,0,0,0,0,0,0,0,0,0,0];
var fishingIsAutomating = [0,0,0,0,0,0,0,0];
var fishingMilestoneAchieved = [0,0,0,0,0,0,0,0,0,0];
var fishAvailable;
var fishAmount;
var isFishing = false;
var currentFishingRod = 0;
var fishingRodPurchased = [1,0,0,0,0,0,0,0,0];
var fishingRodBonusInterval = [0,5,10,15,20,25,30,35,40];
var fishingRodBonusXP = [0,5,10,15,20,25,30,35,40];
var fishingRodCost = [0,1000,10000,25000,100000,500000,1000000,5000000,10000000]
var fishingRodLevelRequirement = [0,5,10,20,35,50,60,80,90];
var fishingRods = ["bronze","iron","steel","black","mithril","adamant","rune","dragon","3rdage"];
var fishingRodImage = 0;
var fishingCurrentLocation = 0;

var statFishCaught = 0;
var statFishSold = 0;
var statFishGPEarned = 0;

var fishingMilestoneAchieved = [0,0,0,0];


function startFishing(getLocation) {
	
	if (currentBank < bankMax ) {
	
		if (fishingIsAutomating[getLocation] != 1) {
			isFishing = true;
			fishingUpdateScreen();
		}
		else {
			$("#fish-"+fishingLocations[getLocation]).attr("class", "btn btn-success disabled");
			$("#fish-"+fishingLocations[getLocation]).attr("disabled", "disabled");
		}
		
		if (getLocation == 7) { 
			fishingInterval = Math.floor(28000 - (fishingRodBonusInterval[currentFishingRod] / 100 * 28000));
		}
		
		updateFishLocations();
		
		
		window.setTimeout(function(keepGetLocation) { return function() {
			
			//Check which location is being fished and assign correct possible fish available.
			switch (keepGetLocation) {
				
				//shrimp, sardine
				case 0:
					fishAvailable = [0,1];
					break;
				
				//shrimp, herring
				case 1:
					fishAvailable = [0,2];
					break;
				
				//sardine, herring, trout, salmon
				case 2:
					fishAvailable = [1,2,3,4];
					break;
			
				//shrimp, trout, salmon
				case 3:
					if (fishingCurrentLevel < 35) {
						fishAvailable = [0,3,4];
					}
					else {
						fishAvailable = [3,4];
					}
					break;
			
				//herring, lobster, shark
				case 4:
					if (fishingCurrentLevel < 60) {
						fishAvailable = [2,5,8];
					}
					else {
						fishAvailable = [5,8];
					}
					break;
			
				//herring, lobster, swordfish, shark
				case 5:
					if (fishingCurrentLevel < 70) {
						fishAvailable = [2,5,6,8];
					}
					else {
						fishAvailable = [5,6,8];
					}
					break;
			
				//crab, cavefish
				case 6:
					fishAvailable = [7,9];
					break;
			
				//mantaray, whale
				case 7:
					fishAvailable = [10,11];
					break;
			
			}
		
			var count = 0;
			for (i=0; i<=fishAvailable.length; i++) {
				if (fishingCurrentLevel >= fishLevels[fishAvailable[i]]) {
					count++;
				}
			}
		
			//Pick which fish to catch
			var fishToCatch;
			if (count > 1) {
				fishToCatch = Math.floor(Math.random()*(count));
			}
			else if (count == 1) {
				fishToCatch = 0;
			}
		
			if(fishingIsAutomating[keepGetLocation] == 1 && !isFishing && !fishingKeepButtonDisabled) {
				$("#fish-"+fishingLocations[keepGetLocation]+"-auto").attr("class", "btn btn-info");
				$("#fish-"+fishingLocations[keepGetLocation]+"-auto").removeAttr("disabled");
			}
		
			//Re-enable Fish button
			$("#fish-"+fishingLocations[keepGetLocation]).attr("class", "btn btn-success");
			$("#fish-"+fishingLocations[keepGetLocation]).removeAttr("disabled");
			
			
			if (currentBank < bankMax ) {
				//Update XP
				if (currentFishingRod == 0) {
					fishingXP = fishingXP + fishXP[fishAvailable[fishToCatch]];
				}
				else {
					fishingXP = Math.floor(fishingXP + (fishXP[fishAvailable[fishToCatch]] + (fishingRodBonusXP[currentFishingRod] / 100 * fishXP[fishAvailable[fishToCatch]])));
				}
				//Update Bank
				fishInBank[fishAvailable[fishToCatch]] = fishInBank[fishAvailable[fishToCatch]]+1;
				//Update Stats
				statFishCaught++;
				updateFishingStats();
				
				$("#fishing-rod-1").notify(
					"<img src='img/"+fish[fishAvailable[fishToCatch]]+"2.png'>",
					{ position:"right", className: 'success', showDuration: 400, autoHideDelay: 2000, showAnimation: 'slideDown', hideAnimation: 'slideUp', arrowShow: false }
				);
			}
			else {
				if(fishingAutomate) {
					startAutoFishing(keepGetLocation);
				}
			}
			
		
			
		
			//Get XP required for next level
			fishingNextLevelXP = exp.level_to_xp(fishingCurrentLevel+1);
		
			//If current XP is greater than the required xp for next level, perform the level up function
			if (fishingXP >= fishingNextLevelXP) {
				fishingLevelUp(fishingXP);
			}
			else {				
				fishingUpdateLevelProgress();
			}
		
			if (fishingIsAutomating[keepGetLocation] == 0) {
				isFishing = false;
			}
			
			
		
			
			fishingInterval = 4000;
			resetFishingInterval();
			updateCurrentBank();
			fishingUpdateScreen();
		
			//Reset fishing progress bar
			$("#fish-"+fishingLocations[keepGetLocation]+"-progress").stop(true,false).animate({width: "0%"}, 0, "linear");
	
		}} (getLocation), fishingInterval);
	
		//Animate the progress bar for cutting trees
		$("#fish-"+fishingLocations[getLocation]+"-progress").animate({width: "100%"}, fishingInterval, "linear");
		$("#fish-"+fishingLocations[getLocation]+"-progress").animate({width: "0%"}, 0, "linear");
		
		
	}
	else {
		$("#fish-"+fishingLocations[getLocation]+"-progress").stop(true, true).animate({width: "0%"}, 0, "linear");
		notify("bankFull");
		if(fishingAutomate) {
			automateFish(getLocation);
		}
	}
	
}

function startAutoFishing(autoLocation) {
	
	//If this tree is already being automated, disable the automation and update the buttons
	if (fishingIsAutomating[autoLocation] == 1) {
		
		$("#fish-"+fishingLocations[autoLocation]+"-auto").attr("class", "btn btn-outline-info disabled");
		$("#fish-"+fishingLocations[autoLocation]+"-auto").attr("disabled", "disabled");
		$("#fish-"+fishingLocations[autoLocation]+"-auto").text("Disabling Auto Fish");
		
		fishingKeepButtonDisabled = true;
		//updateScreen();
		
		//Clear the current automation variable
		clearTimeout(fishingAutomate);
		
		//Update the buttons, re-enabling the fish button and changing the text on the auto button after set time, but make sure there isn't an event in progress
		//if (!eventInProgress) {
			setTimeout(function(getLocationKeep) { return function() {
				$("#fish-"+fishingLocations[getLocationKeep]).attr("class", "btn btn-success");
				$("#fish-"+fishingLocations[getLocationKeep]).removeAttr("disabled");
				$("#fish-"+fishingLocations[getLocationKeep]+"-auto").attr("class", "btn btn-outline-info");
				$("#fish-"+fishingLocations[getLocationKeep]+"-auto").removeAttr("disabled");
				$("#fish-"+fishingLocations[getLocationKeep]+"-auto").text("Enable Auto Fish");
				fishingIsAutomating[getLocationKeep] = 0;
				fishingKeepButtonDisabled = false;
				fishingUpdateScreen();
			}} (autoLocation), fishingInterval);
		//}
		//else {
			fishingIsAutomating[autoLocation] = 0;
			$("#fish-"+fishingLocations[autoLocation]+"-auto").text("Enable Auto Fish");
			fishingKeepButtonDisabled = false;
		//}
		
		//Reset automate variable
		fishingAutomateFish = null;
		fishingAutomate = null;
						
	}
	else {
		

		//Clear the current automation variable so there is no double ups
		if(fishingAutomate) { clearTimeout(fishingAutomate); };
		
		//Check for current automations, stop respective automation for other trees and update its button
		for (i = 0; i <= 8; ++i) {
			if (fishingIsAutomating[i] == 1) {
				fishingIsAutomating[i] = 0;
				$("#fish-"+fishingLocations[i]+"-auto").attr("class", "btn btn-outline-info");
				$("#fish-"+fishingLocations[i]+"-auto").removeAttr("disabled");
				$("#fish-"+fishingLocations[i]+"-auto").text("Enable Auto Fish");
			}
		}
		
		fishingKeepButtonDisabled = true;
		
		//Tell the system it is currently in automation
		fishingIsAutomating[autoLocation] = 1;
		
		//Update auto button text and disable the fish button
		$("#fish-"+fishingLocations[autoLocation]).attr("class", "btn btn-success disabled");
		$("#fish-"+fishingLocations[autoLocation]).attr("disabled", "disabled");
		$("#fish-"+fishingLocations[autoLocation]+"-auto").attr("class", "btn btn-info disabled");
		$("#fish-"+fishingLocations[autoLocation]+"-auto").attr("disabled", "disabled");
		$("#fish-"+fishingLocations[autoLocation]+"-auto").text("Disable Auto fish");
		
		fishingUpdateScreen();
		
		setTimeout(function() { fishingKeepButtonDisabled = false; fishingUpdateScreen(); }, fishingInterval);
		
		//Set new automation to selected tree, but start it straight away
		automateFish(autoLocation);
			
	}
	
	return fishingAutomate;
	
}

function automateFish(fishTest) {
	
	if (currentBank < bankMax ) {
		startFishing(fishTest);
		fishingAutomate = setTimeout(function() { automateFish(fishTest); }, fishingInterval);
	}
	else {
		fishingAutomate = setTimeout(function() { automateFish(fishTest); }, fishingInterval);
	}
	
}

function resetFishingInterval() {
	
	fishingInterval = Math.floor(fishingInterval - (fishingRodBonusInterval[currentFishingRod] / 100 * fishingInterval));
	
}

function fishingUpdateLevelProgress() {
	
	//Check amount of XP required for current level
	fishingCurrentLevelXP = exp.level_to_xp(fishingCurrentLevel);
	
	//Figure out next level progress percentage
	fishingNextLevelProgress = (fishingXP - fishingCurrentLevelXP) / (fishingNextLevelXP - fishingCurrentLevelXP) * 100;
	fishingNextLevelProgress = Math.floor(fishingNextLevelProgress);
	
}

function fishingLevelUp(xp) {
	
	//Add one to current level
	fishingCurrentLevel++;
	
	//Check amount of XP required for current level
	fishingCurrentLevelXP = exp.level_to_xp(fishingCurrentLevel);
	
	//Check amount of XP for next level
	fishingNextLevelXP = exp.level_to_xp(fishingCurrentLevel + 1);
	
	//Update next level progress, and convert to a percentage
	fishingNextLevelProgress = (fishingXP - fishingCurrentLevelXP) / (fishingNextLevelXP - fishingCurrentLevelXP) * 100;
	fishingNextLevelProgress = Math.floor(fishingNextLevelProgress);
	
	//Notify the player of a level up
	$("#current-fishing-level").notify(
		"Level Up!",
		{ position:"bottom", className: 'success', showDuration: 100, autoHideDelay: 3000, arrowShow: true}
	);
	
};

function fishingUpdateScreen() {
	
	//This function updates the data on the screen
	$("#gp").text(convertGP(gp));
	$("#fishing-current-xp").text(fishingXP);
	$("#fishing-xp-required").text(fishingNextLevelXP);
	$("#fishing-current-level-text").text(fishingCurrentLevel);
	$("#fishing-next-level-progress").text(fishingNextLevelProgress + "%");
	
	//Update level progress bar size
	$("#fishing-next-level-progress").css("width", fishingNextLevelProgress + "%");
	
	updateFish();
	updateFishLocations();
	updateFishingBank();
	updateFishingRods();
	fishingUpdateMilestones();
	
	//Auto save	
	saveData(0);
	
}

function updateFish() {
	
	//Level 1 Shrimp
	if (fishingCurrentLevel >= fishLevels[0]) {
		$("#"+fish[0]).attr("src", "img/"+fish[0]+".png");
		$("#"+fish[0]+"-2").attr("src", "img/"+fish[0]+".png");
		if (fishingCurrentLevel < 35) {
			$("#"+fish[0]+"-3").attr("src", "img/"+fish[0]+".png");
		}
		else {
			$("#"+fish[0]+"-3").attr("src", "img/"+fish[0]+"-no.png");
		}
	}
	
	//Level 5 Sardine
	if (fishingCurrentLevel >= fishLevels[1]) {
		$("#"+fish[1]).attr("src", "img/"+fish[1]+".png");
		$("#"+fish[1]+"-2").attr("src", "img/"+fish[1]+".png");
	}
	
	//Level 10 Herring
	if (fishingCurrentLevel >= fishLevels[2]) {
		$("#"+fish[2]).attr("src", "img/"+fish[2]+".png");
		$("#"+fish[2]+"-2").attr("src", "img/"+fish[2]+".png");
		if (fishingCurrentLevel < 60) {
			$("#"+fish[2]+"-3").attr("src", "img/"+fish[2]+".png");
		}
		else {
			$("#"+fish[2]+"-3").attr("src", "img/"+fish[2]+"-no.png");
		}
		if (fishingCurrentLevel < 70) {
			$("#"+fish[2]+"-4").attr("src", "img/"+fish[2]+".png");
		}
		else {
			$("#"+fish[2]+"-4").attr("src", "img/"+fish[2]+"-no.png");
		}
	}
	
	//Level 20 Trout
	if (fishingCurrentLevel >= fishLevels[3]) {
		$("#"+fish[3]).attr("src", "img/"+fish[3]+".png");
		$("#"+fish[3]+"-2").attr("src", "img/"+fish[3]+".png");
	}
	
	//Level 35 Salmon
	if (fishingCurrentLevel >= fishLevels[4]) {
		$("#"+fish[4]).attr("src", "img/"+fish[4]+".png");
		$("#"+fish[4]+"-2").attr("src", "img/"+fish[4]+".png");
	}
	
	//Level 40 Lobster
	if (fishingCurrentLevel >= fishLevels[5]) {
		$("#"+fish[5]).attr("src", "img/"+fish[5]+".png");
		$("#"+fish[5]+"-2").attr("src", "img/"+fish[5]+".png");
	}
	
	//Level 50 Swordfish
	if (fishingCurrentLevel >= fishLevels[6]) {
		$("#"+fish[6]).attr("src", "img/"+fish[6]+".png");
	}
	
	//Level 60 Crab
	if (fishingCurrentLevel >= fishLevels[7]) {
		$("#"+fish[7]).attr("src", "img/"+fish[7]+".png");
	}
	
	//Level 70 Shark
	if (fishingCurrentLevel >= fishLevels[8]) {
		$("#"+fish[8]).attr("src", "img/"+fish[8]+".png");
		$("#"+fish[8]+"-2").attr("src", "img/"+fish[8]+".png");
	}
	
	//Level 75 Cave Fish
	if (fishingCurrentLevel >= fishLevels[9]) {
		$("#"+fish[9]).attr("src", "img/"+fish[9]+".png");
	}
	
	//Level 85 Manta Ray
	if (fishingCurrentLevel >= fishLevels[10]) {
		$("#"+fish[10]).attr("src", "img/"+fish[10]+".png");
	}
	
	//Level 95 Whale
	if (fishingCurrentLevel >= fishLevels[11]) {
		$("#"+fish[11]).attr("src", "img/"+fish[11]+".png");
	}
	
	
	
}

function updateFishingBank() {
	
	if (fishInBank[0] > 0) {
		$("#b-"+fish[0]+"").attr("class", "col-sm-3");
		$("#b-"+fish[0]+"-qty").text(fishInBank[0]);
		$("#b-"+fish[0]+"-gp").text(fishInBank[0]*fishCost[0]);
	}
	else {
		$("#b-"+fish[0]+"").attr("class", "col-sm-3 d-none");
	}
	
	if (fishInBank[1] > 0) {
		$("#b-"+fish[1]+"").attr("class", "col-sm-3");
		$("#b-"+fish[1]+"-qty").text(fishInBank[1]);
		$("#b-"+fish[1]+"-gp").text(fishInBank[1]*fishCost[1]);
	}
	else {
		$("#b-"+fish[1]+"").attr("class", "col-sm-3 d-none");
	}
	
	if (fishInBank[2] > 0) {
		$("#b-"+fish[2]+"").attr("class", "col-sm-3");
		$("#b-"+fish[2]+"-qty").text(fishInBank[2]);
		$("#b-"+fish[2]+"-gp").text(fishInBank[2]*fishCost[2]);
	}
	else {
		$("#b-"+fish[2]+"").attr("class", "col-sm-3 d-none");
	}
	
	if (fishInBank[3] > 0) {
		$("#b-"+fish[3]+"").attr("class", "col-sm-3");
		$("#b-"+fish[3]+"-qty").text(fishInBank[3]);
		$("#b-"+fish[3]+"-gp").text(fishInBank[3]*fishCost[3]);
	}
	else {
		$("#b-"+fish[3]+"").attr("class", "col-sm-3 d-none");
	}
	
	if (fishInBank[4] > 0) {
		$("#b-"+fish[4]+"").attr("class", "col-sm-3");
		$("#b-"+fish[4]+"-qty").text(fishInBank[4]);
		$("#b-"+fish[4]+"-gp").text(fishInBank[4]*fishCost[4]);
	}
	else {
		$("#b-"+fish[4]+"").attr("class", "col-sm-3 d-none");
	}
	
	if (fishInBank[5] > 0) {
		$("#b-"+fish[5]+"").attr("class", "col-sm-3");
		$("#b-"+fish[5]+"-qty").text(fishInBank[5]);
		$("#b-"+fish[5]+"-gp").text(fishInBank[5]*fishCost[5]);
	}
	else {
		$("#b-"+fish[5]+"").attr("class", "col-sm-3 d-none");
	}
	
	if (fishInBank[6] > 0) {
		$("#b-"+fish[6]+"").attr("class", "col-sm-3");
		$("#b-"+fish[6]+"-qty").text(fishInBank[6]);
		$("#b-"+fish[6]+"-gp").text(fishInBank[6]*fishCost[6]);
	}
	else {
		$("#b-"+fish[6]+"").attr("class", "col-sm-3 d-none");
	}
	
	if (fishInBank[7] > 0) {
		$("#b-"+fish[7]+"").attr("class", "col-sm-3");
		$("#b-"+fish[7]+"-qty").text(fishInBank[7]);
		$("#b-"+fish[7]+"-gp").text(fishInBank[7]*fishCost[7]);
	}
	else {
		$("#b-"+fish[7]+"").attr("class", "col-sm-3 d-none");
	}
	
	if (fishInBank[8] > 0) {
		$("#b-"+fish[8]+"").attr("class", "col-sm-3");
		$("#b-"+fish[8]+"-qty").text(fishInBank[8]);
		$("#b-"+fish[8]+"-gp").text(fishInBank[8]*fishCost[8]);
	}
	else {
		$("#b-"+fish[8]+"").attr("class", "col-sm-3 d-none");
	}
	
	if (fishInBank[9] > 0) {
		$("#b-"+fish[9]+"").attr("class", "col-sm-3");
		$("#b-"+fish[9]+"-qty").text(fishInBank[9]);
		$("#b-"+fish[9]+"-gp").text(fishInBank[9]*fishCost[9]);
	}
	else {
		$("#b-"+fish[9]+"").attr("class", "col-sm-3 d-none");
	}
	
	if (fishInBank[10] > 0) {
		$("#b-"+fish[10]+"").attr("class", "col-sm-3");
		$("#b-"+fish[10]+"-qty").text(fishInBank[10]);
		$("#b-"+fish[10]+"-gp").text(fishInBank[10]*fishCost[10]);
	}
	else {
		$("#b-"+fish[10]+"").attr("class", "col-sm-3 d-none");
	}
	
	if (fishInBank[11] > 0) {
		$("#b-"+fish[11]+"").attr("class", "col-sm-3");
		$("#b-"+fish[11]+"-qty").text(fishInBank[11]);
		$("#b-"+fish[11]+"-gp").text(fishInBank[11]*fishCost[11]);
	}
	else {
		$("#b-"+fish[11]+"").attr("class", "col-sm-3 d-none");
	}
	
}

function sellFish(fish) {
	
	//Award GP for log selling
	gp = gp + (fishCost[fish] * fishInBank[fish]);
	//Update stats
	statFishSold = statFishSold + fishInBank[fish];
	statFishGPEarned = statFishGPEarned + (fishCost[fish] * fishInBank[fish]);
	updateFishingStats();
	//Set logs to 0
	fishInBank[fish] = 0;
	//Update text on screen
	updateCurrentBank();
	$("#gp").text(convertGP(gp));
	updateFishingBank();
	
}

function sellTenFish(fish) {
	
	if (fishInBank[fish] >= 10) {
		//Award GP for log selling
		gp = gp + (fishCost[fish] * 10);
		//Update stats
		statFishSold = statFishSold + 10;
		statFishGPEarned = statFishGPEarned + (fishCost[fish] * 10);
		updateFishingStats();
		//Set logs to 0
		fishInBank[fish]-=10;
		//Update text on screen
		updateCurrentBank();
		$("#gp").text(convertGP(gp));
		updateFishingBank();
	}
	else {
		//Award GP for log selling
		gp = gp + (fishCost[fish] * fishInBank[fish]);
		//Update stats
		statFishSold = statFishSold + fishInBank[fish];
		statFishGPEarned = statFishGPEarned + (fishCost[fish] * fishInBank[fish]);
		updateFishingStats();
		//Set logs to 0
		fishInBank[fish] = 0;
		//Update text on screen
		updateCurrentBank();
		$("#gp").text(convertGP(gp));
		updateFishingBank();
	}
	
}

function updateFishLocations() {
	
	//LUMBRIDGE
	//Fish
	if (fishingCurrentLevel < 1 || fishingIsAutomating[0] || isFishing) {
		$("#fish-lumbridge").attr("class", "btn btn-success disabled");
		$("#fish-lumbridge").attr("disabled", "disabled");
	}
	else {
		$("#fish-lumbridge").attr("class", "btn btn-success");
		$("#fish-lumbridge").removeAttr("disabled");
	}
	//Auto Fish
	if (fishingIsAutomating[0] != 1 && !fishingKeepButtonDisabled && !isFishing && currentFishingRod > 0) {
		$("#fish-lumbridge-auto").attr("class", "btn btn-outline-info");
		$("#fish-lumbridge-auto").removeAttr("disabled");
	}
	if (fishingIsAutomating[0] != 1 && (fishingKeepButtonDisabled || isFishing || currentFishingRod < 1)) {
		$("#fish-lumbridge-auto").attr("class", "btn btn-outline-info disabled");
		$("#fish-lumbridge-auto").attr("disabled", "disabled");
	}
	
	//DRAYNOR VILLAGE
	if (fishingCurrentLevel < 1 || fishingIsAutomating[1] || isFishing) {
		$("#fish-draynor").attr("class", "btn btn-success disabled");
		$("#fish-draynor").attr("disabled", "disabled");
	}
	else {
		$("#fish-draynor").attr("class", "btn btn-success");
		$("#fish-draynor").removeAttr("disabled");
	}
	//Auto Fish
	if (fishingIsAutomating[1] != 1 && !fishingKeepButtonDisabled && !isFishing && currentFishingRod > 1) {
		$("#fish-draynor-auto").attr("class", "btn btn-outline-info");
		$("#fish-draynor-auto").removeAttr("disabled");
	}
	if (fishingIsAutomating[1] != 1 && (fishingKeepButtonDisabled || isFishing || currentFishingRod < 2)) {
		$("#fish-draynor-auto").attr("class", "btn btn-outline-info disabled");
		$("#fish-draynor-auto").attr("disabled", "disabled");
	}
	
	//KARAMJA
	if (fishingCurrentLevel < 5 || fishingIsAutomating[2] || isFishing) {
		$("#fish-karamja").attr("class", "btn btn-success disabled");
		$("#fish-karamja").attr("disabled", "disabled");
	}
	else {
		$("#fish-karamja").attr("class", "btn btn-success");
		$("#fish-karamja").removeAttr("disabled");
	}
	//Auto Fish
	if (fishingIsAutomating[2] != 1 && !fishingKeepButtonDisabled && !isFishing && currentFishingRod > 2) {
		$("#fish-karamja-auto").attr("class", "btn btn-outline-info");
		$("#fish-karamja-auto").removeAttr("disabled");
	}
	if (fishingIsAutomating[2] != 1 && (fishingKeepButtonDisabled || isFishing || currentFishingRod < 3)) {
		$("#fish-karamja-auto").attr("class", "btn btn-outline-info disabled");
		$("#fish-karamja-auto").attr("disabled", "disabled");
	}
	
	//BARBARIAN OUTPOST
	if (fishingCurrentLevel < 1 || fishingIsAutomating[3] || isFishing) {
		$("#fish-barbarian").attr("class", "btn btn-success disabled");
		$("#fish-barbarian").attr("disabled", "disabled");
	}
	else {
		$("#fish-barbarian").attr("class", "btn btn-success");
		$("#fish-barbarian").removeAttr("disabled");
	}
	//Auto Fish
	if (fishingIsAutomating[3] != 1 && !fishingKeepButtonDisabled && !isFishing && currentFishingRod > 3) {
		$("#fish-barbarian-auto").attr("class", "btn btn-outline-info");
		$("#fish-barbarian-auto").removeAttr("disabled");
	}
	if (fishingIsAutomating[3] != 1 && (fishingKeepButtonDisabled || isFishing || currentFishingRod < 4)) {
		$("#fish-barbarian-auto").attr("class", "btn btn-outline-info disabled");
		$("#fish-barbarian-auto").attr("disabled", "disabled");
	}
	
	//SEERS' VILLAGE
	if (fishingCurrentLevel < 10 || fishingIsAutomating[4] || isFishing) {
		$("#fish-seers").attr("class", "btn btn-success disabled");
		$("#fish-seers").attr("disabled", "disabled");
	}
	else {
		$("#fish-seers").attr("class", "btn btn-success");
		$("#fish-seers").removeAttr("disabled");
	}
	//Auto Fish
	if (fishingIsAutomating[4] != 1 && !fishingKeepButtonDisabled && !isFishing && currentFishingRod > 4) {
		$("#fish-seers-auto").attr("class", "btn btn-outline-info");
		$("#fish-seers-auto").removeAttr("disabled");
	}
	if (fishingIsAutomating[4] != 1 && (fishingKeepButtonDisabled || isFishing || currentFishingRod < 5)) {
		$("#fish-seers-auto").attr("class", "btn btn-outline-info disabled");
		$("#fish-seers-auto").attr("disabled", "disabled");
	}
	
	//FISHING GUILD
	if (fishingCurrentLevel < 10 || fishingIsAutomating[5] || isFishing) {
		$("#fish-fishingguild").attr("class", "btn btn-success disabled");
		$("#fish-fishingguild").attr("disabled", "disabled");
	}
	else {
		$("#fish-fishingguild").attr("class", "btn btn-success");
		$("#fish-fishingguild").removeAttr("disabled");
	}
	//Auto Fish
	if (fishingIsAutomating[5] != 1 && !fishingKeepButtonDisabled && !isFishing && currentFishingRod > 5) {
		$("#fish-fishingguild-auto").attr("class", "btn btn-outline-info");
		$("#fish-fishingguild-auto").removeAttr("disabled");
	}
	if (fishingIsAutomating[5] != 1 && (fishingKeepButtonDisabled || isFishing || currentFishingRod < 6)) {
		$("#fish-fishingguild-auto").attr("class", "btn btn-outline-info disabled");
		$("#fish-fishingguild-auto").attr("disabled", "disabled");
	}
	
	//TAVERLEY CAVES
	if (fishingCurrentLevel < 60 || fishingIsAutomating[6] || isFishing) {
		$("#fish-taverley").attr("class", "btn btn-success disabled");
		$("#fish-taverley").attr("disabled", "disabled");
	}
	else {
		$("#fish-taverley").attr("class", "btn btn-success");
		$("#fish-taverley").removeAttr("disabled");
	}
	//Auto Fish
	if (fishingIsAutomating[6] != 1 && !fishingKeepButtonDisabled && !isFishing && currentFishingRod > 6) {
		$("#fish-taverley-auto").attr("class", "btn btn-outline-info");
		$("#fish-taverley-auto").removeAttr("disabled");
	}
	if (fishingIsAutomating[6] != 1 && (fishingKeepButtonDisabled || isFishing || currentFishingRod < 7)) {
		$("#fish-taverley-auto").attr("class", "btn btn-outline-info disabled");
		$("#fish-taverley-auto").attr("disabled", "disabled");
	}
	
	//DEEP SEAS
	if (fishingCurrentLevel < 85 || fishingIsAutomating[7] || isFishing) {
		$("#fish-deepseas").attr("class", "btn btn-success disabled");
		$("#fish-deepseas").attr("disabled", "disabled");
	}
	else {
		$("#fish-deepseas").attr("class", "btn btn-success");
		$("#fish-deepseas").removeAttr("disabled");
	}
	//Auto Fish
	if (fishingIsAutomating[7] != 1 && !fishingKeepButtonDisabled && !isFishing && currentFishingRod > 7) {
		$("#fish-deepseas-auto").attr("class", "btn btn-outline-info");
		$("#fish-deepseas-auto").removeAttr("disabled");
	}
	if (fishingIsAutomating[7] != 1 && (fishingKeepButtonDisabled || isFishing || currentFishingRod < 8)) {
		$("#fish-deepseas-auto").attr("class", "btn btn-outline-info disabled");
		$("#fish-deepseas-auto").attr("disabled", "disabled");
	}
	
}

function updateFishingRods() {
	
	for (i=1; i <=8; i++) {
		// Set images to the current fishing rod
		if (fishingRodImage != currentFishingRod) {
			$("#fishing-rod-"+i).attr("src","img/fishing_"+fishingRods[currentFishingRod]+".png");
			fishingRodImage = currentFishingRod;
		}
		
		if (currentFishingRod >= i) {
			//If you bought a rod more than 1 level higher than your previous, update it accordingly
			fishingRodPurchased[i] = 1;
			//If you have already bought the rod, update the screen
			if (fishingRodPurchased[i] == 1) {
				$("#"+fishingRods[i]+"-fish-button").attr("class", "btn btn-success btn-sm disabled");
				$("#"+fishingRods[i]+"-fish-button").text("Upgraded");
				$("#"+fishingRods[i]+"-fish-level-text").attr("class", "badge badge-success");
				$("#"+fishingRods[i]+"-fish-level-text").text("Upgraded");
			}
		}
		
		if (fishingCurrentLevel >= fishingRodLevelRequirement[i] && fishingRodPurchased[i] != 1) {
			$("#"+fishingRods[i]+"-fish-button").attr("class", "btn btn-primary btn-sm");
			$("#"+fishingRods[i]+"-fish-level-text").attr("class", "badge badge-primary");
			$("#"+fishingRods[i]+"-fish-level-text").text("Available");
		}
		
	}
	
}

function upgradeFishingRod(fishingRod) {
	
	//Check if you have enough gp to buy the rod
	if (gp >= fishingRodCost[fishingRod]) {
		
		//Update current gp
		gp = gp - fishingRodCost[fishingRod];
		//Update fishing rod
		currentFishingRod = fishingRod;
		updateFishingRods();
		fishingUpdateScreen();
		
	}
	
}

function updateFishingStats() {
	
	$("#s-fish-caught").text(statFishCaught);
	$("#s-fish-sold").text(statFishSold);
	$("#s-fish-gp-earned").text(statFishGPEarned);
	
}

function setLocation(locationToSet) {
	
	fishingCurrentLocation = locationToSet;
	
	if (fishingCurrentLocation == 1) {
		$("#fishing-location").text("Draynor Village");
	}
	if (fishingCurrentLocation == 3) {
		$("#fishing-location").text("Barbarian Outpost");
	}
	if (fishingCurrentLocation == 4) {
		$("#fishing-location").text("Seers' Village");
	}
	if (fishingCurrentLocation == 5) {
		$("#fishing-location").text("Fishing Guild");
	}
	if (fishingCurrentLocation == 6) {
		$("#fishing-location").text("Taverley Dungeon");
	}
	if (fishingCurrentLocation == 7) {
		$("#fishing-location").text("Deep Seas");
	}
	if (fishingCurrentLocation == 0 || fishingCurrentLocation == 2) {
		$("#fishing-location").text(fishingLocations[fishingCurrentLocation].charAt(0).toUpperCase() + fishingLocations[fishingCurrentLocation].slice(1));
	}
	
	for(i=0; i<8; i++) {
		if(i != fishingCurrentLocation) {
			$("#location-"+fishingLocations[i]).attr("class", "d-none");
			$("#location-"+fishingLocations[i]+"-progress").attr("class", "card-footer text-muted d-none");
		}
		else {
			$("#location-"+fishingLocations[i]).attr("class", "");
			$("#location-"+fishingLocations[i]+"-progress").attr("class", "card-footer text-muted");
		}
	}
	
	saveData(0);
	
}

function fishingUpdateMilestones() {
	
	if (fishingCurrentLevel >= 35) {
		if (fishingMilestoneAchieved[0] != 1) { fishingMilestoneAchieved[0] = 1; milestoneNotify("fishing"); }
		$("#m-fishing-milestone-1").attr("class", "badge badge-success");
		$("#m-fishing-milestone-1").text("Unlocked");
	}
	
	if (fishingCurrentLevel >= 60) {
		if (fishingMilestoneAchieved[1] != 1) { fishingMilestoneAchieved[1] = 1; milestoneNotify("fishing"); }
		$("#m-fishing-milestone-2").attr("class", "badge badge-success");
		$("#m-fishing-milestone-2").text("Unlocked");
	}
	
	if (fishingCurrentLevel >= 70) {
		if (fishingMilestoneAchieved[2] != 1) { fishingMilestoneAchieved[2] = 1; milestoneNotify("fishing"); }
		$("#m-fishing-milestone-3").attr("class", "badge badge-success");
		$("#m-fishing-milestone-3").text("Unlocked");
	}
	
	if (fishingCurrentLevel >= 99) {
		if (fishingMilestoneAchieved[3] != 1) { fishingMilestoneAchieved[3] = 1; milestoneNotify("fishing"); }
		$("#m-fishing-skill-mastery").attr("class", "badge badge-success");
		$("#m-fishing-skill-mastery").text("Unlocked");
	}
	
}
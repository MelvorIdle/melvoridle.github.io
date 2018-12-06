//Initialise vars
var key = "WcIdle-"
var exp = new exp();
var gp = 0;
var currentBank = 0;
var currentBankUpgrade = 0;
var bankMax = 83;
var bankUpgrades = [83,100,200,400,600,800,1000,1250,1500,1750,2000,2300,2600,2900,3300,3700,4100,4600,5100,6000,7000];
var bankUpgradesCost = [0,1000,2000,5000,10000,12500,15000,25000,50000,75000,100000,250000,500000,750000,1000000,2500000,5000000,10000000,15000000,20000000,25000000];


var allVars = [
	"gp", "xp", "nextLevelProgress", "currentLevel", "currentLevelXP", "nextLevelXP",
	"currentAxe", "currentBank", "bankMax", "axePurchased", "milestoneAchieved",
	"logsInBank", "currentBankUpgrade", "endGameActivated",
	"wcStatTreesCut", "wcStatLogsSold", "wcStatGPEarned", "wcStatBirdNestsFound", "wcStatRandomEvents",
	"fishingXP", "fishingNextLevelProgress", "fishingCurrentLevel", "fishingCurrentLevelXP",
	"fishInBank", "currentFishingRod", "fishingRodPurchased", "fishingRodImage", "fishingNextLevelXP",
	"statFishCaught", "statFishSold", "statFishGPEarned", "fishingMilestoneAchieved",
	"fmXP", "fmNextLevelProgress", "fmCurrentLevel", "fmCurrentLevelXP", "fmNextLevelXP",
	"bonfireLevel", "fmStatGPBurnt", "fmStatLogsBurnt", "fmMilestoneAchieved"
];

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

function convertGP(currentGP) {
	
	$("#gp").attr("data-original-title", numberWithCommas(currentGP));
	
	if (currentGP < 100000) {
		currentGP = currentGP;
	}
	else if (currentGP >= 100000 && currentGP < 10000000) {
		currentGP = Math.floor((currentGP/1000)) + "K";
	}
	else if (currentGP >= 10000000 && currentGP < 10000000000) {
		currentGP = Math.floor((currentGP/1000000)) + "M";
	}
	else if (currentGP >= 10000000000) {
		currentGP = Math.floor((currentGP/1000000000)) + "B";
	}
	
	return currentGP;
	
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function upgradeBank() {
	
	if (gp > bankUpgradesCost[currentBankUpgrade+1]) {
		
		gp = gp - bankUpgradesCost[currentBankUpgrade+1];
		$("#gp").text(gp);
		currentBankUpgrade++;
		bankMax = bankUpgrades[currentBankUpgrade];
		updateBankUpgrades();
		saveData(0);
		
	}
	
}

function updateBankUpgrades() {
	
	if (currentBankUpgrade < 20) {
		$("#bank-capacity").text(bankUpgrades[currentBankUpgrade+1] - bankMax);	
		$("#bank-upgrade-cost").text(bankUpgradesCost[currentBankUpgrade+1] + " gp");
		$("#bank-limit-text").text(bankMax);
	}
	else {
		$("#bank-capacity").text("Maxed");	
		$("#bank-upgrade-cost").text("Maxed");
		$("#bank-upgrade-button").attr("class", "btn btn-warning btn-sm disabled");
		$("#bank-upgrade-button").attr("onclick", "");
	}
	
}

function updateCurrentBank() {
	
	var amountOfLogs = logsInBank.reduce(function(logsInBank, b) { return logsInBank + b; }, 0);
	var amountOfFish = fishInBank.reduce(function(fishInBank, b) { return fishInBank + b; }, 0);
	currentBank = amountOfLogs + amountOfFish;
	$("#current-bank-text").text(currentBank);
	
}

function milestoneNotify(skill) {
	
	$.notify(
		"<img src='img/"+skill+".png'> Milestone Unlocked!",
		{ position: 'top right', className: 'success', showDuration: 400, autoHideDelay: 5000 }
	);
		
}

$("ul.nav-tabs a").click(function (e) {
  e.preventDefault();  
    $(this).tab('show');
});

$("ul.nav-pills a").click(function (e) {
  e.preventDefault();  
    $(this).tab('show');
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
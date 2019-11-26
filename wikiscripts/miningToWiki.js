//This script parses through the miningData array
//It then adds those stats of those items to a table in the wiki source format

var miningIndex;
// Generate table for wiki
var outputStr = '{| class="wikitable"\n';
// Table Headers
outputStr += '!Item\n!Name\n!Mining Level\n!Experience\n!Respawn Time (s)\n!Ore Price \n|';

for (miningIndex = 0; miningIndex < miningData.length; miningIndex++) {
    //Item image link
    outputStr += '-\n| [[File:' + items[miningData[miningIndex].ore].name + ' (item).svg|50px|center]]\n|'
    //Item name with link
    outputStr += '[[' + items[miningData[miningIndex].ore].name + ']]' + '\n| style="text-align:right"; | ';
    //Mining Level
    outputStr += miningData[miningIndex].level + '\n| style="text-align:right"; | ';
    //Experience
    outputStr += items[miningData[miningIndex].ore].miningXP + '\n| style="text-align:right"; | ';
    //Respawn Time
    outputStr += Math.floor(miningData[miningIndex].respawnInterval/1000) + '\n| style="text-align:right"; | ';
    //Ore Price
    outputStr += items[miningData[miningIndex].ore].sellsFor + '\n|';
}
outputStr += '}';
console.log(outputStr)

//Gem information *Note that this is hardcoded due to how the game handles gems

gemItemIDs = [CONSTANTS.item.Topaz,CONSTANTS.item.Sapphire,CONSTANTS.item.Ruby,CONSTANTS.item.Emerald,CONSTANTS.item.Diamond];
gemChances = [40,20,20,12.5,7.5];

var gemIndex

// Generate table for wiki
var outputStr = '{| class="wikitable"\n';
// Table Headers
outputStr += '!Gem\n!Name\n!Gem Chance\n!Gem Price\n|';

for (gemIndex = 0; gemIndex < gemItemIDs.length; gemIndex++) {
    //Item image link
    outputStr += '-\n| [[File:' + items[gemItemIDs[gemIndex]].name + ' (item).svg|50px|center]]\n|'
    //Item name with link
    outputStr += '[[' + items[gemItemIDs[gemIndex]].name + ']]' + '\n| style="text-align:right"; | ';
    //Gem Chance
    outputStr += gemChances[gemIndex] + '%\n| style="text-align:right"; | ';
    //Gem Price
    outputStr += items[gemItemIDs[gemIndex]].sellsFor + '\n|';
}
outputStr += '}';
console.log(outputStr)
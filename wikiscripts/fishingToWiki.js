//This script parses through the fishData array and finds the corresponding item in the item array
//It then adds those stats of those items to a table in the wiki source format

var fishIndex;
var outputStr = '{| class="wikitable"\n';
// Table Headers
outputStr += '!Fish\n!Name\n!Fishing Level\n!Experience \n|';

for (fishIndex = 0; fishIndex < fishData.length; fishIndex++) {
    curFish = fishData[fishIndex];
    // Find the item corresponding to the log
        curItem = items[curFish.itemID];
        //Item image link
        outputStr += '-\n| [[File:' + curItem.name + ' (item).svg|50px|center]]\n|'
        //Item name with link
        outputStr += '[[' + curItem.name + ']]' + '\n| style="text-align:right"; | ';
        //Fishing Level
        outputStr += fishData[fishIndex].level + '\n| style="text-align:right"; | ';
        //Experience
        outputStr += fishData[fishIndex].xp + '\n|';
}
outputStr += '}';
console.log(outputStr)
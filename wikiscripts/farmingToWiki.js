//This script parses through the items list and identifies items that can be farmed
//It then adds those stats of those items to a table in the wiki source format

var itemIndex;
var outputStr = '{| class="wikitable"\n';
// Table Headers
outputStr += '!Seeds\n!Name\n!Farming Level\n!Experience \n!Time to Grow \n!Seed Value \n!Crop\n!Crop Name \n!Crop Value \n|';

for (itemIndex = 0; itemIndex < items.length; itemIndex++) {
    curItem = items[itemIndex];
    if (curItem.catergory === 'Farming' & curItem.type === 'Seeds' & curItem.tier === 'Allotment') {
        //Item image link
        outputStr += '-\n| [[File:' + curItem.name + ' (item).svg|50px|center]]\n|'
        //Item name with link
        outputStr += '[[' + curItem.name + ']]' + '\n| style="text-align:right"; | ';
        if (curItem.farmingLevel != undefined) {
            outputStr += curItem.farmingLevel + '\n| style="text-align:right"; | ';
        } else {
            outputStr += '1\n| style="text-align:right"; | ';
        }
        if (curItem.farmingXP != undefined) {
            outputStr += curItem.farmingXP + '\n| style="text-align:right"; | ';
        } else {
            outputStr += '0\n| style="text-align:right"; | ';
        }
        if (curItem.timeToGrow != undefined) {
            outputStr += curItem.timeToGrow + '\n| style="text-align:right"; | ';
        } else {
            outputStr += '0\n| style="text-align:right"; | ';
        }
        if (curItem.sellsFor != undefined) {
            outputStr += curItem.sellsFor + '\n| style="text-align:right"; | ';
        } else {
            outputStr += '0\n| style="text-align:right"; | ';
        }
        if (curItem.grownItemID != undefined) {
            grownItem = items[curItem.grownItemID];
            outputStr += '[[File:' + grownItem.name + ' (item).svg|50px|center]]\n|'
            outputStr += '[[' + grownItem.name + ']]' + '\n| style="text-align:right"; | ';
            if (grownItem.sellsFor != undefined) {
                outputStr += grownItem.sellsFor + '\n|';
            } else {
                outputStr += '0\n|';
            }
        } else {
            outputStr += '0\n|';
        }
    }
}
outputStr += '}';
console.log(outputStr)


var itemIndex;
var outputStr = '{| class="wikitable"\n';
// Table Headers
outputStr += '!Seeds\n!Name\n!Farming Level\n!Experience \n!Time to Grow \n!Seed Value \n!Logs\n!Log Name \n!Log Value \n|';

for (itemIndex = 0; itemIndex < items.length; itemIndex++) {
    curItem = items[itemIndex];
    if (curItem.catergory === 'Farming' & curItem.type === 'Seeds' & curItem.tier === 'Tree') {
        //Item image link
        outputStr += '-\n| [[File:' + curItem.name + ' (item).svg|50px|center]]\n|'
        //Item name with link
        outputStr += '[[' + curItem.name + ']]' + '\n| style="text-align:right"; | ';
        if (curItem.farmingLevel != undefined) {
            outputStr += curItem.farmingLevel + '\n| style="text-align:right"; | ';
        } else {
            outputStr += '1\n| style="text-align:right"; | ';
        }
        if (curItem.farmingXP != undefined) {
            outputStr += curItem.farmingXP + '\n| style="text-align:right"; | ';
        } else {
            outputStr += '0\n| style="text-align:right"; | ';
        }
        if (curItem.timeToGrow != undefined) {
            outputStr += curItem.timeToGrow + '\n| style="text-align:right"; | ';
        } else {
            outputStr += '0\n| style="text-align:right"; | ';
        }
        if (curItem.sellsFor != undefined) {
            outputStr += curItem.sellsFor + '\n| style="text-align:right"; | ';
        } else {
            outputStr += '0\n| style="text-align:right"; | ';
        }
        if (curItem.grownItemID != undefined) {
            grownItem = items[curItem.grownItemID];
            outputStr += '[[File:' + grownItem.name + ' (item).svg|50px|center]]\n|'
            outputStr += '[[' + grownItem.name + ']]' + '\n| style="text-align:right"; | ';
            if (grownItem.sellsFor != undefined) {
                outputStr += grownItem.sellsFor + '\n|';
            } else {
                outputStr += '0\n|';
            }
        } else {
            outputStr += '0\n|';
        }
    }
}
outputStr += '}';
console.log(outputStr)
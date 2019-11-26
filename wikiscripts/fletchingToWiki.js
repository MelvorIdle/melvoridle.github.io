//This script parses through the fletching items array
//It then adds those stats of those items to a table in the wiki source format

//Categories are currenty hard coded
categoryNames = ['Arrows', 'Shortbows', 'Longbows'];
categoryIndex = [{ start: [0], len: [9] }, { start: [9,33], len: [12,2] }, { start: [21,35], len: [12,2] }]

var fletchIndex;
var outputStr = '';
var catInd;
for (catInd = 0; catInd < categoryNames.length; catInd++) {
    //Create itemsubset and sort it by crafting level
    itemSubset = [];
    for (let i=0;i<categoryIndex[catInd].start.length;i++) {
    itemSubset.push.apply(itemSubset,fletchingItems.slice(categoryIndex[catInd].start[i], categoryIndex[catInd].start[i] + categoryIndex[catInd].len[i]));
    }
    itemSubset.sort(function (a, b) { return a.fletchingLevel - b.fletchingLevel; });
    //Generate table from item subset
    //Table section
    outputStr += '==' + categoryNames[catInd] + '==\n';
    outputStr += '{| class="wikitable"\n';
    // Table Headers
    outputStr += '!Item\n!Name\n!Fletching Level\n!Experience\n!Crafting Amount\n!Product Price\n!Ingredients\n|';
    for (fletchIndex = 0; fletchIndex < itemSubset.length; fletchIndex++) {
        curItem = items[itemSubset[fletchIndex].itemID];
        //Item image link
        outputStr += '-\n| [[File:' + curItem.name + ' (item).svg|50px|center]]\n|'
        //Item name with link
        outputStr += '[[' + curItem.name + ']]' + '\n| style="text-align:right"; | ';
        //Fletching Level
        outputStr += curItem.fletchingLevel + '\n| style="text-align:right"; | ';
        //Fletching XP
        outputStr += curItem.fletchingXP + '\n| style="text-align:right"; | ';
        //Crafting Amount
        outputStr += curItem.fletchQty + '\n| style="text-align:right"; | ';
        //Item Price
        outputStr += curItem.sellsFor + '\n| style="text-align:right"; | ';
        //Ingredients
        if (!(catInd == 0 & fletchIndex == 0)) {
            for (ingInd = 0; ingInd < curItem.fletchReq.length; ingInd++) {
                outputStr += curItem.fletchReq[ingInd].qty + ' [[File:' + items[curItem.fletchReq[ingInd].id].name + ' (item).svg|25px|middle|link=' + items[curItem.fletchReq[ingInd].id].name + ']] ';
            }
        } else {
            //Special exception for arrowshafts
            outputStr += curItem.fletchReq[0].qty + ' any [[File:' + items[curItem.fletchReq[0].id].name + ' (item).svg|25px|middle|link=' + items[curItem.fletchReq[0].id].name + ']] ';
        }
        outputStr += '\n|';
    }
    outputStr += '}\n';
}

console.log(outputStr)
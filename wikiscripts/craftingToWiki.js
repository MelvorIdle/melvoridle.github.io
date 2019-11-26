//This script parses through the craftingItems array in subsets to generate wiki tables
//It then adds those stats of those items to a table in the wiki source format

var craftIndex;
//Categories are currently hard programmed
categoryNames = ['Leather Armour', 'Dragonhide', 'Rings', 'Necklaces'];
categoryIndex = [{ start: 0, len: 6 }, { start: 7, len: 12 }, { start: 19, len: 10 }, { start: 29, len: 10 }]

var outputStr = '';
var catInd;
var ingInd;
// Generate tables for wiki
for (catInd = 0; catInd < categoryNames.length; catInd++) {

    //Create itemsubset and sort it by crafting level
    itemSubset = craftingItems.slice(categoryIndex[catInd].start, categoryIndex[catInd].start + categoryIndex[catInd].len);
    itemSubset.sort(function (a, b) { return a.craftingLevel - b.craftingLevel; });
    //Generate table from item subset
    //Table Section
    outputStr += '==' + categoryNames[catInd] + '==\n';
    outputStr += '{| class="wikitable"\n';
    // Table Headers
    outputStr += '!Item\n!Name\n!Crafting Level\n!Experience\n!Item Price \n!Ingredients \n|';
    for (craftIndex = 0; craftIndex < itemSubset.length; craftIndex++) {
        curItem = items[itemSubset[craftIndex].itemID];
        //Item image link
        outputStr += '-\n| [[File:' + curItem.name + ' (item).svg|50px|center]]\n|'
        //Item name with link
        outputStr += '[[' + curItem.name + ']]' + '\n| style="text-align:right"; | ';
        //Crafting Level
        outputStr += curItem.craftingLevel + '\n| style="text-align:right"; | ';
        //Crafting XP
        outputStr += curItem.craftingXP + '\n| style="text-align:right"; | ';
        //Item Price
        outputStr += curItem.sellsFor + '\n| style="text-align:right"; | ';
        //Ingredients
        for (ingInd = 0; ingInd < curItem.craftReq.length; ingInd++) {
            outputStr += curItem.craftReq[ingInd].qty + ' [[File:' + items[curItem.craftReq[ingInd].id].name + ' (item).svg|25px|middle|link=' + items[curItem.craftReq[ingInd].id].name + ']] ';
        }
        outputStr += '\n|';
    }
    outputStr += '}\n';
}
console.log(outputStr)
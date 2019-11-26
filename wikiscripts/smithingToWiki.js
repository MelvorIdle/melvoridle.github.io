//This script parses through the smithingItems array
//It then adds those stats of those items to a table in the wiki source format

var smithIndex;
categoryNames = ['Bars', 'Bronze Gear', 'Iron Gear', 'Steel Gear', 'Mithril Gear', 'Adamant Gear', 'Rune Gear', 'Dragon Gear'];
var outputStr = '';
catInd = 0;
var ingInd;
//Table Section
outputStr += '==' + categoryNames[catInd] + '==\n';
outputStr += '{| class="wikitable"\n';
// Table Headers
outputStr += '!Item\n!Name\n!Smithing Level\n!Experience\n!Item Price \n!Ingredients \n|';

for (smithIndex = 0; smithIndex < smithingItems.length; smithIndex++) {
    if (smithingItems[smithIndex].category == catInd) {
        curItem = items[smithingItems[smithIndex].itemID];
        //Item image link
        outputStr += '-\n| [[File:' + curItem.name + ' (item).svg|50px|center]]\n|'
        //Item name with link
        outputStr += '[[' + curItem.name + ']]' + '\n| style="text-align:right"; | ';
        //Smithing Level
        outputStr += curItem.smithingLevel + '\n| style="text-align:right"; | ';
        //Smithing XP
        outputStr += curItem.smithingXP + '\n| style="text-align:right"; | ';
        //Item Price
        outputStr += curItem.sellsFor + '\n| style="text-align:right"; | ';
        //Ingredients
        for (ingInd = 0; ingInd < curItem.smithReq.length; ingInd++)
        {
            outputStr += curItem.smithReq[ingInd].qty + ' [[File:' + items[curItem.smithReq[ingInd].id].name + ' (item).svg|25px|middle|link=' + items[curItem.smithReq[ingInd].id].name + ']] ';
        }
        outputStr += '\n|';
        
    }
}
outputStr += '}\n';

// Generate tables for wiki
for (catInd = 1; catInd < categoryNames.length; catInd++) {
    //Table Section
    outputStr += '==' + categoryNames[catInd] + '==\n';
    outputStr += '{| class="wikitable"\n';
    // Table Headers
    outputStr += '!Item\n!Name\n!Smithing Level\n!Experience\n!Smithing Quantity\n!Item Price \n!Ingredients \n|';

    for (smithIndex = 0; smithIndex < smithingItems.length; smithIndex++) {
        if (smithingItems[smithIndex].category == catInd) {
        curItem = items[smithingItems[smithIndex].itemID];
        //Item image link
        outputStr += '-\n| [[File:' + curItem.name + ' (item).svg|50px|center]]\n|'
        //Item name with link
        outputStr += '[[' + curItem.name + ']]' + '\n| style="text-align:right"; | ';
        //Smithing Level
        outputStr += curItem.smithingLevel + '\n| style="text-align:right"; | ';
        //Smithing XP
        outputStr += curItem.smithingXP + '\n| style="text-align:right"; | ';
        //Crafting Amount
        if (curItem.smithingQty != undefined) {
        outputStr += curItem.smithingQty + '\n| style="text-align:right"; | ';
        } else {
            outputStr += '1\n| style="text-align:right"; | ';
        }
        //Item Price
        outputStr += curItem.sellsFor + '\n| style="text-align:right"; | ';
        //Ingredients
        for (ingInd = 0; ingInd < curItem.smithReq.length; ingInd++)
        {
            outputStr += curItem.smithReq[ingInd].qty + ' [[File:' + items[curItem.smithReq[ingInd].id].name + ' (item).svg|25px|middle|link=' + items[curItem.smithReq[ingInd].id].name + ']] ';
        }
        outputStr += '\n|';
        }
    }
    outputStr += '}\n';
}
console.log(outputStr)
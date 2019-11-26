//This script parses through the items list and identifies items that can be cooked 
//It then adds those stats of those items to a table in the wiki source format

var itemIndex;
var outputStr = '{| class="wikitable"\n';
// Table Headers
outputStr += '!Item\n!Name\n!Cooking Level\n!Experience \n!Healing \n!Price \n!Ingredients\n|';

for (itemIndex = 0; itemIndex < items.length; itemIndex++) {
    curItem = items[itemIndex];
    if (curItem.cookedItemID != undefined) {
        cookedItem = items[curItem.cookedItemID];

        //Item image link
        outputStr += '-\n| [[File:' + cookedItem.name + ' (item).svg|50px|center]]\n|' 
        //Item name with link
        outputStr += '[[' + cookedItem.name + ']]' + '\n| style="text-align:right"; | ';
        //Cooking Level
        outputStr += curItem.cookingLevel + '\n| style="text-align:right"; | ';
        //Cooking XP
        outputStr += curItem.cookingXP + '\n| style="text-align:right"; | ';
        //Healing
        outputStr += cookedItem.healsFor + '\n| style="text-align:right"; | ';
        //Price
        outputStr += cookedItem.sellsFor + '\n| style="text-align:right"; | ';
        //Ingredients
        outputStr += '1 ' + ' [[File:' + curItem.name + ' (item).svg|25px|middle|link=' + curItem.name + ']]\n|';
    }
}
outputStr += '}';
console.log(outputStr)
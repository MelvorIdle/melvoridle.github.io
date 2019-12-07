//Support functions for wiki scripts that output to console instead of returning a string
/// <reference path="keyFormatters.js" />
/// <reference path="commonElements.js" />
/// <reference path="sortFunctions.js"/>
/*
function startTable(outputStr) {
    outputStr += '{| class="wikitable"';
    return outputStr
}
function addHeaderColumn(outputStr, columnName) {
    outputStr += '\n!' + columnName;
    return outputStr
}

function nextTableRow(outputStr) {
    outputStr += '\n|-';
    return outputStr
}

function nextTableColumn(outputStr, textAlignment) {
    outputStr += '\n| style ="text-align:' + textAlignment + '"; |'
    return outputStr
}

function endTable(outputStr) {
    outputStr += '\n|}';
    return outputStr
}

function addItemLink(outputStr, itemID) {
    outputStr += '[[' + items[itemID].name + ']]';
    return outputStr
}

function addItemImage(outputStr, itemID, size, alignment) {
    outputStr += '[[File:' + items[itemID].name + ' (item).svg|' + size + 'px|' + alignment + ']]';
    return outputStr
}

function addItemImageLink(outputStr, itemID, size, alignment) {
    outputStr += '[[File:' + items[itemID].name + ' (item).svg|' + size + 'px|' + alignment + '|link=' + items[itemID].name + ']]';
    return outputStr
}

function addMonsterLink(outputStr, monsterID) {
    outputStr += '[[' + MONSTERS[monsterID].name + ']]';
    return outputStr
}

function addMonsterImage(outputStr, monsterID, size, alignment) {
    outputStr += '[[File:' + MONSTERS[monsterID].name + ' (monster).svg|' + size + 'px|' + alignment + ']]';
    return outputStr
}

function addMonsterImageLink(outputStr, monsterID, size, alignment) {
    outputStr += '[[File:' + MONSTERS[monsterID].name + ' (monster).svg|' + size + 'px|' + alignment + '|link=' + MONSTERS[monsterID].name + ']]';
    return outputStr
}

function addThievingLink(outputStr, targetID) {
    outputStr += '[[' + thievingNPC[targetID].name + ']]';
    return outputStr
}

function addThievingImage(outputStr, targetID, size, alignment) {
    outputStr += '[[File:' + thievingNPC[targetID].name + ' (thieving).svg|' + size + 'px|' + alignment + '|link=' + thievingNPC[targetID].name + ']]';
    return outputStr
}

function addThievingImageLink(outputStr, targetID, size, alignment) {
    outputStr += '[[File:' + thievingNPC[targetID].name + ' (thieving).svg|' + size + 'px|' + alignment + '|link=' + thievingNPC[targetID].name + ']]';
    return outputStr
}

function addCombatAreaLink(outputStr, areaID) {
    outputStr += '[[' + combatAreas[areaID].areaName + ']]';
    return outputStr
}

function addDungeonLink(outputStr, dungeonID) {
    outputStr += '[[' + DUNGEONS[dungeonID].name + ']]';
    return outputStr
}

function addSection(outputStr,name) {
    outputStr += '\n==' + name + '==\n';
    return outputStr
}
function addSubSection(outputStr,name) {
    outputStr += '\n===' + name + '===\n';
    return outputStr
}

function createSkillImage(skillName,size,alignment) {
    var outputStr = '[[File:' + skillName + ' (skill).svg|' + size + 'px|' + alignment + ']]';
    return outputStr
}

function createSkillImageLink(skillName,size,alignment) {
    var outputStr = '[[File:' + skillName + ' (skill).svg|' + size + 'px|' + alignment + '|link=' + skillName + ']]';
    return outputStr
}
function createCookingTable() {
    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Item');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Cooking Level');
    outputStr = addHeaderColumn(outputStr, 'Experience');
    outputStr = addHeaderColumn(outputStr, 'Healing');
    outputStr = addHeaderColumn(outputStr, 'Price');
    outputStr = addHeaderColumn(outputStr, 'Ingredients');
    for (let i = 0; i < items.length; i++) {
        if (items[i].cookedItemID != undefined) {
            outputStr = nextTableRow(outputStr);
            outputStr = nextTableColumn(outputStr, 'left');
            outputStr = addItemImage(outputStr, items[i].cookedItemID, 50, 'center');
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr = addItemLink(outputStr, items[i].cookedItemID);
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[i].cookingLevel;
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[i].cookingXP;
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[items[i].cookedItemID].healsFor;
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[items[i].cookedItemID].sellsFor;
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += '1 '
            outputStr = addItemImageLink(outputStr, i, 25, 'middle')
        }
    }
    outputStr = endTable(outputStr);
    console.log(outputStr);
}

function createFarmingAllotmentTable() {
    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Seeds');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Farming Level');
    outputStr = addHeaderColumn(outputStr, 'Experience');
    outputStr = addHeaderColumn(outputStr, 'Time to Grow (s)');
    outputStr = addHeaderColumn(outputStr, 'Seed Value');
    outputStr = addHeaderColumn(outputStr, 'Crop');
    outputStr = addHeaderColumn(outputStr, 'Crop Name');
    outputStr = addHeaderColumn(outputStr, 'Crop Value');
    for (let i = 0; i < items.length; i++) {
        if (items[i].catergory === 'Farming' & items[i].type === 'Seeds' & items[i].tier === 'Allotment') {
            outputStr = nextTableRow(outputStr);
            outputStr = nextTableColumn(outputStr, 'left');
            outputStr = addItemImage(outputStr, i, 50, 'center');
            outputStr = nextTableColumn(outputStr, 'left');
            outputStr = addItemLink(outputStr, i);
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[i].farmingLevel;
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[i].farmingXP;
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[i].timeToGrow;
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[i].sellsFor;
            outputStr = nextTableColumn(outputStr, 'left');
            outputStr = addItemImage(outputStr, items[i].grownItemID, 50, 'center');
            outputStr = nextTableColumn(outputStr, 'left');
            outputStr = addItemLink(outputStr, items[i].grownItemID);
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[items[i].grownItemID].sellsFor;
        }
    }
    outputStr = endTable(outputStr);
    console.log(outputStr);
}

function createFarmingTreeTable() {
    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Seeds');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Farming Level');
    outputStr = addHeaderColumn(outputStr, 'Experience');
    outputStr = addHeaderColumn(outputStr, 'Time to Grow (s)');
    outputStr = addHeaderColumn(outputStr, 'Seed Value');
    outputStr = addHeaderColumn(outputStr, 'Logs');
    outputStr = addHeaderColumn(outputStr, 'Log Name');
    outputStr = addHeaderColumn(outputStr, 'Log Value');
    for (let i = 0; i < items.length; i++) {
        if (items[i].catergory === 'Farming' & items[i].type === 'Seeds' & items[i].tier === 'Tree') {
            outputStr = nextTableRow(outputStr);
            outputStr = nextTableColumn(outputStr, 'left');
            outputStr = addItemImage(outputStr, i, 50, 'center');
            outputStr = nextTableColumn(outputStr, 'left');
            outputStr = addItemLink(outputStr, i);
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[i].farmingLevel;
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[i].farmingXP;
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[i].timeToGrow;
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[i].sellsFor;
            outputStr = nextTableColumn(outputStr, 'left');
            outputStr = addItemImage(outputStr, items[i].grownItemID, 50, 'center');
            outputStr = nextTableColumn(outputStr, 'left');
            outputStr = addItemLink(outputStr, items[i].grownItemID);
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[items[i].grownItemID].sellsFor;
        }
    }
    outputStr = endTable(outputStr);
    console.log(outputStr);
}
function createFiremakingTable() {
    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Logs');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Firemaking Level');
    outputStr = addHeaderColumn(outputStr, 'Experience');
    outputStr = addHeaderColumn(outputStr, 'Burn Time (s)');
    outputStr = addHeaderColumn(outputStr, 'Xp/s');
    outputStr = addHeaderColumn(outputStr, 'Bonfire bonus');
    outputStr = addHeaderColumn(outputStr, 'Bonfire Time (s)');

    for (let i = 0; i < logsData.length; i++) {
        // Find the itemID corresponding to the log
        for (j = 0; j < items.length; j++) {
            if (items[j].firemakingID == i) {
                break;
            }
        }
        outputStr = nextTableRow(outputStr);
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemImage(outputStr, j, 50, 'center');
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemLink(outputStr, j);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += logsData[i].level;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += logsData[i].xp;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += Math.floor(logsData[i].interval / 1000);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += formatNumberDec(logsData[i].xp / logsData[i].interval * 1000, 2)
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += logsData[i].bonfireBonus + '%';
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += Math.floor(logsData[i].bonfireInterval / 1000);
    }
    outputStr = endTable(outputStr);
    console.log(outputStr);
}

function createMiningTable() {
    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Ore');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Mining Level');
    outputStr = addHeaderColumn(outputStr, 'Experience');
    outputStr = addHeaderColumn(outputStr, 'Respawn Time (s)');
    outputStr = addHeaderColumn(outputStr, 'Ore Price');
    outputStr = addHeaderColumn(outputStr, 'XP/s');
    outputStr = addHeaderColumn(outputStr, 'GP/s');

    for (let i = 0; i < miningData.length; i++) {
        outputStr = nextTableRow(outputStr);
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemImage(outputStr, miningData[i].ore, 50, 'center');
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemLink(outputStr, miningData[i].ore);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += miningData[i].level;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += items[miningData[i].ore].miningXP;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += Math.floor(miningData[i].respawnInterval / 1000);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += items[miningData[i].ore].sellsFor
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += formatNumberDec(items[miningData[i].ore].miningXP / baseMiningInterval * 1000, 2);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += formatNumberDec(items[miningData[i].ore].sellsFor / baseMiningInterval * 1000, 2);
    }
    outputStr = endTable(outputStr);
    console.log(outputStr);
}

function createGemTable() {
    //Gem information is hardcoded due to how the game handles gems
    gemItemIDs = [CONSTANTS.item.Topaz, CONSTANTS.item.Sapphire, CONSTANTS.item.Ruby, CONSTANTS.item.Emerald, CONSTANTS.item.Diamond];
    gemChances = [40, 20, 20, 12.5, 7.5];

    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Gem');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Gem Chance');
    outputStr = addHeaderColumn(outputStr, 'Gem Price');

    for (let i = 0; i < gemItemIDs.length; i++) {
        outputStr = nextTableRow(outputStr);
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemImage(outputStr, gemItemIDs[i], 50, 'center');
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemLink(outputStr, gemItemIDs[i]);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += formatPercentage(gemChances[i], 1);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += items[gemItemIDs[i]].sellsFor;
    }
    outputStr = endTable(outputStr);
    console.log(outputStr);
}

function createFishTable() {
    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Fish');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Fishing Level');
    outputStr = addHeaderColumn(outputStr, 'Experience');
    outputStr = addHeaderColumn(outputStr, 'Sells For');

    for (let i = 0; i < fishData.length; i++) {
        outputStr = nextTableRow(outputStr);
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemImage(outputStr, fishData[i].itemID, 50, 'center');
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemLink(outputStr, fishData[i].itemID);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += fishData[i].level;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += fishData[i].xp;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += items[fishData[i].itemID].sellsFor;
    }
    outputStr = endTable(outputStr);
    console.log(outputStr);
}
*/
function createLogsTable() {
    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Logs');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Woodcutting Level');
    outputStr = addHeaderColumn(outputStr, 'Experience');
    outputStr = addHeaderColumn(outputStr, 'Cut Time(s)');
    outputStr = addHeaderColumn(outputStr, 'Price');
    outputStr = addHeaderColumn(outputStr, 'XP/s');
    outputStr = addHeaderColumn(outputStr, 'GP/s');

    for (let i = 0; i < trees.length; i++) {
        outputStr = nextTableRow(outputStr);
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemImage(outputStr, i, 50, 'center');
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemLink(outputStr, i);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += trees[i].level;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += trees[i].xp;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += Math.floor(trees[i].interval / 1000);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += items[i].sellsFor;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += formatNumberDec(trees[i].xp / trees[i].interval * 1000, 2);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += formatNumberDec(items[i].sellsFor / trees[i].interval * 1000, 2);
    }
    outputStr = endTable(outputStr);
    console.log(outputStr);
}

function createSmeltingTable() {
    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Item');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Smithing Level');
    outputStr = addHeaderColumn(outputStr, 'Experience');
    outputStr = addHeaderColumn(outputStr, 'Item Price');
    outputStr = addHeaderColumn(outputStr, 'Ingredients');

    for (let i = 0; i < smithingItems.length; i++) {
        if (smithingItems[i].category == 0) {
            outputStr = nextTableRow(outputStr);
            outputStr = nextTableColumn(outputStr, 'left');
            outputStr = addItemImage(outputStr, smithingItems[i].itemID, 50, 'center');
            outputStr = nextTableColumn(outputStr, 'left');
            outputStr = addItemLink(outputStr, smithingItems[i].itemID);
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[smithingItems[i].itemID].smithingLevel;
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[smithingItems[i].itemID].smithingXP;
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[smithingItems[i].itemID].sellsFor;
            outputStr = nextTableColumn(outputStr, 'right');
            for (let j = 0; j < items[smithingItems[i].itemID].smithReq.length; j++) {
                outputStr += items[smithingItems[i].itemID].smithReq[j].qty + ' ';
                outputStr = addItemImageLink(outputStr, items[smithingItems[i].itemID].smithReq[j].id, 25, 'middle')
            }
        }
    }
    outputStr = endTable(outputStr);
    console.log(outputStr);
}

function createSmithingTable(category) {
    //categoryNames = ['Bars', 'Bronze Gear', 'Iron Gear', 'Steel Gear', 'Mithril Gear', 'Adamant Gear', 'Rune Gear', 'Dragon Gear'];
    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Item');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Smithing Level');
    outputStr = addHeaderColumn(outputStr, 'Experience');
    outputStr = addHeaderColumn(outputStr, 'Smithing Quantity');
    outputStr = addHeaderColumn(outputStr, 'Item Price');
    outputStr = addHeaderColumn(outputStr, 'Ingredients');

    for (let i = 0; i < smithingItems.length; i++) {
        if (smithingItems[i].category == category) {
            outputStr = nextTableRow(outputStr);
            outputStr = nextTableColumn(outputStr, 'left');
            outputStr = addItemImage(outputStr, smithingItems[i].itemID, 50, 'center');
            outputStr = nextTableColumn(outputStr, 'left');
            outputStr = addItemLink(outputStr, smithingItems[i].itemID);
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[smithingItems[i].itemID].smithingLevel;
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[smithingItems[i].itemID].smithingXP;
            outputStr = nextTableColumn(outputStr, 'right');
            if (items[smithingItems[i].itemID].smithingQty != undefined) {
                outputStr += items[smithingItems[i].itemID].smithingQty;
            } else {
                outputStr += '1';
            }
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += items[smithingItems[i].itemID].sellsFor;
            outputStr = nextTableColumn(outputStr, 'right');
            for (let j = 0; j < items[smithingItems[i].itemID].smithReq.length; j++) {
                outputStr += items[smithingItems[i].itemID].smithReq[j].qty + ' ';
                outputStr = addItemImageLink(outputStr, items[smithingItems[i].itemID].smithReq[j].id, 25, 'middle')
            }
        }
    }
    outputStr = endTable(outputStr);
    console.log(outputStr);
}

function createCraftingTable(category) {
    //categoryNames = ['Leather Armour', 'Dragonhide', 'Rings', 'Necklaces'];
    categoryStrings = ['Leather', 'D-hide', 'Ring', 'Necklace'];
    //Create the subset of items based on the category
    itemSubset = [];
    for (let i = 0; i < craftingItems.length; i++) {
        if (items[craftingItems[i].itemID].name.includes(categoryStrings[category])) {
            itemSubset.push(craftingItems[i]);
        }
    }
    itemSubset.sort(function (a, b) { return a.craftingLevel - b.craftingLevel; });
    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Item');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Crafting Level');
    outputStr = addHeaderColumn(outputStr, 'Experience');
    outputStr = addHeaderColumn(outputStr, 'Item Price');
    outputStr = addHeaderColumn(outputStr, 'Ingredients');
    for (let i = 0; i < itemSubset.length; i++) {
        outputStr = nextTableRow(outputStr);
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemImage(outputStr, itemSubset[i].itemID, 50, 'center');
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemLink(outputStr, itemSubset[i].itemID);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += items[itemSubset[i].itemID].craftingLevel;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += items[itemSubset[i].itemID].craftingXP;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += items[itemSubset[i].itemID].sellsFor;
        outputStr = nextTableColumn(outputStr, 'right');
        for (let j = 0; j < items[itemSubset[i].itemID].craftReq.length; j++) {
            outputStr += items[itemSubset[i].itemID].craftReq[j].qty + ' ';
            outputStr = addItemImageLink(outputStr, items[itemSubset[i].itemID].craftReq[j].id, 25, 'middle')
        }
    }
    outputStr = endTable(outputStr);
    console.log(outputStr);
}

function createFletchingTable(category) {
    //categoryNames = ['Arrows', 'Shortbows', 'Longbows'];
    categoryStrings = ['Arrow', 'Shortbow', 'Longbow'];
    //Create the subset of items based on the category
    itemSubset = [];
    for (let i = 0; i < fletchingItems.length; i++) {
        if (items[fletchingItems[i].itemID].name.includes(categoryStrings[category])) {
            itemSubset.push(fletchingItems[i]);
        }
    }
    itemSubset.sort(function (a, b) { return a.fletchingLevel - b.fletchingLevel; });
    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Item');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Fletching Level');
    outputStr = addHeaderColumn(outputStr, 'Experience');
    outputStr = addHeaderColumn(outputStr, 'Crafting Amount');
    outputStr = addHeaderColumn(outputStr, 'Item Price');
    outputStr = addHeaderColumn(outputStr, 'Ingredients');
    for (let i = 0; i < itemSubset.length; i++) {
        outputStr = nextTableRow(outputStr);
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemImage(outputStr, itemSubset[i].itemID, 50, 'center');
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemLink(outputStr, itemSubset[i].itemID);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += items[itemSubset[i].itemID].fletchingLevel;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += items[itemSubset[i].itemID].fletchingXP;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += items[itemSubset[i].itemID].fletchQty;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += items[itemSubset[i].itemID].sellsFor;
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].itemID != CONSTANTS.item.Arrow_Shafts) {
            for (let j = 0; j < items[itemSubset[i].itemID].fletchReq.length; j++) {
                outputStr += items[itemSubset[i].itemID].fletchReq[j].qty + ' ';
                outputStr = addItemImageLink(outputStr, items[itemSubset[i].itemID].fletchReq[j].id, 25, 'middle')
            }
        } else {
            outputStr += '1 of any ';
            outputStr = addItemImageLink(outputStr, items[itemSubset[i].itemID].fletchReq[0].id, 25, 'middle')
        }
    }
    outputStr = endTable(outputStr);
    console.log(outputStr);
}

//Files refactored: Cooking, Farming, Firemaking, Mining, Fishing, Woodcutting, Smithing, Crafting, Fletching

//Files left: Thieving

//Find the sources from which an item can be obtained and add them to a string:
//Potential Sources:
//Drop from enemy
//Loot from chests/birdnests
//Loot from thieving
//Upgrading from another item
//Skills: Woodcutting, Fishing, Cooking, Mining, Smithing, Farming, Fletching and Crafting
function findItemSources(itemID) {
    outputStr = '';
    //Search monster drops
    monsterList = '';
    for (let i = 0; i < MONSTERS.length; i++) {
        if (MONSTERS[i].lootTable != undefined) {
            for (let j = 0; j < MONSTERS[i].lootTable.length; j++) {
                if (MONSTERS[i].lootTable[j][0] == itemID) {
                    monsterList = addMonsterLink(monsterList, i);
                    monsterList += ', ';
                    break;
                }
            }
        }
    }
    if (monsterList != '') {
        outputStr += 'Drops from: ' + monsterList;
    }
    chestList = '';
    //Search openable items
    if (window.openableItems === undefined) {
        getOpenableItems();
    }
    for (let i = 0; i < openableItems.length; i++) {
        for (let j = 0; j < items[openableItems[i]].dropTable.length; j++) {
            if (items[openableItems[i]].dropTable[j][0] == itemID) {
                chestList = addItemLink(chestList,openableItems[i]);
                chestList += ', ';
                break;
            }
        }
    }
    if (chestList != '') {
        outputStr += 'Looted from: ' + chestList;
    }
    thieveList = '';
    //Search thieving targets
    for (let i = 0; i < thievingNPC.length; i++) {
        for (let j = 0; j < thievingNPC[i].lootTable.length; j++) {
            if (thievingNPC[i].lootTable[j][0] == itemID) {
                thieveList = addThievingLink(thieveList, i)
                thieveList += ', ';
                break;
            }
        }
    }
    if (thieveList != '') {
        outputStr += 'Stolen from: ' + thieveList;
    }
    farmList = '';
    cookList = '';
    burnList = '';
    //Search items for upgrades, being cooked, being farmed, being burnt
    for (let i = 0; i < items.length; i++) {
        if (items[i].trimmedItemID == itemID) {
            outputStr += 'Upgraded from: ';
            outputStr = addItemLink(outputStr, i);
            outputStr += ', ';
        }
        if (items[i].grownItemID == itemID) {
            farmList = addItemLink(farmList, i);
            farmList += ', ';
        }
        if (items[i].cookedItemID == itemID) {
            cookList = addItemLink(cookList, i);
            cookList += ', ';
        }
        if (items[i].burntItemID == itemID) {
            burnList = addItemLink(burnList, i)
            burnList += ', ';
        }
    }
    if (farmList != '') {
        outputStr += 'Growing: ' + farmList;
    }
    if (cookList != '') {
        outputStr += 'Cooking: ' + cookList;
    }
    if (burnList != '') {
        outputStr += 'Burning: ' + burnList;
    }

    //Check for skills
    //Woodcutting
    for (let i = 0; i < trees.length; i++) {
        if (i == itemID) {
            outputStr += '[[Woodcutting]] (Lv. ' + trees[i].level + '), ';
        }
    }

    //Fishing
    for (let i = 0; i < fishData.length; i++) {
        if (fishData[i].itemID == itemID) {
            outputStr += '[[Fishing]] (Lv. ' + fishData[i].level + '), ';
        }
    }

    //Mining
    if (items[itemID].miningLevel != undefined) {
        outputStr += '[[Mining]] (Lv. ' + items[itemID].miningLevel + '), ';
    }

    //Smithing
    if (items[itemID].smithingLevel != undefined) {
        outputStr += '[[Smithing]] (Lv. ' + items[itemID].smithingLevel + '), ';
    }
    //Fletching
    if (items[itemID].fletchingLevel != undefined) {
        outputStr += '[[Fletching]] (Lv. ' + items[itemID].fletchingLevel + '), ';
    }
    //Crafting
    if (items[itemID].craftingLevel != undefined) {
        outputStr += '[[Crafting]] (Lv. ' + items[itemID].craftingLevel + '), ';
    }
    //Shop
    shopItems = [CONSTANTS.item.Green_Dragonhide, CONSTANTS.item.Blue_Dragonhide, CONSTANTS.item.Red_Dragonhide, CONSTANTS.item.Black_Dragonhide, CONSTANTS.item.Cooking_Gloves, CONSTANTS.item.Mining_Gloves, CONSTANTS.item.Smithing_Gloves, CONSTANTS.item.Thieving_Gloves, CONSTANTS.item.Gem_Gloves, CONSTANTS.item.Bowstring, CONSTANTS.item.Compost, CONSTANTS.item.Leather];
    for (let i = 0; i < shopItems.length; i++) {
        if (itemID == shopItems[i]) {
            outputStr += '[[Shop]], ';
            break;
        }
    }

    if (itemID == CONSTANTS.item.Fire_Cape) {
        outputStr += '[[Elite Dungeon]], ';
    }
    if (outputStr != '') {
        outputStr = outputStr.slice(0, outputStr.length - 2);
    } else {
        outputStr = 'None';
    }

    return outputStr
}

function getOpenableItems() {
    window.openableItems = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].canOpen) {
            openableItems.push(i);
        }
    }
}

function createMonsterTable() {
    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Monster');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Hitpoints');
    outputStr = addHeaderColumn(outputStr, 'Attack Level');
    outputStr = addHeaderColumn(outputStr, 'Strength Level');
    outputStr = addHeaderColumn(outputStr, 'Defence Level');
    outputStr = addHeaderColumn(outputStr, 'Attack Bonus');
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Strength',25,'middle') + 'Strength Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Defence Bonus'));
    outputStr = addHeaderColumn(outputStr, 'Attack Speed (s)');
    outputStr = addHeaderColumn(outputStr, 'GP Dropped');
    outputStr = addHeaderColumn(outputStr, 'Max Hit');
    outputStr = addHeaderColumn(outputStr, 'Accuracy');
    outputStr = addHeaderColumn(outputStr, 'Evasion');
    outputStr = addHeaderColumn(outputStr, 'Combat Areas');
    for (let i = 0; i < MONSTERS.length; i++) {
        outputStr = nextTableRow(outputStr);
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addMonsterImage(outputStr, i, 50, 'center')
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addMonsterLink(outputStr, i);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += MONSTERS[i].hitpoints;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += MONSTERS[i].attackLevel;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += MONSTERS[i].strengthLevel;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += MONSTERS[i].defenceLevel;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += MONSTERS[i].attackBonus;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += MONSTERS[i].strengthBonus;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += MONSTERS[i].defenceBonus;
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += formatNumberDec(MONSTERS[i].attackSpeed / 1000, 1);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += MONSTERS[i].dropCoins[0] + '-' + MONSTERS[i].dropCoins[1];
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += calcMonsterMaxHit(i);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += calcMonsterAccuracy(i);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += calcMonsterEvasion(i);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += findMonsterZones(i);
    }
    console.log(outputStr);
}
function calcMonsterMaxHit(monsterID) {
    effectiveStrengthLevel = Math.floor(MONSTERS[monsterID].strengthLevel + 8 + 1);
    maximumStrengthRoll = Math.floor(1.3 + (effectiveStrengthLevel / 10) + (MONSTERS[monsterID].strengthBonus / 80) + (effectiveStrengthLevel * MONSTERS[monsterID].strengthBonus / 640));
    return maximumStrengthRoll;
}

function calcMonsterAccuracy(monsterID) {
    effectiveAttackLevel = Math.floor(MONSTERS[monsterID].attackLevel + 8 + 1);
    maximumAttackRoll = effectiveAttackLevel * (MONSTERS[monsterID].attackBonus + 64);
    return maximumAttackRoll;
}

function calcMonsterEvasion(monsterID) {
    effectiveDefenceLevel = Math.floor(MONSTERS[monsterID].defenceLevel + 8 + 1);
    maximumDefenceRoll = effectiveDefenceLevel * (MONSTERS[monsterID].defenceBonus + 64);
    return maximumDefenceRoll;
}

function findMonsterZones(monsterID) {
    outputStr = '';
    for (let i = 0; i < (combatAreas.length - 1); i++) {
        for (let j = 0; j < combatAreas[i].monsters.length; j++) {
            if (combatAreas[i].monsters[j] == monsterID) {
                outputStr = addCombatAreaLink(outputStr, i);
                outputStr += ',';
                break;
            }
        }
    }
    for (let i = 0; i < DUNGEONS.length; i++) {
        for (let j = 0; j < DUNGEONS[i].monsters.length; j++) {
            if (DUNGEONS[i].monsters[j] == monsterID) {
                outputStr = addDungeonLink(outputStr, i);
                outputStr += ',';
                break;
            }
        }
    }
    if (outputStr != '') {
        outputStr = outputStr.slice(0, outputStr.length - 1);
    } else {
        outputStr = 'None';
    }
    return outputStr;
}

function createArmourTable(slotIndex, combatType) {
    //Slot Types: Helmet, Platebody, Platelegs, Boots, Gloves, Cape, Amulet, Ring, Quiver, Weapon, Shield slotIndex = CONSTANTS.equipmentSlot.Weapon;
    //Create Item subset
    itemSubset = [];
    itemIDs = [];
    for (let i = 0; i < items.length; i++) {
        if (combatType == 'ranged') {
            if ((items[i].equipmentSlot === slotIndex) & (items[i].rangedLevelRequired != undefined)) {
                itemSubset.push(items[i]);
                itemSubset[itemSubset.length-1].id = i;
            }
        } else if (combatType == 'melee') {
            if ((items[i].equipmentSlot === slotIndex) & (items[i].defenceLevelRequired != undefined)) {
                itemSubset.push(items[i]);
                itemSubset[itemSubset.length-1].id = i;
            }
        }
    }
    //Sort Item subset
    if (combatType == 'ranged') {
        itemSubset.sort(function (a, b) { return a.rangedLevelRequired - b.rangedLevelRequired; });
    } else if (combatType == 'melee') {
        itemSubset.sort(function (a, b) { return a.defenceLevelRequired - b.defenceLevelRequired; });
    }
    //Create table from Item subset
    outputStr = '';
    outputStr = startTable(outputStr);
    //Table Headers
    outputStr = addHeaderColumn(outputStr, 'Item');
    outputStr = addHeaderColumn(outputStr, 'Name');
    //Offensive Stats
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Attack',25,'middle') + 'Stab Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Strength',25,'middle') + 'Slash Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Block Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Attack Bonus'));
    //outputStr = addHeaderColumn(outputStr,'Magic Attack Bonus');
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Strength',25,'middle') + 'Strength Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Strength Bonus'));
    //Defensive Stats
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Defence Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Defence Bonus'));
    //outputStr = addHeaderColumn(outputStr,'Magic Defence Bonus');
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Damage Reduction'));
    //Level Reqs
    outputStr = addHeaderColumn(outputStr, 'Defence Level');
    outputStr = addHeaderColumn(outputStr, 'Ranged Level');
    //Sources
    outputStr = addHeaderColumn(outputStr, 'Sources');
    for (let i = 0; i < itemSubset.length; i++) {
        outputStr = nextTableRow(outputStr);
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemImage(outputStr, itemSubset[i].id, 50, 'center');
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemLink(outputStr, itemSubset[i].id);
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].attackBonus != undefined) {
            outputStr += itemSubset[i].attackBonus[0];
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += itemSubset[i].attackBonus[1];
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += itemSubset[i].attackBonus[2];
        } else {
            outputStr += '0';
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += '0';
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedAttackBonus != undefined) {
            outputStr += itemSubset[i].rangedAttackBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].strengthBonus != undefined) {
            outputStr += itemSubset[i].strengthBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedStrengthBonus != undefined) {
            outputStr += itemSubset[i].rangedStrengthBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].defenceBonus != undefined) {
            outputStr += itemSubset[i].defenceBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedDefenceBonus != undefined) {
            outputStr += itemSubset[i].rangedDefenceBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].damageReduction != undefined) {
            outputStr += itemSubset[i].damageReduction + '%';
        } else {
            outputStr += '0%';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].defenceLevelRequired != undefined) {
            outputStr += itemSubset[i].defenceLevelRequired;
        } else {
            outputStr += '1';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedLevelRequired != undefined) {
            outputStr += itemSubset[i].rangedLevelRequired;
        } else {
            outputStr += '1';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += findItemSources(itemSubset[i].id);
    }
    outputStr = endTable(outputStr);
    return outputStr;
}

function createCapesTable() {
        //Slot Types: Helmet, Platebody, Platelegs, Boots, Gloves, Cape, Amulet, Ring, Quiver, Weapon, Shield slotIndex = CONSTANTS.equipmentSlot.Weapon;
    //Create Item subset
    itemSubset = [];
    itemIDs = [];
    for (let i = 0; i < items.length; i++) {
            if (items[i].equipmentSlot === CONSTANTS.equipmentSlot.Cape){
                itemSubset.push(items[i]);
                itemSubset[itemSubset.length-1].id = i;
            }
    }
    //Create table from Item subset
    outputStr = '';
    outputStr = startTable(outputStr);
    //Table Headers
    outputStr = addHeaderColumn(outputStr, 'Item');
    outputStr = addHeaderColumn(outputStr, 'Name');
    //Offensive Stats
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Attack',25,'middle') + 'Stab Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Strength',25,'middle') + 'Slash Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Block Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Attack Bonus'));
    //outputStr = addHeaderColumn(outputStr,'Magic Attack Bonus');
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Strength',25,'middle') + 'Strength Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Strength Bonus'));
    //Defensive Stats
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Defence Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Defence Bonus'));
    //outputStr = addHeaderColumn(outputStr,'Magic Defence Bonus');
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Damage Reduction'));
    //Sources
    outputStr = addHeaderColumn(outputStr, 'Sources');
    for (let i = 0; i < itemSubset.length; i++) {
        outputStr = nextTableRow(outputStr);
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemImage(outputStr, itemSubset[i].id, 50, 'center');
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemLink(outputStr, itemSubset[i].id);
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].attackBonus != undefined) {
            outputStr += itemSubset[i].attackBonus[0];
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += itemSubset[i].attackBonus[1];
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += itemSubset[i].attackBonus[2];
        } else {
            outputStr += '0';
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += '0';
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedAttackBonus != undefined) {
            outputStr += itemSubset[i].rangedAttackBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].strengthBonus != undefined) {
            outputStr += itemSubset[i].strengthBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedStrengthBonus != undefined) {
            outputStr += itemSubset[i].rangedStrengthBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].defenceBonus != undefined) {
            outputStr += itemSubset[i].defenceBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedDefenceBonus != undefined) {
            outputStr += itemSubset[i].rangedDefenceBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].damageReduction != undefined) {
            outputStr += itemSubset[i].damageReduction + '%';
        } else {
            outputStr += '0%';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += findItemSources(itemSubset[i].id);
    }
    outputStr = endTable(outputStr);
    return outputStr;
}

function createEquipTableWithSpecText(slotIndex) {
    //Slot Types: Helmet, Platebody, Platelegs, Boots, Gloves, Cape, Amulet, Ring, Quiver, Weapon, Shield slotIndex = CONSTANTS.equipmentSlot.Weapon;
//Create Item subset
itemSubset = [];
itemIDs = [];
for (let i = 0; i < items.length; i++) {
        if (items[i].equipmentSlot === slotIndex){
            itemSubset.push(items[i]);
            itemSubset[itemSubset.length-1].id = i;
        }
}
//Create table from Item subset
outputStr = '';
outputStr = startTable(outputStr);
//Table Headers
outputStr = addHeaderColumn(outputStr, 'Item');
outputStr = addHeaderColumn(outputStr, 'Name');
//Offensive Stats
outputStr = addHeaderColumn(outputStr, (createSkillImage('Attack',25,'middle') + 'Stab Bonus'));
outputStr = addHeaderColumn(outputStr, (createSkillImage('Strength',25,'middle') + 'Slash Bonus'));
outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Block Bonus'));
outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Attack Bonus'));
//outputStr = addHeaderColumn(outputStr,'Magic Attack Bonus');
outputStr = addHeaderColumn(outputStr, (createSkillImage('Strength',25,'middle') + 'Strength Bonus'));
outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Strength Bonus'));
//Defensive Stats
outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Defence Bonus'));
outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Defence Bonus'));
//outputStr = addHeaderColumn(outputStr,'Magic Defence Bonus');
outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Damage Reduction'));
outputStr = addHeaderColumn(outputStr, 'Other Effects');
//Sources
outputStr = addHeaderColumn(outputStr, 'Sources');
for (let i = 0; i < itemSubset.length; i++) {
    outputStr = nextTableRow(outputStr);
    outputStr = nextTableColumn(outputStr, 'left');
    outputStr = addItemImage(outputStr, itemSubset[i].id, 50, 'center');
    outputStr = nextTableColumn(outputStr, 'left');
    outputStr = addItemLink(outputStr, itemSubset[i].id);
    outputStr = nextTableColumn(outputStr, 'right');
    if (itemSubset[i].attackBonus != undefined) {
        outputStr += itemSubset[i].attackBonus[0];
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += itemSubset[i].attackBonus[1];
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += itemSubset[i].attackBonus[2];
    } else {
        outputStr += '0';
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += '0';
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += '0';
    }
    outputStr = nextTableColumn(outputStr, 'right');
    if (itemSubset[i].rangedAttackBonus != undefined) {
        outputStr += itemSubset[i].rangedAttackBonus;
    } else {
        outputStr += '0';
    }
    outputStr = nextTableColumn(outputStr, 'right');
    if (itemSubset[i].strengthBonus != undefined) {
        outputStr += itemSubset[i].strengthBonus;
    } else {
        outputStr += '0';
    }
    outputStr = nextTableColumn(outputStr, 'right');
    if (itemSubset[i].rangedStrengthBonus != undefined) {
        outputStr += itemSubset[i].rangedStrengthBonus;
    } else {
        outputStr += '0';
    }
    outputStr = nextTableColumn(outputStr, 'right');
    if (itemSubset[i].defenceBonus != undefined) {
        outputStr += itemSubset[i].defenceBonus;
    } else {
        outputStr += '0';
    }
    outputStr = nextTableColumn(outputStr, 'right');
    if (itemSubset[i].rangedDefenceBonus != undefined) {
        outputStr += itemSubset[i].rangedDefenceBonus;
    } else {
        outputStr += '0';
    }
    outputStr = nextTableColumn(outputStr, 'right');
    if (itemSubset[i].damageReduction != undefined) {
        outputStr += itemSubset[i].damageReduction + '%';
    } else {
        outputStr += '0%';
    }
    outputStr = nextTableColumn(outputStr, 'right');
    outputStr += 'None';
    outputStr = nextTableColumn(outputStr, 'right');
    outputStr += findItemSources(itemSubset[i].id);
}
outputStr = endTable(outputStr);
return outputStr;
}

function createArrowTable() {
    //Slot Types: Helmet, Platebody, Platelegs, Boots, Gloves, Cape, Amulet, Ring, Quiver, Weapon, Shield slotIndex = CONSTANTS.equipmentSlot.Weapon;
    //Create Item subset
    itemSubset = [];
    itemIDs = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].equipmentSlot === CONSTANTS.equipmentSlot.Quiver) {
            itemSubset.push(items[i]);
            itemSubset[itemSubset.length - 1].id = i;
            //Special fix for ice arrows
            if (itemSubset[itemSubset.length - 1].rangedLevelRequired === undefined) {
                itemSubset[itemSubset.length - 1].rangedLevelRequired = 1;
            }
        }
    }
    //Sort Item subset
    itemSubset.sort(function (a, b) { return a.rangedLevelRequired - b.rangedLevelRequired; });
    //Create table from Item subset
    outputStr = '';
    outputStr = startTable(outputStr);
    //Table Headers
    outputStr = addHeaderColumn(outputStr, 'Item');
    outputStr = addHeaderColumn(outputStr, 'Name');
    //Offensive Stats
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Attack',25,'middle') + 'Stab Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Strength',25,'middle') + 'Slash Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Block Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Attack Bonus'));
    //outputStr = addHeaderColumn(outputStr,'Magic Attack Bonus');
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Strength',25,'middle') + 'Strength Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Strength Bonus'));
    //Defensive Stats
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Defence Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Defence Bonus'));
    //outputStr = addHeaderColumn(outputStr,'Magic Defence Bonus');
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Damage Reduction'));
    //Level Reqs
    outputStr = addHeaderColumn(outputStr, 'Ranged Level');
    //Sources
    outputStr = addHeaderColumn(outputStr, 'Sources');
    for (let i = 0; i < itemSubset.length; i++) {
        outputStr = nextTableRow(outputStr);
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemImage(outputStr, itemSubset[i].id, 50, 'center');
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemLink(outputStr, itemSubset[i].id);
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].attackBonus != undefined) {
            outputStr += itemSubset[i].attackBonus[0];
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += itemSubset[i].attackBonus[1];
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += itemSubset[i].attackBonus[2];
        } else {
            outputStr += '0';
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += '0';
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedAttackBonus != undefined) {
            outputStr += itemSubset[i].rangedAttackBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].strengthBonus != undefined) {
            outputStr += itemSubset[i].strengthBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedStrengthBonus != undefined) {
            outputStr += itemSubset[i].rangedStrengthBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].defenceBonus != undefined) {
            outputStr += itemSubset[i].defenceBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedDefenceBonus != undefined) {
            outputStr += itemSubset[i].rangedDefenceBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].damageReduction != undefined) {
            outputStr += itemSubset[i].damageReduction + '%';
        } else {
            outputStr += '0%';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedLevelRequired != undefined) {
            outputStr += itemSubset[i].rangedLevelRequired;
        } else {
            outputStr += '1';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += findItemSources(itemSubset[i].id);
    }
    outputStr = endTable(outputStr);
    return outputStr;
}

function createMeleeWeaponTable() {
    //Slot Types: Helmet, Platebody, Platelegs, Boots, Gloves, Cape, Amulet, Ring, Quiver, Weapon, Shield slotIndex = CONSTANTS.equipmentSlot.Weapon;
    //Create Item subset
    itemSubset = [];
    itemIDs = [];
    for (let i = 0; i < items.length; i++) {
        if ((items[i].equipmentSlot === CONSTANTS.equipmentSlot.Weapon)&(items[i].attackLevelRequired != undefined)) {
            itemSubset.push(items[i]);
            itemSubset[itemSubset.length - 1].id = i;
        }
    }
    //Sort Item subset
    itemSubset.sort(function (a, b) { return a.attackLevelRequired - b.attackLevelRequired; });
    //Create table from Item subset
    outputStr = '';
    outputStr = startTable(outputStr);
    //Table Headers
    outputStr = addHeaderColumn(outputStr, 'Item');
    outputStr = addHeaderColumn(outputStr, 'Name');
    //Offensive Stats
    outputStr = addHeaderColumn(outputStr, 'Attack Speed (s)');
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Attack',25,'middle') + 'Stab Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Strength',25,'middle') + 'Slash Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Block Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Attack Bonus'));
    //outputStr = addHeaderColumn(outputStr,'Magic Attack Bonus');
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Strength',25,'middle') + 'Strength Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Strength Bonus'));
    //Defensive Stats
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Defence Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Defence Bonus'));
    //outputStr = addHeaderColumn(outputStr,'Magic Defence Bonus');
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Damage Reduction'));
    //Level Reqs
    outputStr = addHeaderColumn(outputStr, 'Attack Level');
    outputStr = addHeaderColumn(outputStr, 'Two Handed?');
    //Sources
    outputStr = addHeaderColumn(outputStr, 'Sources');
    for (let i = 0; i < itemSubset.length; i++) {
        outputStr = nextTableRow(outputStr);
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemImage(outputStr, itemSubset[i].id, 50, 'center');
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemLink(outputStr, itemSubset[i].id);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += formatNumberDec(itemSubset[i].attackSpeed/1000,1);
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].attackBonus != undefined) {
            outputStr += itemSubset[i].attackBonus[0];
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += itemSubset[i].attackBonus[1];
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += itemSubset[i].attackBonus[2];
        } else {
            outputStr += '0';
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += '0';
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedAttackBonus != undefined) {
            outputStr += itemSubset[i].rangedAttackBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].strengthBonus != undefined) {
            outputStr += itemSubset[i].strengthBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedStrengthBonus != undefined) {
            outputStr += itemSubset[i].rangedStrengthBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].defenceBonus != undefined) {
            outputStr += itemSubset[i].defenceBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedDefenceBonus != undefined) {
            outputStr += itemSubset[i].rangedDefenceBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].damageReduction != undefined) {
            outputStr += itemSubset[i].damageReduction + '%';
        } else {
            outputStr += '0%';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].attackLevelRequired != undefined) {
            outputStr += itemSubset[i].attackLevelRequired;
        } else {
            outputStr += '1';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].isTwoHanded) {
            outputStr += 'Yes';
        } else {
            outputStr += 'No';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += findItemSources(itemSubset[i].id);
    }
    outputStr = endTable(outputStr);
    return outputStr;
}

function createRangedWeaponTable() {
    //Slot Types: Helmet, Platebody, Platelegs, Boots, Gloves, Cape, Amulet, Ring, Quiver, Weapon, Shield slotIndex = CONSTANTS.equipmentSlot.Weapon;
    //Create Item subset
    itemSubset = [];
    itemIDs = [];
    for (let i = 0; i < items.length; i++) {
        if ((items[i].equipmentSlot === CONSTANTS.equipmentSlot.Weapon)&(items[i].rangedLevelRequired != undefined)) {
            itemSubset.push(items[i]);
            itemSubset[itemSubset.length - 1].id = i;
        }
    }
    //Sort Item subset
    itemSubset.sort(function (a, b) { return a.rangedLevelRequired - b.rangedLevelRequired; });
    //Create table from Item subset
    outputStr = '';
    outputStr = startTable(outputStr);
    //Table Headers
    outputStr = addHeaderColumn(outputStr, 'Item');
    outputStr = addHeaderColumn(outputStr, 'Name');
    //Offensive Stats
    outputStr = addHeaderColumn(outputStr, 'Attack Speed (s)');
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Attack',25,'middle') + 'Stab Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Strength',25,'middle') + 'Slash Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Block Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Attack Bonus'));
    //outputStr = addHeaderColumn(outputStr,'Magic Attack Bonus');
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Strength',25,'middle') + 'Strength Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Strength Bonus'));
    //Defensive Stats
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Defence Bonus'));
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Ranged',25,'middle') + 'Defence Bonus'));
    //outputStr = addHeaderColumn(outputStr,'Magic Defence Bonus');
    outputStr = addHeaderColumn(outputStr, (createSkillImage('Defence',25,'middle') + 'Damage Reduction'));
    //Level Reqs
    outputStr = addHeaderColumn(outputStr, 'Ranged Level');
    //Sources
    outputStr = addHeaderColumn(outputStr, 'Sources');
    for (let i = 0; i < itemSubset.length; i++) {
        outputStr = nextTableRow(outputStr);
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemImage(outputStr, itemSubset[i].id, 50, 'center');
        outputStr = nextTableColumn(outputStr, 'left');
        outputStr = addItemLink(outputStr, itemSubset[i].id);
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += formatNumberDec(itemSubset[i].attackSpeed/1000,1);
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].attackBonus != undefined) {
            outputStr += itemSubset[i].attackBonus[0];
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += itemSubset[i].attackBonus[1];
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += itemSubset[i].attackBonus[2];
        } else {
            outputStr += '0';
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += '0';
            outputStr = nextTableColumn(outputStr, 'right');
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedAttackBonus != undefined) {
            outputStr += itemSubset[i].rangedAttackBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].strengthBonus != undefined) {
            outputStr += itemSubset[i].strengthBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedStrengthBonus != undefined) {
            outputStr += itemSubset[i].rangedStrengthBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].defenceBonus != undefined) {
            outputStr += itemSubset[i].defenceBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedDefenceBonus != undefined) {
            outputStr += itemSubset[i].rangedDefenceBonus;
        } else {
            outputStr += '0';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].damageReduction != undefined) {
            outputStr += itemSubset[i].damageReduction + '%';
        } else {
            outputStr += '0%';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        if (itemSubset[i].rangedLevelRequired != undefined) {
            outputStr += itemSubset[i].rangedLevelRequired;
        } else {
            outputStr += '1';
        }
        outputStr = nextTableColumn(outputStr, 'right');
        outputStr += findItemSources(itemSubset[i].id);
    }
    outputStr = endTable(outputStr);
    return outputStr;
}



function createEquipmentPage() {
    outputStr = '';
    outputStr = addSection(outputStr,'Helmets');
    outputStr = addSubSection(outputStr,'Melee');
    outputStr += createArmourTable(CONSTANTS.equipmentSlot.Helmet,'melee');
    outputStr = addSubSection(outputStr,'Ranged');
    outputStr += createArmourTable(CONSTANTS.equipmentSlot.Helmet,'ranged');
    outputStr = addSection(outputStr,'Platebodies');
    outputStr = addSubSection(outputStr,'Melee');
    outputStr += createArmourTable(CONSTANTS.equipmentSlot.Platebody,'melee');
    outputStr = addSubSection(outputStr,'Ranged');
    outputStr += createArmourTable(CONSTANTS.equipmentSlot.Platebody,'ranged');
    outputStr = addSection(outputStr,'Platelegs');
    outputStr = addSubSection(outputStr,'Melee');
    outputStr += createArmourTable(CONSTANTS.equipmentSlot.Platelegs,'melee');
    outputStr = addSubSection(outputStr,'Ranged');
    outputStr += createArmourTable(CONSTANTS.equipmentSlot.Platelegs,'ranged');
    outputStr = addSection(outputStr,'Boots');
    outputStr = addSubSection(outputStr,'Melee');
    outputStr += createArmourTable(CONSTANTS.equipmentSlot.Boots,'melee');
    outputStr = addSubSection(outputStr,'Ranged');
    outputStr += createArmourTable(CONSTANTS.equipmentSlot.Boots,'ranged');
    outputStr = addSection(outputStr,'Gloves');
    outputStr = addSubSection(outputStr,'Combat');
    outputStr += createArmourTable(CONSTANTS.equipmentSlot.Gloves,'ranged');
    outputStr = addSubSection(outputStr,'Skills');
    outputStr += createSkillGloveTable();
    outputStr = addSection(outputStr,'Capes');
    outputStr += createCapesTable();
    outputStr = addSection(outputStr,'Arrows');
    outputStr += createArrowTable();
    outputStr = addSection(outputStr,'Rings');
    outputStr += createEquipTableWithSpecText(CONSTANTS.equipmentSlot.Ring);
    outputStr = addSection(outputStr,'Amulets');
    outputStr += createEquipTableWithSpecText(CONSTANTS.equipmentSlot.Amulet);
    outputStr = addSection(outputStr,'Shields');
    outputStr += createArmourTable(CONSTANTS.equipmentSlot.Shield,'melee');
    outputStr = addSection(outputStr,'Weapons');
    outputStr = addSubSection(outputStr,'Melee');
    outputStr += createMeleeWeaponTable();
    outputStr = addSubSection(outputStr,'Ranged');
    outputStr += createRangedWeaponTable();
    console.log(outputStr)
}

/** @description Generic function for creating a table from the items array 
 * @param {string[]} colHeaders Contains strings for the column headers of the array
 * @param {string[]} cellJustification Contains strings that determine the justification of each column
 * @param {Function[]} formatFunctions Array of functions that determine how to format the key values of items
 * @param {string[]} itemKeys Array of key values from the item array
 * @param {Array} keyDefaults Default value to feed formatFunction if key doesn't exist
 * @param {Function} selectCriteria Function for determining if the element of items should be included
 * @param {Function} sortFunction Function to determine how to sort the item subset
 * @returns {string} */
function createItemTable(colHeaders,cellJustification,formatFunctions,itemKeys,keyDefaults,selectCriteria,sortFunction,itemKeys) {
    var itemSubset = getArraySubset(items,selectCriteria);
    itemSubset.sort(sortFunction);
    var outputStr = '';
    outputStr = startTable(outputStr);
    //Add Headers
    for (let i=0;i<colHeaders.length;i++) {
        outputStr = addHeaderColumn(colHeaders[i]);
    }
    //Add key values to rows
    for (let i=0;i<itemSubset.length;i++) {
        outputStr = nextTableRow(outputStr);
        for (let j=0;j<itemKeys.length;j++) {
            outputStr = nextTableColumn(outputStr, cellJustification[j]);
            if (itemSubset[i][itemKeys[j]]) {
                outputStr += formatFunctions[j](itemSubset[i][itemKeys[j]]);
            } else {
                outputStr += formatFunctions[j](keyDefaults[j]);
            }
        }
    }
    outputStr = endTable(outputStr);
    return outputStr;
}

/** @description Gets the subset of an array based on the selectCriteria
 * @param {Function} selectCriteria Function that determines if element should be included
 * @param {Array} arrayToSearch Array that should be searched
 * @returns {Array}
 */
function getArraySubset(arrayToSearch,selectCriteria) {
    var arraySubset = [];
    for (let i=0;i<arrayToSearch.length;i++) {
        if (selectCriteria(arrayToSearch[i])) {
            arraySubset.push(arrayToSearch[i]);
        }
    }
    return arraySubset;
}

/**@description Creates a table of skill gloves
 * @returns {string}
 */
function createSkillGloveTable() {
    var columnFormat = [
        {header: 'Item',
        just: 'left',
        arrayKey: 'id',
        keyDefault: 0,
        keyFormatter: },
        {header: 'Name',
        just: 'left',
        arrayKey: 'id',
        keyDefault: 0,
        keyFormatter: },
        {header: 'Other Effects',
        just: 'left',
        arrayKey: 'id',
        keyDefault: 0,
        keyFormatter: },
        {header: 'Sources',
        just: 'left',
        arrayKey: 'id',
        keyDefault: 0,
        keyFormatter: findItemSources}
    ]
    var colHeaders = ['Item','Name','Other Effects','Sources'];
    var cellJustification = ['left','left','left','right','right'];
    var formatFunctions = [,,() => {return 'None'},findItemSources]
    var itemKeys = ['id','id','id','id'];
    var keyDefaults = [0,0,0,0];
    var selectCriteria = (item) => {return (item.equipmentSlot == CONSTANTS.equipmentSlot.Gloves) & (item.rangedLevelRequired == undefined)}
    var sortFunction = (a,b) => {return 0};

    return createItemTable(colHeaders,cellJustification,formatFunctions,itemKeys,keyDefaults,selectCriteria,sortFunction,itemKeys);
    //Slot Types: Helmet, Platebody, Platelegs, Boots, Gloves, Cape, Amulet, Ring, Quiver, Weapon, Shield slotIndex = CONSTANTS.equipmentSlot.Weapon;
//Create Item subset
itemSubset = [];
itemIDs = [];
for (let i = 0; i < items.length; i++) {
        if ((items[i].equipmentSlot === CONSTANTS.equipmentSlot.Gloves)&(items[i].rangedLevelRequired === undefined)){
            itemSubset.push(items[i]);
            itemSubset[itemSubset.length-1].id = i;
        }
}
//Create table from Item subset
outputStr = '';
outputStr = startTable(outputStr);
//Table Headers
outputStr = addHeaderColumn(outputStr, 'Item');
outputStr = addHeaderColumn(outputStr, 'Name');
outputStr = addHeaderColumn(outputStr, 'Other Effects');
//Sources
outputStr = addHeaderColumn(outputStr, 'Sources');
for (let i = 0; i < itemSubset.length; i++) {
    outputStr = nextTableRow(outputStr);
    outputStr = nextTableColumn(outputStr, 'left');
    outputStr = addItemImage(outputStr, itemSubset[i].id, 50, 'center');
    outputStr = nextTableColumn(outputStr, 'left');
    outputStr = addItemLink(outputStr, itemSubset[i].id);
    outputStr = nextTableColumn(outputStr, 'right');
    outputStr += 'None';
    outputStr = nextTableColumn(outputStr, 'right');
    outputStr += findItemSources(itemSubset[i].id);
}
outputStr = endTable(outputStr);
return outputStr;
}
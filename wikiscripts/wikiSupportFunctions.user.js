// ==UserScript==
// @name Melvor Idle Wiki Helper
// @description Adds functions to create strings for the Melvor Idle Wiki
// @include http://melvoridle.com/index.php
// @include http://www.melvoridle.com/index.php
// @include https://melvoridle.com/index.php
// @include https://www.melvoridle.com/index.php
// @grant none
// @require https://github.com/coolrox95/melvoridle.github.io/blob/master/wikiscripts/formatPercent.js
// @version 0.1.1
// ==/UserScript==

//Support functions for wiki scripts

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
    outputStr = addHeaderColumn(outputStr, 'Bonfire bonus');
    outputStr = addHeaderColumn(outputStr, 'Bonfire Time (s)');

    for (let i = 0; i < logsData.length; i++) {
        // Find the itemID corresponding to the log
        for (j = 0; j < items.length; j++) {
            if (items[j].firemakingID == logIndex) {
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

function createLogsTable() {
    outputStr = '';
    outputStr = startTable(outputStr);
    outputStr = addHeaderColumn(outputStr, 'Logs');
    outputStr = addHeaderColumn(outputStr, 'Name');
    outputStr = addHeaderColumn(outputStr, 'Woodcutting Level');
    outputStr = addHeaderColumn(outputStr, 'Experience');
    outputStr = addHeaderColumn(outputStr, 'Cut Time(s)');
    outputStr = addHeaderColumn(outputStr, 'Price');

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
    categoryStrings = ['Arrow','Shortbow','Longbow'];
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
        for (let j = 0; j < items[itemSubset[i].itemID].fletchReq.length; j++) {
            outputStr += items[itemSubset[i].itemID].fletchReq[j].qty + ' ';
            outputStr = addItemImageLink(outputStr, items[itemSubset[i].itemID].fletchReq[j].id, 25, 'middle')
        }
    }
    outputStr = endTable(outputStr);
    console.log(outputStr);
}

//Files refactored: Cooking, Farming, Firemaking, Mining, Fishing, Woodcutting, Smithing, Crafting, Fletching

//Files left: Thieving

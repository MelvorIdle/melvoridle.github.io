//This contains functions that generate specific tables for the wiki
/// <reference path="keyFormatters.js" />
/// <reference path="commonElements.js" />
/// <reference path="sortFunctions.js"/>
/// <reference path="selectionFunctions.js"/>
/**
 * @description Creates a table of all cookable items in game
 * @returns {string}
 */
function createCookingTable() {
       var cookableItems = getObjectArraySubset(items, selectCookable);
       var cookSpec = new tableSpecMaker();
       cookSpec.appendColumn('Item', 'left', 'cookedItemID', 0, formatItemIDasImage50);
       cookSpec.appendColumn('Name', 'left', 'cookedItemID', 0, formatItemIDasLink);
       cookSpec.appendColumn('Cooking Level', 'right', 'cookingLevel', 1, formatAsInt);
       cookSpec.appendColumn('Experience', 'right', 'cookingXP', 0, formatAsInt);
       cookSpec.appendColumn('Healing', 'right', 'cookedItemID', 0, (id) => { return formatAsInt(items[id].healsFor) })
       cookSpec.appendColumn('Price', 'right', 'cookedItemID', 0, formatItemIDasPrice)
       cookSpec.appendColumn('Ingredients', 'right', 'name', 'Unknown Item', (name) => { return `1 ${formatItemImageLink(name, 25, 'middle')}` })
       return formatObjectArrayAsTable(cookableItems, cookSpec.tableSpec);
}
/**
 * @description Creates a table of farmable crops for the farming page
 * @returns {string}
 */
function createFarmingAllotmentTable() {
       var farmableItems = getObjectArraySubset(items, selectAllotmentSeed)
       var farmSpec = new tableSpecMaker();
       farmSpec.appendColumn('Seeds', 'left', 'parentIndex', '', formatItemIDasImage50);
       farmSpec.appendColumn('Name', 'left', 'name', '', formatPageLink);
       farmSpec.appendColumn('Farming Level', 'right', 'farmingLevel', 1, formatAsInt);
       farmSpec.appendColumn('Experience', 'right', 'farmingXP', 0, formatAsInt);
       farmSpec.appendColumn('Time to Grow (S)', 'right', 'timeToGrow', 0, formatAsInt);
       farmSpec.appendColumn('Seed Value', 'right', 'sellsFor', 0, formatAsInt);
       farmSpec.appendColumn('Crop', 'left', 'grownItemID', 0, formatItemIDasImage50)
       farmSpec.appendColumn('Crop Name', 'left', 'grownItemID', 0, formatItemIDasLink);
       farmSpec.appendColumn('Crop Value', 'right', 'grownItemID', 0, formatItemIDasPrice);
       return formatObjectArrayAsTable(farmableItems, farmSpec.tableSpec);
}
/**
 * @description Creates a table of farmable trees for the farming page
 * @returns {string}
 */
function createFarmingTreeTable() {
       var farmableItems = getObjectArraySubset(items, selectTreeseed)
       var farmSpec = new tableSpecMaker();
       farmSpec.appendColumn('Seeds', 'left', 'parentIndex', '', formatItemIDasImage50);
       farmSpec.appendColumn('Name', 'left', 'name', '', formatPageLink);
       farmSpec.appendColumn('Farming Level', 'right', 'farmingLevel', 1, formatAsInt);
       farmSpec.appendColumn('Experience', 'right', 'farmingXP', 0, formatAsInt);
       farmSpec.appendColumn('Time to Grow (S)', 'right', 'timeToGrow', 0, formatAsInt);
       farmSpec.appendColumn('Seed Value', 'right', 'sellsFor', 0, formatAsInt);
       farmSpec.appendColumn('Logs', 'left', 'grownItemID', 0, formatItemIDasImage50)
       farmSpec.appendColumn('Log Name', 'left', 'grownItemID', 0, formatItemIDasLink);
       farmSpec.appendColumn('Log Value', 'right', 'grownItemID', 0, formatItemIDasPrice);
       return formatObjectArrayAsTable(farmableItems, farmSpec.tableSpec);
}

/**
 * @description Creates a table of burnable logs for the Firmaking Page
 * @returns {string}
 */
function createFiremakingTable() {
       var logs = getObjectArraySubset(logsData, () => { return true })
       var logSpec = new tableSpecMaker();
       logSpec.appendColumn('Logs', 'left', 'parentIndex', 0, formatItemIDasImage50);
       logSpec.appendColumn('Name', 'left', 'parentIndex', 0, formatItemIDasLink);
       logSpec.appendColumn('Firemaking Level', 'right', 'level', 1, formatAsInt);
       logSpec.appendColumn('Experience', 'right', 'xp', 0, formatAsInt);
       logSpec.appendColumn('Burn Time (S)', 'right', 'interval', 0, formatMSasS);
       logSpec.appendColumn('XP/s', 'right', ['xp', 'interval'], [0, 1], formatAsRate);
       logSpec.appendColumn('Bonfire bonus', 'right', 'bonfireBonus', 0, a => formatNumberPerc(a, 0))
       logSpec.appendColumn('Bonfire Time (s)', 'right', 'bonfireInterval', 0, formatMSasS);
       return formatObjectArrayAsTable(logs, logSpec.tableSpec);
}

/**
 * @description Creates a table of ores for the Mining page
 * @returns {string}
 */
function createMiningTable() {
       var oreSpec = new tableSpecMaker();
       oreSpec.appendColumn('Ore', 'left', 'ore', 0, formatItemIDasImage50);
       oreSpec.appendColumn('Name', 'left', 'ore', 0, formatItemIDasLink);
       oreSpec.appendColumn('Mining Level', 'right', 'level', 1, formatAsInt);
       oreSpec.appendColumn('Experience', 'right', 'ore', 0, id => { return formatAsInt(items[id].miningXP) });
       oreSpec.appendColumn('Respawn Time (s)', 'right', 'respawnInterval', 0, formatMSasS);
       oreSpec.appendColumn('Ore Price', 'right', 'ore', 0, formatItemIDasPrice);
       oreSpec.appendColumn('XP/s', 'right', 'ore', 0, id => { return formatNumberDec(items[id].miningXP / baseMiningInterval * 1000, 2) });
       oreSpec.appendColumn('GP/s', 'right', 'ore', 0, id => { return formatNumberDec(items[id].sellsFor / baseMiningInterval * 1000, 2) });
       miningData2 = miningData;
       miningData2.sort((a, b) => { return a.level - b.level });
       return formatObjectArrayAsTable(miningData2, oreSpec.tableSpec);
}

/**
 * @description Creates a table of gems for the Mining page
 * @returns {string}
 */
function createGemTable() {
       //Gem information is hardcoded due to how the game handles gems
       var gems = [
              {
                     id: CONSTANTS.item.Topaz,
                     chance: 40
              },
              {
                     id: CONSTANTS.item.Sapphire,
                     chance: 20
              },
              {
                     id: CONSTANTS.item.Ruby,
                     chance: 20
              },
              {
                     id: CONSTANTS.item.Emerald,
                     chance: 12.5
              },
              {
                     id: CONSTANTS.item.Diamond,
                     chance: 7.5
              }
       ];

       var oreSpec = new tableSpecMaker();
       oreSpec.appendColumn('Gem', 'left', 'id', 0, formatItemIDasImage50);
       oreSpec.appendColumn('Name', 'left', 'id', 0, formatItemIDasLink);
       oreSpec.appendColumn('Gem Chance', 'right', 'chance', 0, a => formatNumberPerc(a, 1));
       oreSpec.appendColumn('Gem Price', 'right', 'id', 0, formatItemIDasPrice);
       return formatObjectArrayAsTable(gems, oreSpec.tableSpec);
}

/**@description Creates a table of items that can be fished
 * @returns {string}
 */
function createFishingTable() {
       var oreSpec = new tableSpecMaker();
       oreSpec.appendColumn('Fish', 'left', 'itemID', 0, formatItemIDasImage50);
       oreSpec.appendColumn('Name', 'left', 'itemID', 0, formatItemIDasLink);
       oreSpec.appendColumn('Fishing Level', 'right', 'level', 1, formatAsInt);
       oreSpec.appendColumn('Experience', 'right', 'xp', 0, formatAsInt);
       oreSpec.appendColumn('Fish Price', 'right', 'itemID', 0, formatItemIDasPrice);
       return formatObjectArrayAsTable(fishData, oreSpec.tableSpec);
}

/**
 * @description Creates a table of equipment that can be upgraded
 * @param {number} equipmentSlot
 * @returns {string}
 */
function createUpgradeableGearTable(equipmentSlot) {
       var itemSubset = getObjectArraySubset(items, item => selectGearUpgradeable(item, equipmentSlot));
       itemSubset.sort(sortByDefenceLevel);
       var tabSpec = new tableSpecMaker();
       tabSpec.appendColumn('Item', 'left', 'name', '', name => formatItemImage(name, 50, 'center'));
       tabSpec.appendColumn('Name', 'left', 'name', '', formatPageLink);
       tabSpec.appendColumn('Ingredients', 'right', 'trimmedItemID', 0, id => { return formatBarsRequired(items[id].barsRequired) });
       tabSpec.appendColumn('Upgraded Item', 'left', 'trimmedItemID', 0, formatItemIDasImage50);
       tabSpec.appendColumn('Name', 'left', 'trimmedItemID', 0, formatItemIDasLink);
       tabSpec.appendColumn('Stat Change', 'right', 'parentIndex', 0, formatUpgradeChange);
       return formatObjectArrayAsTable(itemSubset, tabSpec.tableSpec);
}
/**
 * @description Creates a table of monsters that are found in Combat Areas and Dungeons
 * @returns {string}
 */
function createMonsterTable() {
       var monsterSubset = getObjectArraySubset(MONSTERS, selectMonsters);
       var tabSpec = new tableSpecMaker();
       tabSpec.appendColumn('Monster', 'left', 'name', '', name => formatMonsterImage(name, 50, 'center'));
       tabSpec.appendColumn('Name', 'left', 'name', '', formatPageLink);
       tabSpec.appendColumn(`${formatSkillImage('Hitpoints', 25, 'middle')} Hitpoints`, 'right', 'hitpoints', 0, formatAsInt);
       tabSpec.appendColumn(`${formatSkillImage('Attack', 25, 'middle')} Attack Level`, 'right', 'attackLevel', 1, formatAsInt);
       tabSpec.appendColumn(`${formatSkillImage('Strength', 25, 'middle')} Strength Level`, 'right', 'strengthLevel', 1, formatAsInt);
       tabSpec.appendColumn(`${formatSkillImage('Defence', 25, 'middle')} Defence Level`, 'right', 'defenceLevel', 1, formatAsInt);
       tabSpec.appendColumn(`${formatSkillImage('Ranged', 25, 'middle')} Ranged Level`, 'right', 'rangedLevel', 1, formatAsInt);
       tabSpec.appendColumn(`${formatSkillImage('Magic', 25, 'middle')} Magic Level`, 'right', 'magicLevel', 1, formatAsInt);
       tabSpec.appendColumn(`${formatCombatImage(25, 'middle')} Attack Bonus`, 'right', 'attackBonus', 0, formatAsInt);
       tabSpec.appendColumn(`${formatCombatImage(25, 'middle')} Strength Bonus`, 'right', 'strengthBonus', 0, formatAsInt);
       tabSpec.appendColumn(`${formatSkillImage('Defence', 25, 'middle')} Defence Bonus`, 'right', 'defenceBonus', 0, formatAsInt);
       tabSpec.appendColumn(`${formatSkillImage('Ranged', 25, 'middle')} Defence Bonus`, 'right', 'defenceBonusRanged', 0, formatAsInt);
       tabSpec.appendColumn(`${formatSkillImage('Magic', 25, 'middle')} Defence Bonus`, 'right', 'defenceBonusMagic', 0, formatAsInt);
       tabSpec.appendColumn('Attack Speed (s)', 'right', 'attackSpeed', 3000, t => formatNumberDec(t / 1000, 1));
       tabSpec.appendColumn('Attack Type', 'right', 'attackType', CONSTANTS.attackType.Melee, formatAttackType);
       return formatObjectArrayAsTable(monsterSubset, tabSpec.tableSpec);
}

/**
 * @description Creates a table of smithing items with names that contain type
 * @param {string} type String to search items for
 * @returns {string}
 */
function createSmithingTable(type) {
       var itemSubset = getObjectArraySubset(smithingItems, item => selectSmithingItem(item, type))
       console.log(itemSubset)
       itemSubset.sort((a, b) => { a.smithingLevel - b.smithingLevel });
       var tabSpec = new tableSpecMaker();
       tabSpec.appendColumn('Item', 'left', 'itemID', 0, formatItemIDasImage50);
       tabSpec.appendColumn('Name', 'left', 'itemID', 0, formatItemIDasLink);
       tabSpec.appendColumn('Smithing Level', 'right', 'smithingLevel', 1, formatAsInt);
       tabSpec.appendColumn('Experience', 'right', 'itemID', 0, id => formatAsInt(items[id].smithingXP));
       if (type != 'Bar') {
              tabSpec.appendColumn('Smithing Quantity', 'right', 'itemID', 0, formatItemIDasSmithingQty)
       }
       tabSpec.appendColumn('Item Price', 'right', 'itemID', 0, formatItemIDasPrice);
       tabSpec.appendColumn('Ingredients', 'right', 'itemID', 0, id => formatCraftReq(items[id].smithReq));
       return formatObjectArrayAsTable(itemSubset, tabSpec.tableSpec);
}

/**
 * @description Creates the tables on the smithing table in a single string
 * @returns {string}
 */
function createSmithingPage() {
       var outStr = '';
       outStr += createSubSection('Bars');
       outStr += createSmithingTable('Bar');
       outStr += createSubSection('Bronze Gear');
       outStr += createSmithingTable('Bronze');
       outStr += createSubSection('Iron Gear');
       outStr += createSmithingTable('Iron');
       outStr += createSubSection('Steel Gear');
       outStr += createSmithingTable('Steel');
       outStr += createSubSection('Mithril Gear');
       outStr += createSmithingTable('Mithril');
       outStr += createSubSection('Adamant Gear');
       outStr += createSmithingTable('Adamant');
       outStr += createSubSection('Rune Gear');
       outStr += createSmithingTable('Rune');
       outStr += createSubSection('Dragon Gear');
       outStr += createSmithingTable('Dragon');
       return outStr;
}

/**
 * @description Creates a table of equipment of the given type for the provided slot
 * @param {number} equipmentSlot 
 * @param {string} type Type of equipment: 'Melee','Ranged,'Magic','All','Skill'
 */
function createArmourTable(equipmentSlot, type) {
       var isSkillItem = (equipmentSlot == CONSTANTS.equipmentSlot.Gloves && type == 'None');
       var itemSubset = getObjectArraySubset(items, item => selectArmourItem(item, equipmentSlot, type))
       if (type == 'Melee') {
              itemSubset.sort(sortByDefenceLevel)
       } else if (type == 'Ranged') {
              itemSubset.sort(sortByRangedLevel)
       } else if (type == 'Magic') {
              itemSubset.sort(sortByMagicLevel)
       }
       var tabSpec = new tableSpecMaker();
       tabSpec.appendColumn('Item', 'left', 'name', '', name => formatItemImage(name, 50, 'center'));
       tabSpec.appendColumn('Name', 'left', 'name', '', formatPageLink);
       if (!isSkillItem) {
       tabSpec.appendColumn(`${formatSkillImageLink('Strength', 25, 'middle')} Strength Bonus`, 'right', 'strengthBonus', 0, formatAsInt);
       tabSpec.appendColumn(`${formatSkillImageLink('Attack', 25, 'middle')} Stab Bonus`, 'right', 'attackBonus', 0, x => formatAsInt(x[0]))
       tabSpec.appendColumn(`${formatSkillImageLink('Strength', 25, 'middle')} Slash Bonus`, 'right', 'attackBonus', 0, x => formatAsInt(x[1]))
       tabSpec.appendColumn(`${formatSkillImageLink('Defence', 25, 'middle')} Block Bonus`, 'right', 'attackBonus', 0, x => formatAsInt(x[2]))
       tabSpec.appendColumn(`${formatSkillImageLink('Ranged', 25, 'middle')} Attack Bonus`, 'right', 'rangedAttackBonus', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Ranged', 25, 'middle')} Strength Bonus`, 'right', 'rangedStrengthBonus', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Magic', 25, 'middle')} Attack Bonus`, 'right', 'magicAttackBonus', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Magic', 25, 'middle')} % Damage Bonus`, 'right', 'magicDamageBonus', 0, x => formatNumberPerc(x, 0))
       tabSpec.appendColumn(`${formatSkillImageLink('Defence', 25, 'middle')} Defence Bonus`, 'right', 'defenceBonus', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Defence', 25, 'middle')} Damage Reduction`, 'right', 'damageReduction', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Ranged', 25, 'middle')} Defence Bonus`, 'right', 'rangedDefenceBonus', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Magic', 25, 'middle')} Defence Bonus`, 'right', 'magicDefenceBonus', 0, formatAsInt)
       }
       //Items that may have extra effects: Capes, Rings, Amulets, Gloves (Skill)
       if (equipmentSlot == CONSTANTS.equipmentSlot.Cape||equipmentSlot == CONSTANTS.equipmentSlot.Ring||equipmentSlot == CONSTANTS.equipmentSlot.Amulet||(equipmentSlot == CONSTANTS.equipmentSlot.Gloves && type == 'None')) {
              tabSpec.appendColumn('Description', 'right', 'description', 'None', a=>{return a})
       }
       if (!isSkillItem) {
       tabSpec.appendColumn(`${formatSkillImageLink('Defence', 25, 'middle')} Level`, 'right', 'defenceLevelRequired', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Ranged', 25, 'middle')} Level`, 'right', 'rangedLevelRequired', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Magic', 25, 'middle')} Level`, 'right', 'magicLevelRequired', 0, formatAsInt)
       }
       tabSpec.appendColumn('Sources','right','parentIndex',0,formatItemIDasItemSource)
       return formatObjectArrayAsTable(itemSubset, tabSpec.tableSpec)
}

/**
 * 
 * @param {string} type Type of equipment: 'Melee','Ranged','Magic'
 */
function createWeaponTable(type) {
       var itemSubset = getObjectArraySubset(items, item => selectWeaponItem(item,type))
       if (type == 'Melee') {
              itemSubset.sort(sortByAttackLevel)
       } else if (type == 'Ranged') {
              itemSubset.sort(sortByRangedLevel)
       } else if (type == 'Magic') {
              itemSubset.sort(sortByMagicLevel)
       }
       var tabSpec = new tableSpecMaker();
       tabSpec.appendColumn('Item', 'left', 'name', '', name => formatItemImage(name, 50, 'center'));
       tabSpec.appendColumn('Name', 'left', 'name', '', formatPageLink);
       tabSpec.appendColumn('Attack Speed', 'right', 'attackSpeed', 0, formatAsInt);
       tabSpec.appendColumn(`${formatSkillImageLink('Strength', 25, 'middle')} Strength Bonus`, 'right', 'strengthBonus', 0, formatAsInt);
       tabSpec.appendColumn(`${formatSkillImageLink('Attack', 25, 'middle')} Stab Bonus`, 'right', 'attackBonus', 0, x => formatAsInt(x[0]))
       tabSpec.appendColumn(`${formatSkillImageLink('Strength', 25, 'middle')} Slash Bonus`, 'right', 'attackBonus', 0, x => formatAsInt(x[1]))
       tabSpec.appendColumn(`${formatSkillImageLink('Defence', 25, 'middle')} Block Bonus`, 'right', 'attackBonus', 0, x => formatAsInt(x[2]))
       tabSpec.appendColumn(`${formatSkillImageLink('Ranged', 25, 'middle')} Attack Bonus`, 'right', 'rangedAttackBonus', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Ranged', 25, 'middle')} Strength Bonus`, 'right', 'rangedStrengthBonus', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Magic', 25, 'middle')} Attack Bonus`, 'right', 'magicAttackBonus', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Magic', 25, 'middle')} % Damage Bonus`, 'right', 'magicDamageBonus', 0, x => formatNumberPerc(x, 0))
       tabSpec.appendColumn(`${formatSkillImageLink('Defence', 25, 'middle')} Defence Bonus`, 'right', 'defenceBonus', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Defence', 25, 'middle')} Damage Reduction`, 'right', 'damageReduction', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Ranged', 25, 'middle')} Defence Bonus`, 'right', 'rangedDefenceBonus', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Magic', 25, 'middle')} Defence Bonus`, 'right', 'magicDefenceBonus', 0, formatAsInt)
       tabSpec.appendColumn('Two Handed?','right','isTwoHanded',false,formatBoolAsYesNo)
       tabSpec.appendColumn(`${formatSkillImageLink('Attack', 25, 'middle')} Level`, 'right', 'attackLevelRequired', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Ranged', 25, 'middle')} Level`, 'right', 'rangedLevelRequired', 0, formatAsInt)
       tabSpec.appendColumn(`${formatSkillImageLink('Magic', 25, 'middle')} Level`, 'right', 'magicLevelRequired', 0, formatAsInt)
       tabSpec.appendColumn('Sources','right','parentIndex',0,formatItemIDasItemSource)
       return formatObjectArrayAsTable(itemSubset, tabSpec.tableSpec)
}
/*
function checkItemSubsetForStats(itemSubset,statKey) {
       var foundStat = false;
       var statTotal = 0;
       for (let i=0;i<itemSubset.length;i++) {
              if (itemSubset[i][statKey] != undefined) {
                     foundStat = true;
                     statTotal += itemSubset[i][statKey];
              }
       }
       return !(statTotal == 0 | !foundStat);
}



/**
 * @description Creates the tables for the Equipment page
 * @returns {string}
 */
function createEquipmentPage() {
       var outStr = '';
       outStr += createSection('Helmets');
       outStr += createSlotSection(CONSTANTS.equipmentSlot.Helmet);
       outStr += createSection('Platebodies')
       outStr += createSlotSection(CONSTANTS.equipmentSlot.Platebody);
       outStr += createSection('Platelegs')
       outStr += createSlotSection(CONSTANTS.equipmentSlot.Platelegs);
       outStr += createSection('Boots')
       outStr += createSlotSection(CONSTANTS.equipmentSlot.Boots);
       outStr += createSection('Gloves')
       outStr += createSubSection('Ranged')
       outStr += createArmourTable(CONSTANTS.equipmentSlot.Gloves,'Ranged')
       outStr += createSubSection('Skills')
       outStr += createArmourTable(CONSTANTS.equipmentSlot.Gloves,'None')
       outStr += createSection('Capes')
       outStr += createArmourTable(CONSTANTS.equipmentSlot.Cape,'All')
       outStr += createSection('Arrows')
       outStr += createArmourTable(CONSTANTS.equipmentSlot.Quiver,'Ranged')
       outStr += createSection('Rings')
       outStr += createArmourTable(CONSTANTS.equipmentSlot.Ring,'All')
       outStr += createSection('Amulets')
       outStr += createArmourTable(CONSTANTS.equipmentSlot.Amulet,'All')
       outStr += createSection('Shields')
       outStr += createArmourTable(CONSTANTS.equipmentSlot.Shield,'Melee')
       outStr += createSection('Weapons')
       outStr += createSubSection('Melee')
       outStr += createWeaponTable('Melee')
       outStr += createSubSection('Ranged')
       outStr += createWeaponTable('Ranged')
       outStr += createSubSection('Magic')
       outStr += createWeaponTable('Magic')
       return outStr
}

function createSlotSection(equipmentSlot) {
       var outStr = '';
       outStr += createSubSection('Melee');
       outStr += createArmourTable(equipmentSlot,'Melee')
       outStr += createSubSection('Ranged')
       outStr += createArmourTable(equipmentSlot,'Ranged')
       outStr += createSubSection('Magic')
       outStr += createArmourTable(equipmentSlot,'Magic')
       return outStr;
}

/**
 * @description Creates a table of spells
 */
function createSpellTable() {
       var tabSpec = new tableSpecMaker();
       tabSpec.appendColumn('Spell', 'left', 'name', '', name => formatSpellImage(name, 50, 'center'));
       tabSpec.appendColumn('Name', 'left', 'name', '', formatPageLink);
       tabSpec.appendColumn('Magic Level', 'right', 'magicLevelRequired', 0, formatAsInt);
       tabSpec.appendColumn('Max Hit', 'right', 'maxHit', 0, formatAsInt);
       tabSpec.appendColumn('Runes', 'right', 'runesRequired', 0, runes => formatCraftReq(runes));
       return formatObjectArrayAsTable(SPELLS, tabSpec.tableSpec)
}

/**
 * @description Creates a table of runes for the runecrafting page
 * @returns {string}
 */
function createRuneCraftingTable() {
       var tabSpec = new tableSpecMaker();
       tabSpec.appendColumn('Rune', 'left', 'itemID', 0, formatItemIDasImage50);
       tabSpec.appendColumn('Name', 'left', 'itemID', 0, formatItemIDasLink);
       tabSpec.appendColumn('Runecrafting Level', 'right', 'runecraftingLevel', 1, formatAsInt);
       tabSpec.appendColumn('Experience', 'right', 'itemID', 0, id => { return formatAsInt(items[id].runecraftingXP) });
       tabSpec.appendColumn('Rune Price', 'right', 'itemID', 0, formatItemIDasPrice);
       tabSpec.appendColumn('XP/s', 'right', 'itemID', 0, id => { return formatNumberDec(items[id].runecraftingXP / runecraftInterval * 1000, 2) });
       tabSpec.appendColumn('GP/s', 'right', 'itemID', 0, id => { return formatNumberDec(items[id].sellsFor / runecraftInterval * 1000, 2) });
       return formatObjectArrayAsTable(runecraftingItems, tabSpec.tableSpec);
}
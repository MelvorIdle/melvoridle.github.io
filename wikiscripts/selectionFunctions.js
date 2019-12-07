//Contains a number of functions used to select items from Object arrays

/**
 * @description Selects items that can be cooked
 * @param {Object} item 
 */
function selectCookable(item) {
    return (item.cookedItemID != undefined);
}
/**
 * @description Selects if item is allotment seed
 * @param {Object} item 
 */
function selectAllotmentSeed(item) {
    return (item.catergory === 'Farming' & item.type === 'Seeds' & item.tier === 'Allotment')
}
/**
* @description Selects if item is tree seed
* @param {Object} item 
*/
function selectTreeseed(item) {
    return (item.catergory === 'Farming' & item.type === 'Seeds' & item.tier === 'Tree')
}

/**
 * @description Selects item if it has matching equipment slot and can be upgraded
 * @param {Object} item Item array object
 * @param {number} equipmentSlot Equipment slot index
 */
function selectGearUpgradeable(item,equipmentSlot) {
    return (item.trimmedItemID != undefined & item.equipmentSlot == equipmentSlot)
}

/**
 * @description Returns true if the given monster is found in a combat area or dungeon
 * @param {Object} monster element of monster array 
 */
function selectMonsters(monster) {
    for (let i =0;i<combatAreas.length;i++) {
           for (let j= 0;j<combatAreas[i].monsters.length;j++) {
                  if (combatAreas[i].monsters[j] == monster.id) {
                         return true;
                  }
           }
    }
    for (let i =0;i<DUNGEONS.length;i++) {
           for (let j= 0;j<DUNGEONS[i].monsters.length;j++) {
                  if (DUNGEONS[i].monsters[j] == monster.id) {
                         return true;
                  }
           }
    }
    return false;
}

/**
 * @description Determines if an element of Smithing items contains the string type, special exception for bars
 * @param {Object} smithItem Element of smithingItems
 * @param {string} type Type of item
 */
function selectSmithingItem(smithItem,type) {
    return ((type=='Bar'&smithItem.name.includes(type))|(smithItem.name.includes(type)&!(smithItem.name.includes('Bar'))));
}

/**
 * @description Selects armour items belonging to the type specified
 * @param {Object} item 
 * @param {number} equipmentSlot 
 * @param {string} type 
 */
function selectArmourItem(item, equipmentSlot, type) {
    if (item.equipmentSlot == equipmentSlot) {
           if (type == 'Melee') {
                  return (item.defenceLevelRequired != undefined)
           } else if (type == 'Ranged') {
                  return (item.rangedLevelRequired != undefined)
           } else if (type == 'Magic') {
                  return (item.magicLevelRequired != undefined)
           } else if (type == 'All') {
                  return true
           } else if (type == 'None') {
                  return (item.defenceLevelRequired == undefined) & (item.rangedLevelRequired == undefined) & (item.magicLevelRequired == undefined)
           }
    } else
           return false
    end
}

/**
 * @description Selects armour items belonging to the type specified
 * @param {Object} item 
 * @param {string} type 
 */
function selectWeaponItem(item,type) {
    if (item.equipmentSlot == CONSTANTS.equipmentSlot.Weapon) {
           if (type == 'Melee') {
                  return (item.attackLevelRequired != undefined && item.magicLevelRequired == undefined)
           } else if (type == 'Ranged') {
                  return (item.rangedLevelRequired != undefined)
           } else if (type == 'Magic') {
                  return (item.magicLevelRequired != undefined)
           } else if (type == 'All') {
                  return true
           } else if (type == 'None') {
                  return (item.attackLevelRequired == undefined) & (item.rangedLevelRequired == undefined) & (item.magicLevelRequired == undefined)
           }
    } else
           return false
    end
}
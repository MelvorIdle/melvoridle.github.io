//Contains a collection of functions that format object array keys for Melvor Idle
/**
 * @description Formats a number with the specified number of decimals, padding with 0s
 * @param {number} number Number
 * @param {number} numDecimals Number of decimals
 * @returns {string}
 */
function formatNumberDec(number, numDecimals) {
    var frontStr = Math.trunc(number).toString(10);
    var outStr = number.toString(10);

    if ((number - Math.trunc(number)) == 0) {
        //No decimals
        if (numDecimals > 0) {
            outStr += '.';
            outStr = outStr.padEnd(frontStr.length + 1 + numDecimals, '0')
        }
    } else {
        var outStrDec = outStr.length - frontStr.length - 1;

        if (outStrDec > numDecimals) {
            //Too many decimals remove from string

            if (numDecimals == 0) {
                //Determine if we need to round up
                var roundDigit = outStr.charCodeAt(frontStr.length + 1);
                if (roundDigit > 52) {
                    if (outStr.charCodeAt(frontStr.length - 1) == 57) {
                        //Case when rounding up from a 9
                        if (frontStr.length < 2) {
                            //Case when we need to round to 10
                            outStr = '10';
                        } else {
                            outStr = outStr.slice(0, frontStr.length - 2) + String.fromCharCode(outStr.charCodeAt(frontStr.length - 2) + 1) + '0';
                        }
                    } else {
                        outStr = outStr.slice(0, frontStr.length - 1) + String.fromCharCode(outStr.charCodeAt(frontStr.length - 1) + 1);
                    }
                } else {
                    outStr = outStr.slice(0, frontStr.length);
                }
            } else {
                //Determine if we need to round up
                var roundDigit = outStr.charCodeAt(frontStr.length + numDecimals + 1);
                if (roundDigit > 52) {
                    if (outStr.charCodeAt(frontStr.length + numDecimals) == 57) {
                        //Case when rounding up from a 9
                        outStr = outStr.slice(0, frontStr.length + numDecimals-1) + String.fromCharCode(outStr.charCodeAt(frontStr.length + numDecimals-1) + 1) + '0';
                    } else {
                        outStr = outStr.slice(0, frontStr.length + numDecimals) + String.fromCharCode(outStr.charCodeAt(frontStr.length + numDecimals) + 1);
                    }
                } else {
                    outStr = outStr.slice(0, frontStr.length + 1 + numDecimals);
                }
            }
        } else if (outStrDec < numDecimals) {
            //Not enough decimals pad with zeros
            outStr = outStr.padEnd(frontStr.length + 1 + numDecimals, '0')
        }
    }
    return outStr
}
/**
 * @description Formats a number as a percentage with the specified number of decimals, padding with 0s
 * @param {number} percent Percentage 
 * @param {number} numDecimals Number of decimals
 * @returns {string}
 */
function formatNumberPerc(percent,numDecimals) {
    return formatNumberDec(percent,numDecimals) + '%';
}
/**
 * @description Formats a string into a link to a wiki page
 * @param {string} pageTitle Title of page
 * @returns {string}
 */
function formatPageLink(pageTitle) {
    return `[[${pageTitle}]]`;    
}
/**
 * @description Formats an itemName as an item image
 * @param {string} itemName The name of the item
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @returns {string}
 */
function formatItemImage(itemName,size,alignment) {
    return `[[File:${itemName} (item).svg|${size}px|${alignment}]]`
}
/**
 * @description Formats an itemName as an item image with a link to the item page
 * @param {string} itemName The name of the item
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @returns {string}
 */
function formatItemImageLink(itemName,size,alignment) {
    return `[[File:${itemName} (item).svg|${size}px|${alignment}|link=${itemName}]]`
}
/**
 * @description Formats a monsterName as a monster image
 * @param {string} monsterName The name of the monster
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @returns {string}
 */
function formatMonsterImage(monsterName,size,alignment) {
    return `[[File:${monsterName} (monster).svg|${size}px|${alignment}]]`
}
/**
 * @description Formats a monsterName as a monster image with a link to the monster page
 * @param {string} monsterName The name of the monster
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @returns {string}
 */
function formatMonsterImageLink(monsterName,size,alignment) {
    return `[[File:${monsterName} (monster).svg|${size}px|${alignment}|link=${monsterName}]]`
}
/**
 * @description Formats a targetName as a thieving target image
 * @param {string} targetName The name of the target
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @returns {string}
 */
function formatThievingImage(targetName,size,alignment) {
    return `[[File:${targetName} (thieving).svg|${size}px|${alignment}]]`
}
/**
 * @description Formats a targetName as a thieving target image with a link to the target page
 * @param {string} targetName The name of the target
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @returns {string}
 */
function formatThievingImageLink(targetName,size,alignment) {
    return `[[File:${targetName} (thieving).svg|${size}px|${alignment}|link=${targetName}]]`
}

/**
 * @description Formats a skillName as a skill image
 * @param {string} targetName The name of the skill
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @returns {string}
 */
function formatSkillImage(skillName,size,alignment) {
    return `[[File:${skillName} (skill).svg|${size}px|${alignment}]]`
}
/**
 * @description Adds a combat image
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 */
function formatCombatImage(size,alignment) {
    return `[[File:Combat.svg|${size}px|${alignment}]]`
}
/**
 * @description Formats a skillName as a skill image with a link to the skill page
 * @param {string} targetName The name of the skill
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @returns {string}
 */
function formatSkillImageLink(skillName,size,alignment) {
    return `[[File:${skillName} (skill).svg|${size}px|${alignment}|link=${skillName}]]`
}
/**
 * @description Formats a skillName as a skill image with a link to the skill page
 * @param {string} skillName The name of the skill
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @returns {string}
 */
function formatThievingImageLink(skillName,size,alignment) {
    return `[[File:${skillName} (thieving).svg|${size}px|${alignment}|link=${skillName}]]`
}
/**
 * @description Formats a value as an integer in base 10
 * @param {number} value 
 * @returns {string}
 */
function formatAsInt(value) {
    return value.toString(10);
}

/**
 * @description Formats an itemID as 50px image
 * @param {number} id
 */
function formatItemIDasImage50(id) {
    return formatItemImage(items[id].name,50,'center');
}
/**
* @description Formats an itemID as a page link
* @param {number} id 
*/
function formatItemIDasLink(id) {
    return formatPageLink(items[id].name);
}
/**
* @description Formats an itemID as its sale price
* @param {number} itemID 
*/
function formatItemIDasPrice(itemID) {
    return formatAsInt(items[itemID].sellsFor);
}

/**
 * @description Formats time in ms as s
 * @param {number} t 
 */
function formatMSasS(t) {
    return formatNumberDec(t/1000,0);
}

/**
 * @description formats rateArray into rate/s
 * @param {number[]} rateArray rateArray[0] is amount, rateAray[1] is time in ms
 */
function formatAsRate(rateArray) {
    return formatNumberDec(rateArray[0]/rateArray[1]*1000,2);
}

/**
 * @description Formats barsRequired as ingredients list
 * @param {number[]} barsReq 
 * @returns {string}
 */
function formatBarsRequired(barsReq) {
    var strOut = '';
    return `${formatAsInt(ingArray[1])} ${formatItemImageLink(items[ingArray[0]].name,25,'middle')}`;
}
/**
* @description Formats the stat change between an item and its trimmed version
* @param {number} itemID
* @returns {string}
*/
function formatUpgradeChange(itemID) {
    //Key: Default if not found
    var outStr = '';
    var statsToCheck = {
           attackSpeed: 0,
           strengthBonus: 0,
           attackBonus: [0,0,0],
           rangedAttackBonus: 0,
           rangedStrengthBonus: 0,
           defenceBonus: 0,
           damageReduction: 0,
           rangedDefenceBonus: 0
    }
    var statNames = {
           attackSpeed: 'Attack Speed',
           strengthBonus: `${formatSkillImageLink('Strength',25,'middle')} Strength Bonus`,
           attackBonus: [`${formatSkillImageLink('Attack',25,'middle')} Stab Bonus`,
           `${formatSkillImageLink('Strength',25,'middle')} Slash Bonus`,
           `${formatSkillImageLink('Defence',25,'middle')} Block Bonus`],
           rangedAttackBonus: `${formatSkillImageLink('Ranged',25,'middle')} Attack Bonus`,
           rangedStrengthBonus: `${formatSkillImageLink('Ranged',25,'middle')} Strength Bonus`,
           defenceBonus: `${formatSkillImageLink('Defence',25,'middle')} Defence Bonus`,
           damageReduction: `${formatSkillImageLink('Defence',25,'middle')} Damage Reduction`,
           rangedDefenceBonus: `${formatSkillImageLink('Ranged',25,'middle')} Defence Bonus`
    }
    var trimmedID = items[itemID].trimmedItemID;
    var statVal1 = 0, statVal2 = 0;
    //Go through each available stat and add to string if there's a difference
    Object.keys(statsToCheck).forEach(key=>{
           if (key=='attackBonus') {
                  var attBon1 = statsToCheck[key];
                  var attBon2 = statsToCheck[key];
                  if (items[itemID][key] != undefined) {
                         attBon1 = items[itemID][key];
                  }
                  if (items[trimmedID][key] != undefined) {
                         attBon2 = items[trimmedID][key];
                  }

                  for(let i=0;i<statsToCheck[key].length;i++) {
                         if (attBon2[i] > attBon1[i]) {
                                outStr += `+${attBon2[i]-attBon1[i]} ${statNames[key][i]}\n`;
                         } else if (attBon2[i] < attBon1[i]) {
                                outStr += `-${attBon1[i]-attBon2[i]} ${statNames[key][i]}\n`;
                         }
                  }
           } else {
                  if (items[itemID][key] != undefined) {
                         statVal1 = items[itemID][key];
                  } else {
                         statVal1 = statsToCheck[key];
                  }
                  if (items[trimmedID][key] != undefined) {
                         statVal2 = items[trimmedID][key];
                  } else {
                         statVal2 = statsToCheck[key];
                  }
                  if (statVal1 < statVal2) {
                         outStr += `+${statVal2-statVal1} ${statNames[key]}\n`;
                  } else if (statVal1 > statVal2) {
                         outStr += `-${statVal1-statVal2} ${statNames[key]}\n`;
                  }
           }
    });
    return outStr;
}

/**
 * @description Formats a monsters attack type
 * @param {number} type 
 */
function formatAttackType(type) {
    if (type == CONSTANTS.attackType.Melee) {
           return `${formatCombatImage(25,'middle')} Melee`
    } else if (type == CONSTANTS.attackType.Ranged) {
           return `${formatSkillImage('Ranged',25,'middle')} Ranged`
    } else {
           return `${formatSkillImage('Magic',25,'middle')} Magic`
    }
}

/**
 * @description Formats a requirement object array into a table
 * @param {Object} requirements 
 */
function formatCraftReq(requirements) {
    var outStr = '';
    for (let i=0;i<requirements.length;i++) {
           outStr += `${requirements[i].qty} ${formatItemImageLink(items[requirements[i].id].name,25,'middle')} `
    }
    return outStr;
}

/**
 * @description Formatting function for smithing quantity
 * @param {number} itemID 
 */
function formatItemIDasSmithingQty(itemID) {
    if (items[itemID].smithingQty) {
           return formatAsInt(items[itemID].smithingQty)
    } else {
           return formatAsInt(1)
    }
}

//Find the sources from which an item can be obtained and add them to a string:
//Potential Sources:
//Drop from enemy
//Loot from chests/birdnests
//Loot from thieving
//Upgrading from another item
//Skills: Woodcutting, Fishing, Cooking, Mining, Smithing, Farming, Fletching and Crafting
function formatItemIDasItemSource(itemID) {
    var outputStr = '';
    //Search monster drops
    var monsterList = '';
    for (let i = 0; i < MONSTERS.length; i++) {
        if (MONSTERS[i].lootTable != undefined && selectMonsters(MONSTERS[i])) {
            for (let j = 0; j < MONSTERS[i].lootTable.length; j++) {
                if (MONSTERS[i].lootTable[j][0] == itemID) {
                    monsterList += `${formatMonsterImageLink(MONSTERS[i].name,25,'middle')}, `;
                    break;
                }
            }
        }
    }
    if (monsterList != '') {
        outputStr += 'Killing: ' + monsterList;
    }
    var chestList = '';
    //Search openable items
    if (window.openableItems === undefined) {
        getOpenableItems();
    }
    for (let i = 0; i < openableItems.length; i++) {
        for (let j = 0; j < items[openableItems[i]].dropTable.length; j++) {
            if (items[openableItems[i]].dropTable[j][0] == itemID) {
                chestList += `${formatItemImageLink(items[openableItems[i]].name,25,'middle')}, `;
                break;
            }
        }
    }
    if (chestList != '') {
        outputStr += 'Opening: ' + chestList;
    }
    var thieveList = '';
    //Search thieving targets
    for (let i = 0; i < thievingNPC.length; i++) {
        for (let j = 0; j < thievingNPC[i].lootTable.length; j++) {
            if (thievingNPC[i].lootTable[j][0] == itemID) {
                thieveList += `${formatThievingImageLink(thievingNPC[i].name,25,'middle')}, `
                break;
            }
        }
    }
    if (thieveList != '') {
        outputStr += 'Pickpocketing: ' + thieveList;
    }
    var farmList = '';
    var cookList = '';
    var burnList = '';
    //Search items for upgrades, being cooked, being farmed, being burnt
    for (let i = 0; i < items.length; i++) {
        if (items[i].trimmedItemID == itemID) {
            outputStr += `Upgrading: ${formatItemImageLink(items[i].name,25,'middle')}, `
        }
        if (items[i].grownItemID == itemID) {
            farmList += `${formatItemImageLink(items[i].itemID,25,'middle')}, `
        }
        if (items[i].cookedItemID == itemID) {
            cookList += `${formatItemImageLink(items[i].itemID,25,'middle')}, `
        }
        if (items[i].burntItemID == itemID) {
            burnList += `${formatItemImageLink(items[i].itemID,25,'middle')}, `
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
            outputStr += `${formatSkillImageLink('Woodcutting',25,'middle')} (Lv. ${trees[i].level}), `;
        }
    }
    //Fishing
    for (let i = 0; i < fishData.length; i++) {
        if (fishData[i].itemID == itemID) {
            outputStr += `${formatSkillImageLink('Fishing',25,'middle')} (Lv. ${fishData[i].level}), `;
        }
    }
    //Mining
    if (items[itemID].miningLevel != undefined) {
        outputStr += `${formatSkillImageLink('Mining',25,'middle')} (Lv. ${items[itemID].miningLevel}), `;
    }

    //Smithing
    if (items[itemID].smithingLevel != undefined) {
        outputStr += `${formatSkillImageLink('Smithing',25,'middle')} (Lv. ${items[itemID].smithingLevel}), `;
    }
    //Fletching
    if (items[itemID].fletchingLevel != undefined) {
        outputStr += `${formatSkillImageLink('Fletching',25,'middle')} (Lv. ${items[itemID].fletchingLevel}), `;
    }
    //Crafting
    if (items[itemID].craftingLevel != undefined) {
        outputStr += `${formatSkillImageLink('Crafting',25,'middle')} (Lv. ${items[itemID].craftingLevel}), `;
    }
    //Shop
    //skillcapeItems,gloveID,
    var shopItems = [CONSTANTS.item.Green_Dragonhide, CONSTANTS.item.Blue_Dragonhide, CONSTANTS.item.Red_Dragonhide, CONSTANTS.item.Cooking_Gloves, CONSTANTS.item.Mining_Gloves, CONSTANTS.item.Smithing_Gloves, CONSTANTS.item.Thieving_Gloves, CONSTANTS.item.Gem_Gloves, CONSTANTS.item.Bowstring, CONSTANTS.item.Compost, CONSTANTS.item.Leather];
    var inShop = false;
    for (let i = 0; i < shopItems.length; i++) {
        if (itemID == shopItems[i]) {
            inShop = true;
            break;
        }
    }
    for (let i=0;i<skillcapeItems.length;i++) {
        if (itemID == skillcapeItems[i]) {
            inShop = true;
            break;
        }
    }
    if (inShop) {
        outputStr += '[[Shop]], ';
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

/**
 * @description Formats a boolean as a Yes or No entry
 * @param {boolean} bool 
 */
function formatBoolAsYesNo(bool) {
    return bool ? 'Yes' : 'No';
}

/**
 * @description Formats an spell name as a spell image
 * @param {string} name The name of the spell
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @returns {string}
 */
function formatSpellImage(name,size,alignment) {
    return `[[File:${name} (spell).svg|${size}px|${alignment}]]`
}
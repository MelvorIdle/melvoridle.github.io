//Contains a number of functions to be used with Array.sort
/**
 * @description Sorts items by defence level requirements
 * @param {Object} item1 
 * @param {Object} item2 
 */
function sortByDefenceLevel(item1, item2) {
    var x = (item1.defenceLevelRequired == undefined) ? 1 : item1.defenceLevelRequired
    var y = (item2.defenceLevelRequired == undefined) ? 1 : item2.defenceLevelRequired
    return (x - y)
}

function sortByRangedLevel(item1, item2) {
    var x = (item1.rangedLevelRequired == undefined) ? 1 : item1.rangedLevelRequired
    var y = (item2.rangedLevelRequired == undefined) ? 1 : item2.rangedLevelRequired
    return (x - y)
}

function sortByMagicLevel(item1, item2) {
    var x = (item1.magicLevelRequired == undefined) ? 1 : item1.magicLevelRequired
    var y = (item2.magicLevelRequired == undefined) ? 1 : item2.magicLevelRequired
    return (x - y)
}

function sortByAttackLevel(item1, item2) {
    var x = (item1.attackLevelRequired == undefined) ? 1 : item1.attackLevelRequired
    var y = (item2.attackLevelRequired == undefined) ? 1 : item2.attackLevelRequired
    return (x - y)
}
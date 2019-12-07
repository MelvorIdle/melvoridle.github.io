//Generates a page for a thieving target of targetInd
//Note: You need to paste the formatPercentage.js function into the console first before using this
var outputStr = '{{ThievingTarget|name='
var targetInd = 7;
var lootInd;
var orderNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];

outputStr += thievingNPC[targetInd].name + '|level=';
outputStr += thievingNPC[targetInd].level + '|xp=';
outputStr += thievingNPC[targetInd].xp + '|drops=*1-';
outputStr += thievingNPC[targetInd].maxCoins + ' gp\n25% chance for:\n';

totalWeight = 0;
for (lootInd = 0; lootInd < thievingNPC[targetInd].lootTable.length; lootInd++) {
    totalWeight += thievingNPC[targetInd].lootTable[lootInd][1];
}

for (lootInd = 0; lootInd < thievingNPC[targetInd].lootTable.length; lootInd++) {
    lootChance = 100*thievingNPC[targetInd].lootTable[lootInd][1] / totalWeight;
    percStr = formatPercentage(lootChance, 2);
    if (percStr.length < 6) {percStr = '&nbsp;&nbsp;' + percStr;}
    outputStr += '*' + percStr  + ' [[File:' + items[thievingNPC[targetInd].lootTable[lootInd][0]].name + ' (item).svg|25px|middle|link=' + items[thievingNPC[targetInd].lootTable[lootInd][0]].name + ']] [[' + items[thievingNPC[targetInd].lootTable[lootInd][0]].name + ']]\n';
}

outputStr += '}}\n\n';
outputStr += 'The ' + thievingNPC[targetInd].name + ' is the ' + orderNames[targetInd] + ' NPC in the thieving skill. On successful pickpockets players receive ' + thievingNPC[targetInd].xp + ' xp and up to ' + thievingNPC[targetInd].maxCoins + ' gold.\n\n';
outputStr += '[[Category:Thieving Targets]]';
console.log(outputStr);
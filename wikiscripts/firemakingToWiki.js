//This script parses through the logsData array and finds the corresponding item in the item array
//It then adds those stats of those items to a table in the wiki source format

var logIndex;
var outputStr = '{| class="wikitable"\n';
// Table Headers
outputStr += '!Logs\n!Name\n!Firemaking Level\n!Experience \n!Burn Time (s) \n!Bonfire Bonus\n!Bonfire Time (s)\n|';

for (logIndex = 0; logIndex < logsData.length; logIndex++) {
    curLog = logsData[logIndex];
    // Find the item corresponding to the log
    for (itemIndex = 0; itemIndex < items.length; itemIndex++) {
        curItem = items[itemIndex];
        if (curItem.firemakingID == logIndex) {
            break;
        }
    }
        //Item image link
        outputStr += '-\n| [[File:' + curItem.name + ' (item).svg|50px|center]]\n|'
        //Item name with link
        outputStr += '[[' + curItem.name + ']]' + '\n| style="text-align:right"; | ';
        //Firemaking Level
        outputStr += logsData[logIndex].level + '\n| style="text-align:right"; | ';
        //Log Xp
        outputStr += logsData[logIndex].xp + '\n| style="text-align:right"; | ';
        //Log Burn time
        outputStr += Math.floor(logsData[logIndex].interval/1000) + '\n| style="text-align:right"; | ';
        //Log bonfire Bonus
        outputStr += logsData[logIndex].bonfireBonus + '%\n| style="text-align:right"; | ';
        //Log Bonfire time
        outputStr += Math.floor(logsData[logIndex].bonfireInterval/1000) + '\n|';
}
outputStr += '}';
console.log(outputStr)
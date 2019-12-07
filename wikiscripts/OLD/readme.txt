Here are several scripts that I used to create information for the wiki.
Note: I am not responsible for breaking your game if you use these scripts.

The scripts are designed to be copied and then pasted into your browsers console.
First copy and paste formatPercent.js into your browser console.
For functions that return strings copy wikiSupportFunctions.js
For functions that log their output in the console copy wikiSupportFunctionsConsole.js

Most of the scripts have now been refactored to be functions contained within wikiSupportFunctions.js
Below are descriptions of the functions contained:

Functions for creating tables:
startTable(outputStr): Adds the formatting to start wikitable to outputStr and returns outputStr

addHeaderColumn(outputStr): Adds a header column to outputStr and returns outputStr

nextTableRow(outputStr): Adds the formatting for the next row of a table to outputStr and returns outputStr

nextTableColumn(outputStr,textAlignment): Adds the formatting for the next column of a table to outputStr and returns outputStr.
  textAlignment: Determines which way the text should be aligned in the next table cell, valid options: 'center','left,'right'

endTable(outputStr): Adds the formatting to end a table to outputStr and returns outputStr

Functions for adding common elements:
addItemLink(outputStr,itemID): Adds a link to the item corresponding to itemID in the items array to outputStr and returns outputStr

addItemImage(outputStr,itemID,size,alignment) Adds an image of the item corresponding to itemID in the items array to outputStr and returns outputStr
  itemID: index of items array
  size: Size of image in pixels
  alignment: Alignment of image, valid options include: 'center','middle'...
  
addItemImageLink(outputStr,itemID,size,alignment) Adds an image of the item corresponding to itemID in the items array that links to the wiki page for that item to outputStr and returns outputStr
  itemID: index of items array
  size: Size of image in pixels
  alignment: Alignment of image, valid options include: 'center','middle'...

addMonsterLink(outputStr,monsterID)
addMonsterImage(outputStr,monsterID,size,alignment)
addMonsterImageLink(outputStr,monsterID,size,alignment)

addThievingLink(outputStr,targetID)
addThievingImage(outputStr,targetID,size,alignment)
addThievingImageLink(outputStr,targetID,size,alignment)

addCombatAreaLink(outputStr,areaID)
addDungeonLink(outputStr,dungeonID)

findItemSources(itemID)
findMonsterZones(monsterID)

Helper Functions:
getOpenableItems()
calcMonsterMaxHit(monsterID)
calcMonsterAccuracy(monsterID)
calcMonsterEvasion(monsterID)

Functions for creating tables on the wiki:
createCookingTable(): Returns a string that contains the table of cookable items on the Cooking skill page

createFarmingAllotmentTable(): Returns a string that contains the table of allotment seeds for the Farming skill page

createFarmingTreeTable(): Returns a string that contains the table of tree seeds for the Farming skill page

createFiremakingTable(): Returns a string that contains the table of logs for the Firemaking skill page

createMiningTable(): Returns a string that contains the table of ores for the Mining skill page

createGemTable(): Returns a string that contains the table of gems for the Mining skill page

createFishTable(): Returns a string that contains the table of fish for the Fishing skill page

createLogsTable(): Returns a string that contains the table of logs for the Woodcutting skill page

createSmeltingTable(): Returns a string that contains the table of smeltable bars for the Smithing skill page

createSmithingTable(category): Returns a string that contains the table of smithing items of the given category for the Smithing skill page
  category: integer that determines the category from: categoryNames = ['Bars', 'Bronze Gear', 'Iron Gear', 'Steel Gear', 'Mithril Gear', 'Adamant Gear', 'Rune Gear', 'Dragon Gear'];
  
createCraftingTable(category): Returns a string that contains the table of crafting items of the given category for the Crafting skill page
  category: integer that determines the category from:categoryNames = ['Leather Armour', 'Dragonhide', 'Rings', 'Necklaces'];
  
createFletchingTable(category): Returns a string that contains the table of fletching items of the given category for the Fletching skill page
  category: integer that determins the category from: categoryNames = ['Arrows', 'Shortbows', 'Longbows'];

createMonsterTable()
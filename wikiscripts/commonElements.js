//Contains a collection of functions that create strings that are commonly used

/**
 * @description tableMaker is used to create wikimedia tables
 */
class tableMaker {
    /**
     * @description Constructs a new instance of tableMaker
     * @param {string} tableClass Class of table
     */
    constructor(tableClass) {
        this.tableClass = tableClass;
        this.outputStr = '';
    }
    /**
     * @description Starts the table
     */
    startTable() {
        this.outputStr += '{| class="' + this.tableClass + '"';
    }
    /**
     * @description Ends the table
     */
    endTable() {
        this.outputStr += '\n|}';
    }
    /**
     * @description Adds a column header with the name specified
     * @param {string} headerName 
     */
    addHeader(headerName) {
        this.outputStr += '\n!' + headerName;
    }
    /**
     * @description Starts a new row in the table
     */
    nextRow() {
        this.outputStr += '\n|-';
    }
    /**
     * @description Starts a new column with the specified cell alignment
     * @param {string} textAlignment Alignment of text in cell
     */
    nextColumn(textAlignment) {
        this.outputStr += '\n| style ="text-align:' + textAlignment + '"; |'
    }
    /**
     * @description Adds a string to current cell
     * @param {string} dataString 
     */
    addCellData(dataString) {
        this.outputStr += dataString;
    }
}
/**
 * @description Creates a string representing a new section
 * @param {string} sectionTitle The name of the section
 * @returns {string}
 */
function createSection(sectionTitle) {
    return `\n==${sectionTitle}==\n`;
}
/**
 * @description Creates a string representing a new subsection
 * @param {string} sectionTitle The name of the subsection
 * @returns {string}
 */
function createSubSection(sectionTitle) {
    return `\n===${sectionTitle}===\n`;
}
/**
 * @description Creates a string representing a new subsubsection
 * @param {string} sectionTitle The name of the subsubsection
 * @returns {string}
 */
function createSubSubSection(sectionTitle) {
    return `\n====${sectionTitle}====\n`;
}
/**
 * @description Formats an array of objects into a wikimedia table
 * @param {Object[]} objectArray Array to format as a table
 * @param {Object[]} tableSpec Specification of what keys to format and how:
 * Contains objects with keys:
 * header: Name of header
 * just: Justification of cell data
 * arrayKey: key of object to format
 * defaultKeyValue: default value of object.arrayKey if value doesn't exist
 * formatFunc: function that is fed object.arrayKey
 * @returns {string}
 */
function formatObjectArrayAsTable(objectArray, tableSpec) {
    var tableGen = new tableMaker('wikitable sortable');
    tableGen.startTable();
    //Add headers
    for (let i = 0; i < tableSpec.length; i++) {
        tableGen.addHeader(tableSpec[i].header);
    }
    //Generate cells
    for (let i = 0; i < objectArray.length; i++) {
        tableGen.nextRow();
        for (let j = 0; j < tableSpec.length; j++) {
            tableGen.nextColumn(tableSpec[j].just);
            //Exception for arrays of arrayKeys
            if (typeof(tableSpec[j].arrayKey) != 'string') {
                var keyValues = [];
                for (let k=0;k<tableSpec[j].arrayKey.length;k++) {
                    if (objectArray[i][tableSpec[j].arrayKey[k]]!=undefined) {
                        keyValues[k] = objectArray[i][tableSpec[j].arrayKey[k]];
                    }else {
                        keyValues[k] = tableSpec[j].defaultKeyValue[k];
                    }
                }
                tableGen.addCellData(tableSpec[j].formatFunc(keyValues));
            }
            else {
                if (objectArray[i][tableSpec[j].arrayKey] != undefined) {
                    tableGen.addCellData(tableSpec[j].formatFunc(objectArray[i][tableSpec[j].arrayKey]));
                } else {
                    tableGen.addCellData(tableSpec[j].formatFunc(tableSpec[j].defaultKeyValue))
                }
            }
        }
    }
    tableGen.endTable();
    return tableGen.outputStr;
}
/**
 * @description Parses through an object array and returns a subarray that match the criteria defined by selectionFunc. Also adds a parentIndex key value
 * @param {Object[]} objectArray Array to find elements of
 * @param {Function} selectionFunc Function that operates on a single element of objectArray, must return true or false
 * @returns {Object[]}
 */
function getObjectArraySubset(objectArray,selectionFunc) {
    var subObjectArray = [];
    for(let i=0;i<objectArray.length;i++) {
        if (selectionFunc(objectArray[i])) {
            subObjectArray.push(objectArray[i]);
            subObjectArray[subObjectArray.length-1].parentIndex = i;
        }
    }
    return subObjectArray;
}

/**
 * @description Used to assist in creating table specifications
 */
class tableSpecMaker {
    /**
     * @description Constructs an instance of tableSpecMaker
     */
    constructor() {
        this.tableSpec = [];
    }
    /**
     * @description Appends a new element to the tableSpecification
     * @param {string} colName Name of the column to display
     * @param {string} just Justification of text in the columns cells
     * @param {string} arrayKey Key of object array to format
     * @param {any} defaultKeyValue Default value of object array key value if undefined
     * @param {Function} formatFunc Format function for object array key value
     */
    appendColumn(colName,just,arrayKey,defaultKeyValue,formatFunc) {
        this.tableSpec.push({
            header: colName,
            just: just,
            arrayKey: arrayKey,
            defaultKeyValue: defaultKeyValue,
            formatFunc: formatFunc
        });
    }
}

/**
 * @description Experimental function that doesn't work
 * @param {string} stringToCopy 
 */
function copyToClipboard(stringToCopy) {
    var copyElement = document.createElement('textarea');
    copyElement.value = stringToCopy;
    document.body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    document.body.removeChild(copyElement);
}
/**
 * @description Gets openable items and sets global var
 */
function getOpenableItems() {
    window.openableItems = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].canOpen) {
            openableItems.push(i);
        }
    }
}
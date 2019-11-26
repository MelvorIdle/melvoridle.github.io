function formatPercentage(percent, numDecimals) {
    frontStr = Math.trunc(percent).toString(10);
    outStr = percent.toString(10);

    if ((percent - Math.trunc(percent)) == 0) {
        //No decimals
        if (numDecimals > 0) {
            outStr += '.';
            outStr = outStr.padEnd(frontStr.length + 1 + numDecimals, '0')
        }
    } else {
        outStrDec = outStr.length - frontStr.length - 1;

        if (outStrDec > numDecimals) {
            //Too many decimals remove from string

            if (numDecimals == 0) {
                //Determine if we need to round up
                roundDigit = outStr.charCodeAt(frontStr.length + 1);
                console.log(roundDigit);
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
                roundDigit = outStr.charCodeAt(frontStr.length + numDecimals + 1);
                console.log(roundDigit);
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
    outStr += '%';
    return outStr
}
let taxBilletLine = require('./taxBilletLine');
let modules = require('./modules');
let errors = require('./../errors');


function taxBillet(line){
    const fields = taxBilletLine.splitTaxBilletLine(line);
    const currencyCode = line[2];
    let moduleFunc = identifyModule(currencyCode);
    taxBilletLine.checkTaxField1DV(fields.field1, fields.field1DV, moduleFunc);
    taxBilletLine.checkTaxField2DV(fields.field2, fields.field2DV, moduleFunc);
    taxBilletLine.checkTaxField3DV(fields.field3, fields.field3DV, moduleFunc);
    taxBilletLine.checkTaxField4DV(fields.field4, fields.field4DV, moduleFunc);
    return mountTaxBilletInfo(fields);
}

function identifyModule(currencyCode){
    if(currencyCode === '6' || currencyCode === '7') return modules.taxModule10;
    else if(currencyCode === '8' || currencyCode === '9') return modules.taxModule11;
    else throw new errors.BusinessException('INVALID CURRENCY CODE');
}

function mountTaxBilletInfo(lineInfo){
    let tempBarCode = `${lineInfo.field1}${lineInfo.field2}${lineInfo.field3}${lineInfo.field4}`;
    const currencyCode = tempBarCode[2];
    const firstPart = tempBarCode.slice(0, 3);
    const currentDV = tempBarCode[3];
    const secondPart = tempBarCode.slice(4);
    let moduleFunc = identifyModule(currencyCode);
    if(moduleFunc(`${firstPart}${secondPart}`) !== currentDV) throw new errors.BusinessException('INVALID BAR CODE DV');
    const barCode = `${firstPart}${currentDV}${secondPart}`
    return {
        barCode: barCode,
        billetValue: getCurrencyFromValue(barCode.slice(5, 15)),
        validLine: true,

    }
}

function getCurrencyFromValue(value){
    return `${Number(value.slice(0, value.length-2))}.${value.slice(-2)}`
}

module.exports = {
    taxBillet: taxBillet,
    mountTaxBilletInfo: mountTaxBilletInfo,
    identifyModule: identifyModule
}
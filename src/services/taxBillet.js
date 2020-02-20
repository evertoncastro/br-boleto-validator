let taxBilletLine = require('./taxBilletLine');
let modules = require('./modules');
let errors = require('./../errors');


function taxBillet(line){
    const fields = taxBilletLine.splitTaxBilletLine(line);
    taxBilletLine.checkTaxField1DV(fields.field1, fields.field1DV);
    taxBilletLine.checkTaxField2DV(fields.field2, fields.field2DV);
    taxBilletLine.checkTaxField3DV(fields.field3, fields.field3DV);
    taxBilletLine.checkTaxField4DV(fields.field4, fields.field4DV);
    return mountTaxBilletInfo(fields);
}

function mountTaxBilletInfo(lineInfo){
    let tempBarCode = `${lineInfo.field1}${lineInfo.field2}${lineInfo.field3}${lineInfo.field4}`;
    const currencyCode = tempBarCode[2];
    const firstPart = tempBarCode.slice(0, 3);
    const currentDV = tempBarCode[3];
    const secondPart = tempBarCode.slice(4);
    let moduleFunc = null;
    if(currencyCode === '6' || currencyCode === '7') moduleFunc = modules.taxModule10;
    else if(currencyCode === '8' || currencyCode === '9') moduleFunc = modules.taxModule11;
    else throw new errors.BusinessException('INVALID CURRENCY CODE');
    if(moduleFunc(`${firstPart}${secondPart}`) !== currentDV) throw new errors.BusinessException('INVALID BAR CODE DV');
    return {
        barCode: `${firstPart}${currentDV}${secondPart}`,
        validLine: true
    }
}

module.exports = {
    taxBillet: taxBillet,
    mountTaxBilletInfo: mountTaxBilletInfo
}
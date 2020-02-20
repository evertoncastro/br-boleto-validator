let taxBilletLine = require('./taxBilletLine');
let modules = require('./modules');
let errors = require('./../errors');


function taxBillet(line){
    // TODO: more tests for calls
    const fields = taxBilletLine.splitTaxBilletLine(line);
    taxBilletLine.checkTaxField1DV(fields.field1, fields.field1DV);
    taxBilletLine.checkTaxField2DV(fields.field2, fields.field2DV);
    taxBilletLine.checkTaxField3DV(fields.field3, fields.field3DV);
    taxBilletLine.checkTaxField4DV(fields.field4, fields.field4DV);
    return mountTaxBilletInfo(fields);
}

function mountTaxBilletInfo(lineInfo){
    // TODO: more tests for calls
    let tempBarCode = `${lineInfo.field1}${lineInfo.field2}${lineInfo.field3}${lineInfo.field4}`;
    const firstPart = tempBarCode.slice(0, 3);
    const currentDV = tempBarCode.slice(3, 4);
    const secondPart = tempBarCode.slice(4)
    if(modules.taxModule10(`${firstPart}${secondPart}`) !== currentDV) throw new errors.BusinessException('INVALID BAR CODE DV');
    return {
        barCode: `${firstPart}${currentDV}${secondPart}`,
        validLine: true
    }
}

module.exports = {
    taxBillet: taxBillet,
    mountTaxBilletInfo: mountTaxBilletInfo
}
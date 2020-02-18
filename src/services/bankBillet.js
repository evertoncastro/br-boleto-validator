let bankBilletLine = require('./bankBilletLine');
let modules = require('./modules');
let errors = require('./../errors');


function bankBillet(line){
    // TODO: more tests for exceptions
    const fields = bankBilletLine.splitBilletLine(line);
    if(!bankBilletLine.checkField1DV(fields.field1, fields.field1DV)) throw new errors.BusinessException('INVALID DV FOR BLOCK 1');
    if(!bankBilletLine.checkField2DV(fields.field2, fields.field2DV)) throw new errors.BusinessException('INVALID DV FOR BLOCK 2');
    if(!bankBilletLine.checkField3DV(fields.field3, fields.field3DV)) throw new errors.BusinessException('INVALID DV FOR BLOCK 3');
    return mountBankBilletInfo(fields);
}

function mountBankBilletInfo(lineInfo){
    // TODO: more tests for exceptions
    let infoField1 = bankBilletLine.infoFromField1(lineInfo.field1, lineInfo.field1DV);
    let infoField2 = bankBilletLine.infoFromField2(lineInfo.field2, lineInfo.field2DV);
    let infoField3 = bankBilletLine.infoFromField3(lineInfo.field3, lineInfo.field3DV);
    let infoField5 = bankBilletLine.infoFromField5(lineInfo.field5);
    let tempBarCode = `${infoField1.fi}${infoField1.curCode}X${infoField5.dueDateFactor}${infoField5.value}${infoField1.pos20to24}${infoField2.pos25to34}${infoField3.pos35to44}`;
    if(modules.bankModule11(tempBarCode.replace('X', '')) !== lineInfo.field4) throw new errors.BusinessException('INVALID BAR CODE DV');
    return {
        barCode: tempBarCode.replace('X', lineInfo.field4),
        billetValue: getCurrencyFromValue(infoField5.value),
        billetDueDate: getDateFromDueDateFactor(infoField5.dueDateFactor),
        validLine: true
    }
}

function getDateFromDueDateFactor(factor){
    let baseDate = new Date('1997-10-07');
    baseDate.setTime(baseDate.getTime() + (Number(factor) * 24 * 60 * 60 * 1000));
    return baseDate.toISOString().substr(0, 10);
}

function getCurrencyFromValue(value){
    return `${Number(value.slice(0, value.length-2))}.${value.slice(-2)}`
}

module.exports = {
    bankBillet: bankBillet,
    mountBankBilletInfo: mountBankBilletInfo,
    getDateFromDueDateFactor: getDateFromDueDateFactor,
    getCurrencyFromValue: getCurrencyFromValue
}
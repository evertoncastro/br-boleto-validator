let bankBilletLine = require('./bankBilletLine');
let modules = require('./modules');


function mountBankBilletBarCode(lineInfo){
    let infoField1 = bankBilletLine.infoFromField1(lineInfo.field1, lineInfo.field1DV);
    let infoField2 = bankBilletLine.infoFromField2(lineInfo.field2, lineInfo.field2DV);
    let infoField3 = bankBilletLine.infoFromField3(lineInfo.field3, lineInfo.field3DV);
    let infoField5 = bankBilletLine.infoFromField5(lineInfo.field5);
    
    let tempBarCode = `${infoField1.fi}${infoField1.curCode}X${infoField5.dueDateFactor}${infoField5.value}${infoField1.pos20to24}${infoField2.pos25to34}${infoField3.pos35to44}`;
    if(modules.bankModule11(tempBarCode.replace('X', '')) !== lineInfo.field4) return false;
    return tempBarCode.replace('X', lineInfo.field4);
}

module.exports = {
    mountBankBilletBarCode: mountBankBilletBarCode
}
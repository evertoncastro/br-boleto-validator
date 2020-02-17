let bankBilletLine = require('./bankBilletLine');


function mountBankBillet(lineInfo){
    bankBilletLine.infoFromField1(lineInfo.field1, lineInfo.field1DV)
}



module.exports = {
    mountBankBillet: mountBankBillet
}
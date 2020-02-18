var modules = require('./modules');

function splitBilletLine(line){
    return {
        field1: line.substr(0, 9),
        field1DV: line.substr(9, 1),
        field2: line.substr(10, 10),
        field2DV: line.substr(20, 1),
        field3: line.substr(21, 10),
        field3DV: line.substr(31, 1),
        field4: line.substr(32, 1),
        field5: line.substr(33)
    }
}

function infoFromField1(value, dv){
    return {
        fi: value.substr(0, 3),
        curCode: value.substr(3, 1),
        pos20to24: value.substr(4, 5),
        dv: dv
    }
}

function infoFromField2(value, dv){
    return {
        pos25to34: value,
        dv: dv
    }
}

function infoFromField3(value, dv){
    return {
        pos35to44: value,
        dv: dv
    }
}

function infoFromField5(value){
    return {
        dueDateFactor: value.substr(0, 4),
        value: value.substr(4, 10)
    }
}

function checkField1DV(value, expectedDV){
    if(modules.calcModule10(value) !== expectedDV){
        return false;
    }
    return true;
}

function checkField2DV(value, expectedDV){
    if(modules.calcModule10(value) !== expectedDV){
        return false;
    }
    return true;
}

function checkField3DV(value, expectedDV){
    if(modules.calcModule10(value) !== expectedDV){
        return false;
    }
    return true;
}


module.exports = {
    splitBilletLine: splitBilletLine,
    checkField1DV: checkField1DV,
    checkField2DV: checkField2DV,
    checkField3DV: checkField3DV,
    infoFromField1: infoFromField1,
    infoFromField2: infoFromField2,
    infoFromField3: infoFromField3,
    infoFromField5: infoFromField5
}
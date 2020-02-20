const modules = require('./modules');
const errors = require('./../errors');


function splitTaxBilletLine(line){
    return {
        field1: line.substr(0, 11),
        field1DV: line.substr(11, 1),
        field2: line.substr(12, 11),
        field2DV: line.substr(23, 1),
        field3: line.substr(24, 11),
        field3DV: line.substr(35, 1),
        field4: line.substr(36, 11),
        field4DV: line.substr(47, 1),
    }
}

function checkTaxField1DV(value, expectedDV){
    if(modules.calcModule10(value) !== expectedDV){
        throw new errors.BusinessException('INVALID DV FOR BLOCK 1');
    }
    return true;
}

function checkTaxField2DV(value, expectedDV){
    if(modules.calcModule10(value) !== expectedDV){
        throw new errors.BusinessException('INVALID DV FOR BLOCK 2');
    }
    return true;
}

function checkTaxField3DV(value, expectedDV){
    if(modules.calcModule10(value) !== expectedDV){
        throw new errors.BusinessException('INVALID DV FOR BLOCK 3');
    }
    return true;
}

function checkTaxField4DV(value, expectedDV){
    if(modules.calcModule10(value) !== expectedDV){
        throw new errors.BusinessException('INVALID DV FOR BLOCK 4');
    }
    return true;
}


module.exports = {
    splitTaxBilletLine: splitTaxBilletLine,
    checkTaxField1DV: checkTaxField1DV,
    checkTaxField2DV: checkTaxField2DV,
    checkTaxField3DV: checkTaxField3DV,
    checkTaxField4DV: checkTaxField4DV
}
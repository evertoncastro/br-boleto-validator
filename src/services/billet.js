const bankBillet = require('./../services/bankBillet');
const taxBillet = require('./../services/taxBillet');
const util = require('../services/util');
const errors = require('../errors');

function startBilletLineCheck(line){
    line = util.removeMask(line);
    if(line.length === 48){
        return taxBillet.taxBillet(line);
    }else if (line.length === 47){
        return bankBillet.bankBillet(line);
    }
    throw new errors.BusinessException('INVALID LINE SIZE');
}


module.exports = {
    startBilletLineCheck: startBilletLineCheck
}
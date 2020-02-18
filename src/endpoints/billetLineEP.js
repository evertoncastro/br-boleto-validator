const bankBillet = require('./../services/bankBillet');

function getDataFromBilletLine(request, response){
    const billetInfo = bankBillet.bankBillet('00190500954014481606906809350314337370000000100');
    response.send(billetInfo);
}


module.exports = {
    getDataFromBilletLine: getDataFromBilletLine
}
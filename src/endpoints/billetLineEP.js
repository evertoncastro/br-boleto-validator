const bankBillet = require('./../services/bankBillet');
const errors = require('./../errors');
const billet = require('./../services/billet');

function getDataFromBilletLine(request, response){
    try{
        const billetInfo = billet.startBilletLineCheck(request.params.line);
        response.send(billetInfo);
    }catch(error){
        if (error instanceof errors.BusinessException) {
            response.status(400).send({name: error.name, message: error.message});
        } 
        response.status(500);
        response.render('error', { error: error });
    }    
}


module.exports = {
    getDataFromBilletLine: getDataFromBilletLine
}
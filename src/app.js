const express = require('express');
const billetLineEP = require('./endpoints/billetLineEP');
const app = express();

app.get('/get_billet_info', function (request, response) {
    billetLineEP.getDataFromBilletLine(request, response);
})

app.listen(8080, function () {
    console.log('App listening on port 8080!')
})
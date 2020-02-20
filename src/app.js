const express = require('express');
const app = express();
const billetLineEP = require('./endpoints/billetLineEP');

app.get('/get_billet_info/:line', function (request, response) {
    billetLineEP.getDataFromBilletLine(request, response);
})

app.listen(8080, function () {
    console.log('App listening on port 8080!')
})
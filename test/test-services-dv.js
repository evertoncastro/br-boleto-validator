var expect  = require('chai').expect;
var DV = require('./../services/dv')

// it('Calc DV Success', function(done) {
//     expect(DV.calcModule10('0339913428')).to.equal('8');
//     done();
// });

it('Deep parser should return a single character numeric value [1-9]', function(){
    expect(DV.deepParser(29)).to.equal(2);
    expect(DV.deepParser(18)).to.equal(9);
    expect(DV.deepParser(9)).to.equal(9);
})

var expect  = require('chai').expect;
var DV = require('./../src/services/dv')

it('Deep parser should return a single character numeric value [1-9]', function(){
    expect(DV.deepParser(29)).to.equal(2);
    expect(DV.deepParser(18)).to.equal(9);
    expect(DV.deepParser(9)).to.equal(9);
});

it('Product calc should return the correct value', function(done) {
    expect(DV.productCalcModule10('001905009')).to.equal([25, 1]);
    done();
});

it('Calc Module 10 should return the correct value', function(done) {
    //expect(DV.calcModule10('001905009')).to.equal('5');
    //expect(DV.calcModule10('4014481606')).to.equal('9');
    //expect(DV.calcModule10('001905009')).to.equal('5');
    done();
});
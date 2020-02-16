var expect  = require('chai').expect;
var dv = require('./../src/services/dv');

it('Deep parser should return a single character numeric value [1-9]', function(){
    expect(dv.deepParser(29)).to.equal(2);
    expect(dv.deepParser(18)).to.equal(9);
    expect(dv.deepParser(9)).to.equal(9);
});

it('Product calc should return the correct value', function(done) {
    expect(dv.productCalcModule10('001905009', 2)).to.deep.equal([25, 1]);
    done();
});

it('Calc Module 10 should return the correct value for field 1', function(done) {
    expect(dv.calcModule10('001905009', 2)).to.equal('5');
    done();
});

it('Calc Module 10 should return the correct value for field 2', function(done) {
    expect(dv.calcModule10('4014481606', 1)).to.equal('9');
    done();
});

it('Calc Module 10 should return the correct value for field 3', function(done) {
    expect(dv.calcModule10('0680935031', 1)).to.equal('4');
    done();
});




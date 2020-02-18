var expect  = require('chai').expect;
var modules = require('./../src/services/modules');

it('Deep parser should return a single character numeric value [1-9]', function(done){
    expect(modules.deepParser(2229)).to.equal(6);
    expect(modules.deepParser(18)).to.equal(9);
    expect(modules.deepParser(9)).to.equal(9);
    done();
});

it('Product calc should return the correct value', function(done) {
    expect(modules.productCalcModule10('001905009', 2)).to.deep.equal([25, 1]);
    done();
});

it('Calc Module 10 should return the correct value for field 1', function(done) {
    expect(modules.calcModule10('001905009', 2)).to.equal('5');
    done();
});

it('Calc Module 10 should return the correct value for field 2', function(done) {
    expect(modules.calcModule10('4014481606', 1)).to.equal('9');
    done();
});

it('Calc Module 10 should return the correct value for field 3', function(done) {
    expect(modules.calcModule10('0680935031', 1)).to.equal('4');
    done();
});

it('Calc Module 11 should return the correct module', function(done) {
    expect(modules.bankModule11('0019373700000001000500940144816060680935031')).to.equal('3');
    done();
});




var expect  = require('chai').expect;
var modules = require('./../src/services/modules');


describe('module Services', () => {
    it('Calc Module 10 should return the correct value for field 1', function(done) {
        expect(modules.calcModule10('001905009')).to.equal('5');
        done();
    });

    it('Calc Module 10 should return the correct value for field 2', function(done) {
        expect(modules.calcModule10('4014481606')).to.equal('9');
        done();
    });

    it('Calc Module 10 should return the correct value for field 3', function(done) {
        expect(modules.calcModule10('0680935031')).to.equal('4');
        done();
    });

    it('Calc Module 11 should return the correct module', function(done) {
        expect(modules.bankModule11('0019373700000001000500940144816060680935031')).to.equal('3');
        done();
    });
});



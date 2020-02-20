const expect  = require('chai').expect;
const modules = require('./../src/services/modules');


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

    it('Bank Module 11 should return the correct DV', function(done) {
        expect(modules.bankModule11('0019373700000001000500940144816060680935031')).to.equal('3');
        done();
    });

    it('Tax Module 10 should return the correct DV', (done) => {
        expect(modules.taxModule10('8260000000526200971482202059339141918120022')).to.equal('5');
        //expect(modules.taxModule10('8360000001025700481006807155154100126916582')).to.equal('0');
        done();
    });

    it('Tax Module 11 should return the correct DV', (done) => {
        expect(modules.taxModule11('8220000215048200974123220154098290108605940')).to.equal('0');
        done();
    });
});



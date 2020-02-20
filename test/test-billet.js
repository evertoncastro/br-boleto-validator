const chai  = require('chai');
const spies = require('chai-spies');
const taxBillet = require('./../src/services/taxBillet');
const bankBillet = require('./../src/services/bankBillet');
const billet = require('./../src/services/billet');
const util = require('./../src/services/util');
const errors = require('./../src/errors');

chai.use(spies);
const expect = chai.expect;
const sandbox = chai.spy.sandbox();


describe('billet Services', () => {
    beforeEach(() => {
        sandbox.on(taxBillet, ['taxBillet']);
        sandbox.on(bankBillet, ['bankBillet']);
        sandbox.on(util, ['removeMask']);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('startBilletLineCheck function should call removeMask', (done) => {
        const line = '82650000000 3 52620097148 3 22020593391 8 41918120022 3'
        billet.startBilletLineCheck(line);
        expect(util.removeMask).to.have.been.called.with.exactly(line);
        done();
    });

    it('startBilletLineCheck function should call taxBillet', (done) => {
        const line = '826500000003526200971483220205933918419181200223'
        billet.startBilletLineCheck(line);
        expect(taxBillet.taxBillet).to.have.been.called.with.exactly(line);
        done();
    });

    it('startBilletLineCheck function should call bankBillet', (done) => {
        const line = '00190500954014481606906809350314337370000000100'
        billet.startBilletLineCheck(line);
        expect(bankBillet.bankBillet).to.have.been.called.with.exactly(line);
        done();
    });

    // it('startBilletLineCheck function should throw exception for invalid line length', (done) => {
    //     const line = '00190500954014481606906809350314'
    //     expect(() => billet.startBilletLineCheck(line)).to.throws(errors.BusinessException(), 'INVALID LINE SIZE');
    //     done();
    // });

});

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

    it('startBilletLineCheck function should throw exception for invalid line length', (done) => {
        const line = '00190500954014481606906809350314'
        expect(() => billet.startBilletLineCheck(line)).to.throws(errors.BusinessException(), 'INVALID LINE SIZE');
        done();
    });

    it('startBilletLineCheck function should not throw exception for invalid tax line currency code', (done) => {
        const line = '83600000001-5 02570048100-2 68071551541-6 00126916582-3'
        expect(() => billet.startBilletLineCheck(line)).not.to.throws(errors.BusinessException(), 'INVALID LINE SIZE');
        done();
    });

});


describe('Integration Tests for Tax Line Billets', () => {
    
    it('startBilletLineCheck should return and object for a valid non sanitized tax line', (done) => {
        const line = '83600000001-5 02570048100-2 68071551541-6 00126916582-3'
        response = billet.startBilletLineCheck(line);
        expect(response).to.deep.equal({
            "barCode": "83600000001025700481006807155154100126916582",
            "validLine": true
        });
        done();
    });

    it('startBilletLineCheck should return and object for a sanitized valid tax line', (done) => {
        const line = '858900004609524601791605607593050865831483000010'
        response = billet.startBilletLineCheck(line);
        expect(response).to.deep.equal({
            "barCode": "85890000460524601791606075930508683148300001",
            "validLine": true
        });
        done();
    });

    it('startBilletLineCheck should return and object for a sanitized valid tax line 1', (done) => {
        const line = '826500000003526200971483220205933918419181200223'
        response = billet.startBilletLineCheck(line);
        expect(response).to.deep.equal({
            "barCode": "82650000000526200971482202059339141918120022",
            "validLine": true
        });
        done();
    });

    it('startBilletLineCheck should return and object for a sanitized valid tax line 2', (done) => {
        const line = '836200000005667800481000180975657313001589636081'
        response = billet.startBilletLineCheck(line);
        expect(response).to.deep.equal({
            "barCode": "83620000000667800481001809756573100158963608",
            "validLine": true
        });
        done();
    });

    it('startBilletLineCheck should return and object for a sanitized valid tax line 2', (done) => {
        const line = '89610000000 0 59980001011 9 05333201006 4 26000015744 6'
        response = billet.startBilletLineCheck(line);
        expect(response).to.deep.equal({
            "barCode": "89610000000599800010110533320100626000015744",
            "validLine": true
        });
        done();
    });

});


describe('Integration Tests for Bank Line Billets', () => {
    
    it('startBilletLineCheck should return and object for a valid sanitized bank line', (done) => {
        const line = '23793381286000782713695000063305975520000370000'
        response = billet.startBilletLineCheck(line);
        expect(response).to.deep.equal({
            "barCode": "23799755200003700003381260007827139500006330",
            "billetDueDate": "2018-06-11",
            "billetValue": "3700.00",
            "validLine": true
        });
        done();
    });

    it('startBilletLineCheck should return and object for a valid non sanitized bank line', (done) => {
        const line = '03399.13428 75401.000007 10838.001013 4 80180000073000'
        response = billet.startBilletLineCheck(line);
        expect(response).to.deep.equal({
            "barCode": "03394801800000730009134275401000001083800101",
            "billetDueDate": "2019-09-20",
            "billetValue": "730.00",
            "validLine": true
        });
        done();
    });

});




let chai  = require('chai');
let spies = require('chai-spies');
let taxBillet = require('./../src/services/taxBillet');
let taxBilletLine = require('./../src/services/taxBilletLine')
const errors = require('./../src/errors');
const modules = require('./../src/services/modules');

chai.use(spies);
const expect = chai.expect;
const sandbox = chai.spy.sandbox();


describe('taxBillet Services', () => {
    beforeEach(() => {
        sandbox.on(taxBillet, ['identifyModule']);
        sandbox.on(taxBilletLine, ['splitTaxBilletLine', 'checkTaxField1DV', 
        'checkTaxField2DV', 'checkTaxField3DV', 'checkTaxField4DV']);
        sandbox.on(modules, ['taxModule10', 'taxModule11']);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('mountTaxBilletInfo should return a valid tax billet bar code', (done) => {
        let barCode = taxBillet.mountTaxBilletInfo({
            field1: '82650000000',
            field1DV: '3',
            field2: '52620097148',
            field2DV: '3',
            field3: '22020593391',
            field3DV: '8',
            field4: '41918120022',
            field4DV: '3'
        });
        expect(barCode).to.be.deep.equal({
            barCode: '82650000000526200971482202059339141918120022',
            validLine: true
        });
        done();
    });

    it('mountBankLine should throw exception for an invalid tax billet bar code', (done) => {
        expect(() => taxBillet.mountTaxBilletInfo({
            field1: '82610000000',
            field1DV: '3',
            field2: '52620097148',
            field2DV: '3',
            field3: '22020593391',
            field3DV: '8',
            field4: '41918120022',
            field4DV: '3'
        })).to.throw(errors.BusinessException(), 'INVALID BAR CODE DV')
        done();
    });

    it('identifyModule should return taxMod10 for currency code equals to 6', (done) => {
        const modFunc = taxBillet.identifyModule('6');
        expect(modFunc).to.deep.equal(modules.taxModule10);
        done();
    });

    it('identifyModule should return taxMod10 for currency code equals to 7', (done) => {
        const modFunc = taxBillet.identifyModule('7');
        expect(modFunc).to.deep.equal(modules.taxModule10);
        done();
    });

    it('identifyModule should return taxMod11 for currency code equals to 9', (done) => {
        const modFunc = taxBillet.identifyModule('9');
        expect(modFunc).to.deep.equal(modules.taxModule11);
        done();
    });

    it('taxBillet function should call split bank billet line', (done) => {
        const line = '826500000003526200971483220205933918419181200223'
        taxBillet.taxBillet(line);
        expect(taxBilletLine.splitTaxBilletLine).to.have.been.called.with.exactly(line);
        done();
    });

    it('mountTaxBilletInfo function should taxModule10 for currency code 6', (done) => {
        const fields = {
            field1: '82650000000',
            field1DV: '3',
            field2: '52620097148',
            field2DV: '3',
            field3: '22020593391',
            field3DV: '8',
            field4: '41918120022',
            field4DV: '3'
        }
        taxBillet.mountTaxBilletInfo(fields);
        expect(modules.taxModule10).to.have.been.called.with.exactly('8260000000526200971482202059339141918120022');
        //expect(taxBillet.identifyModule).to.have.been.called.with.exactly('6');
        done();
    });

    it('mountTaxBilletInfo function should taxModule11 for currency code 6', (done) => {
        const fields = {
            field1: '85890000460',
            field1DV: '9',
            field2: '52460179160',
            field2DV: '5',
            field3: '60759305086',
            field3DV: '5',
            field4: '83148300001',
            field4DV: '0'
        }
        taxBillet.mountTaxBilletInfo(fields);
        expect(modules.taxModule11).to.have.been.called.with.exactly('8580000460524601791606075930508683148300001');
        done();
    });



});

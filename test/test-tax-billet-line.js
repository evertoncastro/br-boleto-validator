const chai = require('chai');
const spies = require('chai-spies');
const taxBilletLine = require('./../src/services/taxBilletLine');
const modules = require('./../src/services/modules');
const errors = require('./../src/errors');

chai.use(spies);
const expect = chai.expect;
const sandbox = chai.spy.sandbox();

describe('taxBilletLine services', () => {

    beforeEach(() => {
        sandbox.on(modules, ['calcModule10']);
    });

    afterEach(() => {
        sandbox.restore(); // restores original methods on `array`
    })

    it('splitBilletLine should return an object with fields info', () => {
        let fields = taxBilletLine.splitTaxBilletLine('826500000003526200971483220205933918419181200223');
        expect(fields).to.deep.equal({
            field1: '82650000000',
            field1DV: '3',
            field2: '52620097148',
            field2DV: '3',
            field3: '22020593391',
            field3DV: '8',
            field4: '41918120022',
            field4DV: '3',
        });
    });
    
    it('checkTaxField1 should call calcModule with right params', (done) => {
        taxBilletLine.checkTaxField1DV('82650000000', '3')
        expect(modules.calcModule10).to.have.been.called.with.exactly('82650000000');
        done();
    });

    it('checkTaxField1 should throw exception for invalid DV', (done) => {
        expect(() => taxBilletLine.checkTaxField1DV('82650000000', '4')).to.throws(errors.BusinessException(), 'INVALID DV FOR BLOCK 1');
        done();
    });

    it('checkTaxField2 should call calcModule with right params', (done) => {
        taxBilletLine.checkTaxField2DV('52620097148', '3')
        expect(modules.calcModule10).to.have.been.called.with.exactly('52620097148');
        done();
    });

    it('checkTaxField2 should throw exception for invalid DV', (done) => {
        expect(() => taxBilletLine.checkTaxField2DV('82650000000', '4')).to.throws(errors.BusinessException(), 'INVALID DV FOR BLOCK 2');
        done();
    });

    it('checkTaxField3 should call calcModule with right params', (done) => {
        taxBilletLine.checkTaxField3DV('22020593391', '8')
        expect(modules.calcModule10).to.have.been.called.with.exactly('22020593391');
        done();
    });

    it('checkTaxField3 should throw exception for invalid DV', (done) => {
        expect(() => taxBilletLine.checkTaxField3DV('82650000000', '4')).to.throws(errors.BusinessException(), 'INVALID DV FOR BLOCK 3');
        done();
    });

    it('checkTaxField4 should call calcModule with right params', (done) => {
        taxBilletLine.checkTaxField4DV('41918120022', '3')
        expect(modules.calcModule10).to.have.been.called.with.exactly('41918120022');
        done();
    });

    it('checkTaxField4 should throw exception for invalid DV', (done) => {
        expect(() => taxBilletLine.checkTaxField4DV('82650000000', '4')).to.throws(errors.BusinessException(), 'INVALID DV FOR BLOCK 4');
        done();
    });
})
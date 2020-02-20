let chai  = require('chai');
let spies = require('chai-spies');
let taxBillet = require('./../src/services/taxBillet');
let taxBilletLine = require('./../src/services/taxBilletLine')
const errors = require('./../src/errors');

chai.use(spies);
const expect = chai.expect;
const sandbox = chai.spy.sandbox();


describe('taxBillet Services', () => {
    beforeEach(() => {
        sandbox.on(taxBilletLine, ['splitTaxBilletLine']);
    });

    afterEach(() => {
        sandbox.restore();
    });

    // it('mountTaxBilletInfo should call info from each field/block', (done) => {
    //     bankBillet.mountTaxBilletInfo({
    //         field1: '001905009',
    //         field1DV: '5',
    //         field2: '4014481606',
    //         field2DV: '9',
    //         field3: '0680935031',
    //         field3DV: '4',
    //         field4: '3',
    //         field5: '37370000000100'
    //     });
    //     expect(bankBilletLine.infoFromField1).to.have.been.called.with.exactly('001905009', '5');
    //     expect(bankBilletLine.infoFromField2).to.have.been.called.with.exactly('4014481606', '9');
    //     expect(bankBilletLine.infoFromField3).to.have.been.called.with.exactly('0680935031', '4');
    //     expect(bankBilletLine.infoFromField5).to.have.been.called.with.exactly('37370000000100');
    //     done();
    // });

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

    it('taxBillet function should call split bank billet line', (done) => {
        const line = '826500000003526200971483220205933918419181200223'
        taxBillet.taxBillet(line);
        expect(taxBilletLine.splitTaxBilletLine).to.have.been.called.with.exactly(line);
        done();
    });

});

let chai  = require('chai');
let spies = require('chai-spies');
let bankBillet = require('./../src/services/bankBillet');
let bankBilletLine = require('./../src/services/bankBilletLine')
const errors = require('./../src/errors');

chai.use(spies);
const expect = chai.expect;
const sandbox = chai.spy.sandbox();


describe('bankBillet Services', () => {
    beforeEach(() => {
        sandbox.on(bankBilletLine, ['infoFromField1', 'infoFromField2', 
        'infoFromField3', 'infoFromField5', 'splitBilletLine']);
    });

    afterEach(() => {
        sandbox.restore(); // restores original methods on `array`
    });

    it('mountBankLine should call info from each field/block', (done) => {
        bankBillet.mountBankBilletInfo({
            field1: '001905009',
            field1DV: '5',
            field2: '4014481606',
            field2DV: '9',
            field3: '0680935031',
            field3DV: '4',
            field4: '3',
            field5: '37370000000100'
        });
        expect(bankBilletLine.infoFromField1).to.have.been.called.with.exactly('001905009', '5');
        expect(bankBilletLine.infoFromField2).to.have.been.called.with.exactly('4014481606', '9');
        expect(bankBilletLine.infoFromField3).to.have.been.called.with.exactly('0680935031', '4');
        expect(bankBilletLine.infoFromField5).to.have.been.called.with.exactly('37370000000100');
        done();
    });

    it('mountBankLine should return a valid bank billet bar code', (done) => {
        let barCode = bankBillet.mountBankBilletInfo({
            field1: '001905009',
            field1DV: '5',
            field2: '4014481606',
            field2DV: '9',
            field3: '0680935031',
            field3DV: '4',
            field4: '3',
            field5: '37370000000100'
        });
        expect(barCode).to.be.deep.equal({
            barCode: '00193373700000001000500940144816060680935031',
            billetValue: '1.00',
            billetDueDate: '2007-12-31',
            validLine: true
        });
        done();
    });

    // it('mountBankLine should throw exception for an invalid bank billet bar code', (done) => {
    //     expect(bankBillet.mountBankBilletBarCode({
    //         field1: '001905009',
    //         field1DV: '5',
    //         field2: '4014481606',
    //         field2DV: '9',
    //         field3: '0680935031',
    //         field3DV: '4',
    //         field4: '3',
    //         field5: '37370000000101'
    //     })).to.throw(errors.BusinessException, 'Invalid bar code DV')
    //     done();
    // });

    it('getDateFromDueDateFactor should return a correct date', (done) => {
        let date = bankBillet.getDateFromDueDateFactor('1000');
        expect(date).to.be.equal('2000-07-03');
        date = bankBillet.getDateFromDueDateFactor('4789');
        expect(date).to.be.equal('2010-11-17');
        done();
    });

    it('getCurrencyFromValue should return a correct currency value', (done) => {
        let currency = bankBillet.getCurrencyFromValue('0000000101');
        expect(currency).to.be.equal('1.01');
        currency = bankBillet.getCurrencyFromValue('0030000101');
        expect(currency).to.be.equal('300001.01');
        currency = bankBillet.getCurrencyFromValue('0000000001');
        expect(currency).to.be.equal('0.01');
        currency = bankBillet.getCurrencyFromValue('0000080001');
        expect(currency).to.be.equal('800.01');
        done();
    });

    // it('bankBillet function should call split billet line', (done) => {
    //     const line = '00190500954014481606906809350314337370000000100'
    //     bankBillet.bankBillet(line);
    //     expect(bankBilletLine.splitBilletLine).to.have.been.called.with.exactly(line);
    //     done();
    // });

});

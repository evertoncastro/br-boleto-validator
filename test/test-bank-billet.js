let chai  = require('chai');
let spies = require('chai-spies');
let bankBillet = require('./../src/services/bankBillet');
let bankBilletLine = require('./../src/services/bankBilletLine')

chai.use(spies);
const expect = chai.expect;
const sandbox = chai.spy.sandbox();


describe('bankBillet Services', () => {
    beforeEach(() => {
        sandbox.on(bankBilletLine, ['infoFromField1']);
    });

    afterEach(() => {
        sandbox.restore(); // restores original methods on `array`
    });

    it('mountBankLine should call info from field', (done) => {
        bankBillet.mountBankBillet({
            field1: '0000000',
            field1DV: '1'
        });
        expect(bankBilletLine.infoFromField1).to.have.been.called.with.exactly('0000000', '1');
        done();
    });



});

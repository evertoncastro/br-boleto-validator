var chai  = require('chai');
var spies = require('chai-spies');
var billetLine = require('./../src/services/billetLine');
var modules = require('./../src/services/modules');

chai.use(spies);
const expect = chai.expect;
const should = chai.should();
const sandbox = chai.spy.sandbox();

describe('billetLine Services', () => {
    beforeEach(() => {
        array = [];
        sandbox.on(modules, ['calcModule10']);
    });

    afterEach(() => {
      sandbox.restore(); // restores original methods on `array`
    })

    it('SplitBilletLine should return an object', function(done){
        let line = '00190500954014481606906809350314337370000000100';
        expect(billetLine.splitBilletLine(line)).to.deep.equal({
            field1: '001905009',
            field1DV: '5',
            field2: '4014481606',
            field2DV: '9',
            field3: '0680935031',
            field3DV: '4',
            field4: '3',
            field5: '37370000000100'
        });
        done();
    });
    
    it('check1dv should call calcModule10 with right params', function(done){
        billetLine.checkField1DV('001905009', '5')
        expect(modules.calcModule10).to.have.been.called.with.exactly('001905009', 2);
        done();
    });
});


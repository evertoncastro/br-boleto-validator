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

    it('check1dv should call return true for a valid dv', function(done){
        valid = billetLine.checkField1DV('001905009', '5')
        expect(valid).to.be.true;
        done();
    });

    it('check1dv should return false for invalid dv', function(done){
        valid = billetLine.checkField1DV('001905009', '6')
        expect(valid).to.be.false;
        done();
    });

    it('check2dv should call calcModule10 with right params', function(done){
        billetLine.checkField2DV('4014481606', '9')
        expect(modules.calcModule10).to.have.been.called.with.exactly('4014481606', 1);
        done();
    });

    it('check2dv should return true for valid dv', function(done){
        valid = billetLine.checkField2DV('4014481606', '9')
        expect(valid).to.be.true;
        done();
    });

    it('check2dv should return false for invalid dv', function(done){
        valid = billetLine.checkField2DV('4014481606', '8')
        expect(valid).to.be.false;
        done();
    });

    it('check3dv should call calcModule10 with right params', function(done){
        billetLine.checkField3DV('0680935031', '4')
        expect(modules.calcModule10).to.have.been.called.with.exactly('0680935031', 1);
        done();
    });

    it('check3dv should return true for valid dv', function(done){
        valid = billetLine.checkField3DV('0680935031', '4')
        expect(valid).to.be.true;
        done();
    });

    it('check3dv should return false for valid dv', function(done){
        valid = billetLine.checkField3DV('0680935031', '5')
        expect(valid).to.be.false;
        done();
    });

    
});

